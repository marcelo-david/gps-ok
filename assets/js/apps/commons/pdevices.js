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

//    $('[name="mark"]').formatter({
//	    pattern: '{{(99)9999}}'
//	});
	
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
            userId: {
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
        if ($('#form_data').valid()) { doSavePDevices(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });    
    
    $(".select-find").select2({ allowClear: false, placeholder: $.i18n("title_select2"), language: "en" })
	.on('change', function () {
		doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));
	    listDevicesUsers(this.value);
	});	

    getDevicesPermissions();
    
    getUsers();

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function listDevicesUsers(userId) {

    var params = new Object();
       params.userId = userId;

    var dados = JSON.stringify(params);

   $.ajax({
		type : "get",
		url : sessionStorage.getItem('url') + "devices/",
		data:params, 		
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
                html += '    	<li><a href="javascript:doDeletePDevices(\'' + value.id + '\',\'' + userId + '\')"><i class="icon-trash"></i> ' +$.i18n("title_delete")+'</a></li>';
                html += '    </ul>';
                html += '</div>';

                //dataSet.push([value.id, value.name, value.uniqueId, findCategoryType(value.category).img + ' ' + findCategoryType(value.category).title, value.model, html]);
                var category = $.i18n("title_"+value.category);

                dataSet.push([value.id, value.name, value.uniqueId, category, value.model, html]);
            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                dom: 'Blfrtip',
                responsive: true,
                colReorder: true,
                buttons: [{
                    extend: 'excelHtml5',
                    title: $.i18n("title_pdevices"),
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("title_pdevices"),
                    customize: function (win) {
                        var header = '<span style="position:absolute;top:53px;left:0;"><b>'+$.i18n('title_user')+': </b>'+$("#userIdFind").select2('data').text +'</span>'+
                                   // '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';
                                    '<img src="https://tecknicos.com.mx/plataforma/assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

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
                        columns: [0, 1, 2, 3, 4]
                    }
                }]
            });  
            
            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

        }

    });


}


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doSavePDevices() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var obj = $("#form_data").serializeObject();
    
    var pars = new Object();        
        pars.userId = obj.userId;
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

            var userId = pars.userId;
            
            localFormClear();

            setTimeout(function () {            	            	
            	
            	$("#userIdFind").select2("val", userId);
                listDevicesUsers(userId);
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

function doDeletePDevices(deviceId, userId) {

    swal({
        title: $.i18n("title_confirm_delete"),
        text: $.i18n("title_message_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
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

          	  listDevicesUsers(userId);

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

function getDevicesPermissions() {

    var params = new Object();
        params.all = true;

        			
	$.ajax({
		type: "get",
		url: sessionStorage.getItem('url') + "devices/",
        cache: false,
        data:params,
		headers: {
			"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
		},
		error: function (response) {
			switch (response.status) {
				case 400:
					doOpenAlertError('Usuário não possui permissão para esta operação.');
					break;
				case 401:
					doOpenAlertError('Usuário não autorizado.');
					break;
				default:
					doOpenAlertError('Erro ao realizar operação!\n Contacte o suporte técnico.\n Erro:' + response.statusText);
					break;
			}
		},
		success: function (response) {

			limpaSelect("deviceId");
			//limpaSelect("deviceIdFind");

			$.each(response, function (key, value) {
                
				insertOption("deviceId", value.id, value.name);
				//insertOption("deviceIdFind", value.id, value.name);
				
				devices.push({deviceId : value.id,
					name     : value.name,
					category : value.category,
					uniqueId : value.uniqueId,
					input1   :(!('input1' in value.attributes)?"input1":value.attributes.input1),
					input2   :(!('input2' in value.attributes)?"input2":value.attributes.input2)
				   });
			});

		}
	});

}



function localFormClear() {
    doFormClear();

    $("#deviceId").select2("val", "");
    $("#userId").select2("val", "");
    $("#userIdFind").select2("val", "");
    
    dataSet.splice(0);
    
    $('.datatable-js').dataTable().fnDestroy();

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: []
    });
    
}