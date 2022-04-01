var dataSet          = [];
var countVehicles    = 0;
var countGroups      = 0;
var countGeoFences   = 0;
var img_base64       = null;
var actual_pane      = "pane_list";
var ulSpeed 		 = new ySpeed();
var document;
var address;
var neighborhood;
var city;
var state;
var postal_code;
var currentDevice = 0;
var gasoline,
	alcohol,
	gnv,
	diesel;

$(document).ready(function () {

	/**
	 * Check status of session of user
	 */
	checkSession();
	
    localFormClear();
    
    // you can do this once in a page, and this function will appear in all your files 
    File.prototype.convertToBase64 = function(callback){
            var reader = new FileReader();
            reader.onload = function(e) {
                 callback(e.target.result);
            };
            reader.onerror = function(e) {
                 callback(null);
            };        
            reader.readAsDataURL(this);
    };

    /** 
    *initial parameters
    */

    loadSwitchery();
    
    //Lo modificque para que tome datos completos
    /*
     $(".fuel").maskMoney({
         prefix: "",
         decimal: ",",
         thousands: "."
     });
    */

    $('.datatable-js').dataTable({
        columnDefs: []
    });

    /**
     * parameters this page
     */
    
    /** write elements*/
    $('#profile_name').html(sessionStorage.getItem('name'));	
	$("#profile_photo").attr('src',sessionStorage.getItem('profile_photo'));
	$('#profile_email').html(sessionStorage.getItem('email'));
	$('#profile_admin').html(($.parseJSON(sessionStorage.getItem("admin"))==1?$.i18n("title_yes"):$.i18n("title_no")));
	$('#profile_distance').html(sessionStorage.getItem('distanceUnit'));
	$('#profile_speed').html(findSpeedUnit(sessionStorage.getItem('speedUnit')).title);
	$('#profile_latitude').html(sessionStorage.getItem('latitude'));
	$('#profile_longitude').html(sessionStorage.getItem('longitude'));
	$('#profile_zoom').html(sessionStorage.getItem('zoom'));	
	
	document 		= sessionStorage.getItem('document');
    address			= sessionStorage.getItem('address');
    neighborhood	= sessionStorage.getItem('neighborhood');
    city			= sessionStorage.getItem('city');
    state			= sessionStorage.getItem('state');
    postal_code		= sessionStorage.getItem('postal_code');
    phone			= sessionStorage.getItem('phone');
    administrator	= sessionStorage.getItem('administrator');
    token	= sessionStorage.getItem('token');
						
	/** write forms*/
    $('#name').val(sessionStorage.getItem('name'));
    $('#phone').val(sessionStorage.getItem('phone'));		
	$('#email').val(sessionStorage.getItem('email'));	
		
	$("#distanceUnit").select2("val", sessionStorage.getItem('distanceUnit'));
	$("#speedUnit").select2("val", sessionStorage.getItem('speedUnit'));
	
	
	$('#latitude').val(sessionStorage.getItem('latitude'));
	$('#longitude').val(sessionStorage.getItem('longitude'));
	$('#zoom').val(sessionStorage.getItem('zoom'));	
	
	$('#gasoline').val(sessionStorage.getItem('gasoline'));
	$('#alcohol').val(sessionStorage.getItem('alcohol'));
	$('#diesel').val(sessionStorage.getItem('diesel'));
	$('#gnv').val(sessionStorage.getItem('gnv'));	
	
	
	img_base64 = sessionStorage.getItem('profile_photo');
	
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
            distanceUnit: {
                required: true
            },
            speedUnit: {
                required: true
            },
            zoom: {
                required: true
            },
            language: {
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

    $("#profile_photo").attr('src',sessionStorage.getItem('photo'));	

    $('button[name="btnSave"]').click(function () {
        if ($('#form_data').valid()) { doUpdateProfile(); };
    });
    
    $('button[name="btnback"]').click(function () {
        $("#pane_list").click();
        actual_pane = "pane_list";
    });
    
    
    $('a[name="btnEditProfile"]').click(function () {
        if (actual_pane == "pane_list") {
        	$("#pane_form").click();
        	actual_pane = "pane_form";
        	$("#panel_profile").css("height:1550px");
        } else {
        	$("#pane_list").click();
        	actual_pane = "pane_list";
        	$("#panel_profile").css("height:950px");
        }
    });
        
    $("#photo").change(function() {//hacer esto para agregar la imagen
    	
		var file_data = $('#photo').prop('files')[0];
		
		var fileExtension = ['jpg'];
		
		var ext = $(this).val().split('.');
		
		ext = ext[ext.length-1].toLowerCase();

        if (fileExtension.lastIndexOf(ext) > -1) {            
        
	    	var selectedFile = this.files[0];
	    	
	    	if(selectedFile.size > 150000) {             
	           doOpenAlertError($.i18n("title_upload_photo_limit"));
			} else {
				
					doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));
				
					var formData = new FormData();
						      		    
	      		    formData.append('option', 'profile');
	      		    formData.append('userid', sessionStorage.getItem('userid'));
	      		    formData.append('prefix', prefixpath);      		    
	      		    formData.append('file', file_data);
	
				    $.ajax({
				        url: "assets/apps/commons/upload.php",
				        type: 'POST',
				        data: formData,
				        success: function (data) {
				            alert(data)
				        },
				        cache: false,
				        contentType: false,
				        processData: false,
				        xhr: function() {  // Custom XMLHttpRequest
				            var myXhr = $.ajaxSettings.xhr();
				            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
				                myXhr.upload.addEventListener('progress', function () {
				                    /* faz alguma coisa durante o progresso do upload */
				                }, false);
				            }
				        return myXhr;
				        },
	        			success: function (response) {
	        				
	        				if (response == 0) {
	        					doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sended"), 1500);
	        					
	        					$("#profile_photo").attr('src','assets/img/users/'+sessionStorage.getItem('userid')+'.jpg');
	        					$("#user_photo").attr('src','assets/img/users/'+sessionStorage.getItem('userid')+'.jpg');
	        					
	        					 $("#profile_photo").attr('src', $("#profile_photo").attr('src')+'?'+Math.random());
	        					 $("#user_photo").attr('src', $("#user_photo").attr('src')+'?'+Math.random());
	        					
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
    
	$("#language").select2("val", sessionStorage.getItem('language'));    
	
	$("#lnkFacebook").hide();	
	$("#lnkTwitter").hide();	
	$("#lnkGooglePlus").hide();	
	$("#lnkEmail").hide();	
	$("#lnkSupport").hide();	
	
	if(sessionStorage.getItem('facebook') != "") {
		$("#lnkFacebook").attr('href',"https://www.facebook.com/" + sessionStorage.getItem('facebook')).show();	
	}

	if(sessionStorage.getItem('twitter') != "") {
		$("#lnkTwitter").attr('href',"https://twitter.com/" + sessionStorage.getItem('twitter')).show();	
	}

	if(sessionStorage.getItem('googleplus') != "") {
		$("#lnkGooglePlus").attr('href',"https://plus.google.com/" + sessionStorage.getItem('googleplus')).show();	
	}

	if(sessionStorage.getItem('provider_email') != "") {
		$("#lnkEmail").attr('href',"mailto:" + sessionStorage.getItem('provider_email')).show();	
	}

	if(sessionStorage.getItem('support') != "") {
		$("#lnkSupport").attr('href',sessionStorage.getItem('support')).show();	
	}

    getDevicesProfile();
    
    getGroupsProfile();
    
    getGeofencesProfile();        

});


/**
    * update date form in database
    *  
    * @return void
    */
function doUpdateProfile() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var params = new Object();
		
		params.id 				= sessionStorage.getItem('userid');				
		 
	/*	
        if (sessionStorage.getItem('version') > 316) {
			params.administrator    = (sessionStorage.getItem('administrator')=="1"?true:false);				
		} else {
			params.administrator            = (sessionStorage.getItem('administrator')=="1"?true:false);				
		}
        
        */
		
        //params.administrator    = (sessionStorage.getItem('administrator');
        params.administrator 		= (sessionStorage.getItem('administrator')=="1"?true:false);	
		params.name 			= ($("#name").val()== ""?sessionStorage.getItem('name'):$("#name").val());							
		params.coordinateFormat = sessionStorage.getItem('coordinateFormat');														
		params.email 			= ($("#email").val()== ""?sessionStorage.getItem('email'):$("#email").val());
        params.phone 			= ($("#phone").val()== ""?sessionStorage.getItem('phone'):$("#phone").val());
		params.password 		= ($("#password").val()== ""?sessionStorage.getItem('password'):$("#password").val());
		params.latitude 		= ($("#latitude").val()== ""?sessionStorage.getItem('latitude'):$("#latitude").val());
		params.longitude 		= ($("#longitude").val()== ""?sessionStorage.getItem('longitude'):$("#longitude").val());
		params.map 				= sessionStorage.getItem('map');								
		params.readonly 		= sessionStorage.getItem('readonly');							
		params.zoom 			= ($("#zoom").val()== ""?sessionStorage.getItem('zoom'):$("#zoom").val());					
		params.twelveHourFormat = sessionStorage.getItem('twelveHourFormat');																					
		params.deviceLimit 		= sessionStorage.getItem('deviceLimit');
        params.userLimit 		= sessionStorage.getItem('userLimit');				
		params.disabled 		= sessionStorage.getItem('disabled');		
        params.token 		= sessionStorage.getItem('token');		
		params.attributes 		= {readonly:false,								   
								   language      : $("#language").val(),
					  	     	   profile_photo : img_base64,
					  	     	   readonly      : false,
					  	     	   speedUnit 	 : ($("#speedUnit").val()== ""?sessionStorage.getItem('speedUnit'):$("#speedUnit").val()),
								   distanceUnit  : ($("#distanceUnit").val()== ""?sessionStorage.getItem('distanceUnit'):$("#distanceUnit").val()),								   
					  	     	   document		 : sessionStorage.getItem('document'),
								   address		 : sessionStorage.getItem('address'),
								   neighborhood  : sessionStorage.getItem('neighborhood'),
								   city			 : sessionStorage.getItem('city'),
								   state		 : sessionStorage.getItem('state'),
								   postal_code   : sessionStorage.getItem('postal_code'),
								   phone		 : sessionStorage.getItem('phone'),								   
								   created_at    : sessionStorage.getItem('created_at'),
								   updated_at    : sessionStorage.getItem('updated_at'),
								   panel		 :sessionStorage.getItem('panel'),
                                   perfil		 :sessionStorage.getItem('perfil'),
                                   providerId	 :sessionStorage.getItem('providerId'),
						   		   gasoline      : $("#gasoline").val(),
						   		   alcohol       : $("#alcohol").val(),
						   		   gnv      	 : $("#gnv").val(),
								   diesel        : $("#diesel").val(),									  
								   count_login   : sessionStorage.getItem('count_login'),
								   last_login    : sessionStorage.getItem('last_login')									  
					  
						   		   };																					
    $.ajax({
        type : "PUT",
		url : sessionStorage.getItem('url') + "users/"+sessionStorage.getItem('userid'),
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

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);
            
            sessionStorage.setItem('profile_photo',img_base64);      
            $("#user_photo").attr('src',img_base64);
            
			$('#user_name').html(response.name);
			$('#profile_name').html(response.name);
            
            sessionStorage.setItem('name', response.name);			
				
			sessionStorage.setItem('coordinateFormat', response.coordinateFormat);								
							
			sessionStorage.setItem('email', response.email);
            
            sessionStorage.setItem('phone', response.phone);
			
			sessionStorage.setItem('password', ($("#password").val()== ""?sessionStorage.getItem('password'):$("#password").val()));
			
			sessionStorage.setItem('latitude', response.latitude);
			
			sessionStorage.setItem('longitude', response.longitude);
			
			if (response.speedUnit != null) { sessionStorage.setItem('speedUnit', response.speedUnit); }
				
			if (response.distanceUnit != null) { sessionStorage.setItem('distanceUnit', response.distanceUnit); }
				
			if (response.zoom > 0) { sessionStorage.setItem('zoom', response.zoom); }
			
			sessionStorage.setItem('gasoline', (!("gasoline" in response.attributes)?0:value.attributes.gasoline));
					
			sessionStorage.setItem('alcohol', (!("alcohol" in response.attributes)?0:value.attributes.alcohol));
					
			sessionStorage.setItem('gnv', (!("gnv" in response.attributes)?0:value.attributes.gnv));
					
			sessionStorage.setItem('diesel', (!("diesel" in response.attributes)?0:value.attributes.diesel));
			
   			         
            $("#pane_list").click();
        	actual_pane = "pane_list";
        	$("#panel_profile").css("height:950px");

        }

    });

}



/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesProfile() {
	
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
			
			devices.splice(0);
						
			$.each( response, function( key, value ) {
				
				devices.push({deviceId : value.id,
							  name     : value.name,
							  category : value.category,
							  uniqueId : value.uniqueId,
							  status : value.status,
							  model: value.model,
							  phone: value.phone
							});
							  
				countVehicles++;	
			});
			
			$("#countVehicles").html(countVehicles);
			
			doLastPositions();
						
		}
	});	    
	
}


