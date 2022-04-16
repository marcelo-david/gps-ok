var dataSet = [];
var mymap;
var defaultProjection = "EPSG:4326";
var drawed = false;
var area = '';
var toString = Object.prototype.toString;
var feature;
var server_attributes = [];
var TempId = '';

// define toolbar options
var options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: false, // adds button to draw markers
    cutPolygon: false, // adds button to cut a hole in a polygon
    drawRectangle: false, // adds button to draw a rectangle


    drawPolyline: true, // adds button to draw a polyline
    drawPolygon: true, // adds button to draw a polygon
    drawCircle: true, // adds button to draw a cricle
    drawCircleMarker: false, // adds button to draw a circle Marker

    editMode: false, // adds button to toggle edit mode for all layers
    dragMode: true, // adds button to toggle drag mode for all layers
    removalMode: true // adds a button to remove layers
};

$(document).ready(function() {

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

    //maps    
    mymap = L.map('mapgeo', {
            projection: defaultProjection
        })
        .setView([0, -0], 2, { maxZoom: 13, minZoom: 8 });
    mapbox = sessionStorage.getItem('mapbox');

    doEditGeoFences(null);


    var osm = L.tileLayer('https://mt0.google.com/vt/lyrs=y,traffic&hl=pt_br&x={x}&y={y}&z={z}&s=Ga', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');

            img.src = sessionStorage.getItem('logomark');
            img.style.width = '90px';

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
    mymap.pm.enableDraw('Polygon', { finishOn: 'dblclick' });
    mymap.pm.disableDraw('Polygon');

    // listen to when a new layer is created

    mymap.on('pm:drawstart', function(e) {
        if (drawed == true) {
            drawed = false;
           clearMap(mymap);
           //console.log(e);
        }
    });



    mymap.on('pm:remove', function(e){
        
    });    

    mymap.on('pm:create', function(e) {
        
        var layer = e.layer;
        shape = e.shape; // the name of the shape being drawn (i.e. 'Circle')        

        // here you got the polygon points   
        var points = layer._latlngs;

        switch (shape) {

            case "Circle":

                var radius = layer.getRadius();
                var center = layer.getLatLng();

                area = 'CIRCLE (';
                area += center.lat + ' ' + center.lng + ', ';
                area += radius + ')';

                break;

            case "Polygon":

                area = 'POLYGON((';
                for (i = 0; i < points[0].length; i += 1) {
                    area += points[0][i].lat + ' ' + points[0][i].lng + ', ';
                }
                area = area.substring(0, area.length - 2) + '))';

                break;

            case "Line":

                area = 'LINESTRING (';
                for (i = 0; i < points.length; i += 1) {
                    area += points[i].lat + ' ' + points[i].lng + ', ';
                }
                area = area.substring(0, area.length - 2) + ')';

                break;

        }


        layer.on('pm:dragend', function(e){
               
            points = e.target._latlngs;

            switch (shape) {

            case "Circle":

                var radius = e.target._mRadius;
                var center = e.target._latlng;

                area = 'CIRCLE (';
                area += center.lat + ' ' + center.lng + ', ';
                area += radius + ')';

                break;

            case "Polygon":

                area = 'POLYGON((';
                for (i = 0; i < points[0].length; i += 1) {
                    area += points[0][i].lat + ' ' + points[0][i].lng + ', ';
                }
                area = area.substring(0, area.length - 2) + '))';

                break;

            case "Line":

                area = 'LINESTRING (';
                for (i = 0; i < points.length; i += 1) {
                    area += points[i].lat + ' ' + points[i].lng + ', ';
                }
                area = area.substring(0, area.length - 2) + ')';

                break;

            }

                   

        });
        
    });

    //Select2 
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
        clearMap(mymap);
    });

    $('a[name="lnkRefreshGrid"]').click(function() {
        refreshGridGeoFences();
    });

    $('button[name="btnClearMap"]').click(function() {
        clearMap(mymap);
    });

    $('#speedUnit').html(findSpeedUnit(sessionStorage.getItem('speedUnit')).title);

    refreshGridGeoFences();

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

                dataSet.push([value.id, value.name, value.description, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                responsive: true,
                dom: 'Blfrtip',
                colReorder: true,
                buttons: [
                
                /*
                {
                    extend: 'excelHtml5',
                    title: $.i18n("mnu_geofences"),
                    exportOptions: {
                        columns: [0, 1]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("mnu_geofences"),
                    customize: function(win) {
                        var header = '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';

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
                        columns: [0, 1]
                    }
                }
                */
                 { extend: 'pdfHtml5', enabled: false }
                ]
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
 

    var it_price = parseFloat($("#speedLimit").val() / 1.852000);
    var spe = it_price * 1;
    vel = $("#speedLimit").val()
    vel = vel / 1.852000
    var stringUno = vel;

    valores = JSON.stringify({
        id: (!$("#id").val() ? null : $("#id").val()),
        name: $("#name").val(),
        description: $("#description").val(),
        area: area,
        attributes: { speedLimit: Number(stringUno) }
    })


    $.ajax({
        type: (!$("#id").val() ? "POST" : "PUT"),
        url: sessionStorage.getItem('url') + "geofences/" + $("#id").val(),
        data: valores,
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
             mensaje = response.responseText;
            validacion = mensaje.split(" ");
            switch (response.status) {
                      case 400:
                    if(validacion[0] == "Unknown geometry type"){
                        doOpenAlertSucess("Tipo de Geo-cerca no conocida, intente de nuevo");
                    }else{
                        doOpenAlertError($.i18n("message_user_not_permission"));
                    }
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
            refreshGridGeoFences();

            setTimeout(function() {
                refreshGridGeoFences();
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
            confirmButtonText: "Si",
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
            clearMap(mymap);

            TempId = id;

            $.each(response, function(key, value) {

                if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));

                    $('input[name="name"]').val(value.name);

                    $('textarea[name="description"]').val(value.description);

                    speed = (parseFloat(value.attributes.speedLimit) * 1.852000)

                    $('input[name="speedLimit"]').val((speed == null ? "" : speed));

                }                        

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
                                
                                if (value.id == id) {

                                    polygon.on('pm:dragend', function(e){

                                        console.log(e);
                                           
                                        var points = e.target._latlngs;

                                        area = 'POLYGON((';
                                        for (i = 0; i < points[0].length; i += 1) {
                                            area += points[0][i].lat + ' ' + points[0][i].lng + ', ';
                                        }
                                        area = area.substring(0, area.length - 2) + '))';       

                                    });
                                    // zoom the map to the polygon
                                    mymap.fitBounds(polygon.getBounds());
                                    drawed = true;
                                }                        

                            }
                        }

                    } else if (value.area.lastIndexOf('CIRCLE', 0) === 0) {

                        var content = value.area.match(/\([^()]+\)/);

                        if (content !== null) {
                            var coordinates = content[0].match(/-?\d+\.?\d*/g);

                            if (coordinates !== null) {

                                var center = [Number(coordinates[0]), Number(coordinates[1])];
                                var circle = L.circle(center, { radius: Number(coordinates[2]) }).addTo(mymap);
                                
                                if (value.id == id) {

                                    circle.on('pm:dragend', function(e){
                                        var radius = e.target._mRadius;
                                        var center = e.target._latlng;

                                        area = 'CIRCLE (';
                                        area += center.lat + ' ' + center.lng + ', ';
                                        area += radius + ')';
                                        console.log(e);
                                    });

                                    mymap.fitBounds(circle.getBounds());
                                    drawed = true;
                                }                               

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
                                
                                if (value.id == id) {

                                    polyline.on('pm:dragend', function(e){
                                        var points = e.target._latlngs;
                                        area = 'LINESTRING (';
                                        for (i = 0; i < points.length; i += 1) {
                                            area += points[i].lat + ' ' + points[i].lng + ', ';
                                        }
                                        area = area.substring(0, area.length - 2) + ')';
                                    });
                                    // zoom the map to the polyline
                                    mymap.fitBounds(polyline.getBounds());
                                    drawed = true;
                                }
                                
                                

                            }

                        }

                    //console.log(value.id);
                    
                    server_attributes = value.attributes;

                }



            });
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

            $('#pane_form').click();


        }

    });

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

function clearMapOneControl(m,id) {
    for (i in m._layers) {
        if (m._layers[i].id == id) {
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

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
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



function localFormClear() {
    doFormClear();

    $("#name").select2("val", "");
    $("#description").select2("val", "");
    $("#speedLimit").select2("val", "");
    $("#protocol").select2("val", "");
 
}