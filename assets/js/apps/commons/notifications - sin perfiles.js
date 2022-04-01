var dataSet = [];
var clearSwitch = false;
var listAlarms = [];
var paso = 0;
//var alarmas = ["lowPower", "lowBattery", "door", "sos","gpsAntennaCut", "powerCut", "powerRestored"];
var alarmas = [
"lowPower",
"lowBattery",
"door",
"sos",
"gpsAntennaCut",
"powerCut",
"powerRestored"
];


var mobileye = [
"mobileyeTsr",
"mobileyeFcw",
"mobileyePcw",
"mobileyeUfcw",
"mobileyeTamper",
"mobileyeError",
"mobileyeHmw",
"mobileyeLl",
"mobileyeLr",
"lockRing",
"lockClosed",
"lockOpen"
];


$(document).ready(function() {

    /**
     * Check status of session of user
     */
    checkSession();

    checkPermission();

    //prefix_url = (sessionStorage.getItem('version')=="315"?"":"users/");


    /**
     *initial parameters
     */
    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        columnDefs: [{
            orderable: false,
            width: '100px',
            targets: [5]
        }],
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            "decimal": "",
            "emptyTable": "Sem dados disponíveis na tabela",
            "info": "Mostrados de _START_ de _END_ de _TOTAL_ registros",
            "infoEmpty": "Exibindo de 0 de 0 de 0 registros",
            "infoFiltered": "(filtrado de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": '<span>Mostrar:</span> _MENU_',
            "loadingRecords": "Carregando...",
            "processing": "Processando...",
            "search": '<span>Filtrar:</span> _INPUT_',
            "zeroRecords": "Nenhum registro correspondente encontrado",
            "paginate": { 'first': 'Primeiro', 'last': 'Ultimo', 'next': '&rarr;', 'previous': '&larr;' },
            "aria": {
                "sortAscending": ": ativar para classificar coluna ascendente",
                "sortDescending": ": ativar para classificar a coluna descendente"
            }
        },
        drawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });

    // External table additions
    // ------------------------------

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Digite para filtrar...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

    $('.datatable-js').dataTable({
        columnDefs: []
    });

    localFormClear();

    /**
     * parameters this page
     */

    //    $('[name="mark"]').formatter({
    //      pattern: '{{(99)9999}}'
    //  });

    $('#form_data').validate({
        errorElement: 'span',
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {

        },
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
        if ($('#form_data').valid()) { doSaveNotifications(); };
    });

    $('button[name="btnReset"]').click(function() {
        clearSwitch = true;
        resetSwitch();
    });
    
    

    doListNotifications();
     doListNotifications1();
      doListNotifications2();

});


/**
 * Carrega registro para edicao
 *
 * param id Integer
 *
 * @return void
 */

function doListNotifications() {

    doOpenAlertWait('Espere ...', 'Cargando datos.');
    //console.log('Entro a doListNotifications')
    //localFormClear();

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "notifications/types",
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError('Usuario no permitido para realizar esta operacion.');
                    break;
                case 401:
                    doOpenAlertError('Usuario no autorizado.');
                    break;
                default:
                    doOpenAlertError('Error al realizar la operación! Contacte o soporte técnico.\n Erro:' + response.statusText);
                    break;
            }
        },
        success: function(response) {

            // Javascript sourced data

            dataSet.splice(0);

            $.each(response, function(key, value) {


                var web = '<div class="checkbox checkbox-switchery" data-animated="true">';
                web += '  <label>';
                web += '      <input type="checkbox" class="switchery" id="' + value.type + '_web" value="' + value.web + '" onclick="doSaveNotifications(\'' + value.type + '\')" ' + (value.web ? 'checked' : '') + ' />';
                web += '      &nbsp;';
                web += '  </label>';
                web += '</div>';

                var mail = '<div class="checkbox checkbox-switchery" data-animated="true">';
                mail += '  <label>';
                mail += '      <input type="checkbox" class="switchery" id="' + value.type + '_mail" value="' + value.mail + '" onclick="doSaveNotifications(\'' + value.type + '\')" ' + (value.mail ? 'checked' : '') + ' />';
                mail += '      &nbsp;';
                mail += '  </label>';
                mail += '</div>';

               var sms = '<div class="checkbox checkbox-switchery" data-animated="true">';
                sms += '  <label>';
                sms += '      <input type="checkbox" class="switchery" id="' + value.type + '_sms" value="' + value.sms + '" onclick="doSaveNotifications(\'' + value.type + '\')" ' + (value.sms ? 'checked' : '') + ' />';
                sms += '      &nbsp;';
                sms += '  </label>';
                sms += '</div>';

                var firebase = '<div class="checkbox checkbox-switchery" data-animated="true">';
                firebase += '  <label>';
                firebase += '      <input type="checkbox" class="switchery" id="' + value.type + '_firebase" value="' + value.firebase + '" onclick="doSaveNotifications(\'' + value.type + '\')" ' + (value.firebase ? 'checked' : '') + ' />';
                firebase += '      &nbsp;';
                firebase += '  </label>';
                firebase += '</div>';


                var telegram = '<div class="checkbox checkbox-switchery" data-animated="true">';
                telegram += '  <label>';
                telegram += '      <input type="checkbox" class="switchery" id="' + value.type + '_telegram" value="' + value.telegram + '" onclick="doSaveNotifications(\'' + value.type + '\')" ' + (value.telegram ? 'checked' : '') + ' />';
                telegram += '      &nbsp;';
                telegram += '  </label>';
                telegram += '</div>';

                dataSet.push([$.i18n("title_" + findEventType(value.type).id), web, mail, sms, firebase, telegram]);
                // dataSet.push([$.i18n("title_" + findEventType(value.type).id), web, mail]);

            });

           



            $('#datatable').dataTable().fnDestroy();

            $('#datatable').dataTable({
                data: dataSet,
                lengthMenu: [1000],
                pageLength: 1000,
                columnDefs: []
            });

            doListUserNotify();

        }

    });

}


