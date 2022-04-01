var dataSet = [];
var language 		= "en";
var server_attributes = [];
var mymap;
var defaultProjection = "EPSG:4326";
var drawed = false;
var area = '';
var toString = Object.prototype.toString;
var feature;

// define toolbar options
var options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: false, // adds button to draw markers
    drawPolyline: true, // adds button to draw a polyline
    drawRectangle: true, // adds button to draw a rectangle
    drawPolygon: true, // adds button to draw a polygon
    drawCircle: true, // adds button to draw a cricle
    cutPolygon: false, // adds button to cut a hole in a polygon
    editMode: true, // adds button to toggle edit mode for all layers
    removalMode: true // adds a button to remove layers
};




(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to

    }, false);
})();


function validateForm() {

    var radio = $('#radio').val(); //document.forms["myForm"]["radio"].value;
    var pedido = $('#pedido').val(); //document.forms["myForm"]["pedido"].value;
    var asignado = $('#workdevice').val(); //document.forms["myForm"]["workdevice"].value;
    //var rango = $('#datatimes').html(); //daterangepicker("getDate").valueOf(); //document.forms["myForm"]["datatimes"].val();
    var rango1 = $('#fechaentrega').val();
    var rango2 = $('#fechafinal').val();
    var latitud = $('#lati').val(); //document.forms["myForm"]["lati"].value;
    var longitud = $('#lon').val(); //document.forms["myForm"]["lon"].value;
    var direcc = $('#dir').val(); //document.forms["myForm"]["dir"].value;
    //console.log("------>" + asignado);
    //console.log("------>" + rango1);
    //console.log("------>" + rango2);

    if (radio == "" || latitud == "") {
        //alert("Debes de llenar todos los campos antes de guardar por favor");
        swal({
            title: 'You must fill in all the fields please',
            type: 'warning',
            html: '<strong>You must fill in all the fields please</strong>'
        });
        return false;
    }
}


