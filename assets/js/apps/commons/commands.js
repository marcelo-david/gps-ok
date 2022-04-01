var dataSet = [];
var ulSpeed = new ySpeed();

$(document).ready(function () {

	/**
	 * Check status of session of user
	 */
	checkSession();
	
	checkPermission();	
	
    localFormClear();
    
    loadSwitchery();
    
    $('.datatable-js').dataTable({
        columnDefs: []
    });

    /**
     * parameters this page
     */   

	
    $('#form_data').validate({
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

    $('button[name="btnSend"]').click(function () {
        if ($('#form_data').valid()) { 
        	
        	swal({
                title: $.i18n("title_send_command"),
                text: "",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-info",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false
            },
            function () {
                doSendCommands();
            });
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function () {
        refreshGridCommands();
    });
         
    getDevicesCommands();
    
    $("#deviceId").select2().on("change", function (e) {       
    	limpaSelect("type");			
        getCommandTypes(e.val); 
    });                
    
    $("#type").select2().on("change", function (e) {                      
        if(e.val == "custom") {
        	$("#custom_command").show();
        } else {
        	$("#custom_command").hide();
        }
    });
        
});


/**
    * Carrega listagem de dados
    *
    * @return void
    */

function refreshGridCommands() {
    	   
    var params = "";				
        
    //prepare list devices       
	$.each(devices, function (key, value) {		
		params += "deviceId="+value.deviceId+"&";						
	});		
					
	params += "type=commandResult&";						
		 	
	params += "from="+moment("01/01/2000 00:00:00", "DD/MM/YYYY hh:mm:ss").format().substr(0, 19) + ".000Z&"; 
   	params += "to="+moment().format().substr(0, 19) + ".000Z";    		   	
   	
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

            // Javascript sourced data
            dataSet.splice(0);            

            $.each(response, function (key, value) {
                dataSet.push([moment(value.serverTime).format('YYYY-MM-DD HH:mm:ss'), findDevice(value.deviceId).name,  value.attributes.result]);
            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
				columnDefs: [],
                dom: 'Blfrtip',
                responsive: true,
				colReorder: true,
		        buttons: [{extend: 'excelHtml5',
						   title: $.i18n("title_reports_commands"),
						   exportOptions: {
							columns: [0, 1, 2]
						   }
			              },{
                            extend: 'print',
                            text: $.i18n('button_print'), 
                            title:  $.i18n("title_reports_commands"),
                            customize: function ( win ) {
                                var header = '<img src="https://tecknicos.com.mx/plataforma/assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

                                $(win.document.body)
                                    .css( 'font-size', '10pt' )
                                    .css( 'background-color', '#fff' )
                                    .prepend(
                                        header
                                    );
             
                                $(win.document.body).find( 'table' )
                                    .addClass( 'compact' )
                                    .css( 'font-size', 'inherit' );
                            },
							exportOptions: {
							 columns: [0, 1, 2]
							}
                        }
		        ]
            }); 
            
        }

    });


}
/**
 * envia comando para equipamento
 *
 * @return void
 */

function doSendCommands() {
		
	doOpenAlertWait($.i18n("title_wait"), $.i18n("title_sending_command"));

    var params = $("#form_data").serializeObject();    	    
    	
    if (params.type == "custom") {
    	params.attributes = {data:params.custom};    	
    } 
    
    delete params.custom;                   
   
	$.ajax({
		type : "POST",
		url : sessionStorage.getItem('url') + "commands/send",
		data:JSON.stringify(params),
		contentType: "application/json",									
		cache: false,		
		headers: {		
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')),
        	"Accept":"application/json"        	                	
        },
		error: function (response) {		
			switch(response.status) {			
				case 400:
												
					doOpenAlertInfo((/Device is not online/i.test(response.responseText))?$.i18n("message_device_not_online"):$.i18n("message_user_not_permission"));
					break;
				case 401:
					doOpenAlertInfo($.i18n("message_user_unauthorized"));
					break;	
				case 404:
					doOpenAlertInfo($.i18n("message_user_no_matching"));
					break;			
				case 405:
					doOpenAlertInfo($.i18n("message_method_not_allowed"));
					break;					
			 	default:
					doOpenAlertInfo($.i18n("message_error_performing"));
					break;
			}
		},
        success: function (response) {
            
            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sent_command"), 1500);
            
            setTimeout(function () {
                refreshGridCommands();
            }, 1500);

        }

    });

}

/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesCommands() {
	
	$.ajax({
		type : "GET",
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
							  uniqueId : value.uniqueId});
			});
			
			refreshGridCommands();
						
		}
	});	    
	
}

/**
 * Carrega lista dos comandos por esquipamento
 * 
 * 
 * @return void
 */

function getCommandTypes(id) {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "commands/types/",
		cache: false,	
		data:{deviceId:id},
        contentType: "application/json",	
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

			limpaSelect("type");
			
			$.each( response, function( key, value ) {  	
				insertOption("type", value.type,$.i18n("title_" + value.type));  			
			});
						
		}
	});	    
	
}


function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#type").select2("val", "");    
        
}