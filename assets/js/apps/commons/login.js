
$(document)['ready'](function () {
    $('#form_data').validate({
        'errorElement': 'span',
        'focusInvalid': ![],
        'icon': {
            'valid': 'glyphicon glyphicon-ok',
            'invalid': 'glyphicon glyphicon-remove',
            'validating': 'glyphicon glyphicon-refresh'
        },
        'rules': {
            'email': {
                'required': !![]
            },
            'password': {
                'required': !![]
            }
        },
        'errorClass': 'validation-error-label',
        'successClass': 'validation-valid-label',
        'validClass': 'validation-valid-label',
        'invalidHandler': function (a, b) {
            $('.alert-error', $('.login-form')).show();
        },
        'highlight': function (el) {
            $(el).closest('.form-group').addClass('has-error');
            $(el).closest('.select-search').addClass('border-warning');
        },
        'unhighlight': function (el) {
            $(el).closest('.form-group').removeClass('has-error');
            $(el).closest('.select-search').removeClass('border-warning');
        },
        'success': function (el) {
            $(el).closest('.form-group').removeClass('error').addClass('info');
            $(el).remove();
        },
        'errorPlacement': function (el, el2) {
            if (el2.is(':checkbox') || el2.is(':radio')) {
                var controls = el2.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls['append'](el);
                else el.insertAfter(el2.nextAll('.lbl:eq(0)').eq(0));
            } else if (el2.is('.select2')) {
                el.insertAfter(el2.siblings('[class*="select2-container"]:eq(0)'));
            } else if (el2.is('.chzn-select')) {
                el.insertAfter(el2.siblings('[class*="chzn-container"]:eq(0)'));
            } else if (el2.parent().hasClass('uploader') || el2.parents().hasClass('input-group')) {
                el.appendTo(el2.parent().parent());
            } else el.insertAfter(el2);
        },
        'submitHandler': function (el) {},
        'invalidHandler': function (el) {}
    });
    $('button[name="btnLogin"]').click(function () {
        if ($('#form_data').valid()) {
            if ($('#remember').is(':checked')) {
                var email = $('#email').val();
                var password = $('#password').val();
                $.cookie('email', email, {
                    'expires': 14
                });
                $.cookie('password', password, {
                    'expires': 14
                });
                $.cookie('remember', !![], {
                    'expires': 14
                });
            } else {
                $.cookie('email', null);
                $.cookie('password', null);
                $.cookie('remember', null);
            }
            login();
        };
    });
    $('button[name="btnRegister"]').click(function () {
        $(location).attr('href', 'register.php');
    });
    $('#password')['keypress'](function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('button[name="btnLogin"]').click();
            return ![];
        }
    });
    sessionStorage.setItem('logged', '0');
    sessionStorage.setObj('alarms', alarmsDevices);
    configurationServer();
});
function login() {
    doOpenAlertWait($.i18n('login_message_auth'));
    var data = $('#form_data').serializeObject();
    $.ajax({
        'type': 'POST',
        'url': sessionStorage.getItem('url') + 'session',
        'data': data,
        'cache': ![],
        'error': function (response) {
            switch (response.status) {
            case 400:
               // doOpenAlertError($.i18n('message_user_not_permission'));
               doOpenAlertError((/Account has expired /i.test(response.responseText)) ? $.i18n("account_has_expired") : $.i18n("message_user_not_permission"));
                break;
            case 401:
                doOpenAlertError($.i18n('message_user_unauthorized'));
                break;
            default:
                doOpenAlertError($.i18n('message_error_performing'));
                break;
            }
        },
        'success': function (data, status, xhr) {
            if (!data.disabled) {
                sessionStorage.setItem('userid', data.id);
                sessionStorage.setItem('administrator', !('admin' in data) ? $.parseJSON(data.administrator) ? '1' : '0' : $.parseJSON(data.admin) ? '1' : '0');
                //sessionStorage.setItem('version', !('admin' in data) ? 317 : 316);
                //sessionStorage.setItem('administrador', data.administrador  ? '1' : '0');
                //sessionStorage.setItem('administrador', $.parseJSON(data.administrator)? '1' : '0');
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('coordinateFormat', data.coordinateFormat);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('password', $('input[name="password"]').val());
                sessionStorage.setItem('latitude', data.latitude);
                sessionStorage.setItem('longitude', data.longitude);
                sessionStorage.setItem('map', data.map);
                sessionStorage.setItem('map', data.map == null || data == 'undefined' ? sessionStorage.getItem('map') : data.map);
                sessionStorage.setItem('readonly', $.parseJSON(data.readonly));
                sessionStorage.setItem('speedUnit', 'speedUnit' in data.attributes ? data.attributes.speedUnit == 'undefined' ? 'kmh' : data.attributes.speedUnit : 'kmh');
                sessionStorage.setItem('distanceUnit', 'distanceUnit' in data.attributes ? data.attributes.distanceUnit == 'undefined' ? 'km' : data.attributes.distanceUnit : 'km');
                sessionStorage.setItem('zoom', data.zoom > 0 ? data.zoom : 15);
                sessionStorage.setItem('twelveHourFormat', data.twelveHourFormat);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('limitCommands', $.parseJSON(data.limitCommands) ? '1' : '0');
                sessionStorage.setItem('expireTime', moment()['add']('minutes', 60));
                //Agregado fecha expiracion cuenta
                sessionStorage.setItem('expirationTime', data.expirationTime);               
                sessionStorage.setItem('deviceLimit', data.deviceLimit == 0 ? sessionStorage.getItem('deviceLimitDefault') : data.deviceLimit);
                sessionStorage.setItem('userLimit', data.userLimit == 0 ? sessionStorage.getItem('userLimitDefault') : data.userLimit);
                //sessionStorage.setItem('manager', data.userLimit == 5 ? '0' : '1');
                sessionStorage.setItem('profile_photo', !('profile_photo' in data.attributes) ? 'assets/img/user.png' : data.attributes.profile_photo);
                sessionStorage.setItem('language', !('language' in data.attributes) ? 'en' : data.attributes.language);
                sessionStorage.setItem('document', !('document' in data.attributes) ? '' : data.attributes.document);
                sessionStorage.setItem('address', !('address' in data.attributes) ? '' : data.attributes.address);
                sessionStorage.setItem('neighborhood', !('neighborhood' in data.attributes) ? '' : data.attributes.neighborhood);
                sessionStorage.setItem('city', !('city' in data.attributes) ? '' : data.attributes.city);
                sessionStorage.setItem('perfil', !('perfil' in data.attributes) ? '' : data.attributes.perfil);
                sessionStorage.setItem('state', !('state' in data.attributes) ? '' : data.attributes.state);
                sessionStorage.setItem('postal_code', !('postal_code' in data.attributes) ? '' : data.attributes.postal_code);
                //sessionStorage.setItem('phone', !('phone' in data.attributes) ? '' : data.attributes.phone);
                sessionStorage.setItem('phone', data.phone);
                sessionStorage.setItem('gasoline', !('gasoline' in data.attributes) ? '0' : data.attributes.gasoline);
                sessionStorage.setItem('alcohol', !('alcohol' in data.attributes) ? '0' : data.attributes.alcohol);
                sessionStorage.setItem('diesel', !('diesel' in data.attributes) ? '0' : data.attributes.diesel);
                sessionStorage.setItem('gnv', !('gnv' in data.attributes) ? '0' : data.attributes.gnv);
                sessionStorage.setItem('created_at', !('created_at' in data.attributes) ? moment().format('YYYY-MM-DD HH:mm:ss') : data.attributes.created_at);
                sessionStorage.setItem('updated_at', !('updated_at' in data.attributes) ? moment().format('YYYY-MM-DD HH:mm:ss') : data.attributes.updated_at);
                sessionStorage.setItem('count_login', !('count_login' in data.attributes) ? 0 : data.attributes.count_login);
                var photo = 'assets/img/users/' + data.id + '.jpg';
                sessionStorage.setItem('photo', UrlExists(photo) == !![] ? photo : 'assets/img/users/user.png');
                sessionStorage.setItem('panel', 'panel' in data.attributes ? data.attributes.panel : 'map');
                sessionStorage.setItem('logged', '1');
                changeLocale(sessionStorage.getItem('language'));
                saveUserSettings(data.attributes);
            } else {
                doOpenAlertError($.i18n('message_account_disabled'));
            }
        }
    });
}