$(document).ready(function() {


    $('#myform').validate({ // initialize the plugin
        rules: {
            radio: {
                required: true,
                minlength: 1
            },
            pedido: {
                required: false,
                minlength: 1
            },
             asignado: {
                required: true,
                minlength: 1
            },
            workdevice: {
                required: true,
                minlength: 1
            },
            datatimes: {
                required: true,
                minlength: 5
            },
            lati: {
                required: true,
                minlength: 5
            },
            lon: {
                required: true,
                minlength: 5
            },
            dir: {
                required: true,
                minlength: 5
            }
        },
        submitHandler: function(form) { // for demo
            alert('valid form submitted'); // for demo
            return false; // for demo
        }
    });


    /**
     * Check status of session of user
     */
    checkSession();

    checkPermission();


    localFormClear();

    /** 
     *initial parameters
     */

    loadSwitchery();


    /* Comentado por JOHC


    	//maps    
    	mymap = L.map('mapgeo',{ projection: defaultProjection }).setView([0, -0], 2, {maxZoom:13, minZoom:8});
    	


    	 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicmFzdHJlaWVhcXVpIiwiYSI6ImNpemJzOW9ldzBmZHUzM3B4cWtvZ2p3bm8ifQ.s239q_0Nj98HgW14J9bBiA', {
    //		maxZoom: sessionStorage.getItem('zoom'),
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		id: 'mapbox.streets'
    	}).addTo(mymap);
    	
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

    	L.control.watermark({ position: 'bottomleft' }).addTo(mymap);    
    	
    	// add leaflet.pm controls to the map
    	mymap.pm.addControls(options);
    	
    	// let polygons finish their shape on double click
    	mymap.pm.enableDraw('Poly', { finishOn: 'dblclick' });
    	mymap.pm.disableDraw('Poly');
    	
    	// listen to when a new layer is created
    	
    	mymap.on('pm:drawstart', function(e) {
        	if (drawed == true) {
        		drawed = false;
    			clearMap(mymap);
        	}
    	});	  

    	mymap.on('pm:create', function (e) {
        var layer = e.layer;
    		shape = e.shape; // the name of the shape being drawn (i.e. 'Circle')
    		    
        	// here you got the polygon points   
    		var points = layer._latlngs;
    		
            switch (shape) {
            	
            	case "Circle" :
            		
            		var radius = layer.getRadius();        		        		
            		var center = layer.getLatLng();
            				                		            	           
    	            area = 'CIRCLE (';
    	            area += center.lat + ' ' + center.lng + ', ';
    	            area += radius + ')';
            	
            		break;
            	
            	case "Poly" :
            		        		
    	        	area = 'POLYGON((';
    		        for (i = 0; i < points[0].length; i += 1) {
    		            area += points[0][i].lat + ' ' + points[0][i].lng + ', ';            
    		        }
    		        area = area.substring(0, area.length - 2) + '))';
            	
            		break;
            		
            	case "Line" :
            		        		
    	            area = 'LINESTRING (';
    	            for (i = 0; i < points.length; i += 1) {
    		            area += points[i].lat + ' ' + points[i].lng + ', ';            
    		        }
    		        area = area.substring(0, area.length - 2) + '))';

            		break;
            		
            }                
                    
            drawed = true;

        });	
        
    Termina comenatario de JOHC */
    $(function() {
        $('#datetimepicker1').datetimepicker();
        //$('#datetimepicker2').datetimepicker();

    });
    var checkPastTime = function(inputDateTime) {
        console.log('Entra al tiempo');
        /*
        if (typeof(inputDateTime) != "undefined" && inputDateTime !== null) {
            var current = new Date();

            //check past year and month
            if (inputDateTime.getFullYear() < current.getFullYear()) {
                $('#datetimepicker1').datetimepicker('reset');
                alert("Sorry! Past date time not allow.");
            } else if ((inputDateTime.getFullYear() == current.getFullYear()) && (inputDateTime.getMonth() < current.getMonth())) {
                $('#datetimepicker1').datetimepicker('reset');
                alert("Sorry! Past date time not allow.");
            }

            // 'this' is jquery object datetimepicker
            // check input date equal to todate date
            if (inputDateTime.getDate() == current.getDate()) {
                if (inputDateTime.getHours() < current.getHours()) {
                    $('#datetimepicker1').datetimepicker('reset');
                }
                this.setOptions({
                    minTime: current.getHours() + ':00' //here pass current time hour
                });
            } else {
                this.setOptions({
                    minTime: false
                });
            }
        }*/
    };

    /*
        var currentYear = new Date();
        $('#datetimepicker1').datetimepicker({
            startDate: new Date(),
            onChangeDateTime:checkPastTime
        });
    
    var dateToday = new Date();
    var dates = $("#datetimepicker1").datetimepicker({
        startDate: new Date(),
        onChangeDateTime: checkPastTime1
    });*/

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0! 
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    var today = yyyy + '/' + mm + '/' + dd

    var dateToday = new Date();

    $(function() {
        $('input[name="datetimes"]').daterangepicker({
                timePicker: true,
                minDate: dateToday,
                timePicker24Hour: true,
                startDate: moment().startOf('minutes'),
                endDate: moment().startOf('hour').add(4, 'hour'),
                autoUpdateInput: false,
                locale: {
                format: 'YYYY-M-DD H:mm A',
                cancelLabel: 'Limpiar',
                applyLabel: "Aplicar",
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembere', 'October', 'November', 'December'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                daysNames: ['Domingo', 'Segunda-feira', 'Terça', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
                daysNamesShort: ['Do', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                daysNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                }

            },
            function(start, end, label) {
                console.log('A date range was chosen: ' + start.format('YYYY-MM-DD H:mm:ss') + ' to ' + end.format('YYYY-MM-DD H:mm:ss'));


            });

        $('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('YYYY-MM-DD H:mm') + ' - ' + picker.endDate.format('YYYY-MM-DD H:mm'));
            $('#fechaentrega').val(picker.startDate.format('YYYY-MM-DD H:mm:ss'))
            $('#fechafinal').val(picker.endDate.format('YYYY-MM-DD H:mm:ss'))

        });

        $('input[name="datetimes"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });

        //https://www.daterangepicker.com/#examples

    });


    $('#datetimes').on('apply.daterangepicker', function(ev, picker) {
        //do something, like clearing an input
        console.log($("---->" + '#datetimes').val());
    });

    function CalcDiff() {
        var start = new Date($("#start").val());
        var end = new Date($("#end").val());

        if (start != null && end != null) { // We have both dates
            var hours = Math.round((end - start) / 36e5);
            $("#difference").val(hours);
        }

        return hours;
    }






    var checkPastTime1 = function(selectedDate) {
        console.log('Entra al tiempo 6');
        var option = this.id == "datetimepicker1" ? "minDate" : "maxDate",
            instance = $(this).data("datetimepicker"),
            date = $.datetimepicker.parseDate(instance.settings.dateFormat || $.datetimepicker._defaults.dateFormat, selectedDate, instance.settings);
        dates.not(this).datetimepicker("option", option, date);
    }



   // mapboxgl.accessToken = 'pk.eyJ1IjoiamhlbGd1ZXJvcyIsImEiOiJjazAybHB1NGEwbGppM25ta2tkYm9nanNrIn0.5jFQeggi_VVOt0kWykXgFw';
    
    mapbox = sessionStorage.getItem('mapbox');
     // pk.eyJ1IjoidGVja25pY29zIiwiYSI6ImNrMHZjcXJnczB4anYzY3F2NXhraTg1Y3AifQ.eEuxbui-YwXYq-qohP-PNw
     mapboxgl.accessToken =  mapbox;
    
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [28.527, 77.06], // starting position
        zoom: 9 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    /*
        map.on('click', function(evt) {
            var x = evt.point.x;
            var y = evt.point.y;
            console.log(x + '///' + y);
        });
    */

    var marker = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([28.527, 77.06])
        .addTo(map);

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        //coordinates.style.display = 'block';
        //coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        reverseGeo(lngLat.lat, lngLat.lng, coordinates);
        //console.log(res);
    }

    marker.on('dragend', onDragEnd);
    doListDevices();
    //Select2 

    map.on('click', addMarker);

    function addMarker(e) {
        if (typeof circleMarker !== "undefined") {
            map.removeLayer(circleMarker);
        }
        //add marker
        circleMarker = new L.circle(e.latlng, 200, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);
    }


    $(".select-search").select2({ allowClear: false, placeholder: $.i18n("title_select2"), language: "es" })
        .on('change', function() {
            $(this).closest('form').validate().element($(this));
        });

    $('.datatable-js').dataTable({
        columnDefs: []
    });

    /**
     * parameters this page
     */

    //    $('[name="mark"]').formatter({
    //	    pattern: '{{(99)9999}}'
    //	});


    function doListDevices() {
        console.log("doListDevices dashboard " + sessionStorage.getItem('url') + "devices/");


        var existe = '<?php echo $midevice;?>';

        if (existe != '') {
            var select = $('#workdevice').empty();
            select.append('<option value=""></option>');
            $.ajax({
                type: "GET",
                url: sessionStorage.getItem('url') + "devices/",
                cache: false,
                headers: {
                    "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
                },
                error: function(response) {
                    doOpenAlertError($.i18n("message_error_performing"));
                },
                success: function(response) {

                    devices.splice(0);
                    var i = 1;
                    var count = 0;
                    var html = "";


                    $.each(response, function(key, value) {

                        devices.push({
                            id: count,
                            deviceId: value.id,
                            name: value.name,
                            model: value.model,
                            phone: value.phone,
                            category: (value.category != null) ? value.category : "default",
                            status: value.status,
                            uniqueId: value.uniqueId,
                            groupId: value.groupId,
                            photo: !("photo" in value) ? "" : (value.photo != null ? value.photo : ""),
                            //follow: false,
                            address: "",
                            polyline: null,
                            latitude: null,
                            longitude: null,
                            positionId: null,
                            popup: null,
                            input1: ((value.attributes.input1 == null || value.attributes.input1 == "") ? "input1" : value.attributes.input1),
                            input2: ((value.attributes.input2 == null || value.attributes.input2 == "") ? "input2" : value.attributes.input2),
                            alarm: null,
                            input1Active: null,
                            input2Active: null
                        });
                        select.append('<option value="' +
                            value.id + '|' + value.name +
                            '">' +
                            value.name +
                            '</option>');


                        count++;

                    });

                    if (devices.length > 0) {

                        console.log("There are a total of devices " + devices.length);
                        //doLastPositions();
                        //doCheckNotifications();
                    } else {

                        //	if ($.parseJSON(sessionStorage.getItem("admin")) == true) {  //lo quite para ventana de agregar dispositivos
                        swal({
                                title: $.i18n("title_no_device"),
                                text: $.i18n("title_go_device_form"),
                                type: "info",
                                showCancelButton: true,
                                confirmButtonColor: "#2196F3",
                                confirmButtonText: $.i18n("title_yes_take_me"),
                                closeOnConfirm: true,
                                html: true
                            },
                            function() {
                                $(location).attr('href', "devices.php");
                            });

                        //}	lo quite para ventana de agregar dispositivos

                    }

                }
            });
        } else {
            console.log("Ya existe " + existe);
        }


    }


    $('#form_data').validate({
        errorElement: 'span',
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {
            name: {
                required: true
            }
        },
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        validClass: "validation-valid-label",

        invalidHandler: function(event, validator) { //display error alert on form submit   
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).closest('.select-search').addClass('border-warning');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.select-search').removeClass('border-warning');
        },

        success: function(e) {
            $(e).closest('.form-group').removeClass('error').addClass('info');
            $(e).remove();
            // e.addClass("validation-valid-label").text("Sucesso.");
        },

        errorPlacement: function(error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            }
            // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            } else error.insertAfter(element);
        },

        submitHandler: function(form) {},
        invalidHandler: function(form) {}
    });

    $('button[name="btnSave"]').click(function() {
        if ($('#form_data').valid()) { doSaveGeoFences(); };
    });

    $('button[name="btnClear"]').click(function() {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function() {
        refreshGridGeoFences();
    });

    $('button[name="btnClearMap"]').click(function() {
        clearMap(mymap);
    });

    //refreshGridGeoFences();    

});





