var dataSet = [];
var maintenance_start = 0;
var maintenance_interval = 0;
var server_attributes = [];
var created_at = moment().format('YYYY-MM-DD HH:mm:ss');
var photo;
var asPhoto = false;

var rules = [{
    name: {
        required: true
    },
    protocol: {
        required: true
    },
    category: {
        required: true
    },
    phone: {
        required: true
    },
    speedLimit: {
        required: true
    },
    uniqueId: {
        required: true
    },
     disabled: {
     required: true
            }
}];

$(document).ready(function() {

    /**
     * Check status of session of user
     */
    checkSession();

    checkPermission();

    if (sessionStorage.getItem('userLimit') == "-1") {
        $("#totalDistanceField").hide();
        $("#hoursField").hide();
        $("#odoField").hide();
    }

    localFormClear();

    loadSwitchery();

    $("#category").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "en",
        formatResult: format,
        formatSelection: format,
        escapeMarkup: function(m) { return m; }

    })

    $("#company").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "es",
        //formatResult: format,
        //formatSelection: format,
        //escapeMarkup: function(m) { return m; }

    })

    $("#color").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "en",
        //formatResult: format,
        //formatSelection: format,
        //escapeMarkup: function(m) { return m; }

    })


    $("#year").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "en",
        //formatResult: format,
        //formatSelection: format,
        //escapeMarkup: function(m) { return m; }

    })

    $("#brand").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "en",
        //formatResult: format,
        //formatSelection: format,
        //escapeMarkup: function(m) { return m; }

    })





    .on('change', function() {
        $(this).closest('form').validate().element($(this));
    });

    $('.datatable-js').dataTable({
        columnDefs: []
    });

    $('[name="phone"]').formatter({
        'pattern': '({{99}}) {{9999999999}}',
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

        invalidHandler: function(event, validator) { //display error alert on form submit   
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).closest('.select-search').addClass('border-warning');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).closest('.select-search').removeClass('border-warning');
        },

        success: function(e) {
            $(e).closest('.form-group').removeClass('error').addClass('info');
            $(e).remove();
            // e.addClass("validation-valid-label").text("Sucesso.");
        },

        errorPlacement: function(error, element) {
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

        submitHandler: function(form) {},
        invalidHandler: function(form) {}
    });

    $('button[name="btnSave"]').click(function() {
        if ($('#form_data').valid()) {
            doSaveDevices();
        };
    });

    $('button[name="btnClear"]').click(function() {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function() {
        refreshGridDevices();
    });

    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'left');

    $('#preview_photo').click(function() {
        $("#fileUpload").click();
    });

    $("#fileUpload").change(function() {

        //Para guardar la imagen
        var file_data = $('#fileUpload').prop('files')[0];

        var diveceiId = $('#uniqueId').val();

        var fileExtension = ['jpg', 'png', 'gif'];

        var ext = $(this).val().split('.');

        ext = ext[ext.length - 1].toLowerCase();

        if (fileExtension.lastIndexOf(ext) > -1) {

            var selectedFile = this.files[0];

            if (selectedFile.size > 150000000) {
                doOpenAlertError($.i18n("title_upload_photo_limit"));
            } else {

                doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

                var formData = new FormData();

                formData.append('option', 'profile');
                formData.append('userid', diveceiId);
                formData.append('prefix', prefixpath);
                formData.append('file', file_data);
                $("#preview_photo").prop("src", '').css('height', '125px').css('width', '200px').css('float', 'left');

                $.ajax({
                    url: "assets/apps/commons/upload_devices.php",
                    type: 'POST',
                    data: formData,
                    success: function(data) {
                        alert(data)
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    xhr: function() { // Custom XMLHttpRequest
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                            myXhr.upload.addEventListener('progress', function() {
                                /* faz alguma coisa durante o progresso do upload */
                            }, false);
                        }
                        return myXhr;
                    },
                    success: function(response) {

                        if (response != 0) {
                            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sended"), 1500);

                            photo = response;
                            console.log('response=' + response)
                                //$("#profile_photo").attr('src', 'assets/img/devices/' + photo);
                            $("#preview_photo").prop("src", 'assets/img/devices/' + photo);
                            asPhoto = true;
                            /*
                            var selectedFile = this.files[0];
                            selectedFile.convertToBase64(function(base64) {
                                $("#preview_photo").attr('src', base64).css('height', '125px').css('width', '200px').css('float', 'right');
                                photo = response;
                                asPhoto = true;

                            });*/

                            /*$("#profile_photo").attr('src', 'assets/img/users/' + sessionStorage.getItem('userid') + '.jpg');
                            $("#user_photo").attr('src', 'assets/img/users/' + sessionStorage.getItem('userid') + '.jpg');

                            $("#profile_photo").attr('src', $("#profile_photo").attr('src') + '?' + Math.random());
                            $("#user_photo").attr('src', $("#user_photo").attr('src') + '?' + Math.random());
*/
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

    getCategories();

    getGroups();

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
        /**		data:params, */
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
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
        success: function(response) {

            // Javascript sourced data
            dataSet.splice(0);

            $.each(response, function(key, value) {
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

                var category = (value.category === null) ? 'default' : (findCategoryType(value.category).img) ? findCategoryType(value.category).img : 'default';

                var plate = ("plate" in value.attributes ? value.attributes.plate : '');
                var brand = ("brand" in value.attributes ? value.attributes.brand : '');
                var year = ("year" in value.attributes ? value.attributes.year : '');
                var color = ("color" in value.attributes ? value.attributes.color : '');
                var serie = ("serie" in value.attributes ? value.attributes.serie : '');
                var comment = ("comment" in value.attributes ? value.attributes.comment : '');
                var created_at = ("created_at" in value.attributes ? value.attributes.created_at : '');
                var photo = ("photo" in value.attributes ? value.attributes.photo : '');
               
               
                if(photo == ""){
                    ruta = "assets/img/sin-imagen.jpg";
                }else{
                    ruta = "assets/img/devices/" + photo;
                }
               
                dataSet.push([value.id, ('<img src="'+ruta+'"  width="50" height="50">'), value.name, groupName, value.uniqueId, category, created_at, plate, value.phone, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                dom: 'Blfrtip',
                lengthMenu: [
                    [10, 25, 50, 100, 200, 500, -1],
                    ['10', '25', '50', '200', '500', 'Todos']
                ],
                responsive: true,
                colReorder: true,
                buttons: [
                
                /*{
                    extend: 'excelHtml5',
                    title: $.i18n("title_devices"),
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    }
                },
                */ {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("title_devices"),
                    customize: function(win) {
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
                       // quite la columna de imagen del reporte  columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        columns: [0, 2, 3, 4, 5, 6, 7]
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
    
    laphoto = "";
    if (asPhoto == true) {
        laphoto = photo;
    }
    
    var it_price = parseFloat($("#speedLimit").val() / 1.852000);
    var spe = it_price * 1;
    vel = $("#speedLimit").val()
    vel = vel / 1.852000
    var stringUno = vel;

    valores = JSON.stringify({
        id: (!$("#id").val() ? null : $("#id").val()),
        name: $("#name").val(),
        uniqueId: $("#uniqueId").val(),
        phone: $("#phone").val(),
        model: $("#model").val(),
        contact: $("#contact").val(),
        category: $("#category").val(),
        disabled: $("#disabled").val(),
        groupId: $("#groupId").val(),
        attributes: {
        fuel: $("#fuel").val(),
        autonomy: $("#autonomy").val(),
        input1: $("#input1").val(),
        input2: $("#input2").val(),
        input3: $("#input3").val(),
        input4: $("#input4").val(),
        plate: $("#plate").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        color: $("#color").val(),
        company: $("#company").val(),
        company1: $("#company1").val(),
        subcompany: $("#subcompany").val(),
        created_at: created_at,
        protocol: $("#protocol").val(),
        serie: $("#serie").val(),
        comment: $("#comment").val(),
        output1: $("#output1").val(),
        output2: $("#output2").val(),
        output3: $("#output3").val(),
        output4: $("#output4").val(),
        //"gt06.alternative": $("#gt06").val() == "true" ? true : false,
        //"h02.alternative": $("#h02").val() == "true" ? true : false,
        //gt06: $("#gt06").val(),
        //h02: $("#h02").val(),
        photo: laphoto,
        speedLimit: Number(stringUno) 
        }
    })
    
    var totalDistance = $("#totalDistance").val()
    var hours = $("#hours").val()
    var id = $("#id").val();


    //console.log(pars)
    delete pars.plate;
    delete pars.brand;
    delete pars.year;
    delete pars.color;
    delete pars.serie;
    delete pars.comment;
    delete pars.fuel;
    delete pars.company;
    delete pars.company1;
    delete pars.subcompany;
    delete pars.protocol;
    delete pars.autonomy;
    delete pars.speedLimit;
    delete pars.input1;
    delete pars.input2;
    delete pars.input3;
    delete pars.input4;
    delete pars.fileUpload;
    delete pars.gt06;
    delete pars.h02;
    delete pars.totalDistance;
    delete pars.hours;
    delete pars.disabled;
    delete pars.output1;
    delete pars.output2;
    delete pars.output3;
    delete pars.output4;
    //console.log(pars)

    $.ajax({
        type: (!$("#id").val() ? "POST" : "PUT"),
        url: sessionStorage.getItem('url') + "devices/" + $("#id").val(),
        data: valores,
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            mensaje = response.responseText;
            validacion = mensaje.split(" ");
            switch (response.status) {
                case 400:
                    if(validacion[0] == "Duplicate"){
                        doOpenAlertError("El dispositivo ya se encuentra registrado");
                    }else{
                        doOpenAlertError((/User device limit reached/i.test(response.responseText)) ? $.i18n("message_limit_reached") : $.i18n("message_user_not_permission"));
                    }   
                    break;
                case 401:
                   // doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                   // doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {


            var totalDistance = $("#totalDistance").val()
            var hours = $("#hours").val()
            var id = $("#id").val();

            doSaveOdometer(id, hours, totalDistance)

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);

            localFormClear();

            setTimeout(function() {
                refreshGridDevices();
            }, 1500);


        }

    });



}

function doSaveOdometer(id, hours, totalDistance) {
    //devices/11/accumulators

    hoursis = hours * 3600000 / 1
        
    totalDistance = totalDistance * 1000 / 1

    pars = { "deviceId": id, "totalDistance": totalDistance, "hours": hoursis }
    $.ajax({
        type: "PUT",
        url: sessionStorage.getItem('url') + "devices/" + id + "/accumulators",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(pars),
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    // doOpenAlert($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    // doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    //doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {

            //doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);
            //console.log('Lo guardo');
            //refreshGridDevices();

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

function doDeleteDevices(id) {

    swal({
            title: $.i18n("title_confirm_delete"),
            text: $.i18n("title_message_delete"),
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: $.i18n("title_yes"),
            cancelButtonText: $.i18n("title_no"),
            closeOnConfirm: false
        },
        function() {

            doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));

            $.ajax({
                type: "DELETE",
                url: sessionStorage.getItem('url') + "devices/" + id,
                contentType: "application/json; charset=utf-8",
                cache: false,
                headers: {
                    "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
                },
                error: function(response) {
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
                success: function(response) {

                    doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);

                    refreshGridDevices();

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

function doEditDevices(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));
    var posid = ""
    localFormClear();
    $("#field_photo").show();
    //console.log('lapos=' + id)

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "devices/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
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
        success: function(response) {

            $.each(response, function(key, value) {

                if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));

                    $('input[name="name"]').val(value.name);

                    $('input[name="uniqueId"]').val(value.uniqueId);

                    $('input[name="phone"]').val(value.phone);

                    $('input[name="model"]').val(value.model);

                    $('input[name="contact"]').val(value.contact);

                    $("#category").select2("val", value.category);

                    speed = (parseFloat(value.attributes.speedLimit)*1.852000)
                    
                    $('input[name="speedLimit"]').val((speed == null ? "" : speed));
                    //$('input[name="speedLimit"]').val((value.attributes.speedLimit == null ? "" : value.attributes.speedLimit));
                    
                    $("#fuel").select2("val", (value.attributes.fuel == null ? "gasoline" : value.attributes.fuel));

                    $('input[name="autonomy"]').val((value.attributes.autonomy == null ? "0" : value.attributes.autonomy));

                    maintenance_start = value.attributes['maintenance.start'];
                    maintenance_interval = value.attributes['maintenance.interval'];

                    $("#groupId").select2("val", value.groupId);

                    $("#input1").select2("val", (value.attributes.input1 == null ? "" : value.attributes.input1));

                    $("#input2").select2("val", (value.attributes.input2 == null ? "" : value.attributes.input2));
                    
                    $("#input3").select2("val", (value.attributes.input3 == null ? "" : value.attributes.input3));
                    
                    $("#input4").select2("val", (value.attributes.input4 == null ? "" : value.attributes.input4));
                    
                    $("#output1").select2("val", (value.attributes.output1 == null ? "" : value.attributes.output1));

                    $("#output2").select2("val", (value.attributes.output2 == null ? "" : value.attributes.output2));
                    $("#output3").select2("val", (value.attributes.output3 == null ? "" : value.attributes.output3));
                    $("#output4").select2("val", (value.attributes.output4 == null ? "" : value.attributes.output4));

                    $("#protocol").select2("val", (value.attributes.protocol == null ? "" : value.attributes.protocol));

                    $("#company").select2("val", (value.attributes.company == null ? "" : value.attributes.company));

                    //$("#gt06").select2("val", !("gt06" in value.attributes) ? "" : value.attributes.gt06);

                    //$("#h02").select2("val", !("h02" in value.attributes) ? "" : value.attributes.h02);

                    $('input[name="plate"]').val(!("plate" in value.attributes) ? "" : value.attributes.plate);

                    // $('input[name="brand"]').val(!("brand" in value.attributes) ? "" : value.attributes.brand);
                    $("#brand").select2("val", (value.attributes.brand == null ? "" : value.attributes.brand));
                    //$('input[name="year"]').val(!("year" in value.attributes) ? "" : value.attributes.year);
                    $("#year").select2("val", (value.attributes.year == null ? "" : value.attributes.year));
                    //$('input[name="color"]').val(!("color" in value.attributes) ? "" : value.attributes.color);
                    $("#color").select2("val", (value.attributes.color == null ? "" : value.attributes.color));
                    $('input[name="serie"]').val(!("serie" in value.attributes) ? "" : value.attributes.serie);
                    $('input[name="comment"]').val(!("comment" in value.attributes) ? "" : value.attributes.comment);
                    //$('input[name="created_at"]').val(!("created_at" in value.attributes) ? "" : value.attributes.created_at);
                    $("#disabled").select2("val", (value.disabled?"true":"false"));
                    
                  

                    posid = value.positionId

                    doOdometerHours(posid)
                    asPhoto = false;
                    photo = "";
                    photo = (value.attributes.photo == null ? "" : value.attributes.photo)
                    if (photo != '') {
                        asPhoto = true;
                        $("#field_photo").show();
                        $("#preview_photo").prop("src", "assets/img/devices/" + photo).css('height', '125px').css('width', '200px').css('float', 'right');
                    }

                    /*
                                        if (("photo" in value)) {

                                            if (value.photo != "") {
                                                $("#preview_photo").attr('src', value.photo).css('height', '125px').css('width', '200px').css('float', 'right');
                                                photo = value.photo;
                                            }

                                            asPhoto = true;
                                            $("#field_photo").show();
                                        }*/
                    created_at = (value.attributes.created_at == null ? moment().format('YYYY-MM-DD HH:mm:ss') : value.attributes.created_at);
                    $('input[name="company1"]').val(!("company1" in value.attributes) ? "" : value.attributes.company1);
                    $('input[name="subcompany"]').val(!("subcompany" in value.attributes) ? "" : value.attributes.subcompany);
                     

                    server_attributes = value.attributes;

                }

            });
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

            $('#pane_form').click();


        }

    });

    //posid = 
    //console.log('positionId=' + posid)
}


/**
 * Carrega registro para edicao
 * 
 * param id Integer 
 *
 * @return void
 */

function doShowPhoto(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "devices/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    //doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                   // doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                   // doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {

            $.each(response, function(key, value) {

                if (value.id == id) {


                    if (("photo" in value)) {

                        $("#displayPhotoTitle").html(value.name);
                        $("#displayPhotoPreview").attr("src", value.photo).css('height', '125px').css('width', '200px');
                        $("#displayPhoto").click();

                    } else {
                        doOpenAlertError('Vehiculo sin imagen');
                    }

                }

            });


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

    $.each(CategoryType, function(key, value) {
        insertOption("category", value.id, $.i18n("title_" + value.id));
    });

    $("#category").select2("val", "");
}

function format(state) {
    if (!state.id) { return state.text; }
    return '<img src="assets/img/icons/' + state.id.toLowerCase() + '.png" style="height: 24px; width: 24px;" /> ' + state.text;
}


function localFormClear() {
    doFormClear();

    $("#groupId").select2("val", "");
    $("#category").select2("val", "");
    $("#company").select2("val", "");
    $("#protocol").select2("val", "");
    $("#fuel").select2("val", "");
    $("#input1").select2("val", "");
    $("#input2").select2("val", "");
    $("#input3").select2("val", "");
    $("#input4").select2("val", "");
     $("#output1").select2("val", "");
     $("#output2").select2("val", "");
     $("#output3").select2("val", "");
     $("#output4").select2("val", "");
    //$("#gt06").select2("val", "");
    //$("#h02").select2("val", "");
    $("#year").select2("val", "");
    $("#color").select2("val", "");
    $("#brand").select2("val", "");
     $("#disabled").select2("val", "");
     $("#output1").select2("val", "");
     $("#output2").select2("val", "");

    asPhoto = false;
    photo = "";
    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'right');
    $("#field_photo").hide();
    //$("#field_photo").show();
}


/**
 * Busca la ultima posicion del dispositivo
 * 
 * param id Integer 
 *
 * @return void
 */

function doLastPosition(id) {

    params = '?id='.id
    var positionId = -1
    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "devices/",
        data: params,
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    //doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    //doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    //doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {

            //value.positionId[0]
            //console.log(response.length)
            $.each(response, function(key, value) {

                //console.log('key=' + key)
                //console.log('positionId=' + value.positionId)
                //console.log('lastUpdate=' + value.lastUpdate)
                //return 
                //positionId
                if (key == response.length - 1) {
                    positionId = value.positionId
                        //doOdometerHours(positionId)
                    console.log('positionId=' + positionId)
                    return positionId
                }

            });


        }

    });
    //console.log('final positionId=' + positionId)
    //doOdometerHours(posid)
    //return positionId
}

$(document).on('click', '#close-preview', function() {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function() {
            $('.image-preview').popover('show');
        },
        function() {
            $('.image-preview').popover('hide');
        }
    );
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function() {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Seleccionar");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function() {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function(e) {
            $(".image-preview-input-title").text("Cambiar");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});


function doOdometerHours(id) {

    params = '?id=' + id
    console.log('entro ' + id)

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "positions/",
        data: params,
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    //  doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    //  doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    // doOpenAlertError($.i18n("message_error_performing"));
                    break;
            }
        },
        success: function(response) {
            existe = 0
            $.each(response, function(key, value) {

                if (value.id == id) {
                    houstot = 0
                    if (value.attributes.hours) {
                       // houstot = value.attributes.hours / 3600000
                       //Convierto a Dias, horas Minutos
                      houstot = value.attributes.hours;
                    hoursOri = value.attributes.hours;
                    houstot = msToTime(houstot);
                    hoursOri = msToHours(hoursOri);
                        existe++
                    }
                    if (value.attributes.totalDistance) {
                        //totaltot = value.attributes.totalDistance / 1000
                        totaltot = (parseFloat(value.attributes.totalDistance)/1000).toFixed(2)
                        existe++
                    }
                    if (existe == 2) {
                        $('#miodometro').show();
                        $('input[name="totalDistance"]').val(totaltot);
                        $('input[name="hours"]').val(houstot);
                    } else {
                        $('#miodometro').hide();
                    }
                    //console.log('existe=' + existe)
                }
                //positionId

            });


        }

    });

}
function msToTime( ms ) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        var pad = function (n) { return n < 10 ? '0' + n : n; };

        var result = d + 'd ' + pad(h) + 'h ' + pad(m) + 'm';
        return result;
    }

    function msToHours(ms) {
      hour = parseFloat(ms * 0.0000002778);
      return hour;
    }