/**
 * Carrega lista dos grupos
 * 
 * 
 * @return void
 */

function getGroupsProfile() {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "groups/",
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
				countGroups++;  			
			});
			
			$("#countGroups").html(countGroups);
						
		}
	});	    
	
}


/**
 * Carrega lista dos geofences
 * 
 * 
 * @return void
 */

function getGeofencesProfile() {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "geofences/",
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
				  countGeoFences++;			
			});
			
			$("#countGeoFences").html(countGeoFences);
						
		}
	});	    
	
}


function setImagePhoto() {
	$("#photo").click();
}

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function doLastPositions() {
	$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "positions/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					default:
					//	doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {
			// Javascript sourced data
			//clearTimeout(lastPositionsTimeOut);                        
			dataSet.splice(0);
			$.each( response, function( key, value ) {
														
				//device
				var device = findDevice(value.deviceId);			
				//console.log(device.status);
				var commnounication = getTimeLimit(moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), device.status);
								
				var html = '<div class="btn-group">'+
				'    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">'+
				'    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>'+
                '    </button>'+
                '    <ul class="dropdown-menu dropdown-menu-right">'+
                '    	<li><a href="javascript:viewInfoDevice(' + value.id + ')"><i class="icon-search4"></i> '+ $.i18n("title_view")+'</a></li>'+                
                '    </ul>'+
                '</div>';

                dataSet.push([device.name, 
                			  value.protocol, 
                			  moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), 
                			  (commnounication == false ? '&nbsp;&nbsp;&nbsp;<span class="label label-success">' + $.i18n("title_communication") + '</span>' : '&nbsp;&nbsp;&nbsp;<span class="label label-warning">' + $.i18n("title_no_communication") + '</span>'), 
                			  html]);              		                 	  				
			});
			
            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                responsive: true,
                columnDefs: []
            });    
									
		}
	});

}

