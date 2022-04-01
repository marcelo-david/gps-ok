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
            name: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true
            },
            'terms': {
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

    $('button[name="btnSave"]').click(function () {
        if ($('#form_data').valid()) { 
        	
        	 if (($("input[name*='terms']:checked").length)<=0) {
        		alert("Accept Terms Agree");
    		 } else {
        		doRegister();
    		 }
        };
    });
    
    $('button[name="btnBack"]').click(function () {
        $(location).attr('href', 'login.php');
    });    
    
    loadEula();

});

/**
 * Registra o usuario no sistema
 *
 *
 * @return void
 */

function doRegister() {

    doOpenAlertWait('Aguarde...', 'Registrando Usuário!');

    var pars = $("#form_data").serializeObject();				
		delete pars.terms;
							
    $.ajax({
        type : "POST",
		url : sessionStorage.getItem('url') + "users/",
		data:JSON.stringify(pars),
		contentType: 'application/json', 
		cache: false,					
		headers: {
			"Authorization": "Basic " + btoa(sessionStorage.getItem('user_admin')+":"+sessionStorage.getItem('pass_admin'))
		},
		error: function (response) {					
			switch(response.status) {			
				case 400:
					doOpenAlertError('Usuário já cadastrado no sistema.');
					break;
				case 401:
					doOpenAlertError('Usuário não autorizado.');
					break;	
			 	default:
					doOpenAlertError('Erro ao realizar operação!\n Contacte o suporte técnico.\n Erro:'+response.statusText);
					break;
			}
		},
        success: function (response) {

        	swal({
		        title: 'Sucesso!',
		        text: 'Usuário Registrado com Sucesso',
		        confirmButtonColor: "#66BB6A",
		        type: "success",		        
		        html: true,
		        closeOnConfirm: false
		    },
			function(){			  
			  $(location).attr('href', "login.php");
			});
		    
        }

    });

}					

function loadEula() {

	$.ajax({        
        async: false,
        type: 'get',
		url : "eula.txt",		
		dataType: "html",
		error: function (response) {								
		},	
		success: function (response) {			
		    $("#eula").html(response);
        }
    });    
    
}