var dataSet = [];
var ulSpeed = new ySpeed();

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

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1,
        lang : (sessionStorage.getItem('language')=='en'?'en':sessionStorage.getItem('language'))
    });

	
    $('#form_report').validate({
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
        if ($('#form_report').valid()) { 
        	
        	swal({
                title: $.i18n("title_generate_report"),
                text: "",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-info",
                confirmButtonText: $.i18n("title_yes"),
                cancelButtonText: $.i18n("title_no"),
                closeOnConfirm: false
            },
            function () {
                doPrepareInputs();
            });
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

         
    getDevicesInputs();

    getGroups();       

});

/**
    * Carrega listagem de dados
    *
    * @return void
    */

function doPrepareInputs() {
	
	doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));

    var form = $("#form_report").serializeObject();    	    
    var params = "type=allEvents&";				
        
    //prepare list devices
    var deviceIds = $('#deviceId option:selected');    
    $(deviceIds).each(function(index, deviceId){
        if ($(this).val() != "") {
            params += "deviceId="+$(this).val()+"&";
        }
    });

    //prepare list groups
	var groups = $('#groupId option:selected');    
    $(groups).each(function(index, group){
        if ($(this).val() != "") {
            params += "groupId="+$(this).val()+"&";
        }
    });    
		
    var data_ini = moment(form.from, "DD/MM/YYYY hh:mm:ss");
    var data_end = moment(form.to, "DD/MM/YYYY hh:mm:ss");
    
	params += "from="+data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&"; 
   	params += "to="+data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";    		   	
   	
	$.ajax({
		type : "GET",
		url : sessionStorage.getItem('url') + "reports/route",
		data:params,
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
            
            var speedUnit = findSpeedUnit(sessionStorage.getItem('speedUnit')).title;

            $.each(response, function (key, value) {
            	
            	var input1Active = (value.attributes.input1);
				var input2Active = (value.attributes.input2);
            	
            	if (input1Active) {
            		var device = findDevice(value.deviceId);            		
                	dataSet.push([findDevice(value.deviceId).name, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.address, (value.attributes.input1?$.i18n("title_on"):$.i18n("title_off")), convertSpeed(value.speed, 'knots')+ ' '+speedUnit, $.i18n("title_"+device.input1)]);
            	}
            	
            	if (input2Active) {
            		var device = findDevice(value.deviceId);            	
                	dataSet.push([findDevice(value.deviceId).name, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.address, (value.attributes.input?$.i18n("title_on"):$.i18n("title_off")), convertSpeed(value.speed, 'knots')+ ' '+speedUnit, $.i18n("title_"+device.input2)]);
            	}
            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                colReorder: true,
                responsive: true,
                dom: 'Blfrtip',
		        buttons: [{extend: 'excelHtml5',
			               title:  $.i18n("title_reports_inputs")
			              },{
                            extend: 'print',
                            text: $.i18n('button_print'), 
                            title:  $.i18n("title_reports_inputs"),
                            customize: function ( win ) {
                                var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+
                                             '<img src="assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

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
            
            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_message_generated"), 1500);

        }

    });


}

/**
 * Carrega lista dos devices
 * 
 * 
 * @return void
 */

function getDevicesInputs() {

	$.ajax({
		type: "get",
		url: sessionStorage.getItem('url') + "devices/",
		cache: false,
		headers: {
			"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
		},
		error: function (response) {
			switch (response.status) {
				case 400:
					doOpenAlertError('User does not have permission for this operation.');
					break;
				case 401:
					doOpenAlertError('Unauthorized user.');
					break;
				default:
					doOpenAlertError('Error performing operation!\n Contact technical support.\n Erro:' + response.statusText);
					break;
			}
		},
		success: function (response) {

			limpaSelect("deviceId");
			
			$.each(response, function (key, value) {
				insertOption("deviceId", value.id, value.name);
				
				devices.push({deviceId : value.id,
					name     : value.name,
					category : value.category,
					uniqueId : value.uniqueId,
					groupId  : value.groupId,
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
    $("#groupId").select2("val", "");    
 
    if (dataSet.length > 0) { $('.datatable-js').dataTable().fnDestroy(); }

    dataSet.splice(0);    

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: [],
        dom: 'Bfrtip',
        buttons: []
    }); 
 
}