var dataSet = [];
var names = [];
var deviceIdTemp;
var char;
let imageData;
var imag; 

$(document).ready(function () {

	/**
	 * Check status of session of user
	 */
	checkSession();
	
    localFormClear();

    loadSwitchery();

    /**
     * parameters this page
     */

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1,
        //lang : (sessionStorage.getItem('language')=='br'?'pt-BR':sessionStorage.getItem('language'))
        lang : (sessionStorage.getItem('language')=='en'?'en':sessionStorage.getItem('language'))
    });

	
    $('#form_report').validate({
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
            type: {
                required: true
            },
            from: {
                required: true
            },
            to: {
                required: true
            }
        },
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        validClass: "validation-valid-label",

        invalidHandler: function (event, validator) { //display error alert on form submit   
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
            // e.addClass("validation-valid-label").text("Sucesso.");
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
                // Input group, styled file input
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
        if ($('#form_report').valid()) { 
        	
        	swal({
                title: $.i18n("title_generate_report"),
                text: "",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-info",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false
            },
            function () {
                doPrepareEvents();
            });
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });
         
    getDevicesEvents();

    getGroups();
    
    getGeofences();

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function doPrepareEvents() {
		
	doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));

    var form = $("#form_report").serializeObject();    	    
    var params = "";
    var tempDeviceId = [];				
        
    //prepare list devices
    var deviceIds = $('#deviceId option:selected');    
    $(deviceIds).each(function(index, deviceId){
        if ($(this).val() != "") {
            params += "deviceId="+$(this).val()+"&";
            tempDeviceId.push($(this).val());
        }        
    });

    //prepare list groups
	var groups = $('#groupId option:selected');    
    $(groups).each(function(index, group){
        if ($(this).val() != "") {
            params += "groupId="+$(this).val()+"&";
        }
    });
			
	//prepare list type events
	var types = $('#type option:selected');    
    $(types).each(function(index, type){
        if ($(this).val() != "") {
            params += "type="+$(this).val()+"&";
        }
    });
			 	
	var data_ini = moment(form.from, "DD/MM/YYYY hh:mm:ss");
    var data_end = moment(form.to, "DD/MM/YYYY hh:mm:ss");
    
	params += "from="+data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&"; 
   	params += "to="+data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";    		   	
   	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "reports/events",
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
            let resultDeviceId = removeDuplicates(response,"deviceId");
            
            $.each(resultDeviceId, function(it,val){
                if (typeof val.deviceId != 'undefined') {
                    // Javascript sourced data
                    console.log(response);
                    dataSet.splice(0);   
                    names.splice(0);
                    $.ajax({
                        type : "get",
                        url : sessionStorage.getItem('url') + "drivers?deviceId="+val.deviceId,
                        //data:params,    
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
                        success: function (resp) {
                            var divresObj = resp;

                            $.ajax({
                                type : "get",
                                url : sessionStorage.getItem('url') + "maintenance?deviceId="+val.deviceId,
                                //data:params,    
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
                                success: function (respMain) {
                                    
                                    $.each(response, function (key, value) {

                                        var attributes = ("alarm" in value.attributes?value.attributes.alarm:'');
                                        var deviceIdTemp = findDevice(value.deviceId).name;
                                        if (value.type == "driverChanged") {
                                            var driversID = findDriversId(divresObj, value.attributes.driverUniqueId);
                                        }

                                        if (value.type == "maintenance") {
                                            var maintenanceID = findMantenanceId(respMain, value.maintenanceId);
                                        }

                                        if (driversID && value.type == "driverChanged") {
                                            dataSet.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), deviceIdTemp, findEventType(value.type).name, $.i18n("alarm_events_"+attributes), (value.geofenceId>0?findGeofence(value.geofenceId).name:""),(driversID.name != null ? driversID.name:value.attributes.driverUniqueId), (driversID.uniqueId != null ? driversID.uniqueId:value.attributes.driverUniqueId), null]);
                                        }else if(maintenanceID && value.type == "maintenance"){
                                            dataSet.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), deviceIdTemp, findEventType(value.type).name, $.i18n("alarm_events_"+attributes), (value.geofenceId>0?findGeofence(value.geofenceId).name:""),null, null, (maintenanceID.name != null ? maintenanceID.name:val.deviceId)]);
                                        } else {
                                            dataSet.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), deviceIdTemp, findEventType(value.type).name, $.i18n("alarm_events_"+attributes), (value.geofenceId>0?findGeofence(value.geofenceId).name:""),null, null, null]);
                                        }
                                                          
                                                                            

                                        if (names.indexOf(findEventType(value.type).name) == -1) {
                                            names.push(findEventType(value.type).name);
                                            //marcadores.push();                                                     
                                        }   
                                                
                            
                                    });
                            
                                    
                                }
                            });

                            // var attributes = ("attributes" in value.attributes?value.attributes.attributes:'');
                     
                            // dataSet.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), findDevice(value.deviceId).name, findEventType(value.type).name, attributes, (value.geofenceId>0?findGeofence(value.geofenceId).name:"")]);
                    
                            
                        }
                    });
                }
            });

            setTimeout(function(){
                grafica(names, deviceIdTemp);                        

                            $('.datatable-js').dataTable().fnDestroy();

                            $('.datatable-js').dataTable({
                                data: dataSet,
                                columnDefs: [],
                                responsive: true,
                                dom: 'Blfrtip',
                                colReorder: true,
                                buttons: [{
                                
                                //{extend: 'excelHtml5',
                                          // title: $.i18n("title_reports_events")
                                          //}
                                          
                                           extend: 'pdfHtml5',
                                            title: $.i18n("title_reports_events"),
                                            className: 'expPDF',                    
                                            customize: function(doc) {
                                            doc['pageMargins'] = [10, 70, 10, 10];
                                            //doc.pageMargins = [10,10,10,10];
                                            doc['header'] = (function (page, pages) {
                                                                        return {
                                                                            columns: [
                                                                               {
                                                                                    margin: [-530,10,0,0],
                                                                                    alignment: 'right',
                                                                                    image: 'data:image/jpeg;base64,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',
                                                                                    width: 50,
                                                                                    height: 50
                                                                                  }, {
                                                                                    margin: [-10,10],
                                                                                    alignment: 'left',
                                                                                    text: hoyFecha(),
                                                                                    fontSize: 10,
                                                                                    },
                                                                                    {
                                                                                    margin: 10,
                                                                                    alignment: 'left',
                                                                                    text: 'Reporte de eventos y alarmas',
                                                                                    fontSize: 10,
                                                                                    }
                                                                            ]
                                                                        }
                                                             
                                                                    });

                                                
                                                                       
                                                doc.content.splice(0, 0,                          
                                                  {
                                                    alignment: 'left',
                                                    text: 'Reporte eventos y alarmas',
                                                    fontSize: 25
                                                  },
                                                  {
                                                    alignment: 'left',
                                                    text: $.i18n('title_period') + ':' + $("#from").val() + " => " + $("#to").val(),
                                                    fontSize: 10
                                                  },
                                                  {
                                                    alignment: 'left',
                                                    text: '\n\n',
                                                    fontSize: 10
                                                  });

                                                doc.content.push(
                                                {   
                                                    margin: [1,15,1,1],
                                                    alignment: 'center',
                                                    image: imageData
                                                   
                                                                                     
                                                    
                                                }
                                               );
                                            }
                                        }
                                       // ,{
                                       //     extend: 'excelHtml5',
                                       //     title:  $.i18n("title_reports_mobileye") + "",
                                       //     className: 'expEXC',
                                       //     customize: function(xlsx){
                                       //         var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                       //         $('c[r=A1] t', sheet).text('Reporte Eventos Mobileye');
                                       //     }
                                       //  }
                                        ,{
                                            extend: 'print',
                                            text: $.i18n('button_print'), 
                                            title:  $.i18n("title_reports_events"),
                                            customize: function ( win ) {
                                                var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+
                                                            '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';

                                                $(win.document.body)
                                                    .css( 'font-size', '10pt' )
                                                    .css( 'background-color', '#fff' )
                                                    .prepend(
                                                        header
                                                    );
                             
                                                $(win.document.body).find( 'table' )
                                                    .addClass( 'compact' )
                                                    .css( 'font-size', 'inherit' );
                                                    
                                                       $(win.document.body)
                                                    .append(                                
                                                        '<img src="'+imageData+'" style="position:static; right: 0%; width: 100%; height:90%; " />'
                                                    );                                                                         
                                            }
                                        }
                                ]
                            }); 
                                        
                            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_message_generated"), 1500);
                        },4000);
            
            
        }
    });
}