/**
 * Carrega listagem de dados
 *
 * @return void
 */

function refreshGridGeoFences() {

    var params = new Object();
    params.id = '0';

    var dados = JSON.stringify(params);

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "geofences/",
        /**		data:params, */
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {

            // Javascript sourced data
            dataSet.splice(0);

            $.each(response, function(key, value) {

                var html = '<div class="btn-group" style="float: right">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doEditGeoFences(' + value.id + ')"><i class="icon-cogs"></i> ' + $.i18n("title_edit") + '</a></li>';
                html += '    	<li><a href="javascript:doDeleteGeoFences(' + value.id + ')"><i class="icon-trash"></i>' + $.i18n("title_delete") + '</a></li>';
                html += '    </ul>';
                html += '</div>';
                var start = ("start" in value.attributes ? value.attributes.start : '');
                var end = ("end" in value.attributes ? value.attributes.end : '');
                var priority = ("priority" in value.attributes ? value.attributes.priority : '');
                var type = ("type" in value.attributes ? value.attributes.type : '');
                var comments = ("comments" in value.attributes ? value.attributes.comments : '');
                var order = ("order" in value.attributes ? value.attributes.order : '');
                var address = ("address" in value.attributes ? value.attributes.address : '');
                dataSet.push([value.id, value.name, value.description, start, end, type, priority, comments, order, address, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                responsive: true,
                dom: 'Blfrtip',
                colReorder: true,
                buttons: [{
                    extend: 'excelHtml5',
                    title: $.i18n("mnu_geofences"),
                    exportOptions: {
                        columns: [0, 1, 2]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("mnu_geofences"),
                    customize: function(win) {
                        var header = '<img src="http://portal.gpssolution.in/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

                        $(win.document.body)
                            .css('font-size', '10pt')
                            .css('background-color', '#fff')
                            .prepend(
                                header
                            );

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    },
                    exportOptions: {
                        columns: [0, 1, 2]
                    }
                }]
            });

        }

    });


}


/**
 * Grava formulario no banco de dados
 *  
 * @return void
 */

function doSaveGeoFences() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var pars = $("#form_data").serializeObject();
    pars.id = (!$("#id").val() ? null : $("#id").val());
    pars.area = area;

    pars.attributes = {
        start: $("#start").val()
            //end: $("#end").val(),
            //order: $("#order").val(),
            //comments: $("#comments").val(),
            //type: $("#type").val(),
            //priority: $("#priority").val(),
            //address: $("#address").val()						
    };

    pars.attributes = mergeAttributes(pars.attributes, server_attributes);

    delete pars.addr;

    $.ajax({
        type: (!$("#id").val() ? "POST" : "PUT"),
        url: sessionStorage.getItem('url') + "geofences/" + $("#id").val(),
        data: JSON.stringify(pars),
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {
            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);

            clearMap(mymap);

            localFormClear();

            setTimeout(function() {
                refreshGrid();
            }, 1500);

        }

    });

}