function doListNotifications1() {

    doOpenAlertWait('Espere ...', 'Cargando datos.');
    //console.log('Entro a doListNotifications')
    //localFormClear();

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "notifications/types",
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError('Usuario no permitido para realizar esta operacion.');
                    break;
                case 401:
                    doOpenAlertError('Usuario no autorizado.');
                    break;
                default:
                    doOpenAlertError('Error al realizar la operación! Contacte o soporte técnico.\n Erro:' + response.statusText);
                    break;
            }
        },
        success: function(response) {

            // Javascript sourced data

            dataSet.splice(0);


            //var alarmas = ["lowPower", "lowbattery", "door", "gpsAntennaCut", "powerCut", "powerRestored"];

            for (i = 0; i < alarmas.length; i++) {


                var web = '<div class="checkbox checkbox-switchery" data-animated="true">';
                web += '  <label>';
                web += '      <input type="checkbox" class="switchery" id="' + alarmas[i] + '_web" value="' + alarmas[i] + '" onclick="doSaveNotifications(\'' + alarmas[i] + '\')"  />';
                web += '      &nbsp;';
                web += '  </label>';
                web += '</div>';

                var mail = '<div class="checkbox checkbox-switchery" data-animated="true">';
                mail += '  <label>';
                mail += '      <input type="checkbox" class="switchery" id="' + alarmas[i] + '_mail" value="' + alarmas[i] + '" onclick="doSaveNotifications(\'' + alarmas[i] + '\')"  />';
                mail += '      &nbsp;';
                mail += '  </label>';
                mail += '</div>';

                var sms = '<div class="checkbox checkbox-switchery" data-animated="true">';
                sms += '  <label>';
                sms += '      <input type="checkbox" class="switchery" id="' + alarmas[i] + '_sms" value="' + alarmas[i] + '" onclick="doSaveNotifications(\'' + alarmas[i] + '\')"  />';
                sms += '      &nbsp;';
                sms += '  </label>';
                sms += '</div>';

                var firebase = '<div class="checkbox checkbox-switchery" data-animated="true">';
                firebase += '  <label>';
                firebase += '      <input type="checkbox" class="switchery" id="' + alarmas[i] + '_firebase" value="' + alarmas[i] + '" onclick="doSaveNotifications(\'' + alarmas[i] + '\')"  />';
                firebase += '      &nbsp;';
                firebase += '  </label>';
                firebase += '</div>';


                var telegram = '<div class="checkbox checkbox-switchery" data-animated="true">';
                telegram += '  <label>';
                telegram += '      <input type="checkbox" class="switchery" id="' + alarmas[i] + '_telegram" value="' + alarmas[i] + '" onclick="doSaveNotifications(\'' + alarmas[i] + '\')"  />';
                telegram += '      &nbsp;';
                telegram += '  </label>';
                telegram += '</div>';

                //$('#datatable').dataTable().fnAddData(['Alarma ' + alarmas[i], web, mail, sms, firebase, telegram]);
                dataSet.push(['Alarma ' + $.i18n("title_"+alarmas[i]), web, mail, sms, firebase, telegram]);
                
                // dataSet.push(['Alarma ' + $.i18n("title_"+alarmas[i]), web, mail]);
                
                

            }



            $('#datatable1').dataTable().fnDestroy();

            $('#datatable1').dataTable({
                data: dataSet,
                lengthMenu: [1000],
                pageLength: 1000,
                columnDefs: []
            });

            //doListUserNotify();

        }

    });

}


