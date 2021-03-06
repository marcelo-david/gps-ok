var dataSet = [];

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

   loadSwitchery();

    $('.datatable-js').dataTable({
        columnDefs: []
    });
    
	$('[name="speedLimit"]').formatter({
	    'pattern': '{{999}}'	    
	});
	
	$('#speedUnit').html(findSpeedUnit(sessionStorage.getItem('speedUnit')).title);

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
            name: {
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
        if ($('#form_data').valid()) { doSaveGroups(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function () {
        refreshGridGroups();
    });
                 
    refreshGridGroups();      

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function refreshGridGroups() {

    var params = new Object();
    params.id = '0';

   $.ajax({
		type : "get",
		url : sessionStorage.getItem('url') + "maintenance/",
/**		data:params, */		
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

                var html = '<div class="btn-group" style="float:right">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doEditGroups(' + value.id + ')"><i class="icon-cogs"></i> '+$.i18n("title_edit")+'</a></li>';
                html += '    	<li><a href="javascript:doDeleteGroups(' + value.id + ')"><i class="icon-trash"></i>' +$.i18n("title_delete")+'</a></li>';
                html += '    </ul>';
                html += '</div>';
                var type = $.i18n("title_"+value.type);

                dataSet.push([value.id, value.name, type, value.start, value.period, html]);

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
                    title: $.i18n("maintenance"),
                    exportOptions: {
                        columns: [0, 1,2,3,4]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("maintenance"),
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
                        columns: [0, 1,2,3,4]
                    }
                }]
            });           

        }

    });


}


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doSaveGroups() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var pars = $("#form_data").serializeObject();
		pars.id = (!$("#id").val()?null:$("#id").val());
		pars.attributes = { description: $("#description").val(),
							speedLimit: $("#speedLimit").val()    						
                          };        					
                          
        pars.attributes = mergeAttributes(pars.attributes, server_attributes);
		
		delete pars.speedLimit;
		delete pars.description;
		
    $.ajax({
        type : (!$("#id").val()?"POST":"PUT"),
		url : sessionStorage.getItem('url') + "maintenance/"+$("#id").val(),
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
                refreshGridGroups();
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

function doDeleteGroups(id) {

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

        $.ajax({
            type: "DELETE",
            url : sessionStorage.getItem('url') + "maintenance/"+id,			
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

          	  refreshGridGroups();

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

function doEditGroups(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));

    localFormClear();

    $.ajax({
       type : "get",
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
            	
            	if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));
                                        
                    $('input[name="name"]').val(value.name);      
                    
                     //$('input[name="type"]').val(value.type);
                      $("#type").select2("val", value.type);
                     
                     $('input[name="start"]').val(value.start);
                     
                     $('input[name="period"]').val(value.period);          
                    
                    //$('textarea[name="description"]').val((value.attributes.description== null?"":value.attributes.description));
                    
                    //$('input[name="speedLimit"]').val((value.attributes.speedLimit== null?"":value.attributes.speedLimit));

                    server_attributes =value.attributes;                    
            	}
                    
			});
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

            $('#pane_form').click();


	   }

	});

}

function localFormClear() {
    doFormClear();     
}