/**
 * define geofence ao grupo
 *  
 * @return void
 */
/**
function doDefineGroup(groupId, geofenceId) {

    var pars = new Object();        
        pars.groupId = groupId;
        pars.geofenceId = geofenceId;        
						
    $.ajax({
        type : "POST",
		url : sessionStorage.getItem('url') + "permissions/",
		data:JSON.stringify(pars),
		contentType: 'application/json', 
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
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
        success: function (response) {

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);


            localFormClear();
            
            source.clear();
        	addInteraction();

            setTimeout(function () {
                refreshGrid();
            }, 1500);



        }

    });

}
*/

/**
 * Apaga registro da tabela
 * 
 * param id Integer
 * 
 * @return void
 */

function doDeleteGeoFences(id) {

    swal({
            title: $.i18n("title_confirm_delete"),
            text: $.i18n("title_message_delete"),
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false
        },
        function() {

            doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));

            $.ajax({
                type: "DELETE",
                url: sessionStorage.getItem('url') + "geofences/" + id,
                contentType: "application/json; charset=utf-8",
                cache: false,
                headers: {
                    "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
                },
                error: function(response) {
                    switch (response.status) {
                        case 400:
                            doOpenAlertError($.i18n("message_user_not_permission"));
                            break;
                        case 401:
                            doOpenAlertError($.i18n("message_user_unauthorized"));
                            break;
                        default:
                            doOpenAlertError($.i18n("message_error_performing"));
                            break;
                    }
                },
                success: function(response) {

                    doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);

                    refreshGridGeoFences();

                }

            });
        });

}

