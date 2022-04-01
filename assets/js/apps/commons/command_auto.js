var dataSet = [];
var ulSpeed = new ySpeed();
var iniSelect = true;
var geofences = [];
var bandera;
var banderaCheckbox;
var banderaCheckboxM;
var banderaCheckboxMS;
var banderaMS;
var banderaM;

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



	
    $('#form_command_auto').validate({
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
        if ($('#form_command_auto').valid()) { 
                addCommandAuto();
        }
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();

        setTimeout(function(){
            $('#user_id').val(sessionStorage.getItem('userid'));
            $('#token').val(btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')));
        },1000);
    });
         
    
    
   
    $('#user_id').val(sessionStorage.getItem('userid'));
    $('#token').val(btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')));
    $('#tipeGeo').hide();
    $('#geofence').hide();
    $('#motorAcc').hide();
    $('#mov_stop').hide();
    $('#custom_command').hide();

    getDevicesSummary();

    getGeofencesGeofenceDevices();

    setTimeout(function() {
        listCommandAuto()
    }, 2000);

    var checkboxG = document.getElementById('geocercas');
    var checkboxM = document.getElementById('motor');
    var checkboxMS = document.getElementById('moving_stopped');
    banderaCheckboxM = checkboxM;
    banderaCheckbox = checkboxG;
    banderaCheckboxMS = checkboxMS;

    checkboxMS.addEventListener("change", validaCheckboxMS, false);

     function validaCheckboxMS(){
    var checked = checkboxMS.checked;
        if(checked){
            checkboxM.checked = false;
            checkboxG.checked = false;
            bandera = false;
            banderaM = false;
            banderaMS = true;
            $('#tipeGeo').hide();
            $('#geofence').hide();
            $('#mov_stop').show();
            $('#motorAcc').hide();
        }else{
            banderaMS = false;
            $('#mov_stop').hide();
        }
    }

    checkboxG.addEventListener("change", validaCheckbox, false);

    function validaCheckbox(){
    var checked = checkboxG.checked;
        if(checked){
            checkboxM.checked = false;
            checkboxMS.checked = false;
            banderaM = false;
            banderaMS = false;
            bandera = true;
            $('#tipeGeo').show();
            $('#geofence').show();
            $('#mov_stop').hide();
            $('#motorAcc').hide();
        }else{
            bandera = false;
            $('#tipeGeo').hide();
            $('#geofence').hide();
        }
    }

    

    $('#type').change(function () {

        $('#type option:selected').each(function () {
            var val = $(this).val();
            if (val == 'custom') {
                $('#custom_command').show();
            }else{
                $('#custom_command').hide();
            }
            
        });

    });     

    checkboxM.addEventListener("change", validaCheckboxM, false);

    function validaCheckboxM(){
    var checked = checkboxM.checked;
        if(checked){
            checkboxG.checked = false;
            checkboxMS.checked = false;
            banderaM = true;
            bandera = false;
            banderaMS = false;
            $('#motorAcc').show();
            $('#tipeGeo').hide();
            $('#geofence').hide();
            $('#mov_stop').hide();
        }else{
            banderaM = false;
            $('#motorAcc').hide();
        }
    }


    $('#deviceId').change(function () {

        $('#deviceId option:selected').each(function () {
            var val = $(this).val();
            
            getCommandTypes(val);
        });

    });     

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function listCommandAuto() {      		   	
   	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('host') + "/command_auto.php",
		//data: form,
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

            response = JSON.parse(response);

            if (response) {
                $.each(response, function (key, value) { 
                    if (value.user_id == sessionStorage.getItem('userid')) {
                        //console.log(value);
                        var html = '<div class="btn-group">';
                        html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                        html += '       <i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                        html += '    </button>';

                        html += '    <ul class="dropdown-menu dropdown-menu-right">';
                        html += '       <li><a href="javascript:doEditCommandAuto(' + value.id + ')"><i class="icon-cogs"></i> '+$.i18n("title_edit")+'</a></li>';
                        html += '       <li><a href="javascript:doDeleteCommandAuto(' + value.id + ')"><i class="icon-trash"></i>' +$.i18n("title_delete")+'</a></li>';
                        html += '    </ul>';
                        html += '</div>';

                        dataSet.push([findDevices(value.nombre_id).name, (value.geocerca_id == 0 ? "":findGeofences(value.geocerca_id).name), (value.tipo == null ? "":value.tipo), value.motor, value.moving_stopped, value.comando, value.tiempo_espera, value.status, moment(value.update_time).format('DD/MM/YYYY HH:mm:ss'), (moment(value.ultimo_envio).format('DD/MM/YYYY HH:mm:ss') == 'Invalid date' ? '':moment(value.ultimo_envio).format('DD/MM/YYYY HH:mm:ss')), (value.contador == null ? 0:value.contador),html]);
                    }               
                });

                $('.datatable-js').dataTable().fnDestroy();
                
                $('.datatable-js').dataTable({
                    data: dataSet,
                    columnDefs: [],
                    colReorder: true,
                    responsive: true,
                    dom: 'Blfrtip',
                    buttons: [
                    /*
                    {extend: 'excelHtml5',
                               title:  $.i18n("title_reports_summary")
                              },
                              */
                              
                              {
                                extend: 'print',
                                text: $.i18n('button_print'), 
                                title:  $.i18n("title_reports_summary"),
                                customize: function ( win ) {
                                    var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+
                                               //  '<img src="'+sessionStorage.getItem('logomark')+'" style="position:absolute; top:0; right:0;" />';
                                               '<img src="http://portal.gpssolution.in/login/assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

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
            } 
        }

    });

}

Array.prototype.unique = function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function addCommandAuto() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var data = $('#form_command_auto').serializeObject();

    if (bandera == true) {
        delete data.motorOnOff;
        delete data.moving_stop;
        bandera = false;
        banderaM = false;
        banderaMS = false;
    }

    if (banderaM == true){
        delete data.tipeGeo;
        delete data.geofence;
        delete data.moving_stop;
        bandera = false;
        banderaM = false;
        banderaMS = false;
    }

    if (banderaMS == true) {
        delete data.tipeGeo;
        delete data.geofence;
        delete data.motorOnOff;
        bandera = false;
        banderaM = false;
        banderaMS = false;
    }

    try{
        data.type = data.type.unique();
    }catch(error){
        //console.log(error);
    }     

    data.type = data.type.toString();   

    var type = (data.command_auto_id == "" ? 'POST':'PUT');

    $.ajax({
        url: sessionStorage.getItem('host') + "/command_auto.php",
        data: data,
        type: type,
        cache: false,       
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
        dataType: 'text',
        success: function(resultado){
            if (resultado.indexOf("false") != -1) {
                swal({
                    title: "Error",
                    text: $.i18n("title_deviceid_commands_auto"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            }else {
                localFormClear();
                setTimeout(function(){
                    $('#user_id').val(sessionStorage.getItem('userid'));
                    $('#token').val(btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')));
                },1000);
                doOpenAlertSucess($.i18n("title_success"), $.i18n("command_auto_save"), 1500);
                listCommandAuto();
            }
            
         },
         error: function (jqXHR, textStatus) {
            alert("Error con el server");
         }

    });
}

function doEditCommandAuto(id){
    var data = $('#form_command_auto').serializeObject();

    $.ajax({
        url: sessionStorage.getItem('host') + "/command_auto.php",
        type: "get",
        cache: false,       
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
        dataType: 'text',
        success: function(resultado){
            response = JSON.parse(resultado);            

            $.each(response, function (key, value) {
                if(value.id == id){
                    $('#deviceId').select2('val', value.nombre_id);
                    try{
                        getCommandTypes(value.nombre_id);
                    }catch(error){
                        console.log(error);
                    }                
                    
                    
                    $('#time').val(value.tiempo_espera);
                    $('#status').select2('val', value.status);                    
                    $('#custom').select2('val', (value.custom == null ? "":value.custom));
                    
                    if (value.motor) {
                        banderaCheckbox.checked = false;
                        banderaCheckboxM.checked = true;
                        banderaCheckboxMS.checked = false;
                        bandera = false;
                        banderaMS = false;
                        banderaM = true;
                        $('#motorOnOff').val(value.motor);
                        $('#mov_stop').hide();
                        $('#tipeGeo').hide();
                        $('#geofence').hide();
                        $('#motorAcc').show();                        
                    }

                    if (value.tipo){
                        banderaCheckbox.checked = true;
                        banderaCheckboxM.checked = false;
                        banderaCheckboxMS.checked = false;
                        banderaM = false;
                        banderaMS = false;
                        bandera = true;
                        $('#type_geo').select2('val', (value.tipo == null ? "":value.tipo));
                        $('#geofenceId').select2('val', (value.geocerca_id == null ? "":value.geocerca_id));
                        $('#motorAcc').hide();
                        $('#mov_stop').hide();
                        $('#tipeGeo').show();
                        $('#geofence').show();
                    }

                    if (value.moving_stopped){
                        banderaCheckbox.checked = false;
                        banderaCheckboxM.checked = false;
                        banderaCheckboxMS.checked = true;
                        bandera = false;
                        banderaM = false;
                        banderaMS = true;
                        $('#moving_stop').select2("val", value.moving_stopped);
                        $('#motorAcc').hide();
                        $('#mov_stop').show();
                        $('#tipeGeo').hide();
                        $('#geofence').hide();
                    }                     
                    
                    $('#command_auto_id').val(value.id);
                }
                
            });
            
         },
         error: function (jqXHR, textStatus) {
            alert("Error con el server");
         }

    });
}

function doDeleteCommandAuto(id){

    swal({
        title: $.i18n("title_confirm_delete"),
        text: $.i18n("title_message_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: true
    },
    function () {
        localFormClear();
        $.ajax({
            url: sessionStorage.getItem('host') + "/command_auto.php",
            type: "DELETE",
            data: {id: id},
            cache: false,       
            headers: {
                "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
            },
            dataType: 'text',
            success: function(resultado){               
                
                setTimeout(function(){                    
                    listCommandAuto();
                    $('#user_id').val(sessionStorage.getItem('userid'));
                    $('#token').val(btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password')));
                },2000);
                            
             },
             error: function (jqXHR, textStatus) {
                alert("Error con el server");
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

function getDevicesSummary() {
	
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
                if (iniSelect == true) {
                    insertOption("deviceId", value.id, value.name);
                 			
    				devices.push({
                        deviceId : value.id,
					    name     : value.name
					});

			    }
            });

            iniSelect = false;
						
		}
	});	    
	
}

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

              let resultDeviceId = removeDuplicates(response,"deviceId");
			
			$.each( resultDeviceId, function( key, value ) { 
               				
				insertOption("deviceId", value.id, value.name);
				
				devices.push({deviceId : value.id,
							  name     : value.name,
							  category : value.category,
							  uniqueId : value.uniqueId});
                
			});

            
			
			
						
		}
	});	    
	
}

function getGeofencesGeofenceDevices() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "geofences/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
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

            limpaSelect("geofenceId");

            geofences = response;

            $.each(response, function (key, value) {
                insertOption("geofenceId", value.id, value.name);
            });

        }
    });

}

function findGeofences(id){
    return _.find(geofences, function (obj) {
        return obj.id == id;
    });
}

function findDevices(id){    
    return _.find(devices, function (obj) {
        return obj.deviceId == id;
    });
}

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
            						

			var x = document.getElementById('type');

            $.each(x, function(key, value){
                if (key != 0) {
                    x.remove(x[key]); 
                }                                              
            });

            removeDuplicates(response, 'type');
			
			$.each( response, function( key, value ) {
                var temp = value.type;
                if (temp = value.type) {
                    insertOption("type", value.type,$.i18n("title_" + value.type));
                }  	
				  			
			});
						
		}
	});	    
	
}

function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#type").select2("val", "");
    $("#type_geo").select2("val", "");
    $("#status").select2("val", "");
    $("#geofenceId").select2("val", "");
    $("#time").select2("val", "");
    $('#command_auto_id').val("");
    $('#motorOnOff').select2("val", "");
    $('#moving_stop').select2("val", "");    
    $('#tipeGeo').hide();
    $('#geofence').hide();
    $('#motorAcc').hide();
    $('#custom_command').hide();
    $('#mov_stop').hide();
    if(document.getElementById('geocercas').checked){
        document.getElementById('geocercas').checked = false;
    }

    if(document.getElementById('moving_stopped').checked){
        document.getElementById('moving_stopped').checked = false;
    }
    
    if (document.getElementById('motor').checked) {
        document.getElementById('motor').checked = false;
    }

    bandera = false;
    banderaM = false;
    banderaMS = false;
    
        
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