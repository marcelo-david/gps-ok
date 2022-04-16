var dataSet 		= [];
var language 		= "en";
var profile_photo 	= "assets/img/user.png";
var admin   		= false;
var tempName = "";
var tempEmail = "";
var photo;
var asPhoto = false;
var server_attributes = [];
var created_at 		= moment().format('YYYY-MM-DD HH:mm:ss');
var gasoline,
	alcohol,
	gnv,
	diesel;
	
$(document).ready(function () {

	/**
	 * Check status of session of user
	 */
	checkSession();
	
	checkPermission();	
    $('#URLoginV').hide();
    
    function creaCarpeta(id){//eliminamos la carpeta del manager de login
      var id = $('#id').val();
     $.ajax({
        type : "post",
        url : "provider/crea.php",
        data: {id: id},     
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
            console.log("carpeta creada");
                                   

        }                            
    });     
}

    var urlA = window.location.host;
    
     $("#preview_photo").prop("src", urlA = 'http://'+ urlA + '/index/provider/loginManager/'  + photo).css('height', '125px').css('width', '200px').css('float', 'left').css('height', '125px').css('width', '200px').css('float', 'left');

    $('#preview_photo').click(function() {
        $("#fileUpload").click();
    });

    $("#fileUpload").change(function() {

        //Para guardar la imagen
        var file_data = $('#fileUpload').prop('files')[0];

        //var diveceiId = $('#id').val();

        var fileExtension = ['jpg'];

        var ext = $(this).val().split('.');

        ext = ext[ext.length - 1].toLowerCase();

        if (fileExtension.lastIndexOf(ext) > -1) {

            var selectedFile = this.files[0];

            if (selectedFile.size > 150000000) {
                doOpenAlertError($.i18n("title_upload_photo_limit"));
            } else {

                doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

                var formData = new FormData();

                formData.append('option', 'profile');
                //formData.append('userid', diveceiId);
                 formData.append('userid','logo' );
                formData.append('prefix', prefixpath);
                formData.append('file', file_data);
                 //var urlA = window.location.host;
                              //var diveceiId = $('#id').val();
               
                            //$("#preview_photo").prop("src", urlA = 'http://'+ urlA + '/provider/loginManager/'  + photo).css('height', '125px').css('width', '200px').css('float', 'left');
                           

                $.ajax({
                    url: "assets/apps/commons/upload_provider.php",
                    type: 'POST',
                    data: formData,
                    success: function(data) {
                        alert(data)
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    xhr: function() { // Custom XMLHttpRequest
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                            myXhr.upload.addEventListener('progress', function() {
                                /* faz alguma coisa durante o progresso do upload */
                            }, false);
                        }
                        return myXhr;
                    },
                    success: function(response) {

                        if (response != 0) {
                            
                            creaCarpeta(id);
                            
                            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sended"), 1500);
 
                            photo = response;
                            console.log('response=' + response)
                            
                             var urlA = window.location.host;
                              //var diveceiId = $('#id').val();
               //Guarda la imagen en la carpeta loginManager
                            $("#preview_photo").prop("src", urlA = 'http://'+ urlA + '/index/provider/loginManager/'  + photo).css('height', '125px').css('width', '200px').css('float', 'left');
                           
                            asPhoto = true;
                        } else {
                            doOpenAlertError($.i18n("message_error_send"));
                        }
                        
                    }
                });
            }

        } else {
            doOpenAlertError($.i18n("message_file_invalid"));
        }


    });
	
    $("#deviceLimitField").hide();
    
    if (sessionStorage.getItem('admin')=="0") {
        $("#adminField").hide();
        $("#permissionField").hide();
        $("#expirationTim1").show();
          $("#revendedores").hide();
    }
    
    
        ///Funcion para saber si el usuario tiene fecha de expiracion cuando agrega usuarios
        switch(sessionStorage.getItem('expirationTime')) {
        case "null":
            console.log ("No tiene fecha");
            break;
        default:
            expira = (sessionStorage.getItem('expirationTime'));
            var expira1 = moment(expira).tz("Etc/GMT+0").format().substr(0, 10);
            doOpenAlertInfo($.i18n("account_expire_time") + expira1);
            console.log ("Tiene tiene fecha");
        }
  
	
    localFormClear();
    
   $("#register").select2().on("change", function (e) {
            if (e.val == "false" || sessionStorage.getItem('admin') == "0") {
            $('#adminField').show();   
            $('#URLoginV').hide();           
            } else {
                $('#adminField').hide();
                 $('#URLoginV').show();
                
            }
        });   
    
    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        clearButton: true,
        weekStart: 1,
        time: false,
        lang : (sessionStorage.getItem('language')=='es'?'es':sessionStorage.getItem('language'))
    });
    
    /** 
    *initial parameters
    */
	loadSwitchery();
    
    $('#provider').html(sessionStorage.getItem('userid'));
    $('#provider').val(sessionStorage.getItem('userid'));
    //data.id = sessionStorage.getItem('userid');	
    $('.datatable-js').dataTable({
        columnDefs: []
    });

    /**
        * parameters this page
        */
	
