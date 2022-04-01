var dataSet = [];
var group;
var countVehicles    = 0;
var countGroups      = 0;
var countGeoFences   = 0;
var countDrivers   = 0;
var countMaintenance   = 0;
var countUsers   = 0;
var ulSpeed = new ySpeed();
var listed  = false;
var notificationTimeOut;
var lastPositionsTimeOut;
var currentDevice = 0;

$(document).ready(function() {

	/**
	 * Check status of session of user
	 */
	checkSession();	
	
//	checarScroll();
	
	// initial parameters   
    loadSwitchery();

    //Select2 
    $(".select-search").select2({ allowClear: false, placeholder: $.i18n("title_select2"), language: "en" })
	.on('change', function () {
	    $(this).closest('form').validate().element($(this));
	});  

    $('.datatable-js').dataTable({
        columnDefs: []
    });   
    
    $('#device_lock').on('click', function() {
		sendLock(currentDevice);
	});
	
	$('#device_unlock').on('click', function() {
		sendUnLock(currentDevice);
	});
    
    
    $('#device_arm').on('click', function() {
		sendArm(currentDevice);
	});
    
    
    $('#device_disarm').on('click', function() {
		sendDisarm(currentDevice);
	});
	
    

	$('#refreshGrid').on('click', function() {				
		doLastPositions();
	});
	
	getGroupsDevices();	
    getDevicesProfile();
    
    getGroupsProfile();
    
    getGeofencesProfile();        
    getDriversProfile();        
    getMaintenanceProfile();        
    getUsersProfile();      
			
});

function doListDevices() {

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
			var i = 1;
			var count = 0;
			var html = "";
			
			$.each( response, function( key, value ) {

				devices.push({deviceId : value.id,
							  name: value.name,
							  model: value.model,
							  phone: value.phone,
							  category: value.category,
							  status: value.status,
							  uniqueId: value.uniqueId,
							  groupId: value.groupId,
							  photo: value.photo,
							  //follow: false,
							  polyline: null,
							  latitude: null,
							  longitude: null,
							  positionId:null,
							  popup:null,
							  input1: ((value.attributes.input1 == null || value.attributes.input1 == "") ? "input1" : value.attributes.input1),
							  input2: ((value.attributes.input2 == null || value.attributes.input2 == "") ? "input2" : value.attributes.input2)
							 });
							  
							  
			});
											
			if (devices.length >0) {
				doLastPositions();
				//doCheckNotifications();								
				
			} else {
				
				swal({
				  title: $.i18n("title_no_device"),
				  text: $.i18n("title_go_device_form"),
				  type: "info",
				  showCancelButton: true,
				  confirmButtonColor: "#2196F3",
				  confirmButtonText: $.i18n("title_yes_take_me"),
				  closeOnConfirm: true,
				  html: true
				},
				function(){
				  $(location).attr('href', "devices.php");
				});
				
			}
						
		}
	});

}


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
							  uniqueId : value.uniqueId});
							  
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


function getDriversProfile() {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "drivers/",
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
				  countDrivers++;			
			});
			
			$("#countDrivers").html(countDrivers);
						
		}
	});	    
	
}


function getMaintenanceProfile() {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "maintenance/",
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
				  countMaintenance++;			
			});
			
			$("#countMaintenance").html(countMaintenance);
						
		}
	});	    
	
}



function getUsersProfile() {
	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "users/",
		cache: false,		
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {		
			switch(response.status) {			
				case 400:
				//	doOpenAlertError($.i18n("message_user_not_permission"));
					break;
				case 401:
				//	doOpenAlertError($.i18n("message_user_unauthorized"));
					break;	
			 	default:
				//	doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
		success: function (response) {
						
			$.each( response, function( key, value ) {  				
				  countUsers++;			
			});
			
			$("#countUsers").html(countUsers);
						
		}
	});	    
	
}