/**
 * Carrega registro para edicao
 * 
 * param id Integer 
 *
 * @return void
 */

function doEditGeoFences(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));

    localFormClear();

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "geofences/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {

            $.each(response, function(key, value) {

                if (value.id == id) {


                    $('input[name="id"]').val($.trim(value.id));

                    $('input[name="name"]').val(value.name);

                    $('textarea[name="description"]').val(value.description);


                    $('textarea[name="comments"]').val(!("comments" in value.attributes) ? "" : value.attributes.comments);
                    $('input[name="start"]').val(!("start" in value.attributes) ? "" : value.attributes.start);
                    $('input[name="end"]').val(!("end" in value.attributes) ? "" : value.attributes.end);
                    $('input[name="type"]').val(!("type" in value.attributes) ? "" : value.attributes.type);
                    $('input[name="order"]').val(!("order" in value.attributes) ? "" : value.attributes.order);
                    $('input[name="priority"]').val(!("priority" in value.attributes) ? "" : value.attributes.priority);
                    $('input[name="address"]').val(!("address" in value.attributes) ? "" : value.attributes.address);


                    server_attributes = value.attributes;

                    //$('textarea[name="comments"]').val(value.comments);

                    //$('input[name="start"]').val(value.startn);

                    // $('input[name="end"]').val(value.end);

                    //  $('input[name="type"]').val(value.type);

                    // $('input[name="order"]').val(value.order);
                    // $('input[name="priority"]').val(value.priority);

                    clearMap(mymap);

                    area = value.area;

                    if (value.area.lastIndexOf('POLYGON', 0) === 0) {

                        var content = value.area.match(/\([^()]+\)/);
                        var latlngs = [];

                        if (content !== null) {
                            var coordinates = content[0].match(/-?\d+\.?\d*/g);

                            if (coordinates !== null) {

                                for (i = 0; i < coordinates.length; i += 2) {
                                    lat = Number(coordinates[i]);
                                    lon = Number(coordinates[i + 1]);
                                    latlngs.push([lat, lon]);
                                }

                                var polygon = L.polygon(latlngs, { color: 'blue' }).addTo(mymap);
                                // zoom the map to the polygon
                                mymap.fitBounds(polygon.getBounds());

                            }
                        }

                    } else if (value.area.lastIndexOf('CIRCLE', 0) === 0) {

                        var content = value.area.match(/\([^()]+\)/);

                        if (content !== null) {
                            var coordinates = content[0].match(/-?\d+\.?\d*/g);

                            if (coordinates !== null) {

                                var center = [Number(coordinates[0]), Number(coordinates[1])];
                                var circle = L.circle(center, { radius: Number(coordinates[2]) }).addTo(mymap);

                                mymap.fitBounds(circle.getBounds());

                            }
                        }


                    } else if (value.area.lastIndexOf('LINESTRING', 0) === 0) {

                        var content = value.area.match(/\([^()]+\)/);
                        if (content !== null) {
                            var coordinates = content[0].match(/-?\d+\.?\d*/g);
                            if (coordinates !== null) {
                                var latlngs = [];

                                for (i = 0; i < coordinates.length; i += 2) {
                                    lat = Number(coordinates[i]);
                                    lon = Number(coordinates[i + 1]);
                                    latlngs.push([lat, lon]);
                                }

                                var polyline = L.polyline(latlngs, { color: 'blue' }).addTo(mymap);
                                // zoom the map to the polyline
                                mymap.fitBounds(polyline.getBounds());

                            }

                        }

                    }


                    drawed = true;

                }

            });
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

            $('#pane_form').click();


        }

    });

}