/**	$('[name="document"]').formatter({
	    'pattern': '{{99}}.{{999}}.{{9999}}/{{9999}}-{{99}}',
	    'persistent': true
	}); */
	
	$('[name="postal_code"]').formatter({
	    'pattern': '{{99}}.{{9999}}-{{999}}',
	    'persistent': false
	});
	

	
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
            administrator: {
                required: true
            },
            email: {
                required: true
            },
            password: {
                required: true
            },
            distanceUnit: {
                required: true
            },
            speedUnit: {
                required: true
            },
            zoom: {
                required: true
            },        
            perfil: {
                required: true
            },      
            disabled: {
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
        if ($('#form_data').valid()) { doSaveUsers(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function () {
        //doOpenAlertWait('Aguarde...', 'Carregando dados.');
        refreshGridUsers();
    });
    


    
        
    refreshGridUsers();    
        
});



        


/**
    * Carrega listagem de dados
    *
    * @return void
    */

function refreshGridUsers() {

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

            // Javascript sourced data
            dataSet.splice(0);            

            $.each(response, function (key, value) {

                var html = '<div class="btn-group">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doEditUsers(' + value.id + ')"><i class="icon-cogs"></i> '+$.i18n("title_edit")+'</a></li>';
                html += '    	<li><a href="javascript:doDeleteUsers(' + value.id + ')"><i class="icon-trash"></i>' +$.i18n("title_delete")+'</a></li>';
                html += '    </ul>';
                html += '</div>';

                var city = ('city' in value.attributes) ? value.attributes.city : "";                
                var state = ('state' in value.attributes) ? value.attributes.state : "";
                var perfil = ('perfil' in value.attributes) ? value.attributes.perfil : "";
                var expirationTime1 = (moment(value.expirationTime).format('DD-MM-YYYY') != "Invalid date" ? moment(value.expirationTime).format('DD-MM-YYYY'):"");
                //var expirationRemp 	= moment(pars.expirationTime).format('YYYY-MM-DDTHH:mm:ss.SSS');
                
                var register = (value.deviceLimit == -1) || (value.userLimit == -1)?"yes":"no";
                
                if (parseInt(sessionStorage.getItem('version')) < 317) {
                    if (value.admin == true) register = "yes";
                } else {
                    if (value.administrator == true) register = "yes";
                }
                
                
                dataSet.push([value.id, value.name, value.email, $.i18n("perfil_"+perfil) ,(value.disabled?$.i18n("title_yes"):$.i18n("title_no")), (register=="yes"?$.i18n("title_yes"):$.i18n("title_no")), expirationTime1, html]);
                
            });
            
            sessionStorage.setItem('clients', response);

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                dom: 'Blfrtip',
                colReorder: true,
                responsive: true,
                buttons: [
                /*
                {
                    extend: 'excelHtml5',
                    title: $.i18n("mnu_users"),
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("mnu_users"),
                    customize: function (win) {
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
                        columns: [0, 1, 2, 3, 4, 5, 6]
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

function doSaveUsers() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var pars = $("#form_data").serializeObject();
    //  console.log(img);
        tempName = pars.name;
        tempEmail = pars.email; 
		pars.id = (!$("#id").val()?null:$("#id").val());
        var TemparsId = pars.id;
        var expirationRemp = moment(pars.expirationTime).tz("Etc/GMT+0").format().substr(0, 19);
        var providerId = (sessionStorage.getItem('userid'));
        //var expirationRemp 	= moment(pars.expirationTime).format('YYYY-MM-DDTHH:mm:ss.SSS');	
		laphoto = "";
    if (asPhoto == true) {
        laphoto = photo;
    }
		pars.attributes = {master:false,
						   readonly:false,
						   admin:admin,						   
						   language: language,
						   profile_photo:profile_photo,
						   document:pars.document,
						   address:pars.address,
						   neighborhood:pars.neighborhood,
						   city:pars.city,
						   state:pars.state,
                           providerId:providerId,
						   postal_code:pars.postal_code,
						   //phone:pars.phone,						   
						   distanceUnit:$("#distanceUnit").val(),
                           speedUnit:$("#speedUnit").val(),
                           panel:$("#panel").val(),
                           perfil:$("#perfil").val(),
						   created_at: created_at,
						   gasoline:gasoline,
						   alcohol:alcohol,
						   gnv:gnv,
						   diesel:diesel,
                           photo: laphoto,
                           updated_at: moment().format('YYYY-MM-DD HH:mm:ss')};
        
        if (pars.register=="true") {
            if (sessionStorage.getItem('admin')=="1") { 
                pars.deviceLimit= -1;
                pars.userLimit= -1;
            } else {
                pars.deviceLimit= 0;
                pars.userLimit= 0;    
            }
        } else {
            pars.deviceLimit= 0;
            pars.userLimit= 0;
        }
                           
        pars.attributes = mergeAttributes(pars.attributes, server_attributes);                           

        if (sessionStorage.getItem('admin')=="0") {
            pars.administrator = false;            
        }

        var expirationRemp = (moment(pars.expirationTime).tz("Etc/GMT+0").format().substr(0, 19) != null ? moment(pars.expirationTime).tz("Etc/GMT+0").format().substr(0, 19):"");
        pars.expirationTime = expirationRemp; 
        if (pars.expirationTime == "Invalid date") {
            delete pars.expirationTime;
        } 
        
        
        if (parseInt(sessionStorage.getItem('version')) < 317) {
            pars.admin = pars.administrator;    
            delete pars.administrator;    
        }                
		delete pars.URLoginI;				   		
		delete pars.document;
		delete pars.address;
		delete pars.neighborhood;
		delete pars.city;
		delete pars.state;
		delete pars.postal_code;
		//delete pars.phone;
		delete pars.distanceUnit;		
        delete pars.speedUnit;
        delete pars.panel;
        delete pars.register;
         delete pars.perfil;
  
		
    $.ajax({
        type : (!$("#id").val()?"POST":"PUT"),
		url : sessionStorage.getItem('url') + "users/"+$("#id").val(),
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
            if (TemparsId != null && TemparsId != '') {
               //saveImgManager(TemparsId);
               tempName = "";
               tempEmail = "";  
            }else{
                 setTimeout(function () {
                doSend_Email_Register();
            }, 1500);

            }

            setTimeout(function () {
                  localFormClear();
                $('button[name="btnClear"]').click();
                refreshGridUsers();
            }, 1500);


        }

    });

}

function getRegisterMessage(name, pass, email) {
    
    
    var html  = "<html>";       
        html += "<body>";
                
        html += '<table style="width:100%;max-width:540px;background:#fff;border:1px solid #bbbbbb" cellspacing="16" cellpadding="0" align="center">';
        html += '<tbody>';
        html += '<tr><td><table cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr>';
        html += '<td style="vertical-align:top" valign="top" align="center"><img src="https://tecknicos.com.mx/plataforma/assets/img/logo.jpg" alt="Bienvenido" title="title text" style="max-height:200px" class="CToWUd"></td></tr></tbody></table>';
        html += '<table cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr><td>&nbsp;</td></tr>';
        html += '<tr><td style="vertical-align:top;font-family:&quot;MarkFont&quot;,&quot;Helvetica Neue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:16px;color:#4a4a4a" valign="top" align="center">Registro exitoso</td></tr></tbody></table><br/>';
        html += '<table cellspacing="0" cellpadding="0" border="0" align="center"><tbody><tr><td>&nbsp;</td></tr>';
        html += '<tr><td style="vertical-align:top" valign="top"><img src="https://tecknicos.com.mx/plataforma/assets/img/registro.png" alt="Registro exitoso" style="height:88px" class="CToWUd" height="88"></td></tr>';
        html += '<tr><td>&nbsp;</td></tr></tbody></table><table width="80%" cellspacing="0" cellpadding="0" border="0" align="center"><tbody>';
//        html += '<tr><td class="size2">País/região: Brazil</td></tr>
        html += '<tr><td style="vertical-align:top;font-family:&quot;MarkFont&quot;,&quot;Helvetica Neue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:12px;color:#4a4a4a" valign="top" align="center">Bienvenido '+name+', gracias por usar el servicio de Tracking GPS, datos de registro a continuaci<span class="il">ó</span>n:</td></tr></tbody></table>';
        html += '<table cellspacing="0" cellpadding="8" border="0" align="center"><tbody><tr><td style="vertical-align:top;font-family:&quot;MarkFont&quot;,&quot;Helvetica Neue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:12px;color:#333333" valign="top" align="center"><a style="color:#333333" >Usuario</a> | <a style="color:#333333" >'+name+'</a><a style="color:#333333" ><br />Correo electr<span class="il">ó</span>nico</a> | <a style="color:#333333" >'+email+'</a><a style="color:#333333" ><a style="color:#333333" ><br />Password</a> | <a style="color:#333333" >'+pass+'</a><a style="color:#333333" ></td></tr></tbody></table>';
        html += '<table cellspacing="0" cellpadding="8" border="0" align="center">';        
        html += '<tbody><tr><td style="vertical-align:top;font-family:&quot;MarkFont&quot;,&quot;Helvetica Nue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:12px;color:#333333" valign="top" align="center"> <a style="color:#333333" href="https://tecknicos.com.mx/plataforma" rel="noreferrer" target="_blank">Iniciar sesión</a></td></tr></tbody></table>';
        
        //html += '<table cellspacing="0" cellpadding="8" border="0" align="center">';
        //html += '<tbody><tr><td style="vertical-align:top;font-family:&quot;MarkFont&quot;,&quot;Helvetica Neue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:10px;color:#4a4a4a" valign="top" align="center">domingo, 15 de abril de 2018 08:49 a.m.</td></tr></tbody></table>';
        html += '<table style="width:100%" cellspacing="0" cellpadding="0" border="0" align="center">';
        html += '<tbody><tr><td>&nbsp;</td></tr><tr><td style="text-align:center;vertical-align:top;width:100%;font-family:&quot;MarkFont&quot;,&quot;Helvetica Neue&quot;,&quot;Lucida Grande&quot;,&quot;Lucida Sans Unicode&quot;,Arial,sans-serif;font-size:12px;color:#4a4a4a">Gracias por usar Tecknicos Track, tecnología a tu alcance.</td></tr><tr><td>&nbsp;</td></tr><tr><td style="text-align:center"><img src="https://tecknicos.com.mx/images/virtuemart/category/resized/todos.png" alt="" style="max-height:150px" class="CToWUd" height="50"></td></tr></tbody></table>'; 
        html += '</td></tr></tbody></table>';

        html += "</body>";
        html += "</html>";            
            
    return html;
}

function doSend_Email_Register(){

    var pars = $("#form_data").serializeObject();   
        pars.from      = sessionStorage.getItem("email");
        pars.from_name = sessionStorage.getItem("name");
                
        pars.to        = pars.email;
        pars.subject   = '['+sessionStorage.getItem("name")+'] '+$.i18n("title_loaded");
        
        pars.body      = getRegisterMessage(pars.name, pars.password, pars.email);      
        
        pars.smtp_server = sessionStorage.getItem("provider_smtp_server");
        pars.smtp_auth = sessionStorage.getItem("provider_smtp_auth");
        pars.smtp_username = sessionStorage.getItem("provider_smtp_username");
        pars.smtp_password = sessionStorage.getItem("provider_smtp_password"); 
        pars.smtp_ssl = sessionStorage.getItem("provider_smtp_ssl");
        pars.smtp_port = sessionStorage.getItem("provider_smtp_port");
        //console.log(dump(pars));
    $.ajax({
        type : "POST",
        url : "assets/apps/commons/new_user.php",
        data:pars,
        //contentType: "application/json", somente para POST
        cache: false,       
        error: function (response) {        
            switch(response.status) {                           
                default:
                    doOpenAlertError('error al enviar email user no permite');
                    break;
            }
        },
        success: function (response, status, jXHR) {            
           
            if (response.indexOf("Success:") != -1) {                                
                //doChangePassword(pars.password);
                
                console.log('Email enviado correctamente');                            
            } else {
               
                console.log('Email no enviado');
                
                //doOpenAlertError($.i18n("message_error_performing"));
            }                       

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

function doDeleteUsers(id) {

    swal({
        title: $.i18n("title_confirm_delete"),
        text: $.i18n("title_message_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: false
    },
    function () {

        doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));

        $.ajax({
            type: "DELETE",
            url : sessionStorage.getItem('url') + "users/"+id,			
			contentType: "application/json; charset=utf-8", 
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
            localFormClear();
          	  refreshGridUsers();

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

function doEditUsers(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));
var posid = ""
    localFormClear();
 $("#field_photo").show();

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

            $.each( response, function( key, value ) {
            	
            	if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));                            

                    $('input[name="name"]').val(value.name);
                    
                    $('input[name="phone"]').val(value.phone);
                    
                    $('input[name="token"]').val(value.token);
                    
                    $('input[name="email"]').val(value.email);
                     
                    //var expirationTime1 = moment(value.expirationTime).tz("Etc/GMT+0").format().substr(0, 10);
                    //$('input[name="expirationTime"]').val(expirationTime1);   
                    if (  value.expirationTime ) {
                    var expirationTime1 = moment(value.expirationTime).tz("Etc/GMT+0").format().substr(0, 10);
                    $('input[name="expirationTime"]').val(expirationTime1);
                    }                                  
                    
                    var adm = ($.parseJSON(('administrator' in value) ? value.administrator : value.admin)?"true":"false");

                    $("#administrator").select2("val",  adm);

                    if(adm == "true") {
                        $("#field_panel").show();
                        
                    } else {
                        $("#field_panel").hide();
                         
                    }

                    $("#readonly").select2("val", (value.readonly?"true":"false"));
                    
                    $("#disabled").select2("val", (value.disabled?"true":"false"));

                    $("#distanceUnit").select2("val", (!('distanceUnit' in value.attributes)?"km":value.attributes.distanceUnit));
            
            		$("#speedUnit").select2("val", (!('speedUnit' in value.attributes)?(!('speedUnit' in value)?"kmh":value.speedUnit):value.attributes.speedUnit));
                    
                    $('input[name="latitude"]').val(value.latitude);
                    
                    $('input[name="longitude"]').val(value.longitude);
                    
                    $('input[name="zoom"]').val(value.zoom);                    
                    
                    $('input[name="document"]').val((value.attributes.document== null?"":value.attributes.document));
                    
                    $('input[name="address"]').val((value.attributes.address== null?"":value.attributes.address));
                    
                    $('input[name="neighborhood"]').val((value.attributes.neighborhood== null?"":value.attributes.neighborhood));
                    
                    $('input[name="city"]').val((value.attributes.city== null?"":value.attributes.city));
                    
                    //$('input[name="state"]').val((value.attributes.state== null?"":value.attributes.state));
                    
                    $('input[name="postal_code"]').val((value.attributes.postal_code== null?"":value.attributes.postal_code));
                    
                     $("#perfil").select2("val", (value.attributes.perfil == null ? "" : value.attributes.perfil));
                     
                     $("#state").select2("val", (value.attributes.state == null ? "" : value.attributes.state));
                    
                   // $('input[name="phone"]').val((value.attributes.phone== null?"":value.attributes.phone));
                    
                   // $("#URLoginV").show();
                    //var urlA = window.location.host;
                    var urlA = window.location.host;
                    urlA = 'http://'+ urlA + '/index/provider/'+value.id;
                    $("#URLoginI").val(urlA);
                    
                    
                    
                    $("#panel").select2("val", (!('panel' in value.attributes)?"map":value.attributes.panel));
                    
                    $("#register").select2("val", "false");
                    

                    if ((value.deviceLimit == -1) || (value.userLimit == -1)) {
                        $("#register").select2("val", "true");
                        $("#URLoginV").show();
                    }else {
                       
                          $("#URLoginV").hide();
                    }
                      posid = value.positionId
                      //asPhoto = false;
                   // photo = "";
                    //photo = (value.attributes.photo == null ? "" : value.attributes.photo)
                    //if (photo != '') {
                        //asPhoto = true;
                        //$("#field_photo").show();
                       //$("#manager_photo").attr('src','provider/'+value.id+'/logo.jpg'+"?"+Date.now());
                        $("#preview_photo").prop("src", "provider/"+value.id+'/' +'logo.jpg' ).css('height', '125px').css('width', '200px').css('float', 'right');
                   // }

                    admin			= admin;
                    
                    language		= (value.attributes.language== null?"en":value.attributes.language);
					
					profile_photo 	= (value.attributes.profile_photo== null?"assets/img/user.png":value.attributes.profile_photo);										
					
					created_at      = (value.attributes.created_at== null?moment().format('YYYY-MM-DD HH:mm:ss'):value.attributes.created_at);
					
					gasoline		= (value.attributes.gasoline== null?0:value.attributes.gasoline);
					
					alcohol			= (value.attributes.alcohol== null?0:value.attributes.alcohol);
					
					gnv				= (value.attributes.gnv== null?0:value.attributes.gnv);
					
					diesel			= (value.attributes.diesel== null?0:value.attributes.diesel);					                                        

                    server_attributes =value.attributes;
                    
            	}
                    
			});
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);
            
            $('#pane_form').click();


	   }

	});

}

$(document).on('click', '#close-preview', function() {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function() {
            $('.image-preview').popover('show');
        },
        function() {
            $('.image-preview').popover('hide');
        }
    );
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function() {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Seleccionar");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function() {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function(e) {
            $(".image-preview-input-title").text("Cambiar");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

function localFormClear() {
    doFormClear();

    $("#administrator").select2("val", "");
    $("#readonly").select2("val", "");
    $("#disabled").select2("val", "");
    
    $("#distanceUnit").select2("val", "");
    $("#speedUnit").select2("val", "");
    $("#token").select2("val", "");

    $("#panel").select2("val", "");    

    $("#register").select2("val", "");
    
     asPhoto = false;
    photo = "";
    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'right');
    $("#field_photo").hide();
    
}