function saveUserSettings(settings) {
    var data = new Object();
    data.id = sessionStorage.getItem('userid');
    data.name = sessionStorage.getItem('name');
    data.coordinateFormat = sessionStorage.getItem('coordinateFormat');
    data.email = sessionStorage.getItem('email');
    data.phone = sessionStorage.getItem('phone');
    data.token = sessionStorage.getItem('token');
    data.latitude = sessionStorage.getItem('latitude');
    data.longitude = sessionStorage.getItem('longitude');
    data.map = sessionStorage.getItem('map');
    data.readonly = sessionStorage.getItem('readonly');
    data.zoom = sessionStorage.getItem('zoom');
    data.expirationTime = sessionStorage.getItem('expirationTime');
    data.twelveHourFormat = sessionStorage.getItem('twelveHourFormat');
    data.limitCommands = sessionStorage.getItem('limitCommands') == '0' ? ![] : !![];
    data.deviceLimit = sessionStorage.getItem('deviceLimit');
 
     //data.administrator = sessionStorage.getItem('administrator')== '0' ? ![] : !![];
    
    data.userLimit = sessionStorage.getItem('userLimit');
    
    if (sessionStorage.getItem('version') == 316) {
        data.admin = sessionStorage.getItem('admin') == '0' ? ![] : !![];
    } else {
        data.administrator = sessionStorage.getItem('administrator') == '0' ? ![] : !![];
    }
    
    
    data.attributes = {
        'master': ![],
        'readonly': ![],
        'admin': sessionStorage.getItem('admin'),
        'language': sessionStorage.getItem('language'),
        'speedUnit': sessionStorage.getItem('speedUnit'),
        'distanceUnit': sessionStorage.getItem('distanceUnit'),
        'document': sessionStorage.getItem('document'),
        'address': sessionStorage.getItem('address'),
        'neighborhood': sessionStorage.getItem('neighborhood'),
        'city': sessionStorage.getItem('city'),
        'state': sessionStorage.getItem('state'),
        'postal_code': sessionStorage.getItem('postal_code'),
        //'phone': sessionStorage.getItem('phone'),
        'distanceUnit': sessionStorage.getItem('distanceUnit'),
        'speedUnit': sessionStorage.getItem('speedUnit'),
        'gasoline': sessionStorage.getItem('gasoline'),
        'alcohol': sessionStorage.getItem('alcohol'),
        'gnv': sessionStorage.getItem('gnv'),
        'diesel': sessionStorage.getItem('diesel'),
        'created_at': sessionStorage.getItem('created_at'),
        'updated_at': sessionStorage.getItem('updated_at'),
        'last_login': moment().format('YYYY-MM-DD HH:mm:ss'),
        'count_login': parseInt(sessionStorage.getItem('count_login')) + 1,
        'panel': sessionStorage.getItem('panel'),
        'perfil': sessionStorage.getItem('perfil'),
        'profile_photo': sessionStorage.getItem('profile_photo')
    };
    data.attributes = mergeAttributes(data.attributes, settings);
    var home_page = 'dashboard.php';
    switch (sessionStorage.getItem('panel')) {
    case 'communication':
        home_page = 'main.php';
        break;
    default:
        home_page = 'dashboard.php';
        break;
    }
    $.ajax({
        'type': 'PUT',
        'url': sessionStorage.getItem('url') + 'users/' + data.id,
        'data': JSON['stringify'](data),
        'contentType': 'application/json',
        'cache': ![],
        'headers': {
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('email') + ':' + sessionStorage.getItem('password'))
        },
        'error': function (response) {
            $(location).attr('href', home_page);
        },
        'success': function (data) {
            $(location).attr('href', home_page);
        }
    });
}