function doListNotifications2() {

    doOpenAlertWait('Espere ...', 'Cargando datos.');
    //console.log('Entro a doListNotifications')
    //localFormClear();

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "notifications/types",
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError('Usuario no permitido para realizar esta operacion.');
                    break;
                case 401:
                    doOpenAlertError('Usuario no autorizado.');
                    break;
                default:
                    doOpenAlertError('Error al realizar la operación! Contacte o soporte técnico.\n Erro:' + response.statusText);
                    break;
            }
        },
        success: function(response) {

            // Javascript sourced data

            dataSet.splice(0);


            //var alarmas = ["lowPower", "lowbattery", "door", "gpsAntennaCut", "powerCut", "powerRestored"];

            for (i = 0; i < mobileye.length; i++) {


                var web = '<div class="checkbox checkbox-switchery" data-animated="true">';
                web += '  <label>';
                web += '      <input type="checkbox" class="switchery" id="' + mobileye[i] + '_web" value="' + mobileye[i] + '" onclick="doSaveNotifications(\'' + mobileye[i] + '\')"  />';
                web += '      &nbsp;';
                web += '  </label>';
                web += '</div>';

                var mail = '<div class="checkbox checkbox-switchery" data-animated="true">';
                mail += '  <label>';
                mail += '      <input type="checkbox" class="switchery" id="' + mobileye[i] + '_mail" value="' + mobileye[i] + '" onclick="doSaveNotifications(\'' + mobileye[i] + '\')"  />';
                mail += '      &nbsp;';
                mail += '  </label>';
                mail += '</div>';

                var sms = '<div class="checkbox checkbox-switchery" data-animated="true">';
                sms += '  <label>';
                sms += '      <input type="checkbox" class="switchery" id="' + mobileye[i] + '_sms" value="' + mobileye[i] + '" onclick="doSaveNotifications(\'' + mobileye[i] + '\')"  />';
                sms += '      &nbsp;';
                sms += '  </label>';
                sms += '</div>';

                var firebase = '<div class="checkbox checkbox-switchery" data-animated="true">';
                firebase += '  <label>';
                firebase += '      <input type="checkbox" class="switchery" id="' + mobileye[i] + '_firebase" value="' + mobileye[i] + '" onclick="doSaveNotifications(\'' + mobileye[i] + '\')"  />';
                firebase += '      &nbsp;';
                firebase += '  </label>';
                firebase += '</div>';


                var telegram = '<div class="checkbox checkbox-switchery" data-animated="true">';
                telegram += '  <label>';
                telegram += '      <input type="checkbox" class="switchery" id="' + mobileye[i] + '_telegram" value="' + mobileye[i] + '" onclick="doSaveNotifications(\'' + mobileye[i] + '\')"  />';
                telegram += '      &nbsp;';
                telegram += '  </label>';
                telegram += '</div>';

                //$('#datatable').dataTable().fnAddData(['Alarma ' + alarmas[i], web, mail, sms, firebase, telegram]);
                dataSet.push(['Alarma ' + $.i18n("title_"+mobileye[i]), web, mail, sms, firebase, telegram]);
                
                // dataSet.push(['Alarma ' + $.i18n("title_"+alarmas[i]), web, mail]);
                
                

            }



            $('#datatable2').dataTable().fnDestroy();

            $('#datatable2').dataTable({
                data: dataSet,
                lengthMenu: [1000],
                pageLength: 1000,
                columnDefs: []
            });

            doListUserNotify();

        }

    });

}


function doListUserNotify() {

    var params = new Object();
    params.userId = sessionStorage.getItem('userid');
    //console.log('doListUserNotify')

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "notifications",
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError('Usuario no permitido para realizar esta operacion.');
                    break;
                case 401:
                    doOpenAlertError('Usuario no autorizado.');
                    break;
                default:
                    doOpenAlertError('Error al realizar la operación! Contacte o soporte técnico.\n Erro:' + response.statusText);
                    break;
            }
        },
        success: function(response) {

            listAlarms.splice(0);

            $.each(response, function(key, value) {

                var type = value.type;

                //console.log('type=' + type)
                if (value.attributes.alarms) {
                    var alarmita = value.attributes.alarms
                        //console.log('atributos=' + value.attributes.alarms)

                    //var contenedor = alarmita.split(",");

                    var webCheckbox = document.querySelector('#' + alarmita + '_web');
                    var mailCheckbox = document.querySelector('#' + alarmita + '_mail');
                    var smsCheckbox = document.querySelector('#' + alarmita + '_sms');
                    var firebaseCheckbox = document.querySelector('#' + alarmita + '_firebase');
                    var telegramCheckbox = document.querySelector('#' + alarmita + '_telegram');

                    listAlarms.push({
                        id: value.id,
                        type: alarmita
                    });

                    webCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("web") !== -1 : false;
                    mailCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("mail") !== -1 : false;
                    smsCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("sms") !== -1 : false;
                    firebaseCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("firebase") !== -1 : false;
                    telegramCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("telegram") !== -1 : false;

                } else {
                    var webCheckbox = document.querySelector('#' + type + '_web');
                    var mailCheckbox = document.querySelector('#' + type + '_mail');
                   var smsCheckbox = document.querySelector('#' + type + '_sms');
                    var firebaseCheckbox = document.querySelector('#' + type + '_firebase');
                    var telegramCheckbox = document.querySelector('#' + type + '_telegram');

                    listAlarms.push({
                        id: value.id,
                        type: type
                    });

                    webCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("web") !== -1 : false;
                    mailCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("mail") !== -1 : false;
                    smsCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("sms") !== -1 : false;
                    firebaseCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("firebase") !== -1 : false;
                    telegramCheckbox.checked = (value.notificators != null) ? value.notificators.indexOf("telegram") !== -1 : false;


                }





            });
            paso = paso + 1
            initializeSwitchery();

            doOpenAlertSucess('Exito!', 'Cambios guardados', 500);

        }

    });

}

