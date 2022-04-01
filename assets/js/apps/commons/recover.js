var language 		= "en";
var profile_photo 	= "assets/img/user.png";
var admin   		= false;
var ip  			= 'http://178.128.107.147:8082';

$(document).ready(function() {
	
	$('#form_data').validate({
        errorElement: 'span',        
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {
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

    $('button[name="btnRecover"]').click(function () {
        if ($('#form_data').valid()) { doRecover(); };
    });
    
    $('button[name="btnBack"]').click(function () {
        $(location).attr('href', 'login.php');
    });    
    
    $.getJSON("http://jsonip.com/?callback=?", function (data) {        
        ip = data.ip;
    });

    $("#password").generatePassword({numeroCaracteres:6,
    								 showPasswordInAlertBox:false,
    								 showPasswordAfterInputPassword:false
    								}
    								);
});


function getRecoveryMessage(pars) {
	
	var str = pars.password;
	
	
	var html  = "<html>";		
		html += "<body>";
		 	    
        html += '<table dir="ltr">';
        html += '<tbody>';
        html += '<tr><td><img src="assets/img/logo.png"  style="width:175px; height:45px" /></td></tr>';
        html += '<tr><td style="padding:0;font-family:\'Segoe UI Light\',\'Segoe UI\',\'Helvetica Neue Medium\',Arial,sans-serif;font-size:41px;color:#707070">'+$.i18n("title_account")+' '+sessionStorage.getItem("provider_name")+'</td></tr>';
        html += '<tr><td style="padding:0;font-family:\'Segoe UI Light\',\'Segoe UI\',\'Helvetica Neue Medium\',Arial,sans-serif;font-size:17px;color:#2672ec">'+$.i18n("title_password_changed")+'</td></tr>';
        html += '<tr><td style="padding:0; padding-top:25px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_password_changed_for")+' <a dir="ltr" style="color:#2672ec;text-decoration:none" href="#" >'+str+'</a> </td></tr>';
        html += '<tr><td style="padding:0; padding-top:25px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_user_change")+'</td></tr>';
        html += '<tr><td style="padding:0; padding-top:25px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_security_info")+'</td></tr>';
        html += '<tr><td style="padding:0; padding-top:6px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_date_time")+': '+ moment().format('DD/MM/YYYY - hh:mm:ss') +' (GMT)</td></tr>';
//        html += '<tr><td class="size2">País/região: Brazil</td></tr>
		html += '<tr><td style="padding:0; padding-top:6px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_plataform")+': '+OSName+'</td></tr>';
        html += '<tr><td style="padding:0; padding-top:6px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_browser")+': '+navigator.userAgent.toLowerCase()+'</td></tr>';
        html += '<tr><td style="padding:0; padding-top:6px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_address_ip")+': '+ip+'<br /><br /></td></tr>';        
        html += '<tr><td style="padding:0; padding-top:6px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,san$this->users-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_not_user_changed")+' <br /><br /></td></tr>';
        
        html += '<tr><td style="padding:0; padding-top:25px; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_thankyou")+',</td></tr>';
        html += '<tr><td style="padding:0; font-family:\'Segoe UI\',Tahoma,Verdana,Arial,sans-serif; font-size:14px; color:#2a2a2a;">'+$.i18n("title_equip")+' '+sessionStorage.getItem("provider_name")+'</td></tr>';
        html += '</tbody></table></body></html>';           
			
	return html;
}


/**
 * Recuperar senha do usuario
 *
 *
 * @return void
 */

function doRecover() {

	doOpenAlertWait($.i18n("message_new_pw_generate"));

	var pars = $("#form_data").serializeObject();	
		//pars.from 	   = "notificaciones.tecknicos@gmail.com");
        pars.from = sessionStorage.getItem("smtp_username");
		pars.from_name = ("Recuperacion de cuenta Tecking GPS");
				
		pars.to	 	   = pars.email;
		pars.subject   = '['+sessionStorage.getItem("provider_name")+'] '+$.i18n("message_password_recovery");
		
		pars.body	   = getRecoveryMessage(pars);		
		
    pars.smtp_server = sessionStorage.getItem("smtp_server");
		pars.smtp_auth = sessionStorage.getItem("smtp_auth");
		pars.smtp_username = sessionStorage.getItem("smtp_username");
		pars.smtp_password = sessionStorage.getItem("smtp_password"); 
		pars.smtp_ssl = sessionStorage.getItem("smtp_ssl");
        pars.smtp_port = sessionStorage.getItem("smtp_port");
		
	$.ajax({
		type : "POST",
		url : "assets/apps/commons/send_email.php",
		data:pars,
		//contentType: "application/json", somente para POST
		cache: false,		
		error: function (response) {		
			switch(response.status) {							
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
		success: function (response, status, jXHR) {			
			
			if (response.indexOf("Success:") >= 0) {								
				doChangePassword(pars.password);							
			} else {
				doOpenAlertError($.i18n("message_error_performing"));
			}		    			

		}
	});

}


/**
 * localizar id do usuario
 *
 *
 * @return void
 */

function doChangePassword(pass) {
	
	var pars = new Object();	
		pars.option    = "check";
		pars.email 	   = $("#email").val();		
		
	$.ajax({
		type : "GET",
		url : "assets/apps/commons/recover.php",		
		cache: false,		
		data:pars,
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('user_admin')+":"+sessionStorage.getItem('pass_admin'))
        },
		error: function (response) {						
			doOpenAlertError($.i18n("message_error_performing"));								
		},
		success: function (response) {
							
			if (response.indexOf("OK") >= 0) {					
				doUpdatePassword($("#email").val(),pass);
			} else {
				doOpenAlertError($.i18n("message_user_no_matching"));
			}											
		}
	});	    
	
}

/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doUpdatePassword(email, pass) {

	var pars = new Object();	
		pars.option    = "save";
		pars.email 	   = email;						   
		pars.pass 	   = pass;
		
    $.ajax({
        type : "POST",
		url : "assets/apps/commons/recover.php",
		data:pars,
		cache: false,					
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('user_admin')+":"+sessionStorage.getItem('pass_admin'))
        },
		error: function (response) {					
			doOpenAlertError($.i18n("message_error_performing"));
		},
        success: function (response) {
            doOpenAlertSucess($.i18n("title_success"), $.i18n("message_new_pw_created"), 4000);
        }

    });

}
