var dataSet = [];

$(document).ready(function () {

    /**
     * Check status of session of user
     */
    checkSession();

    checkPermission();

    loadSwitchery();


    $('.datatable-js').dataTable({
        columnDefs: []
    });

    localFormClear();

    $('#form_data').validate({
        errorElement: 'span',
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {
            attributeId: {
                required: true
            },
            deviceId: {
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
            } else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            }
            // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {},
        invalidHandler: function (form) {}
    });

    $('button[name="btnSave"]').click(function () {
        if ($('#form_data').valid()) {
            doSaveAttributeDevices();
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    $(".select-find").select2({
            allowClear: false,
            placeholder: $.i18n("title_select2"),
            language: "es"
        })
        .on('change', function () {
            doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));
            listAttributesDevices(this.value, true);
        });

    getAttributesDevices();

    getDevices();

});

/**
 * Carrega listagem de dados
 *
 * @return void
 */

function listAttributesDevices(deviceId, sc) {

    var params = new Object();
    params.deviceId = deviceId;

    var dados = JSON.stringify(params);

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "attributes/computed/",
        data: params,
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

            // Javascript sourced data
            dataSet.splice(0);

            $.each(response, function (key, value) {

                var html = '<div class="btn-group"  style="float: right">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doDeleteAttributesDevices(\'' + value.id + '\',\'' + deviceId + '\')"><i class="icon-trash"></i> ' + $.i18n("title_delete") + '</a></li>';
                html += '    </ul>';
                html += '</div>';
                
                  var attribute = $.i18n("title_"+value.attribute);
                 //var type = $.i18n("title_"+value.type);
                  //var expression = $.i18n("title_"+value.expression);
                  var type = $.i18n("title_"+value.type);

                dataSet.push([value.id, value.description, attribute, type, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                responsive: true,
                dom: 'Blfrtip',
                colReorder: true,
                buttons: [{
                    extend: 'excelHtml5',
                    title: $.i18n("title_devices_aliases"),
                    exportOptions: {
                        columns: [0, 1,2,3]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("title_devices_aliases"),
                    customize: function (win) {
                        var header = '<span style="position:absolute;top:56px;left:0;"><b>'+$.i18n('title_device')+':</b>'+$("#deviceIdFind").select2('data').text +'</span>'+
                                     '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';
                                     
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
                        columns: [0, 1,2,3]
                    }
                }]
            });

            if (sc) {
                doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);
            }

        }

    });


}


/**
 * Grava formulario no banco de dados
 *  
 * @return void
 */

function doSaveAttributeDevices() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var form = $("#form_data").serializeObject();

    var params = new Object();
    params.deviceId = form.deviceId;
    params.attributeId = form.attributeId;

    $.ajax({
        type: "POST",
        url: sessionStorage.getItem('url') + "permissions",
        data: JSON.stringify(params),
        contentType: 'application/json',
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

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);

            var deviceId = params.deviceId;

            localFormClear();

            setTimeout(function () {

                $("#deviceIdFind").select2("val", deviceId);
                listAttributesDevices(deviceId, false);
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

function doDeleteAttributesDevices(attributeId, deviceId) {

    swal({
            title: $.i18n("title_confirm_delete"),
            text: $.i18n("title_message_delete"),
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            closeOnConfirm: false
        },
        function () {

            doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));

            var params = new Object();
            params.deviceId = deviceId;
            params.attributeId = attributeId;

            $.ajax({
                type: "DELETE",
                url: sessionStorage.getItem('url') + "permissions/",
                data: JSON.stringify(params),
                contentType: 'application/json',
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

                    doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);

                    listAttributesDevices(deviceId, false);

                }

            });
        });

}

/**
 * Carrega lista daos atributos
 * 
 * 
 * @return void
 */

function getAttributesDevices() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "attributes/computed",
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

            limpaSelect("attributeId");

            $.each(response, function (key, value) {
                insertOption("attributeId", value.id, value.description);
            });

        }
    });

}


function localFormClear() {
    doFormClear();

    $("#attributeId").select2("val", "");
    $("#deviceId").select2("val", "");
    $("#deviceIdFind").select2("val", "");

    dataSet.splice(0);

    $('.datatable-js').dataTable().fnDestroy();

    $('.datatable-js').dataTable({
        data: dataSet,
        columnDefs: []
    });

}