function configurationServer() {
    var hostname = window.location.hostname;
    $.ajax({
        'type': 'POST',
        'url': prefixpath + 'assets/apps/conf/server.php',
        'url': 'assets/apps/conf/server.php',
        'contentType': 'application/json',
        'cache': ![],
        'error': function (response) {
            doOpenAlertError('Error performing the operation, contact technical support:' + response.statusText);
        },
        'success': function (data) {
            var data = eval('(' + data + ')');
            var server = data.server;
            var server2 = data.server;
            if (server.indexOf('http') == 0 || server.indexOf('https') == 0) {
                var split = server2['split']('//');
                server2 = split[1];
            } else {
                server = 'http://' + data.server;
            }
            sessionStorage.setItem('server_ip', server2);
            sessionStorage.setItem('url', server + '/api/');
            sessionStorage.setItem('host', data.host);
            sessionStorage.setItem('googlekey', data.googlekey);
            gpsServer();
        }
    });
}
function gpsServer() {
    $.ajax({
        'type': 'get',
        'url': sessionStorage.getItem('url') + 'server/',
        'cache': ![],
        'headers': {},
        'error': function (response) {
            switch (response['status']) {
            default:
                doOpenAlertError($.i18n('message_error_server'));
                break;
            }
        },
        'success': function (data) {
            var data = data;
            data.registration == null ? $('input[name="btnRegister"]').hide() : data.registration ? $('button[name=\"btnRegister\"]').show() : $('button[name="btnRegister"]').hide();
            if (data.version.indexOf('4.1') !== -1) {
                sessionStorage.setItem('version41', '1');
            } else {
                sessionStorage.setItem('version41', '0');
            }
            sessionStorage.setItem('registration', 'registration' in data ? data.registration : !![]);
            sessionStorage.setItem('readonly', 'readonly' in data ? data.readonly : ![]);
            sessionStorage.setItem('deviceReadonly', 'deviceReadonly' in data ? data.deviceReadonly : ![]);
            sessionStorage.setItem('limitCommands', 'limitCommands' in data ? data.limitCommands : ![]);
            sessionStorage.setItem('map', data.map);
            sessionStorage.setItem('logomark', 'logomark' in data.attributes ? data.attributes.logomark : '');
            sessionStorage.setItem('logomark1', 'logomark1' in data.attributes ? data.attributes.logomark1 : '');
            sessionStorage.setItem('mapbox', 'mapbox' in data.attributes ? data.attributes.mapbox : '');
            sessionStorage.setItem('websocket', 'websocket' in data.attributes ? data.attributes.websocket : '');
            sessionStorage.setItem('googlekey', 'googlekey' in data.attributes ? data.attributes.googlekey : '');
            sessionStorage.setItem('bingKey', 'bingKey' in data ? data.bingKey : '');
            sessionStorage.setItem('mapUrl', 'mapUrl' in data ? data.mapUrl : '');
            sessionStorage.setItem('poiLayer', 'poiLayer' in data ? data.poiLayer : '');
            sessionStorage.setItem('latitude', 'latitude' in data ? data.latitude : '');
            sessionStorage.setItem('longitude', 'longitude' in data ? data.longitude : '');
            sessionStorage.setItem('zoom', data.zoom != null ? parseInt(data.zoom) : 17);
            sessionStorage.setItem('currentZoom', data.zoom != null ? parseInt(data.zoom) : 17);
            sessionStorage.setItem('twelveHourFormat', 'twelveHourFormat' in data ? data.twelveHourFormat : ![]);
            sessionStorage.setItem('forceSettings', 'forceSettings' in data ? data.forceSettings : ![]);
            sessionStorage.setItem('coordinateFormat', 'coordinateFormat' in data ? data.coordinateFormat : '');
            sessionStorage.setItem('speedUnit', 'speedUnit' in data.attributes ? data.attributes.speedUnit == null ? 'kmh' : data.attributes.speedUnit : 'kmh');
            sessionStorage.setItem('distanceUnit', 'distanceUnit' in data.attributes ? data.attributes.distanceUnit == null ? 'km' : data.attributes.distanceUnit : 'km');
            sessionStorage.setItem('user_admin', !('user_admin' in data.attributes) ? '' : decrypt(data.attributes.user_admin));
            sessionStorage.setItem('pass_admin', !('pass_admin' in data.attributes) ? '' : decrypt(data.attributes.pass_admin));
            sessionStorage.setItem('provider_name', !('name' in data.attributes) ? '' : decrypt(data.attributes.name));
            var page = pathname.substring(pathname.lastIndexOf('/') + 1);
            var page_title = '';
            if (page.indexOf('login') != -1) {
                page_title = $.i18n('login_title');
            }
            if (page.indexOf('recover') != -1) {
                page_title = $.i18n('register_title');
            }
            if (page.indexOf('register') != -1) {
                page_title = $.i18n('recover_title');
            }
           // sessionStorage.getItem('provider_name') == '' ? sessionStorage.setItem('website_title', $.i18n('header_title')) : sessionStorage.setItem('website_title', sessionStorage.getItem('provider_name'));
            sessionStorage.getItem('name') == '' ? sessionStorage.setItem('website_title', $.i18n('header_title')) : sessionStorage.setItem('website_title', sessionStorage.getItem('name'));
            document.title = page_title + sessionStorage.getItem('website_title');
            //sessionStorage.setItem('provider_city', !('city' in data.attributes) ? '' : decrypt(data.attributes.city));
            sessionStorage.setItem('city', 'city' in data.attributes ? data.attributes.city : '');
            //sessionStorage.setItem('provider_state', !('state' in data.attributes) ? '' : decrypt(data.attributes.state));
            sessionStorage.setItem('state', 'state' in data.attributes ? data.attributes.state : '');
            //sessionStorage.setItem('provider_phone', !('phone' in data.attributes) ? '' : decrypt(data.attributes.phone));
            sessionStorage.setItem('phone', 'phone' in data.attributes ? data.attributes.phone : '');
            //sessionStorage.setItem('provider_email', !('email' in data.attributes) ? '' : decrypt(data.attributes.email));
            sessionStorage.setItem('email', 'email' in data.attributes ? data.attributes.email : '');
            //sessionStorage.setItem('provider_smtp_server', !('smtp_server' in data.attributes) ? '127.0.0.1' : decrypt(data.attributes.smtp_server));
            //sessionStorage.setItem('provider_smtp_port', !('smtp_port' in data.attributes) ? '25' : decrypt(data.attributes.smtp_port));
            //sessionStorage.setItem('provider_smtp_username', !('smtp_username' in data.attributes) ? '' : decrypt(data.attributes.smtp_username));
            //sessionStorage.setItem('provider_smtp_password', !('smtp_password' in data.attributes) ? '' : decrypt(data.attributes.smtp_password));
            //sessionStorage.setItem('provider_smtp_ssl', !('smtp_ssl' in data.attributes) ? 'none' : decrypt(data.attributes.smtp_ssl));
            //sessionStorage.setItem('provider_smtp_auth', !('smtp_auth' in data.attributes) ? ![] : decrypt(data.attributes.smtp_auth));
            sessionStorage.setItem('deviceLimitDefault', !('deviceLimitDefault' in data.attributes) ? 3 : data.attributes.deviceLimitDefault);
            sessionStorage.setItem('facebook', 'facebook' in data.attributes ? data.attributes.facebook : '');
            sessionStorage.setItem('twitter', 'twitter' in data.attributes ? data.attributes.twitter : '');
            sessionStorage.setItem('googleplus', 'googleplus' in data.attributes ? data.attributes.googleplus : '');
            sessionStorage.setItem('support', 'support' in data.attributes ? data.attributes.support : '');
            sessionStorage.setItem('playstore', 'playstore' in data.attributes ? data.attributes.playstore : '');
            $('.play-store').hide();
            if (sessionStorage.getItem('playstore').length != 0) {
                $('#btnPlayStore').prop('href', data.attributes.playstore);
                $('.play-store').show();
            }
            sessionStorage.setItem('applestore', 'applestore' in data.attributes ? data.attributes.applestore : '');
            $('.apple-store').hide();
            if (sessionStorage.getItem('applestore').length != 0) {
                $('#btnAppleStore').prop('href', data.attributes.applestore);
                $('.apple-store').show();
            }
            sessionStorage.setItem('website', 'website' in data.attributes ? data.attributes.website : '');
            sessionStorage.getItem('website') == '' ? $('#crighturl').attr('href', '#') : $('#cright').attr('href', sessionStorage.getItem('website'));
            $('#crighttitl').html(page_title + sessionStorage.getItem('website_title'));
            sessionStorage.setItem('map_refresh', 'map_refresh' in data.attributes ? data.attributes.map_refresh : 14);
            sessionStorage.setItem('message_load_positions', 'message_load_positions' in data.attributes ? data.attributes.message_load_positions : '0');
            sessionStorage.setItem('google_maps', 'google_maps' in data.attributes ? data.attributes.google_maps : false);
            var remember = $.cookie('remember');
            if (remember == true) {
                var email = $.cookie('email');
                var password = $.cookie('password');
                $('#email').val(email);
                $('#password').val(password);
                login();
            }
        }
    });
}