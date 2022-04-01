var dataSet = [];
var ulSpeed = new ySpeed();

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
                confirmButtonText: $.i18n("title_yes"),
                cancelButtonText: $.i18n("title_no"),
                closeOnConfirm: false
            },
            function () {
                doPrepareRoutes();
            });
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });
         
    getDevicesRoutes();

    getGroups();       

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function doPrepareRoutes() {
	
	doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));

    var form = $("#form_report").serializeObject();    	    
    var params = "type=allEvents&";				
        
    //prepare list devices
    var deviceIds = $('#deviceId option:selected');    
    $(deviceIds).each(function(index, deviceId){
        if($(this).val() != "") {
            params += "deviceId="+$(this).val()+"&";
        }
    });

    //prepare list groups
	var groups = $('#groupId option:selected');    
    $(groups).each(function(index, group){
        if($(this).val() != "") {
            params += "groupId="+$(this).val()+"&";
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
                //dataSet.push([findDevice(value.deviceId).name, value.valid, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.latitude, value.longitude, convertSpeed(value.speed, 'knots'),value.type, degToCompass(value.course), value.address]);                
                var attributes = ("alarm" in value.attributes?value.attributes.alarm:'');                          
                dataSet.push([findDevice(value.deviceId).name, $.i18n("valid_"+value.valid), moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.latitude, value.longitude, convertSpeed(value.speed, 'knots'),$.i18n("alarm_events_"+attributes), degToCompass(value.course), value.address]);
            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                responsive: true,
                colReorder: true,
                dom: 'Blfrtip',
		        buttons: [{
                
                //{extend: 'excelHtml5',
			              // title: $.i18n("title_reports_events")
			              //}
                          
                           extend: 'pdfHtml5',
                            title: $.i18n("title_reports_routes"),
                            className: 'expPDF',                    
                            customize: function(doc) {
                            doc['pageMargins'] = [10, 70, 10, 10];
                            //doc.pageMargins = [10,10,10,10];
                            doc['header'] = (function (page, pages) {
                                                        return {
                                                            columns: [
                                                               {
                                                                    //Milipol
                                                                    /*
                                                                    margin: [-530,10,0,0],
                                                                    alignment: 'right',  
                                                                    image: 'data:image/jpeg;base64,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',
                                                                    width: 50,
                                                                    height: 50
                                                                    */
                                                                        //Tecknicos
                                                                    
                                                                    alignment: 'right',
                                                                    margin: [-420,10,0,0],
                                                                    image: 'data:image/jpeg;base64,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',                                                                    
                                                                    width: 160,
                                                                    height: 50
                                                                  }, {
                                                                    margin: [-10,10],
                                                                    alignment: 'left',
                                                                    text: hoyFecha(),
                                                                    fontSize: 10,
                                                                    }
                                                            ]
                                                        }
                                             
                                                    });

                                
                                                       
                                doc.content.splice(0, 0,                          
                                  {
                                    alignment: 'left',
                                    text: 'Reporte de rutas ',
                                    fontSize: 25
                                  },
                                  {
                                    alignment: 'left',
                                    text: $.i18n('title_period') + ':' + $("#from").val() + " Hasta " + $("#to").val(),
                                    fontSize: 10
                                  },
                                  
                                  {
                                    alignment: 'left',
                                    text: '\n\n',
                                    fontSize: 10
                                  });

                               /* doc.content.push(
                                {   
                                    margin: [1,1,1,1],
                                    alignment: 'center',
                                    image: imageData
                                   
                                 
                                    
                                }
                               );*/
                            }
                        },{
                            extend: 'print',
                            text: $.i18n('button_print'), 
                            title:  $.i18n("title_reports_routes"),
                            customize: function ( win ) {
                                var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+
                                            '<img src="'+sessionStorage.getItem('logomark')+'" style="position:absolute; top:0; right:0;" />';
                                           

                                $(win.document.body)
                                    .css( 'font-size', '10pt' )
                                    .css( 'background-color', '#fff' )
                                    .prepend(
                                        header
                                    );
             
                                $(win.document.body).find( 'table' )
                                    .addClass( 'compact' )
                                    .css( 'font-size', 'inherit' );
                            }
                        }
		        ]
            }); 
            
            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_message_generated"), 1500);

        }

    });


}

/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesRoutes() {
	
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
			devices.splice(0);
			
			$.each( response, function( key, value ) {  				
				insertOption("deviceId", value.id, value.name);
				
				devices.push({deviceId : value.id,
							  name     : value.name,
							  category : value.category,
        	                  type: value.type,
							  typeName: findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name,
							  uniqueId : value.uniqueId});
			});
						
		}
	});	    
	
}

function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#groupId").select2("val", "");    

    if (dataSet.length > 0) { $('.datatable-js').dataTable().fnDestroy(); }

    dataSet.splice(0);    

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: [],
        dom: 'Bfrtip',
        buttons: []
    }); 
 
        
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