/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesEvents() {
	
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
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
		success: function (response) {
			
			limpaSelect("deviceId");
			devices.splice(0);
			
			$.each( response, function( key, value ) {  				
				insertOption("deviceId", value.id, value.name);
				
				devices.push({deviceId : value.id,
							  name     : value.name,
							  category : value.category,
							  uniqueId : value.uniqueId});
			});
						
		}
	});	    
	
}


function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#groupId").select2("val", "");
    $("#type").select2("val", "");
 
    if (dataSet.length > 0) { $('.datatable-js').dataTable().fnDestroy(); }

    dataSet.splice(0);    

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: [],
        dom: 'Bfrtip',
        buttons: []
    }); 
 
}


function grafica(nombres, namDevice){
 
    var contador = 0;
    var items = [];

    $.each(nombres, function(key, val) {
             
        $.each(dataSet, function(key2, value) {
            if (value.indexOf(val) != -1) {
                contador++;              
            }

            if (key2 == dataSet.length - 1) {
                
                items.push({
                    name: val,
                    y: contador,
                    drilldown: val
                });

                contador = 0;

            }        
        });       
        
    });

    var options = {
        chart: {
            //type: 'column'
            type: 'column'            
        },
        title: {
            text: 'Reporte de eventos y alarmas'
        },
        subtitle: {
            text: 'Listado de eventos y alarmas completa'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Conteos totales de eventos'
            }

        },
        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    //Formato ejemplo 42.0 con decimal
                    //format: '{point.y:.1f}'
                    format: '{point.y:1f}'
                    
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:8px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:1f}</b><br/>'
        },

        series: [
            {
                name: "Eventos",
                colorByPoint: true,
                data: items
            }
        ]
    };

    char = Highcharts.chart('container', options);

    var data = {
        options: JSON.stringify(options),
        filename: 'test.png',
        type: 'image/png',
        async: true
    };

    var exportUrl = 'https://export.highcharts.com/';
    $.post(exportUrl, data, function(data) {
        var imageUrl = exportUrl + data;
        var urlCreator = window.URL || window.webkitURL;
        toDataURL(imageUrl, function(dataUrl) {            
        imageData = dataUrl;
    });
        //console.log(imageUrl);
        fetch(imageUrl).then(response => response.blob()).then(data => {console.log(data)});
    });
}



function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function hoyFecha(){
    var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
        dd = addZero(dd);
        mm = addZero(mm);
 
        return dd+'/'+mm+'/'+yyyy;
}


function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}


function findDriversId(driversTemp, uniqueId) {
    return _.find(driversTemp, function (obj) {
        //console.log(dump(obj));
        return obj.uniqueId == uniqueId;
    }) || {};
}

function findMantenanceId(maintenanceTemp, Id) {
    return _.find(maintenanceTemp, function (obj) {
        //console.log(dump(obj));
        return obj.id == Id;
    }) || {};
}

function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};

        for(var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }

        return newArray;
    }