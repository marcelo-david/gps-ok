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
            description: {
                required: true
            },
            type: {
                required: true
            },
            expression: {
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
        if ($('#form_data').valid()) { doSaveAliases(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });    
    
    $(".select-find").select2({ allowClear: false, placeholder: $.i18n("title_select2"), language: "en" })
	.on('change', function () {
		doOpenAlertWait('Wait...', 'Loading data.');
	    
    });	    
    
   // getAttributes();

    listAliases();

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function listAliases() {

    var params = new Object();       
    
   $.ajax({
		type : "get",
		url : sessionStorage.getItem('url') + "attributes/computed",
		data:JSON.stringify(params), 		
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

            // Javascript sourced data
            dataSet.splice(0);            

            $.each(response, function (key, value) {

                var html = '<div class="btn-group"  style="float: right">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';                
                html += '    	<li><a href="javascript:doEditAliases(' + value.id + ')"><i class="icon-cogs"></i> Edit</a></li>';
                html += '    	<li><a href="javascript:doDeleteAliases(\'' + value.id + '\')"><i class="icon-trash"></i> Delete</a></li>';
                html += '    </ul>';
                html += '</div>';
                
                 var attribute = $.i18n("title_"+value.attribute);
                 //var type = $.i18n("title_"+value.type);
                  //var expression = $.i18n("title_"+value.expression);
                  var type = $.i18n("title_"+value.type);

                dataSet.push([value.id, value.description, attribute, type, value.expression, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                responsive: true,
                columnDefs: [],
                dom: 'Blfrtip',
                colReorder: true,
                "columnDefs": [                    
                 //   {
                  //      "targets": [  ],
                        //"visible": false
                  //  }
                ],
                buttons: [{
                    extend: 'excelHtml5',
                    title: 'Atributos calculados',
                    exportOptions: {
                        columns: [0, 1, 2, 3,4,5]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: 'Atributos calculados',
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
                        columns: [0, 1, 2, 3,4,5]
                    }
                }]
            });  
                        
            doOpenAlertSucess('Loading!', 'Successfully uploaded data', 1500);            

        }

    });


}


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doSaveAliases() {

    doOpenAlertWait('Wait...', 'Saving informatation');

    var pars = $("#form_data").serializeObject();
		pars.id = (!$("#id").val()?null:$("#id").val());						
		
    $.ajax({
        type : (!$("#id").val()?"POST":"PUT"),
		url : sessionStorage.getItem('url') + "attributes/computed/"+$("#id").val(),
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
				case 404:
					doOpenAlertError($.i18n("message_user_no_matching"));
					break;			
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
			}
		},
        success: function (response) {

            doOpenAlertSucess('Exit!', 'Successfully uploaded data', 1500);
            
            localFormClear();

            setTimeout(function () {            	            	            	            
                listAliases();
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

function doDeleteAliases(id) {

    swal({
        title: "Confirm the deletion?",
        text: "After deleting the record cannot be recovered!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function () {

        doOpenAlertWait('Wait ...', 'Saving record!');

        $.ajax({
            type: "DELETE",
            url : sessionStorage.getItem('url') + "attributes/computed/"+id,			
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
				case 404:
					doOpenAlertError($.i18n("message_user_no_matching"));
					break;			
			 	default:
					doOpenAlertError($.i18n("message_error_performing"));
					break;
				}
			},		            
            success: function (response) {               

          	  doOpenAlertSucess('Removed!', 'Successfully deleted registration.', 1500);

          	  listAliases();

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

function doEditAliases(id) {

    doOpenAlertWait('Wait ...', 'Loading record.');

    localFormClear();

    $.ajax({
       type : "get",
		url : sessionStorage.getItem('url') + "attributes/computed/",
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

            $.each( response, function( key, value ) {
            	
            	if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));                                         

                    $('input[name="description"]').val(value.description);

                    $("#attribute").select2("val", value.attribute);                    

                    $('textarea[name="expression"]').val(value.expression);                                       

                    $("#type").select2("val", value.type);
                   

            	}
                    
			});
            // finish fields

            doOpenAlertSucess('Exit!', 'Registration loaded with exit', 1500);

            $('#pane_form').click();


	   }

	});

}


//function getAttributes() {
  //  limpaSelect("attribute");
    
 //   $.each( attributesComputed, function( key, value ) {  				
 //       insertOption("attribute", value.key, value.key);  			
 //   });
//}


function localFormClear() {
    doFormClear();   
    $("#type").select2("val", "");     
    $("#attribute").select2("val", "");     
    
}