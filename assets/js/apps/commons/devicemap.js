var dataSet = [];
//var maintenance_start = 0;
//var maintenance_interval = 0;
var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
var server_attributes = [];
//var photo;
///var asPhoto = false;

var rules = [{
    name: {
        required: true
    },
    category: {
        required: true
    },
    model: {
        required: true
    },
    speedLimit: {
        required: true
    },
     protocol: {
        required: true
    },
    uniqueId: {
        required: true
    }
}];

$(document).ready(function () {

    /**
     * Check status of session of user
     */
    checkSession();

    checkPermission();

    localFormClear();

    loadSwitchery();

    $("#category").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "es",
        formatResult: format,
        formatSelection: format,
        escapeMarkup: function(m) { return m; }
    
    })
    


    
    .on('change', function () {
        $(this).closest('form').validate().element($(this));
    });

    $('.datatable-js').dataTable({
        columnDefs: []
    });

    $('[name="phone"]').formatter({
        'pattern': '({{99}}) {{99999}}-{{9999}}',
        'persistent': true
    });

    $('[name="speedLimit"]').formatter({
        'pattern': '{{999}}'
    });

    $('[name="autonomy"]').formatter({
        'pattern': '{{99}}'
    });

    $('#speedUnit').html(findSpeedUnit(sessionStorage.getItem('speedUnit')).title);


    $('#form_data').validate({
        errorElement: 'span',
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: rules[0],
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
            doSaveDevices();
        };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    //$('a[name="lnkRefreshGrid"]').click(function () {
   //     refreshGridDevices();
   // });

    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'right');

    $('#preview_photo').click(function () {
        $("#fileUpload").click();
    });

    $("#fileUpload").change(function () {
        var selectedFile = this.files[0];
        selectedFile.convertToBase64(function (base64) {
            $("#preview_photo").attr('src', base64).css('height', '125px').css('width', '200px').css('float', 'right');
            photo = base64;
        });

    });

    getCategories();    

    //getGroups();

    refreshGridDevices();

});

/**
 * Carrega listagem de dados
 *
 * @return void
 */

function refreshGridDevices() {

    var params = new Object();
    params.id = '0';

    var dados = JSON.stringify(params);

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "devices/",
        
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function (response) {
            switch (response.status) {
                case 400:
                    //doOpenAlertError($.i18n("message_user_not_permission"));
                    doOpenAlertError((/Duplicate entry/i.test(response.responseText)) ? $.i18n("duplicate_entry_device") : $.i18n("duplicate_entry_device"));
                    break;
                case 401:
                    //doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                   // doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function (response) {

            // Javascript sourced data
            dataSet.splice(0);

            $.each(response, function (key, value) {
                var groupName = "-";
                if (value.groupId != null) {
                    var res = findGroup(value.groupId);
                    groupName = (res.length > 0 ? res[0].name : "-");
                }

                var html = '<div class="btn-group">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doEditDevices(' + value.id + ')"><i class="icon-cogs"></i> ' + $.i18n("title_edit") + '</a></li>';
                html += '    	<li><a href="javascript:doDeleteDevices(' + value.id + ')"><i class="icon-trash"></i>' + $.i18n("title_delete") + '</a></li>';
                if (("photo" in value)) { 
                    html += '    	<li><a href="javascript:doShowPhoto(' + value.id + ')"><i class="icon-picture"></i>' + $.i18n("title_photo") + '</a></li>';
                }
                html += '    </ul>';
                html += '</div>';

                var category = (value.category === null) ? 'default': (findCategoryType(value.category).img)?findCategoryType(value.category).img:'default';

                var plate = ("plate" in value.attributes?value.attributes.plate:'');

                dataSet.push([value.id, value.name, groupName, value.uniqueId, category, value.model, plate, value.phone, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                dom: 'Blfrtip',
                lengthMenu: [
                    [ 10, 25, 50, 100, 200, 500, -1 ],
                    [ '10', '25', '50', '200', '500', 'Todos' ]
                ],
                responsive: true,
                colReorder: true,
                buttons: [{
                    extend: 'excelHtml5',
                    title: $.i18n("title_devices"),
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    }
                }, {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("title_devices"),
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
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
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

function doSaveDevices() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var pars = $("#form_data").serializeObject();
    pars.id = (!$("#id").val() ? null : $("#id").val());
    pars.attributes = {
    created_at: created_at,
    protocol: $("#protocol").val()
};

    pars.attributes = mergeAttributes(pars.attributes, server_attributes);

      $.ajax({
        type: (!$("#id").val() ? "POST" : "PUT"),
        url: sessionStorage.getItem('url') + "devices/" + $("#id").val(),
        data: JSON.stringify(pars),
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError((/Duplicate entry/i.test(response.responseText)) ? $.i18n("duplicate_entry_device") : $.i18n("user_device_limit_reached"));
                   // doOpenAlert($.i18n("message_user_not_permission"));
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

            //setTimeout(function () {
           //     refreshGridDevices();
           // }, 1500);


        }

    });

}
/**
 * Carrega lista das categorias
 * 
 * 
 * @return void
 */

function getCategories() {

    limpaSelect("category");
	
    $.each(CategoryType, function (key, value) {
        insertOption("category", value.id, $.i18n("title_"+value.id));                
    });    

    $("#category").select2("val", "");
}

function format (state) {
    if (!state.id) { return state.text; }
    return '<img src="assets/img/icons/'+state.id.toLowerCase()+'.png" style="height: 24px; width: 24px;" /> '+state.text;
} 


function localFormClear() {
    doFormClear();

    $("#groupId").select2("val", "");
    $("#category").select2("val", "");
    $("#fuel").select2("val", "");
    $("#input1").select2("val", "");
    $("#input2").select2("val", "");
    $("#gt06").select2("val", "");
    $("#h02").select2("val", "");

    asPhoto = false;
    photo = "";
    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'right');
    $("#field_photo").hide();
}