function localFormClear() {
    doFormClear();
}

function clearMap(m) {
    for (i in m._layers) {

        if (m._layers[i]._path != undefined) {
            try {
                if (/svg/i.test(m._layers[i]._path)) {
                    m.removeLayer(m._layers[i]);
                }
            } catch (e) {
                console.log("problem with " + e + m._layers[i]);
            }
        }
    }
}

function chooseAddr(lat1, lng1, lat2, lng2, osm_type) {
    var loc1 = new L.LatLng(lat1, lng1);
    var loc2 = new L.LatLng(lat2, lng2);
    var bounds = new L.LatLngBounds(loc1, loc2);

    if (feature) {
        mymap.removeLayer(feature);
    }
    if (osm_type == "node") {
        //feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(mymap);
        mymap.fitBounds(bounds);
        mymap.setZoom(17);
    } else {
        var loc3 = new L.LatLng(lat1, lng2);
        var loc4 = new L.LatLng(lat2, lng1);

        mymap.setZoom(17);
        //feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(mymap);
        mymap.fitBounds(bounds);
    }

    $('#addr').val('');

    $('#results').empty();
}


function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3] + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
        });

        $('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: $.i18n("title_search_results") + ":" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: $.i18n("title_no_results_found") }).appendTo('#results');
        }
    });
}