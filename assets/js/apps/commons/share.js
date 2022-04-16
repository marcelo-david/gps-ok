var dataSet = [];

$(document).ready(function () {	
	
	/**
	 * Check status of session of user
	 */
	checkSession();
	
	checkPermission();
	
    /** 
    *initial parameters
    */

    loadSwitchery();

    
    $('.datatable-js').dataTable({
        columnDefs: []
    });

    localFormClear();

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
            email: {
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

    $('button[name="btnPrepareSave"]').click(function () {
        if ($('#form_data').valid()) { doPrepareSave(); };
    });
    
    $('button[name="btnDelete"]').click(function () {
        if ($('#form_data').valid()) { doPrepareDeleteShare(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });    
    
    getDevicesShare();
    
    getUsersShare();
});


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

   function doPrepareSave() {    
        var res = findUserByEmail($("#email").val());                    					
        if (res.length > 0) {
            doSaveShare(res[0]["userId"]);            
        } else {
            doOpenAlertError($.i18n("message_error_user_not_found"));
        }
    
   }


function doSaveShare(userId) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var obj = $("#form_data").serializeObject();
    
    var pars = new Object();        
        pars.userId = userId;
        pars.deviceId = obj.deviceId;        
												
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

            setTimeout(function () {            	            	
            	
            //	$("#userIdFind").select2("val", userId);
             //   listDevicesUsers(userId);
            }, 1500);

        }

    });

}


/**
    * Apaga registro da tabela
    * 
    * param id Integer
    * 
    * @return void
    */

   function doPrepareDeleteShare() {    
    var res = findUserByEmail($("#email").val());                    					
    if (res.length > 0) {
        doDeleteShare($("#deviceId").val(), res[0]["userId"]);            
    } else {
        doOpenAlertError($.i18n("message_error_user_not_found"));
    }

}

function doDeleteShare(deviceId, userId) {

    swal({
        title: $.i18n("title_confirm_delete"),
        text: $.i18n("title_message_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        closeOnConfirm: false
    },
    function () {

        doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));
        
        var params = new Object();
       		params.userId = userId;
       		params.deviceId = deviceId;       		    	

        $.ajax({
            type: "DELETE",
            url : sessionStorage.getItem('url') + "permissions",
			data:JSON.stringify(params),
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

          	  doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);

          	  //listDevicesUsers(userId);

            }

        });
    });

}

/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesShare() {
	
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
			
			$.each( response, function( key, value ) {  				
				insertOption("deviceId", value.id, value.name);  			
			});
						
		}
	});	    
	
}


/**
 * Carrega lista dos usuarios
 * 
 * 
 * @return void
 */

function getUsersShare() {
	
	$.ajax({
		type : "get",
		url : sessionStorage.getItem('url') + "users/",		
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
            
            users.splice(0);
			limpaSelect("userIdFind");
			
			$.each(response, function (key, value) {
				
				users.push({userId  : value.id,
                            name    : value.name,
                            email   : value.email});
			
				//insertOption("userIdFind", value.id, value.name);
            });                    
						
		}
	});	    
	
}

function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");    
    $("#userIdFind").select2("val", "");
    
    dataSet.splice(0);
    
    $('.datatable-js').dataTable().fnDestroy();

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: []
    });
    
}