function viewInfoDevice(id) {
		
	var params   = new Object();    		
	   params.id = id;
			
	$.ajax({
		type       : "get",
		url        : sessionStorage.getItem('url') + "positions/",		
		contentType: 'application/json', 
		cache      : false,		
		data       :params,
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
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
		success: function (response) {
			
			$.each( response, function( key, value ) {		

				var device = findDevice(value.deviceId);
				
				currentDevice = value.deviceId;
								
				var nocommunication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), device.status);
				
				
				var html = "<div style='font-weight:bold'>"+$.i18n("title_protocol")+":</div>"+value.protocol+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_identifier")+":</div>"+device.uniqueId+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_model")+":</div>"+(device.model== null?'-':device.model)+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_category")+":</div>"+$.i18n("title_type_"+device.category)+'<br />'+						   
						   "<div style='font-weight:bold'>"+$.i18n("title_phone")+":</div>"+(device.phone== null?'-':device.phone)+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_device_time")+":</div>"+moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss')+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_coordinates")+":</div>"+value.latitude+', '+value.longitude+ '<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_address")+":</div>"+value.address+ '<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_speed")+":</div>"+convertSpeed(value.speed, 'knots')+findSpeedUnit(sessionStorage.getItem('speedUnit')).title+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_course")+":</div>"+degToCompass(value.course)+'<br />';						   						   						  						  
				
				changeIconsAlerts(!nocommunication, value);
				
				$("#deviceInput1").html($.i18n("title_"+device.input1));
				$("#deviceInput2").html($.i18n("title_"+device.input2));
				
				var input1Active = (value.attributes.in1== null?false:value.attributes.in1);
				var input2Active = (value.attributes.in2== null?false:value.attributes.in2);
				
				
				if (input1Active == true) {
					$("#deviceInput1").addClass('label-success').removeClass('label-default');	
				} else {
					$("#deviceInput1").addClass('label-default').removeClass('label-success');
				}
				
				if (input2Active == true) {
					$("#deviceInput2").addClass('label-success').removeClass('label-default');	
				} else {
					$("#deviceInput2").addClass('label-default').removeClass('label-success');
				}

				var objIndex = devices.findIndex((obj => obj.deviceId == value.deviceId));
						   
				$("#titleViewDevice").html(' ' + device.name + (devices[objIndex].status == "online" ? '&nbsp;&nbsp;&nbsp;<span class="label label-success">'+$.i18n("title_communication")+'</span>':'&nbsp;&nbsp;&nbsp;<span class="label label-warning">' +$.i18n("title_no_communication")+'</span>'));
				$("#bodyViewDevice").html(html);
				$("#btnViewDevice").click();
			});												
		}
	});		
	
}


function localFormClear() {
    doFormClear();    
}

//	      selectedFile.convertToBase64(function(base64){	           
	           //$("#profile_photo").attr('src',base64);
	           //img_base64 = base64;
	           //doUpdate();	      		      	
//	      }) ;	        