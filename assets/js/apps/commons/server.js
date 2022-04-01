var dataSet = [];
var img_base64 = null;
var ico_base64 = null;
//var provider  = null;
//var _name  = null;
//var _city  = null;
//var _state = null;
//var _phone = null;
//var _email = null;
//var _logo = null;

var server_attributes = [];

$(document).ready(function () {	


	/**
	 * Check status of session of user
	 */
	checkSession();
	
	checkPermission();
	
    localFormClear();
    
    /** 
    *initial parameters
    */
	
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
            registration: {
                required: true
            },
            readonly: {
                required: true
            },
            password: {
                required: true
            },
            distanceUnit: {
                required: true
            },
            message_load_positions: {
                required: true
            },
            map_refresh: {
                required: true
            }/**,
            user_admin: {
                required: true
            },
            pass_admin: {
                required: true
            } */
            
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
        if ($('#form_data').valid()) { doSaveServer(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });
    
   // $("#appkey").change(function() {
        
     //    var key = $(this).val().split("|");

       //  var json = $.parseJSON(decrypt(key[0]));

         //if ("name" in json) {
          //  _name = json.name;
          //  $('input[name="name"]').val(_name);
            
         //   if ("city" in json) {
           // _name = json.city;
            //$('input[name="city"]').val(_city);
            
            
            
           // _city = json.city;
            //$('input[name="city"]').val(_city);
            
          //  _state = json.state;
            //$('input[name="state"]').val(_state);
            
           // _phone = json.phone;
            //$('input[name="phone"]').val(_phone);
            
           // _email = json.email;
            //$('input[name="email"]').val(_email);
            
            //_logo = key[1];

            //$("#preview_logomark").attr('src',"data:image/png;base64,"+_logo);
                        
            //doOpenAlertSucess('Exito!', 'Cambios realizados', 1500);  

            //$(this).val("");

         //} else {
           // doOpenAlertError('Clave inválida!');                          
         //}

    //});

    $("#app_version").html("v." + app_version);
    
    /**
     * next update     
    $("#favico").change(function() {
    	var selectedFile = this.files[0];
	      selectedFile.convertToBase64(function(base64){	           
	           $("#img_favico").attr('src',base64);
	           ico_base64 = base64;
	      }) ;
        
    });
    */
    
    doEditServer();        

    $.ajax({
        url : "eula.txt",
        dataType: "html",
        success : function (data) {            
            
            $("#term").val(data);

            setTimeout($("#term").summernote(),6000);
              
        }
    });

    $('button[name="btnSaveTerm"]').click(function () {

        var pars = $("#form_terms").serializeObject();		

        $.ajax({
            url : "assets/apps/commons/eula.php",
            type: "POST",
            cache: false,
            data:pars,
            error: function (response) {					
                doOpenAlertError('Error when performing the action, please ask for help from technical support.\n Erro:'+response.statusText);             
            },
            success: function (response) {    
                doOpenAlertSucess('Exit!', 'Changes save', 1500);    
            }
        });
        
    });


});


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doSaveServer() {

    doOpenAlertWait('Wait...', 'Saving changes!');

    var pars = $("#form_data").serializeObject();		
    	pars.attributes = { 
    	   //name: encrypt(_name),
                            //name:$("#name").val(),
                             name:$("#name").val(),
                            city:$("#city").val(),
    						//city: encrypt(_city),
    						//state: encrypt(_state),
                            state:$("#state").val(),
    						//phone: encrypt(_phone),
                            phone:$("#phone").val(),
                            //email: encrypt(_email),
                            email:$("#email").val(), 
                            //Configuracin correo
                            smtp_server:$("#smtp_server").val(), 
                            smtp_port:$("#smtp_port").val(), 
                            smtp_username:$("#smtp_username").val(), 
                            smtp_password:$("#smtp_password").val(), 
                            smtp_ssl:$("#smtp_ssl").val(), 
                            smtp_auth:$("#smtp_auth").val(),  
                         //   appkey:$("#appkey").val(),               						
    					//	smtp_server: encrypt($("#smtp_server").val()),
    					//	smtp_port: encrypt($("#smtp_port").val()),
    					//	smtp_username: encrypt($("#smtp_username").val()),
    					//	smtp_password: encrypt($("#smtp_password").val()),    						
    					//	smtp_ssl: encrypt($("#smtp_ssl").val()),
    					//	smtp_auth: encrypt($("#smtp_auth").val()),
                        
    					//	user_admin: encrypt($("#user_admin").val()),
    					//	pass_admin: encrypt($("#pass_admin").val()),
    	//					logomark: img_base64,
    						distanceUnit:$("#distanceUnit").val(),
                            speedUnit:$("#speedUnit").val(),
                            facebook:$("#facebook").val(),
                            twitter:$("#twitter").val(),
                            googleplus:$("#googleplus").val(),
                            support:$("#support").val(),                            
                            website:$("#website").val(),                            
                            applestore:$("#applestore").val(),                            
                            playstore:$("#playstore").val(),     
                             googlekey:$("#googlekey").val(),  
                             mapbox:$("#mapbox").val(),  
                            google_maps:$("#google_maps").val(),
                            message_load_positions:$("#message_load_positions").val(),
    						/*favicon: ico_base64,*/
                            deviceLimitDefault:$("#deviceLimitDefault").val(),
                            map_refresh: $("#map_refresh").val()
                          };        					
        
        pars.attributes = mergeAttributes(pars.attributes, server_attributes);

        //fixed values traccar
        pars.deviceReadonly = sessionStorage.getItem('deviceReadonly');

        pars.limitCommands = sessionStorage.getItem('limitCommands');

        pars.map = sessionStorage.getItem('map');
        
        pars.bingKey = sessionStorage.getItem('bingKey');

        pars.mapUrl = sessionStorage.getItem('mapUrl');        

        pars.twelveHourFormat = sessionStorage.getItem('twelveHourFormat');

        pars.forceSettings = sessionStorage.getItem('forceSettings');

        pars.coordinateFormat = sessionStorage.getItem('coordinateFormat');

        if (parseInt(sessionStorage.getItem('version')) < 317) {
            pars.poiLayer = sessionStorage.getItem('poiLayer');
        }

        //fixed values end

		delete pars.name;
		delete pars.city;
		delete pars.state;
		delete pars.phone;
		delete pars.email;
		delete pars.smtp_server;
		delete pars.smtp_port;
		delete pars.smtp_username;
		delete pars.smtp_password;
		delete pars.smtp_ssl;
		delete pars.smtp_auth;
		delete pars.deviceLimitDefault;
		//delete pars.logomark;
		//delete pars.user_admin;
		//delete pars.pass_admin;
		delete pars.distanceUnit;		
        delete pars.speedUnit;		
        delete pars.facebook;		
        delete pars.twitter;		
        delete pars.googleplus;		
        delete pars.support;		
       delete pars.appkey;		
        delete pars.website;
        delete pars.mapbox;
        delete pars.googlekey;
        delete pars.playstore;
        delete pars.applestore;
        //delete pars.favico;
        delete pars.map_refresh;
        delete pars.message_load_positions;
        delete pars.google_maps;
		
    $.ajax({
        type : "PUT",
		url : sessionStorage.getItem('url') + "server/",
		data:JSON.stringify(pars),
		contentType: 'application/json', 
		cache: false,					
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {					
			switch(response.status) {			
				case 400:
					doOpenAlertError('User does not have permission to perform this operation.');
					break;
				case 401:
					doOpenAlertError('Unauthorized user.');
					break;	
			 	default:
					doOpenAlertError('Error performing this operation!\n Contact or technical support.\n Error:'+response.statusText);
					break;
			}
		},
        success: function (response) {

            doOpenAlertSucess('Exit!', 'Changes save', 1500);

            sessionStorage.setItem('map_refresh',parseInt($("#map_refresh").val())*1000);

            if (_logo != null) {
                updatePhoto();
            }

        }

    });

}


