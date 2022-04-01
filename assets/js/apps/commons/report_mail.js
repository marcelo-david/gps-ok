var dataSet = [];

var ulSpeed = new ySpeed();



$(document).ready(function () {



	/**

	 * Check status of session of user

	 */

	checkSession();

	

    localFormClear();



    loadSwitchery();

    //doListDevices();

    

        $('#period').on('change', function(e) {



        let timeOfTerms = {

            TODAY: {

                term: 'day',

            },

            WEEK: {

                term: 'week',

            },

            MONTH: {

                term: 'month',

                subtract: true

            },

        }



        let term = timeOfTerms[e.val], fromDate, toDate;



        if (term) {

            fromDate = moment().startOf(term.term)

            toDate = moment().endOf(term.term);



            if (term.subtract) {

                fromDate = fromDate.subtract(1, term.term + 's');

                toDate = toDate.subtract(1, term.term + 's');

            }

            $('.term-controls').addClass('hidden');

        } else {

            $('.term-controls').removeClass('hidden');

        }



        $('#from').val('').bootstrapMaterialDatePicker('setDate', fromDate);

        $('#to').val('').bootstrapMaterialDatePicker('setDate', toDate);

    });

    /**

     * parameters this page

     */





	

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

                doPrepareSumary();

            });

        };

    });



    $('button[name="btnClear"]').click(function () {

        localFormClear();

    });

         

    getDevicesSummary();



});



   $('.datetimepicker').bootstrapMaterialDatePicker({

        format: 'DD/MM/YYYY',

        time: false,

        clearButton: true,

        weekStart: 1,

        lang : (sessionStorage.getItem('language')=='en'?'en':sessionStorage.getItem('language'))

    });



/**

    * Carrega listagem de dados

    *

    * @return void

    */



function doPrepareSumary() {

	

	doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));



    var form = $("#form_report").serializeObject();    	    

    var params = "";				



    //prepare list devices

    var deviceIds = $('#deviceId option:selected');    

    $(deviceIds).each(function(index, deviceId){

        if($(this).val() != "") {

            params += "deviceId="+$(this).val()+"&";

        }

    });



    //prepare list groups

	var groups = $('#groupId option:selected');    

    $(groups).each(function(index, group){

        if($(this).val() != "") {

            params += "groupId="+$(this).val()+"&";        

        }

    });

					 	

	var data_ini = moment(form.from, "DD/MM/YYYY hh:mm:ss");

    var data_end = moment(form.to, "DD/MM/YYYY hh:mm:ss");

    

	params += "from="+data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&"; 

   	params += "to="+data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";    		   	

   	

	$.ajax({

		type : "GET",

		url : sessionStorage.getItem('url') + "reports/summary",

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



            $.each(response, function (key, value) {

            	//Costo hace la suma distancia recorrida / autonomia de vehiculo ejemplo 8 * costo gasolina

                //Ejemplo  48.60 / 8 * 30 =                

            	//var fuelCost = 0;

            	var fuelCost = 0;

            	var device   = findDeviceByName(value.deviceName);

            	var fuel     = device.fuel;

            	var autonomy = device.autonomy;

            	            	

            	if (autonomy > 0) {

            		var fuelCost = (((value.distance/1000) / autonomy) * parseFloat(sessionStorage.getItem(fuel)));

            	}

            	

                dataSet.push([value.deviceName, convertMeters(value.distance, sessionStorage.getItem('distanceUnit')), hhmmss(value.engineHours, 'milliseconds'), convertSpeed(value.maxSpeed, 'knots'), convertSpeed(value.averageSpeed, 'knots'), parseFloat(fuelCost).toFixed(2)]);

            });



            $('.datatable-js').dataTable().fnDestroy();

            

            $('.datatable-js').dataTable({

                data: dataSet,

                columnDefs: [],

                colReorder: true,

                responsive: true,

                dom: 'Blfrtip',

		        buttons: [{extend: 'excelHtml5',

			               title:  $.i18n("title_reports_summary")

			              },{

                            extend: 'print',

                            text: $.i18n('button_print'), 

                            title:  $.i18n("title_reports_summary"),

                            customize: function ( win ) {

                                var header = '<span style="position:absolute;top:53px;left:0;">'+$.i18n('title_period')+':'+$("#from").val() + " => " + $("#to").val()+'</span>'+

                                           //  '<img src="'+sessionStorage.getItem('logomark')+'" style="position:absolute; top:0; right:0;" />';

                                           '<img src="http://127.0.0.1/index/assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';



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

				insertOption("deviceId", value.id, value.name);

				

				devices.push({deviceId : value.id,

							  name     : value.name,

							  category : value.category,

							  uniqueId : value.uniqueId,

							  fuel     : (value.attributes.fuel==null?"gasoline":value.attributes.fuel),

							  autonomy : (value.attributes.autonomy==null?0:value.attributes.autonomy)});

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