function doLastPositions() {
	   
	if (sessionStorage.getItem('message_load_positions') == "0") {
		$.notify(
			'Updating ...', "success",
			{
				position: "right",
				clickToHide: false,
				autoHideDelay: 3000,
				showAnimation: 'slideDown',
				// show animation duration
				showDuration: 400,
				// hide animation
				hideAnimation: 'slideUp',
				// hide animation duration
				hideDuration: 200
			}
		);
	}
	 				
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "positions/",		
		contentType: 'application/json', 
		cache: false,		
/*		data:JSON.stringify({
          name:name,
          uniqueId:uid
        }),*/
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
			
			// Javascript sourced data
            dataSet.splice(0);            
            			
			$.each( response, function( key, value ) {											
				//dispositivo
				var dispositivo 			= findDevice(value.deviceId);

				var groupName       = "-";				
                if (dispositivo.groupId != null) {
					var res = findGroup(dispositivo.groupId);                    					
                    groupName = (res.length > 0?res[0].name:"-");
				}
				
				var communication 	= getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), dispositivo.status);
				var alarm 			= ((value.attributes.alarm != null?(value.attributes.alarm=="sos"?true:false):false)==true);
				var input1Active    = (value.attributes.input1== null?false:value.attributes.input1);
				var input2Active    = (value.attributes.input2== null?false:value.attributes.input2);
				var img  			= getIconImage(dispositivo.category, convertSpeed(value.speed, 'knots'), communication, alarm, (input1Active || input2Active));								      
				var icon 			= '<img src="'+ img +'" width="50px" height="50px"/>';
				
				var html = '<div class="btn-group">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:viewInfoDevice(' + value.id + ')"><i class="icon-search4"></i> '+ $.i18n("title_view")+'</a></li>';                
                html += '    	<li><a href="javascript:viewMapDevice(' + value.id +')"><i class="icon-earth"></i> '+ $.i18n("title_map")+'</a></li>';
                html += '    </ul>';
                html += '</div>';
							                
                dataSet.push([icon, dispositivo.name, dispositivo.uniqueId, groupName ,dispositivo.model, value.protocol, dispositivo.phone, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.latitude.toFixed(6), value.longitude.toFixed(6), value.address, convertSpeed(value.speed, 'knots')+findSpeedUnit(sessionStorage.getItem('speedUnit')).title, degToCompass(value.course), html]);			
				
			});
			
            $('.datatable-js').dataTable().fnDestroy();
			
            $('.datatable-js').dataTable({
				data: dataSet,
				colReorder: true,
				responsive: true,				
				columnDefs: [{ "visible": false, "targets": [5] }],			
				dom: 'Bfrtip',
		        buttons: [{extend: 'excelHtml5',
			               title: $.i18n("title_communications")
			              },{
                            extend: 'print',
                            text: $.i18n('button_print'), 
                            title:  $.i18n("title_communications"),
                            customize: function ( win ) {
                                var header = '<img src="'+sessionStorage.getItem('logomark')+'" style="position:absolute; top:0; right:0;" />';
								//'<span style="position:absolute;top:56px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+
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
								columns: [ 1, 2, 3, 4, 5, 6, 7, 8 ,9,10]
							}
						},{
							extend: 'colvis',
							text: 'Colunas', 
							columnText: function ( dt, idx, title ) {
								return (idx+1)+': '+title;
							}
						}
				]
			});    
			
			$('.btn-group').css("float", "right");
			            						
			clearTimeout(lastPositionsTimeOut);
	
			lastPositionsTimeOut = setTimeout(doLastPositions, parseInt(30) * 1000);
		//	
						
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
				
				var dispositivo = findDevice(value.deviceId);
				
				currentDevice = value.deviceId;
								
				var nocommunication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), dispositivo.status);
				
				
				var html = "<div style='font-weight:bold'>"+$.i18n("title_protocol")+":"+value.protocol+'</div><br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_identifier")+":"+dispositivo.uniqueId+'</div><br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_model")+":"+(dispositivo.model== null?'-':dispositivo.model)+'</div><br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_category")+":"+$.i18n("title_type_"+dispositivo.category)+'</div><br />'+						   
						   "<div style='font-weight:bold'>"+$.i18n("title_phone")+":"+(dispositivo.phone== null?'-':dispositivo.phone)+'</div><br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_device_time")+":"+moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss')+'</div><br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_coordinates")+":</div>"+value.latitude+', '+value.longitude+ '<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_address")+":</div>"+value.address+ '<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_speed")+":</div>"+convertSpeed(value.speed, 'knots')+findSpeedUnit(sessionStorage.getItem('speedUnit')).title+'<br />'+
						   "<div style='font-weight:bold'>"+$.i18n("title_course")+":</div>"+degToCompass(value.course)+'<br />';						   						   						  						  
				
				changeIconsAlerts(!nocommunication, value);
				
				$("#deviceInput1").html($.i18n("title_"+dispositivo.input1));
				$("#deviceInput2").html($.i18n("title_"+dispositivo.input2));
				
				var input1Active = (value.attributes.input1== null?false:value.attributes.input1);
				var input2Active = (value.attributes.input2== null?false:value.attributes.input2);
				
				
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

						   
				$("#titleViewDevice").html(' ' + dispositivo.name + (nocommunication==false?'&nbsp;&nbsp;&nbsp;<span class="label label-success">'+$.i18n("title_communication")+'</span>':'&nbsp;&nbsp;&nbsp;<span class="label label-warning">' +$.i18n("title_no_communication")+'</span>'));
				$("#bodyViewDevice").html(html);
				$("#btnViewDevice").click();
			});												
		}
	});		
	
}