/**
    * Carrega registro para edicao
    * 
    * param id Integer 
    *
    * @return void
    */

function doEditServer() {

     doOpenAlertWait('Wait...', 'Saving changes!');

    localFormClear();

    $.ajax({
       type : "GET",
		url : sessionStorage.getItem('url') + "server/",
		cache: false,		
		headers: {
        	//"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {		
			switch(response.status) {			
				case 400:
					doOpenAlertError('User does not have permission to perform this operation.');
					break;
				case 401:
					doOpenAlertError('Unauthorized user.');
					break;	
			 	default:
					doOpenAlertError('Error performing this operation!\n Contact or technical support.\n Error:'+response.statusText);
					break;
			}
		},
        success: function (response) {
        	
        	var value = response;
        	
        	$('input[name="id"]').val(value.id);
        	            	                                     
            $("#registration").select2("val", (value.registration==null?"false":(value.registration?"true":"false")));

            sessionStorage.setItem('registration',("registration" in value)? value.registration:true);
			
			sessionStorage.setItem('deviceReadonly',("deviceReadonly" in value)? value.deviceReadonly:false);

			sessionStorage.setItem('limitCommands',("limitCommands" in value)? value.limitCommands:false);

			sessionStorage.setItem('map', value.map);			

			sessionStorage.setItem('bingKey',("bingKey" in value)? value.bingKey:"");

			sessionStorage.setItem('mapUrl',("mapUrl" in value)? value.mapUrl:"");

			sessionStorage.setItem('poiLayer',("poiLayer" in value)? value.poiLayer:"");
			
			sessionStorage.setItem('twelveHourFormat',("twelveHourFormat" in value)? value.twelveHourFormat:false);

			sessionStorage.setItem('forceSettings',("forceSettings" in value)? value.forceSettings:false);

			sessionStorage.setItem('coordinateFormat',("coordinateFormat" in value)? value.coordinateFormat:"");

            $("#readonly").select2("val", (value.readonly?"true":"false"));
            
            $("#distanceUnit").select2("val", (value.attributes.distanceUnit== null?"km":value.attributes.distanceUnit));
            
            $("#speedUnit").select2("val", (value.attributes.speedUnit== null?"kph":value.attributes.speedUnit));

            $("#message_load_positions").select2("val", (value.attributes.message_load_positions== null?"0":value.attributes.message_load_positions));            
            
            $('input[name="latitude"]').val(value.latitude);
            
            $('input[name="longitude"]').val(value.longitude);
            
            $('input[name="zoom"]').val(value.zoom);
            
            $('#version').html("<br />Version "+value.version);   
            
            // custom                        
            
            //_name = (value.attributes.name== null?"":decrypt(value.attributes.name));
            //$('input[name="name"]').val(_name);
            
            //$('input[name="name"]').val(!("name" in value.attributes)?"":value.attributes.name);
            
            $('input[name="name"]').val(!("name" in value.attributes)?"":value.attributes.name);
             $('input[name="googlekey"]').val(!("googlekey" in value.attributes)?"":value.attributes.googlekey);
              $('input[name="mapbox"]').val(!("mapbox" in value.attributes)?"":value.attributes.mapbox);
            // _city = (value.attributes.city== null?"":decrypt(value.attributes.city));
            //$('input[name="city"]').val(_city);
            $('input[name="city"]').val(!("city" in value.attributes)?"":value.attributes.city);
            
            //_state = (value.attributes.state== null?"":decrypt(value.attributes.state));
            //$('input[name="state"]').val(_state);
            $('input[name="state"]').val(!("state" in value.attributes)?"":value.attributes.state);
            
            //_phone = (value.attributes.phone== null?"":decrypt(value.attributes.phone));
            //$('input[name="phone"]').val(_phone);
            $('input[name="phone"]').val(!("phone" in value.attributes)?"":value.attributes.phone);
            
            //_email = (value.attributes.email== null?"":decrypt(value.attributes.email));
            //$('input[name="email"]').val(_email);
            $('input[name="email"]').val(!("email" in value.attributes)?"":value.attributes.email);
            
            $('input[name="deviceLimitDefault"]').val((value.attributes.deviceLimitDefault== null?3:value.attributes.deviceLimitDefault));
            
            //$('input[name="smtp_server"]').val((value.attributes.smtp_server== null?"":decrypt(value.attributes.smtp_server)));
            $('input[name="smtp_server"]').val(!("smtp_server" in value.attributes)?"":value.attributes.smtp_server); 
            //$('input[name="smtp_port"]').val((value.attributes.smtp_port== null?"":decrypt(value.attributes.smtp_port)));
             $('input[name="smtp_port"]').val(!("smtp_port" in value.attributes)?"":value.attributes.smtp_port); 
            //$('input[name="smtp_username"]').val((value.attributes.smtp_username== null?"":decrypt(value.attributes.smtp_username)));
              $('input[name="smtp_username"]').val(!("smtp_username" in value.attributes)?"":value.attributes.smtp_username); 
            //$('input[name="smtp_password"]').val((value.attributes.smtp_password== null?"":decrypt(value.attributes.smtp_password)));
              $('input[name="smtp_password"]').val(!("smtp_password" in value.attributes)?"":value.attributes.smtp_password);           
            //$("#smtp_ssl").select2("val", (value.attributes.smtp_ssl== null?"":decrypt(value.attributes.smtp_ssl)));
             $("#smtp_ssl").select2("val", (!("smtp_ssl" in value.attributes)?"false":value.attributes.ssmtp_ssl));
            //$("#smtp_auth").select2("val", (value.attributes.smtp_auth== null?"none":decrypt(value.attributes.smtp_auth)));
              $("#smtp_auth").select2("val", (!("smtp_auth" in value.attributes)?"false":value.attributes.smtp_auth));
              
               $('input[name="appkey"]').val(!("appkey" in value.attributes)?"":value.attributes.appkey); 
            
        //    $('input[name="user_admin"]').val((value.attributes.user_admin== null?"":decrypt(value.attributes.user_admin)));
            
         //   $('input[name="pass_admin"]').val((value.attributes.pass_admin== null?"":decrypt(value.attributes.pass_admin)));

            $('input[name="facebook"]').val(!("facebook" in value.attributes)?"":value.attributes.facebook);

            $('input[name="twitter"]').val(!("twitter" in value.attributes)?"":value.attributes.twitter);

            $('input[name="googleplus"]').val(!("googleplus" in value.attributes)?"":value.attributes.googleplus);

            $('input[name="support"]').val(!("support" in value.attributes)?"":value.attributes.support);
            
            $('input[name="website"]').val(!("website" in value.attributes)?"":value.attributes.website);
            
            $('input[name="applestore"]').val(!("applestore" in value.attributes)?"":value.attributes.applestore);

            $('input[name="playstore"]').val(!("playstore" in value.attributes)?"":value.attributes.playstore);

            $('input[name="map_refresh"]').val(!("map_refresh" in value.attributes)?"60":value.attributes.map_refresh);

            $("#google_maps").select2("val", (!("google_maps" in value.attributes)?"false":value.attributes.google_maps));
                        
            $("#preview_logomark").attr('src',sessionStorage.getItem('logomark'));
            //$("#img_favico").attr('src','assets/img/favicon.png');
                     
            server_attributes =response.attributes;

            // finish fields

            doOpenAlertSucess('Exit!', 'Updated successfull', 1500);
            
            $('#pane_form').click();


	   }

	});

}

function setImageLogo() {
	$("#logomark").click();
}

/*
 * next update
function setImageIco() {
	$("#favicon").click();
}
*/
function localFormClear() {
    doFormClear();

    $("#registration").select2("val", "");
    $("#readonly").select2("val", "");
    
    $("#distanceUnit").select2("val", "");
    $("#speedUnit").select2("val", "");

    $("#google_maps").select2("val", "");    
    
    //custom    
    //$("#smtp_ssl").select2("val", "");
    
   // provider  = "";    

   // _name  = "";
    //_city  = "";
    //_state = "";
    //_phone = "";
    //_email = "";

}

function updatePhoto() {

    var params = new Object();
        params.prefix = prefixpath;
        params.logo = _logo;    

	$.ajax({
		type: "POST",
		url:  "assets/lib/PHPMailer/class.mail.php",        
        data:params, 		
		cache: false,
		error: function (response) {			
            doOpenAlertError('Error performing the operation, contact technical support'+response.statusText);
		},
		success: function (response) {            
            sessionStorage.setItem('logomark', "data:image/png;base64," + _logo);
            $(".logo").html('<img id="site_logomark" src="data:image/png;base64,'+_logo+'" alt="Logomarca" title="Vehicle tracking" />');    
		}

	});

}
