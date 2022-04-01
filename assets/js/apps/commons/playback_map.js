var dataSet = [];
let polyline;
let polylineSelected;
var markers = [];
var ulSpeed = new ySpeed();
var defaultProjection = "EPSG:4326";
var mymap1;
var colors = ["#0000FF","#8A2BE2","#A52A2A","#5F9EA0","#7FFF00","#D2691E","#6495ED","#DC143C","#00008B","#006400","#A9A9A9","#2F4F4F","#FF00FF","#DAA520","#FF69B4","#B0C4DE","#00FF00","#FFA500","#3CB371","#90EE90","#008000"];
var mapRendered = false;

$(document).ready(function () {

    /**
     * Check status of session of user
     */
    checkSession();

    localFormClear();

    loadSwitchery();

    $('#term').on('change', function(e) {

        let timeOfTerms = {
            TODAY: {
                term: 'day',
            },
            YESTERDAY: {
                term: 'day',
                subtract: true
            },
            WEEK: {
                term: 'week',
            },
            LAST_WEEK: {
                term: 'week',
                subtract: true
            },
            MONTH: {
                term: 'month',
            },
            LAST_MONTH: {
                term: 'month',
                subtract: true
            },
        }

        let term = timeOfTerms[e.val], fromDate, toDate;

        if (term) {
            fromDate = moment().startOf(term.term)
            toDate = moment().endOf(term.term);

            if (term.subtract) {
                fromDate = fromDate.subtract(1, term.term + 's');
                toDate = toDate.subtract(1, term.term + 's');
            }
            $('.term-controls').addClass('hidden');
        } else {
            $('.term-controls').removeClass('hidden');
        }

        $('#from').val('').bootstrapMaterialDatePicker('setDate', fromDate);
        $('#to').val('').bootstrapMaterialDatePicker('setDate', toDate);
    });

    $(document).on('click', '#datatable.datatable-js1 tr', function (e) {

        $('.highlight').removeClass('highlight');
        $(this).addClass('highlight');

        let itemPosition = [...this.parentElement.children].indexOf(this);
        let dataTable = $('#datatable').DataTable();
        let current = dataTable.row(this).data();
        let adjacent = dataTable.row(itemPosition == 0 ? this.nextSibling : this.previousSibling).data();

        let polylines = itemPosition == 0 ? [[current[3], current[4]], [adjacent[3], adjacent[4]]] : [[adjacent[3], adjacent[4]], [current[3], current[4]]];

        if (current[3] != adjacent[3] && current[4] != adjacent[4]) {
            if (polylineSelected) {
                polylineSelected.removeFrom(mymap)
            }

            polylineSelected = L.polylineDecorator(polylines, {
                patterns: [
                    {offset: 10, repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 20, headAngle: 40, pathOptions: {fill: true, fillColor: '#3388ff', fillOpacity: .8, color: '#000'}})}
                ]
            }).addTo(mymap1);
        }
    });

    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1,
        lang : (sessionStorage.getItem('language')=='en'?'en':sessionStorage.getItem('language'))
    });

    $('#form_play').validate({
        
        errorElement: 'span',
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {
            deviceId: {
                required: true
            },
            term: {
                required: true
            },
            from: {
                required: true
            },
            to: {
                required: true
            },
        },
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        validClass: "validation-valid-label",
        invalidHandler: function (event, validator) {
            $('.alert-error', $('.login-form')).show();
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).closest('.select-search').addClass('border-warning');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.select-search').removeClass('border-warning');
        },
        success: function (e) {
            $(e).closest('.form-group').removeClass('error').addClass('info');
            $(e).remove();
        },
        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            }
            else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            }
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            }
            else error.insertAfter(element);
        },
        submitHandler: function (form) {
        },
        invalidHandler: function (form) {
        }
    });

    $('button[name="btnGenerate"]').click(function () {
        if ($('#form_play').valid()) {
            doPrepareRoute();
            $("#mapid3").show();
            $("#datatable").show();
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
        renderReport();
    });

    getDeviceRoute();
    
    renderReport();
})

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function doPrepareRoute() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));

    var form = $("#form_play").serializeObject();

    var params = "";

    //prepare list devices
    var deviceIds = $('#deviceId option:selected');
    $(deviceIds).each(function(index, deviceId){
        if ($(this).val() != "") {
            params += "deviceId="+$(this).val()+"&";
        }
    });

    var data_ini = moment(form.from, "DD/MM/YYYY hh:mm:ss");
    var data_end = moment(form.to, "DD/MM/YYYY hh:mm:ss");

    params += "from="+data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&";
    params += "to="+data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";

    $.ajax({
        type : "GET",
        url : sessionStorage.getItem('url') + "reports/route",
        data:params,
        contentType: "application/json",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')),
            "Accept":"application/json"
        },
        error: function (response) {
            switch(response.status) {
                case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                case 404:
                    doOpenAlertError($.i18n("message_user_no_matching"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function (response) {

            // Javascript sourced data
            dataSet.splice(0);

            $.each(response, function (key, value) {
                let device = findDevice(value.deviceId);
                dataSet.push([
                    device.name,
                    value.valid ? $.i18n("title_yes") : $.i18n("title_no"),
                    moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'),
                    value.latitude,
                    value.longitude,
                    value.altitude,
                    convertSpeed(value.speed, 'knots') + ' ' + findSpeedUnit(sessionStorage.getItem('speedUnit')).title,
                    value.address,
                ]);
            });

            createMap(dataSet)
            renderReport(dataSet);

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_message_generated"), 1500);
        }
    });
}

function renderReport(dataSet) {

    $('.datatable-js1').DataTable({
        destroy: true,
        searching: false,
        data: dataSet,
        scrollY: '100px',
        scrollCollapse: true,
        paging: false,
        columnDefs: [{ targets: [0, 1, 2, 3, 4,5,6,7], visible: true}],
        //Activar si queremos imprimir los informes
        //dom: 'Blfrtip',
        bInfo: false,
        bFilter: false,
        colReorder: true,
        responsive: true,
        buttons: [{
             //'copyHtml5',
            //'excelHtml5',
            //'csvHtml5',
            extend: 'pdfHtml5',
            title: $.i18n("title_reports_stop"),
        
            exportOptions: {
                columns: [0, 1, 2, 3, 4,5,6,7]
            }
        },
        {
             //'copyHtml5',
            //'excelHtml5',
            //'csvHtml5',
            extend: 'excelHtml5',
            title: $.i18n("title_reports_stop"),
            
            exportOptions: {
                columns: [0, 1, 2, 3, 4,5,6,7]
            }
        },{
            extend: 'print',
            text: $.i18n('button_print'),
            title:  $.i18n("title_reports_stop"),
            customize: function ( win ) {
                var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+'<img src="'+sessionStorage.getItem('logomark')+'" style="position:absolute; top:0; right:0;" />';
                $(win.document.body).css( 'font-size', '10pt' ).css( 'background-color', '#fff' ).prepend(header);
                $(win.document.body).find( 'table' ).addClass( 'compact' ).css( 'font-size', 'inherit' );
            },
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }
        }]
    });
}

function renderMap(dataSet) {

    let points = [];

    $.each(dataSet, function (key, value) {
        points.push(new L.LatLng(value[3], value[4]))
    });

    if (points.length) {
        polyline = new L.Polyline(points, {
             color: 'red',
             weight: 5,
             opacity: 0.5,
             smoothFactor: 1
        });

        polyline.addTo(mymap1);

        mymap1.fitBounds(polyline.getBounds())
    }
}

/**
 * Carrega lista dos devices
 *
 *
 * @return void
 */

function getDeviceRoute() {

    $.ajax({
        type : "get",
        url : sessionStorage.getItem('url') + "devices/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
        error: function (response) {
            switch(response.status) {
                case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                case 404:
                    doOpenAlertError($.i18n("message_user_no_matching"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function (response) {

            limpaSelect("deviceId");
            var count1 = 0;

            $.each(response, function( key, value ) {
                insertOption("deviceId", value.id, value.name);
                devices.push({
                    //id       : count1,
                    deviceId : value.id,
                    name     : value.name
                    //category : value.category,
                    //uniqueId : value.uniqueId
                });
                count1++;
            });
        }
    });
}

function createMap(dataSet) {

    if(mapRendered == true) { mymap1.remove() };

    mymap1 = L.map('mapid3',{ projection: defaultProjection }).setView([0, -0], 2, {maxZoom:13, minZoom:5});
    mapbox = sessionStorage.getItem('mapbox');

   
     var osm = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap1);

     var ggl = new L.Google();
     var ggl2 = new L.Google('TERRAIN');

     mymap1.addLayer(ggl);
     //mymap1.addControl(new L.Control.Layers( {'Google Sattelite':ggl, 'OpenStreet':osm, 'Google Terrain':ggl2}, {}));
     mymap1.addControl(new L.Control.Layers( {'Google Sattelite':ggl, 'OpenStreet':osm, 'Google Terrain':ggl2}, {}));

    // watermark
    /*
    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');
            img.src = sessionStorage.getItem('logomark');
            img.style.width = '175px';
            return img;
        },
        onRemove: function(map) {
            // Nothing to do here
        }
    });

    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    };

    L.control.watermark({ position: 'bottomleft' }).addTo(mymap1);
    
    */

    mapRendered = true;

    renderMap(dataSet);
}


function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#term").select2("val", "");
     $("#mapid3").hide();
      $("#datatable").hide();

    if (dataSet.length > 0) { $('.datatable-js1').DataTable().destroy(); }

    dataSet.splice(0);

    $('.datatable-js1').DataTable({
        destroy: true,
        data: dataSet,
        columnDefs: [],
        dom: 'Bfrtip',
        buttons: []
    });

    if (polyline) {
        polyline.removeFrom(mymap1)
    }

    if (polylineSelected) {
        polylineSelected.removeFrom(mymap1)
    }
}

function clearMarkers(map) {

}