function viewMapDevice(id) {
	
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
				
				var dispositivo = findDevice(value.deviceId);				
				var communication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), dispositivo.status);
				var alarm = ((value.attributes.alarm != null?(value.attributes.alarm=="sos"?true:false):false)==true);
				var img  = location.protocol + "//" + location.host+prefixpath+getIconImage(dispositivo.category, convertSpeed(value.speed, 'knots'), communication, alarm, false);
								
				changeIconsAlerts(!communication, value);
						   								
				$("#titleMapDevice").html(': ' + dispositivo.name + (communication==false?'&nbsp;&nbsp;&nbsp;<span class="label label-success">'+$.i18n("title_communication")+'</span>':'&nbsp;&nbsp;&nbsp;<span class="label label-warning">' +$.i18n("title_no_communication")+'</span>'));
				$("#footerMapDevice").html("<span style='font-weight:bold'>"+$.i18n("title_speed")+":</span>"+convertSpeed(value.speed, 'knots')+findSpeedUnit(sessionStorage.getItem('speedUnit')).title+'<br />'+
				"<span style='font-weight:bold'>"+$.i18n("title_address")+":</span>"+value.address);
				//$("#imgMapDevice").attr('src','https://maps.googleapis.com/maps/api/staticmap?key='+sessionStorage.getItem("googlekey")+'&zoom=17&size=850x512&maptype=hybrid&markers=icon:'+img+'|'+value.latitude+','+value.longitude+"&sensor=false&scale=2");
				$("#imgMapDevice").css('background-image','url(https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyATCg_k3dBkWpu8Fra9Mnpkhov9mlgeOGo&zoom=17&size=850x512&maptype=hybrid&markers=icon:'+img+'|'+value.latitude+','+value.longitude+"&sensor=false&scale=2)");
				$("#btnMapDevice").click();
			});												
		}
	});				
}

function doCheckNotifications() {
	
	var params = new Object();
   	params.userId = sessionStorage.getItem("userid");    
    
    $.ajax({
       type : "get",
		url : sessionStorage.getItem('url') + "users/notifications/",			
		data:JSON.stringify(params),
		contentType: 'application/json', 
		cache: false,
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {		
			switch(response.status) {			
				case 400:
//					doOpenAlertError('Usuário não possui permissão para esta operação.');
					break;
				case 401:
	//				doOpenAlertError('Usuário não autorizado.');
					break;	
			 	default:
		//			doOpenAlertError('Erro ao realizar operação!\n Contacte o suporte técnico.\n Erro:'+response.statusText);
					break;
			}
		},
        success: function (response) {
        	
        	// Javascript sourced data
            notifications.splice(0);

            $.each( response, function( key, value ) {
                
            	notifications.push({type : value.type,
							  		web  : value.web});
							              	
            });
            
            if (!listed) {
				doNotifications();
				listed=true;
			}                   

	   }

	});
						
}

function doNotifications() {
	var params = ""; 		
			
	$.each(devices,function(index, value){
        params += "deviceId="+value.deviceId+"&";
    });
    
    params += "type=allEvents&";	
	params += "from="+moment(moment().subtract(1,'m'), "DD/MM/YYYY hh:mm:ss").format().substr(0, 19) + ".000Z&";		
   	params += "to="+moment(moment().add(1,'m'), "DD/MM/YYYY hh:mm:ss").format().substr(0, 19) + ".000Z";
    
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "reports/events",
		data:params,
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
			
			var count = 0;
			$("#notifications_list li").html('');
			
			$.each( response, function( key, value ) {
			 ///aqui modifique 123
  				 dataSet.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), findDevice(value.deviceId).name, findEventType(value.type).name, (value.geofenceId>0?findGeofence(value.geofenceId).name:"")]);
  				value.requests;
				////fin
				if (findNotifications(value.type).web == true) {
	  				$.notify(
					  findDevice(value.deviceId).name + '\n' + findEventType(value.type).name, "success", 
					  { position:"right",
					  	clickToHide: true,
					  	autoHideDelay: 50000,
					  	showAnimation: 'slideDown',
					    // show animation duration
					    showDuration: 400,
					    // hide animation
					    hideAnimation: 'slideUp',
					    // hide animation duration
					    hideDuration: 200}
					);
					
					$('#notifications_list').append('<li><a href="#" class="notification-item"><span class="dot bg-warning"></span>['+findDevice(value.deviceId).name+'] '+moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss')+' -> '+findEventType(value.type).name+'</a></li>');
					
					count++;
															
				}								
				
			});										
			
			$("#notifications_count").html(count);
		}
	});
	
	clearTimeout(notificationTimeOut);
	
	notificationTimeOut = setTimeout(doNotifications,30000);

}

function findPopup(id) {
	return _.find(popups, function(obj) { return obj.id == id; });
}

function findDevicePosition(dispositivo) {
	return _.find(popups, function(obj) { return obj.deviceId == dispositivo; });
}


/**
 * Carrega lista dos grupos
 * 
 * 
 * @return void
 */

function getGroupsDevices() {

	$.ajax({
		type: "GET",
		url: sessionStorage.getItem('url') + "groups/",
		cache: false,
		headers: {
			"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
		},
		error: function (response) {
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
		success: function (response) {

			groups.splice(0);
			
			$.each(response, function (key, value) {
				groups.push({groupId : value.id,
							 name    : value.name});
			});

			doListDevices();

		}
	});

}