function changeSwitcheryState(el, value) {
    if ($(el).is(':checked') != value) {
        $(el).trigger("click")
    }
}



/**
 * Grava formulario no banco de dados
 *
 * @return void
 */

function doSaveNotifications(type) {

    var method = "POST";
    var id = "";

    var webCheckbox = document.querySelector('#' + type + '_web');
    var mailCheckbox = document.querySelector('#' + type + '_mail');
    var smsCheckbox = document.querySelector('#' + type + '_sms');
    var firebaseCheckbox = document.querySelector('#' + type + '_firebase');
    var telegramCheckbox = document.querySelector('#' + type + '_telegram');

    var notificators = ((webCheckbox.checked == true) ? "web," : "") +
        ((mailCheckbox.checked == true) ? "mail," : "")+
        ((smsCheckbox.checked == true) ? "sms," : "") +
        ((telegramCheckbox.checked == true) ? "telegram," : "") +
        ((firebaseCheckbox.checked == true) ? "firebase," : "");

    notificators = (notificators.length > 0) ? notificators.substr(0, notificators.length - 1) : "";

    var params = new Object();
    params.type = type;
    params.always = false;
    params.notificators = notificators;
    params.attributes = {};


    if (alarmas.indexOf(type) >= 0) {
        params.type = 'alarm';
        params.attributes = { alarms: type };
    }


    if (alarmExists(type) != "") {
        method = "PUT";
        id = findAlarmNotifications(type).id;
        params.id = id;

        if (params.notificators === '') {
            method = "DELETE";
        }

    }

    $.ajax({
        type: method,
        url: sessionStorage.getItem('url') + "notifications/" + id,
        data: JSON.stringify(params),
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
        },
        error: function(response) {
            switch (response.status) {
                case 400:
                    doOpenAlertError('Usuario no permitido para realizar esta operacion.');
                    break;
                case 401:
                    doOpenAlertError('Usuario no autorizado.');
                    break;
                default:
                    doOpenAlertError('Error al realizar la operación! Contacte o soporte técnico.\n Erro:' + response.statusText);
                    break;
            }
        },
        success: function(response) {

            doOpenAlertSucess('Exito!', 'Cambios guardados', 1000);

            doListUserNotify();

        }

    });

}


function resetSwitch() {

    var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));

    elems.forEach(function(html) {

        if ($(html).is(':checked') != true) {
            $(html).trigger("click")
        }
    });

    /*$('.cd-types, .img-frame, .img-content-container, .list-items').each(function () {
        var $set = $(this);
        var interval = setInterval(function () {
            var $cur = $set.find('.active').removeClass('active');
            var $next = $cur.next().length ? $cur.next() : $set.children().eq(0);
            $next.addClass('active');
        }, 1000);
        $set.data('loop', interval);

        $set.on('click', '> *', function () {
            $(this).addClass('active').siblings('.active').removeClass('active');
            clearInterval($set.data('loop'));
            $set.removeData('loop')
        });
    });*/

}

function findAlarmNotifications(alarm) {
    return _.find(listAlarms, function(obj) { return obj.type == alarm; });
}

function alarmExists(alarm) {
    return $.grep(listAlarms, function(item) {
        return item.type == alarm;
    });
};

function localFormClear() {
    doFormClear();

    $("#userId").select2("val", "");

    dataSet.splice(0);

    $('#datatable').dataTable().fnDestroy();

    $('#datatable').dataTable({
        data: dataSet,
        lengthMenu: [1000],
        pageLength: 1000,
        columnDefs: []
    });

}