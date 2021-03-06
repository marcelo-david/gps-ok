var lastEventsTimeOut;
var notificationTimeOut;
var listed = false;
var cfgCulture = 'en';
var xw = screen.width / 2 - 920 / 2;
var x2 = screen.width / 2 - 1240 / 2;
var app_version = "1.344";
var pathname = String(window.location.pathname); // Returns path only
var currenturl = String(window.location.href); // Returns full URL
//var logomark_ = "logo.png";
var prefixpath = "/" + pathname.split("/")[1] + "/";
jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) &&
    !/webkit    /.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1)
    OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1)
    OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1)
    OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1)
    OSName = "Linux";

var getObjectByValue = function (array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
};

var alarmsDevices = [];
var devices = [];
var driversByDevice = [];
//var markers       = [];
//var popups        = [];
var notifications = [];
var geofences = [];
var groups = [];
var events = [];
var users = [];

var panels = [{
    type: "map",
    title: 'title_panel_map',
    url: 'dashboard.php'
}, {
    type: "communication",
    title: 'title_panel_communication',
    url: 'main.php'
}];

var listApps = [
    /** admin * */
    {
        module: 'admin',
        name: 'aliases.php'
    }, {
        module: 'admin',
        name: 'commands.php'
    }, {
        module: 'admin',
        name: 'communications.php'
    }, {
        module: 'admin',
        name: 'daliases.php'
    }, {
        module: 'admin',
        name: 'ddrivers.php'
    }, {
        module: 'user',
        name: 'ddrivers.php'
    }, {
        module: 'admin',
        name: 'dashboard.php'
    }, {
       module: 'user',
        name: 'task.php'
    }, {
        module: 'admin',
        name: 'task.php'
    }, {
       module: 'user',
        name: 'playback.php'
    }, {
        module: 'admin',
        name: 'playback.php'
    }, {
        module: 'user',
        name: 'dtask.php'
    }, {
        module: 'admin',
        name: 'dtask.php'
    }, {
        module: 'admin',
        name: 'devices.php'
    }, {
        module: 'admin',
        name: 'dgeofences.php'
    }, {
        module: 'admin',
        name: 'events.php'
    }, {
        module: 'admin',
        name: 'geofences.php'
    }, {
        module: 'admin',
        name: 'ggeofences.php'
    }, {
        module: 'admin',
        name: 'groups.php'
    }, {
        module: 'user',
        name: 'drivers.php'
    }, {
        module: 'admin',
        name: 'drivers.php'
    }, {
        module: 'admin',
        name: 'maintenance.php'
    }, {
        module: 'user',
        name: 'maintenance.php'
    }, {
       module: 'admin',
        name: 'dmaintenance.php'
    }, {
        module: 'user',
        name: 'dmaintenance.php'
    }, {
        module: 'admin',
        name: 'inputs.php'
    }, {
        module: 'admin',
        name: 'notifications.php'
    }, {
        module: 'admin',
        name: 'notifications4.php'
    }, {
        module: 'admin',
        name: 'pdevices.php'
    }, {
        module: 'admin',
        name: 'permissions.php'
    }, {
        module: 'admin',
        name: 'pgeofences.php'
    }, {
        module: 'admin',
        name: 'pgroups.php'
    }, {
        module: 'admin',
        name: 'profile.php'
    }, {
        module: 'admin',
        name: 'rdevices.php'
    }, {
        module: 'admin',
        name: 'recover.php'
    }, {
        module: 'admin',
        name: 'routes.php'
    }, {
        module: 'admin',
        name: 'rusers.php'
    }, {
        module: 'admin',
        name: 'server.php'
    }, {
        module: 'admin',
        name: 'status.php'
    }, {
        module: 'admin',
        name: 'stops.php'
    }, {
        module: 'admin',
        name: 'summary.php'
    }, {
        module: 'admin',
        name: 'trips.php'
    }, {
        module: 'admin',
        name: 'unotifications.php'
    }, {
        module: 'admin',
        name: 'users.php'
    }, {
        module: 'admin',
        name: 'dnotification.php'
    }, {
        module: 'admin',
        name: 'share.php'
    }, {
        module: 'user',
        name: 'commands.php'
    }, {
       module: 'user',
        name: 'dnotification.php'
    }, {
        module: 'user',
        name: 'communications.php'
    }, {
        module: 'user',
        name: 'dashboard.php'
    }, {
        module: 'user',
        name: 'devices.php'
    }, {
        module: 'user',
        name: 'dgeofences.php'
    }, {
        module: 'user',
        name: 'events.php'
    }, {
        module: 'user',
        name: 'geofences.php'
    }, {
        module: 'user',
        name: 'ggeofences.php'
    }, {
        module: 'user',
        name: 'groups.php'
    }, {
        module: 'user',
        name: 'inputs.php'
    }, {
        module: 'user',
        name: 'notifications.php'
    }, {
        module: 'user',
        name: 'notifications4.php'
    }, {
        module: 'user',
        name: 'profile.php'
    }, {
        module: 'user',
        name: 'rdevices.php'
    }, {
        module: 'user',
        name: 'recover.php'
    }, {
        module: 'user',
        name: 'routes.php'
    }, {
        module: 'user',
        name: 'status.php'
    }, {
        module: 'user',
        name: 'stops.php'
    }, {
        module: 'user',
        name: 'summary.php'
    }, {
        module: 'user',
        name: 'trips.php'
    }, {
        module: 'user',
        name: 'unotifications.php'
    }, {
        module: 'user',
        name: 'share.php'
    }, {
        module: 'user',
        name: 'users.php'
    }, {
        module: 'admin',
        name: 'pdevices.php'
    }, {
        module: 'admin',
        name: 'permissions.php'
    }, {
        module: 'admin',
        name: 'pgeofences.php'
    }, {
        module: 'admin',
        name: 'mobileye.php'
    }, {
        module: 'user',
        name: 'mobileye.php'
    }, {
         module: 'user',
        name: 'can_obd.php'
    }, {
         module: 'admin',
        name: 'can_obd.php'
    }, {
         module: 'admin',
        name: 'codigos_can.php'
    }, {
         module: 'user',
        name: 'codigos_can.php'
    }, {
         module: 'admin',
        name: 'report_mail.php'
    }, {
         module: 'user',
        name: 'report_mail.php'
    }, {
        module: 'admin',
        name: 'pgroups.php'
    },
    {
         module: 'admin',
        name: 'dashboard_provider.php'
    }, {
         module: 'user',
        name: 'dashboard_provider.php'
    },
    {
         module: 'admin',
        name: 'devices_all.php'
    }, {
         module: 'user',
        name: 'devices_all.php'
    },
    {
         module: 'admin',
        name: 'report_task.php'
    }, {
         module: 'user',
        name: 'report_task.php'
    },{
         module: 'admin',
        name: 'report_fms.php'
    }, {
         module: 'user',
        name: 'report_fms.php'
    }
];

var attributesComputed = [{
    key: 'raw',
    name: 'Raw',
    valueType: 'string'
}, {
    key: 'index',
    name: 'Index',
    valueType: 'number'
}, {
    key: 'hdop',
    name: 'Hdop',
    valueType: 'number'
}, {
    key: 'vdop',
    name: 'Vdop',
    valueType: 'number'
}, {
    key: 'pdop',
    name: 'Pdop',
    valueType: 'number'
}, {
    key: 'sat',
    name: 'Sat',
    valueType: 'number'
}, {
    key: 'satVisible',
    name: 'SatVisible',
    valueType: 'number'
}, {
    key: 'rssi',
    name: 'Rssi',
    valueType: 'number'
}, {
    key: 'gps',
    name: 'Gps',
    valueType: 'number'
}, {
    key: 'roaming',
    name: 'Roaming',
    valueType: 'boolean'
}, {
    key: 'event',
    name: 'Event',
    valueType: 'string'
}, {
    key: 'alarm',
    name: 'Alarm',
    valueType: 'string'
}, {
    key: 'status',
    name: 'Status',
    valueType: 'string'
}, {
    key: 'odometer',
    name: 'Odometer',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'serviceOdometer',
    name: 'ServiceOdometer',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'tripOdometer',
    name: 'TripOdometer',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'hours',
    name: 'Hours',
    valueType: 'number',
    dataType: 'hours'
}, {
    key: 'steps',
    name: 'Steps',
    valueType: 'number'
}, {
    key: 'input',
    name: 'Input',
    valueType: 'string'
}, {
    key: 'output',
    name: 'Output',
    valueType: 'string'
}, {
    key: 'power',
    name: 'Power',
    valueType: 'number',
    dataType: 'voltage'
}, {
    key: 'battery',
    name: 'Battery',
    valueType: 'number',
    dataType: 'voltage'
}, {
    key: 'batteryLevel',
    name: 'BatteryLevel',
    valueType: 'number',
    dataType: 'percentage'
}, {
    key: 'fuel',
    name: 'Fuel',
    valueType: 'number',
    dataType: 'volume'
}, {
    key: 'fuelConsumption',
    name: 'FuelConsumption',
    valueType: 'number',
    dataType: 'consumption'
}, {
    key: 'versionFw',
    name: 'VersionFw',
    valueType: 'string'
}, {
    key: 'versionHw',
    name: 'VersionHw',
    valueType: 'string'
}, {
    key: 'type',
    name: 'sharedType',
    valueType: 'string'
}, {
    key: 'ignition',
    name: 'Ignition',
    valueType: 'boolean'
}, {
    key: 'flags',
    name: 'Flags',
    valueType: 'string'
}, {
    key: 'charge',
    name: 'Charge',
    valueType: 'boolean'
}, {
    key: 'ip',
    name: 'Ip',
    valueType: 'string'
}, {
    key: 'archive',
    name: 'Archive',
    valueType: 'boolean'
}, {
    key: 'distance',
    name: 'Distance',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'totalDistance',
    name: 'deviceTotalDistance',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'rpm',
    name: 'Rpm',
    valueType: 'number'
}, {
    key: 'vin',
    name: 'Vin',
    valueType: 'string'
}, {
    key: 'approximate',
    name: 'Approximate',
    valueType: 'boolean'
}, {
    key: 'throttle',
    name: 'Throttle',
    valueType: 'number'
}, {
    key: 'motion',
    name: 'Motion',
    valueType: 'boolean'
}, {
    key: 'armed',
    name: 'Armed',
    valueType: 'number'
}, {
    key: 'geofence',
    name: 'sharedGeofence',
    valueType: 'string'
}, {
    key: 'acceleration',
    name: 'Acceleration',
    valueType: 'number'
}, {
    key: 'deviceTemp',
    name: 'DeviceTemp',
    valueType: 'number',
    dataType: 'temperature'
}, {
    key: 'operator',
    name: 'Operator',
    valueType: 'string'
}, {
    key: 'command',
    name: 'Command',
    valueType: 'string'
}, {
    key: 'blocked',
    name: 'Blocked',
    valueType: 'boolean'
}, {
    key: 'dtcs',
    name: 'Dtcs',
    valueType: 'string'
}, {
    key: 'obdSpeed',
    name: 'ObdSpeed',
    valueType: 'number',
    dataType: 'speed'
}, {
    key: 'obdOdometer',
    name: 'ObdOdometer',
    valueType: 'number',
    dataType: 'distance'
}, {
    key: 'result',
    name: 'eventCommandResult',
    valueType: 'string'
}, {
    key: 'driverUniqueId',
    name: 'DriverUniqueId',
    valueType: 'string',
    dataType: 'driverUniqueId'
}];

var EventTypes = [{
    id: "commandResult",
    name: "Comando enviado",
}, {
    id: "deviceOnline",
    name: "Dispositivo Online"
}, {
    id: "deviceUnknown",
    name: "Dispositivo desconhecido"
}, {
    id: "deviceOffline",
    name: "Dispositivo Offline"
}, {
    id: "deviceMoving",
    name: "Dispositivo em movimento"
}, {
    id: "deviceStopped",
    name: "Dispositivo parado"
}, {
    id: "deviceOverspeed",
    name: "Dispositivo em alta velocidade"
}, {
    id: "deviceFuelDrop",
    name: "Dispositivo com baixo combust??vel"
}, {
    id: "geofenceEnter",
    name: "Dispositivo entrou na Geo-Cerca"
}, {
    id: "geofenceExit",
    name: "Dispositivo saiu da Geo-Cerca"
}, {
    id: "alarm",
    name: "Alarmes"
}, {
    id: "alarmGeneral",
    name: "Geral"
}, {
    id: "alarmSos",
    name: "Bot??o de p??nico"
}, {
    id: "alarmMobileyeTamper",
    name: "Mobileye TAMPER"
}, {
    id: "alarmMobileyeFcw",
    name: "Mobileye FCW"
}, {
    id: "alarmMobileyePcw",
    name: "Mobileye PCW"
}, {
    id: "alarmMobileyeUfcw",
    name: "Mobileye UFCW"
}, {
    id: "alarmMobileyeError",
    name: "Mobileye ERROR"
}, {
    id: "alarmMobileyeTsr",
    name: "Mobileye TSR"
}, {
    id: "alarmMobileyeHmw",
    name: "Mobileye HMW"
}, {
    id: "alarmMobileyeLl",
    name: "Mobileye Ldw izquierda"
}, {
     id: "alarmMobileyeLr",
    name: "Mobileye Ldw derecha"
}, {
     id: "alarmLockCellon",
    name: "Fotoc??lula I-Lock ativada"
}, {
    id: "alarmLockOpen",
    name: "Abrir cadeado"
}, {
    id: "alarmLockClosed",
    name: "I-Lock Candado cerrado"
}, {
    id: "alarmLockRing",
    name: "Fechadura ativada"
}, {
     id: "alarmCobanArm",
    name: "Alarme ativado"
}, {
    id: "alarmCobanDisarm",
    name: "Alarme desativado"
}, {
    id: "alarmVehiculo desbloqueado",
    name: "Ve??culo desbloqueado"
}, {
    id: "alarmVehiculo bloqueado",
    name: "Ve??culo bloqueado"
}, {
    id: "alarmVibration",
    name: "Vibra????o"
}, {
    id: "alarmMovement",
    name: "Em movimiento"
}, {
    id: "alarmLowspeed",
    name: "Baixa velocidade"
}, {
    id: "alarmOverspeed",
    name: "Exceso de Velocidade  "
}, {
    id: "alarmFallDown",
    name: "Caida"
}, {
    id: "alarmLowPower",
    name: "Energ??a baixa   "
}, {
    id: "alarmLowBattery",
    name: "Bater??a baixa"
}, {
    id: "alarmFault",
    name: "Falha"
}, {
   id: "alarmPowerOff",
    name: "Apagado ACC"
}, {
    id: "alarmPowerOn",
    name: "Igni????o ACC"
}, {
    id: "alarmDoor",
    name: "Alerta Porrta Aberta, tentativa de roubo"
}, {
    id: "alarmLock",
    name: "Motor bloqueado"
}, {
    id: "alarmUnlock",
    name: "Motor desbloqueado"
}, {
    id: "alarmGeofence",
    name: "Geocerca"
}, {
    id: "alarmGeofenceExit",
    name: "Saiu da goecerca"
}, {
    id: "alarmGpsAntennaCut",
    name: "Antena cortada"
}, {
    id: "alarmAccident",
    name: "Acidente"
}, {
    id: "alarmTow",
    name: "Reboque"
}, {
    id: "alarmIdle",
    name: "Inativo"
}, {
    id: "alarmHighRpm",
    name: "Alta rota????o"
}, {
    id: "alarmHardAcceleration",
    name: "Muito acelerado"
}, {
    id: "alarmHardBraking",
    name: "Freagem excessiva"
}, {
    id: "alarmHardCornering",
    name: "Freagem brusca"
}, {
    id: "alarmLaneChange",
    name: "Exceso de carga"
}, {
    id: "alarmFatigueDriving",
    name: "Condutor cansado"
}, {
    id: "alarmPowerCut",
    name: "Fonte de alimenta????o desconectada"
}, {
    id: "alarmPowerRestored",
    name: "Fornecimento de energia reativada"
}, {
    id: "alarmJamming",
    name: "Jammer detectado"
}, {
    id: "alarmTemperature",
    name: "Tempertura"
}, {
    id: "alarmParking",
    name: "Atualizar"
}, {
    id: "alarmShock",
    name: "Alerta de choque"
}, {
    id: "alarmBonnet",
    name: "Bonete"
}, {
    id: "alarmFootBrake",
    name: "FootBrake"
}, {
    id: "alarmFuelLeak",
    name: "fuelLeak"
}, {
    id: "alarmTampering",
    name: "Alerta de temperatura"
}, {
    id: "alarmRemoving",
    name: "remover"
}, {
    id: "ignitionOn",
    name: "Igni????o ligada"
}, {
    id: "ignitionOff",
    name: "Ignic??o desligada"
}, {
    id: "maintenance",
    name: "Manuten????o necess??ria"
}, {
    id: "textMessage",
    name: "Resultado da mensagem SMS"
}, {
    id: "driverChanged",
    name: "Mudan???? de motorista"
}, {
    id: "alarmCobanEnable",
    name: "GeoCerca-virtual ativada"
}, {
    id: "alarmCobanDisable",
    name: "GeoCerca-virtual Desativada"
}, {
    id: "alarmCobanAcc",
    name: "ACC ligado ou portas abertas, alarme n??o acionado"
}];

var CategoryType = [{
    id: "animal",
    url: "assets/img/icons/animal.png",
    img: "<img src='assets/img/icons/animal.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-arrow-down",
    title: 'Animal'
}, {
    id: "arrow",
    url: "assets/img/icons/arrow.png",
    img: "<img src='assets/img/icons/arrow.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-arrow-down",
    title: 'Arrow'
}, {
    id: "bicycle",
    url: "assets/img/icons/bicycle.png",
    img: "<img src='assets/img/icons/bicycle.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bicycle",
    title: 'Bicycle'
}, {
    id: "boat",
    url: "assets/img/icons/boat.png",
    img: "<img src='assets/img/icons/boat.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-boat",
    title: 'Boat'
}, {
    id: "bus",
    url: "assets/img/icons/bus.png",
    img: "<img src='assets/img/icons/bus.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bus",
    title: 'Bus'
}, {
    id: "car",
    url: "assets/img/icons/car.png",
    img: "<img src='assets/img/icons/car.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-car",
    title: 'Car'
}, {
    id: "crane",
    url: "assets/img/icons/crane.png",
    img: "<img src='assets/img/icons/crane.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-crane",
    title: 'Crane'
}, {
    id: "null",
    url: "assets/img/icons/default.png",
    img: "<img src='assets/img/icons/default.png' style='height: 30px; width: 30px;'/>",
    icon: "",
    title: 'Default'
}, {
    id: "default",
    url: "assets/img/icons/default.png",
    img: "<img src='assets/img/icons/default.png' style='height: 30px; width: 30px;'/>",
    icon: "",
    title: 'Default'
}, {
    id: "helicopter",
    url: "assets/img/icons/helicopter.png",
    img: "<img src='assets/img/icons/helicopter.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-helicopter",
    title: 'Helicoptero'
}, {
    id: "motorcycle",
    url: "assets/img/icons/motorcycle.png",
    img: "<img src='assets/img/icons/motorcycle.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-motorcycle",
    title: 'Motocycle'
}, {
    id: "offroad",
    url: "assets/img/icons/offroad.png",
    img: "<img src='assets/img/icons/offroad.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-offroad",
    title: 'Offroad'
}, {
    id: "person",
    url: "assets/img/icons/person.png",
    img: "<img src='assets/img/icons/person.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-male",
    title: 'Person'
}, {
    id: "pickup",
    url: "assets/img/icons/pickup.png",
    img: "<img src='assets/img/icons/pickup.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-pickup",
    title: 'Pickup'
}, {
    id: "plane",
    url: "assets/img/icons/plane.png",
    img: "<img src='assets/img/icons/plane.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-plane",
    title: 'Plane'
}, {
    id: "ship",
    url: "assets/img/icons/ship.png",
    img: "<img src='assets/img/icons/ship.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-ship",
    title: 'Ship'
}, {
    id: "tractor",
    url: "assets/img/icons/tractor.png",
    img: "<img src='assets/img/icons/tractor.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-tractor",
    title: 'Tractor'
}, {
    id: "truck",
    url: "assets/img/icons/truck.png",
    img: "<img src='assets/img/icons/truck.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-truck",
    title: 'Truck'
}, {
    id: "van",
    url: "assets/img/icons/van.png",
    img: "<img src='assets/img/icons/van.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bus",
    title: 'Van'
}, {
    id: "winch",
    url: "assets/img/icons/crane.png",
    img: "<img src='assets/img/icons/crane.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-link",
    title: 'Winch'
}, {
    id: "taxi",
    url: "assets/img/icons/taxi.png",
    img: "<img src='assets/img/icons/taxi.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-taxi",
    title: 'Taxi'
}, {
    id: "ambulance",
    url: "assets/img/icons/ambulance.png",
    img: "<img src='assets/img/icons/ambulance.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-ambulance",
    title: 'Ambul??ncia'
}, {
    id: "jetsky",
    url: "assets/img/icons/jetsky.png",
    img: "<img src='assets/img/icons/jetsky.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-jetsky",
    title: 'Jetsky'
}, {
    id: "quadricycle",
    url: "assets/img/icons/quadricycle.png",
    img: "<img src='assets/img/icons/quadricycle.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-quadricycle",
    title: 'Quadricycle'
}, {
    id: "fork",
    url: "assets/img/icons/fork.png",
    img: "<img src='assets/img/icons/fork.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-fork",
    title: 'Fork'
}, {
    id: "bulldozer",
    url: "assets/img/icons/bulldozer.png",
    img: "<img src='assets/img/icons/bulldozer.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bulldozer",
    title: 'Bulldozer'
}];

var commandTypes = [{

    type: "custom",
    title: "Comando personalizado"
}, {
    type: "deviceIdentification",
    title: "Identifica????o do dispositivo"
}, {
    type: "positionSingle",
    title: "Relat??rio de posi????o ??nica"
}, {
    type: "positionPeriodic",
    title: "Atualiza????o peri??dica"
}, {
    type: "positionStop",
    title: "Posi????es de parada"
}, {
    type: "engineStop",
    title: "Desligar do motor"
}, {
    type: "engineResume",
    title: "Ligar motor"
}, {
    type: "alarmArm",
    title: "Ativar alarme"
}, {
    type: "geoMove",
    title: "Ativar Cerca-virtual"
}, {
    type: "geoStop",
    title: "Desativar Cerca-virtual"
}, {
    type: "alarmDisarm",
    title: "Desativar alarme"
}, {
    type: "setTimezone",
    title: "Definir fuso hor??rio"
}, {
    type: "requestPhoto",
    title: "Solicitar foto"
}, {
    type: "powerOff",
    title: "Corte GPS"
}, {
    type: "rebootDevice",
    title: "Reiniciar dispositivo"
}, {
    type: "sendSms",
    title: " Enviar SMS"
}, {
    type: "sendUssd",
    title: "Enviar USSD"
}, {
    type: "sosNumber",
    title: "Define n??mero SOS"
}, {
    type: "silenceTime",
    title: "Estabelecer tempo de sil??ncio"
}, {
    type: "setPhonebook",
    title: "Set phone book"
}, {
    type: "voiceMessage",
    title: "Mensagem de voz"
}, {
    type: "message",
    title: "Message"
}, {
    type: "voiceMessage",
    title: "Mensagem por voz"
}, {
    type: "outputControl",
    title: "Control de sa??da"
}, {
    type: "voiceMonitoring",
    title: "Monitoramento por voz"
}, {
    type: "setAgps",
    title: "Conjunto AGPS"
}, {
    type: "setIndicator",
    title: "Set Indicator"
}, {
    type: "configuration",
    title: "Configura????o"
}, {
    type: "getVersion",
    title: "Obter vers??o"
}, {
    type: "firmwareUpdate",
    title: "Update firmware"
}, {
    type: "modePowerSaving",
    title: "Modo de economia de energia"
}, {
    type: "modeDeepSleep",
    title: "Modo parado profundo"
}, {
    type: "movementAlarm",
    title: "Alarme de movimento"
}, {
    type: "alarmRemove",
    title: "Remove SOS"
}, {
    type: "alarmBattery",
    title: "Alarme de bateria"
}, {
    type: "alarmSos",
    title: "SOS"
}, {
    type: "alarmClock",
    title: "Cronograma de alarme"
}, {
    type: "alarmSpeed",
    title: "Alarme de excesso de velocidade"
}, {
    type: "alarmFall",
    title: "Falha de alarme"
}, {
    type: "alarmVibration",
    title: "Vibra????o"
},{
    type: "obd",
    title: "Ativar OBDII"
},{
    type: "setOdometer",
    title: "Conjunto od??metro"
},{
    type: "armMoto",
    title: "Armar motor"
},{
    type: "mobileye",
    title: "Ativar m??vel"
},{
    type: "fms",
    title: "Ativar FMS"
},{
    type: "disarmMoto",
    title: "Disarmar motor"
}


];


var speedUnit = [{
    type: "kn",
    title: 'Knots'
}, {
    type: "kmh",
    title: 'Km/h'
}, {
    type: "mph",
    title: 'Mph'
}];


var windowSizeArray = [
    "width=920,height=800,left=" + xw +
    ",top=10,scrollbars=yes,location=no,menubar=no,toolbar=no",
    "width=1240,height=700,left=" + xw +
    ",top=10,scrollbars=yes,location=no,menubar=no,toolbar=no",
    "width=475,height=285,left=" + xw +
    ",top=10,scrollbars=no,location=no,menubar=no,toolbar=no"
];
var janela = null;

function abreJanela() {
    // verifica se a janela est?? aberta
    if (janela != null && !janela.closed) {} else if (janela != null && janela.closed) { // se a janela foi fechada,
        // limpo a variavel janela
        // para permitir que ela
        // seja re-aberta
        janela = null;
    }
    // s?? abre a janela se a variavel 'janela' ?? nula
    if (janela == null) {
        var windowNameDown = "popUpDownloads";
        var windowSizeDown = windowSizeArray[2];

        janela = window.open('applet.php', windowNameDown, windowSizeDown);
    }

}

function goTop() {
    window.scrollTo(0, 0);
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Save data to sessionStorage
// sessionStorage.setItem('key', 'value');
// Get saved data from sessionStorage
// var data = sessionStorage.getItem('key');
// Remove saved data from sessionStorage
// sessionStorage.removeItem('key');
// Remove all saved data from sessionStorage
// sessionStorage.clear();

function doCloseAlerts() {}

function doOpenAlertSucess(title, desc, timer) {
    doCloseAlerts();

    swal({
        title: title,
        text: desc,
        confirmButtonColor: "#66BB6A",
        type: "success",
        timer: timer,
        html: true
    });
}

function doOpenAlertError(title, desc) {
    doCloseAlerts();
    swal({
            title: title,
            text: desc,
            confirmButtonColor: "#EF5350",
            type: "error",
            html: true
            //Comentado para evitar el redireccionamiendo al login en caso de mandar el error
       // },
        //function() {
         //   window.location.href = 'login.php'
         //   console.log('Hay que hacer algo') //doPrepareEvents();
        });
}

function doOpenAlertInfo(title, desc) {
    doCloseAlerts();
    swal({
        title: title,
        text: desc,
        confirmButtonColor: "#2196F3",
        type: "info",
        html: true
    });
}

function doOpenAlertWait(title, desc) {
    doCloseAlerts();
    swal({
        title: title,
        text: desc,
        confirmButtonColor: "#FF7043",
        //imageUrl: 'assets/img/ajax-loader.gif',
        imageUrl: 'assets/img/loader-sesion.gif',
        
        html: true
    });
}


$(document).ready(function () {

  /*  jQuery.get('logomark', function (data) {
        if (data.length > 0) {
            sessionStorage.setItem('logomark');
        } else {
            sessionStorage.setItem('logomark');
        }
        $(".content").prepend('<div class="logo text-center"><img id="site_logomark" src="'+sessionStorage.getItem('logomark')+'" alt="Logo" title="Tecknicos GPS" /></div>');
        //$(".over").prepend('<div class="logo text-center"><img id="site_logomark" src="' + sessionStorage.getItem('logomark') + '" alt="Logomarca" title="Rastreamento Veicular" /></div>');
    }).fail(function () {
        sessionStorage.setItem('logomark');
        $(".content").prepend('<div class="logo text-center"><img id="site_logomark" src="'+sessionStorage.getItem('logomark')+'" alt="Logo" title="Tecknicos GPS" /></div>');
        //$(".over").prepend('<div class="logo text-center"><img id="site_logomark" src="' + sessionStorage.getItem('logomark') + '" alt="Logomarca" title="Rastreamento Veicular" /></div>');
    });
    */

    Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }

    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    }

    /** session storage */
    sessionStorage.setItem('timeLimit', 300);

    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();
        }
    });

    $('.button_i8n').on('click', function () {

        var locale = $(this).data('locale');

        changeLocale(locale);

        // moment locale
        moment.locale(locale);

    });

    changeLocale('en');
    /*
    (sessionStorage.getItem('language') == "" || sessionStorage.getItem('language') == "undefined") ?
        'br' :
        sessionStorage.getItem('language')); // locale default da p??gina*/

    $("#user_photo").attr('src', sessionStorage.getItem('profile_photo'));
    $('#user_name').html(sessionStorage.getItem('name'));

    // you can do this once in a page, and this function will appear in all your files
    File.prototype.convertToBase64 = function (callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.onerror = function (e) {
            callback(null);
        };
        reader.readAsDataURL(this);
    };



    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

    //Select2
    $(".select-search").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "en"
    }).on('change', function () {
        $(this).closest('form').validate().element($(this));
    });

    $.extend($.validator.messages, {
        // faltou traduzir alguns que nao sao usados
        // Core
        required: $.i18n("validate_required"),
        remote: $.i18n("validate_remote"),
        email: $.i18n("validate_email"),
        url: $.i18n("validate_url"),
        date: $.i18n("validate_date"),
        dateISO: "Please provide a valid date (ISO).",
        number: $.i18n("validate_number"),
        digits: $.i18n("validate_digits"),
        creditcard: $.i18n("validate_creditcard"),
        equalTo: $.i18n("validate_equalto"),
        maxlength: $.validator
            .format("Please, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
        minlength: $.validator
            .format("Por favor, forne&ccedil;a ao menos {0} caracteres."),
        rangelength: $.validator
            .format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento."),
        range: $.validator
            .format("Por favor, forne&ccedil;a um valor entre {0} e {1}."),
        max: $.validator
            .format("Por favor, forne&ccedil;a um valor menor ou igual a {0}."),
        min: $.validator
            .format("Por favor, forne&ccedil;a um valor maior ou igual a {0}."),
        step: $.validator
            .format("Por favor, forne&ccedil;a um valor m&acute;tiplo de {0}."),

        // Metodos Adicionais
        maxWords: $.validator
            .format("Por favor, forne&ccedil;a com {0} palavras ou menos."),
        minWords: $.validator
            .format("Por favor, forne&ccedil;a pelo menos {0} palavras."),
        rangeWords: $.validator
            .format("Por favor, forne&ccedil;a entre {0} e {1} palavras."),
        accept: $.i18n("validate_accept"),
        alphanumeric: $.i18n("validate_alphanumeric"),
        bankaccountNL: "Por favor, forne&ccedil;a com um n&uacute;mero de conta banc&aacute;ria v&aacute;lida.",
        bankorgiroaccountNL: "Por favor, forne&ccedil;a um banco v&aacute;lido ou n&uacute;mero de conta.",
        bic: "Por favor, forne&ccedil;a um c&oacute;digo BIC v&aacute;lido.",
        cifES: "Por favor, forne&ccedil;a um c&oacute;digo CIF v&aacute;lido.",
        creditcardtypes: "Por favor, forne&ccedil;a um n&uacute;mero de cart&atilde;o de cr&eacute;dito v&aacute;lido.",
        currency: "Por favor, forne&ccedil;a uma moeda v&aacute;lida.",
        dateFA: "Por favor, forne&ccedil;a uma data correta.",
        dateITA: "Por favor, forne&ccedil;a uma data correta.",
        dateNL: "Por favor, forne&ccedil;a uma data correta.",
        extension: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
        giroaccountNL: "Por favor, forne&ccedil;a um n&uacute;mero de conta corrente v&aacute;lido.",
        iban: "Por favor, forne&ccedil;a um c&oacute;digo IBAN v&aacute;lido.",
        integer: $.i18n("validate_integer"),
        ipv4: "Por favor, forne&ccedil;a um IPv4 v&aacute;lido.",
        ipv6: "Por favor, forne&ccedil;a um IPv6 v&aacute;lido.",
        lettersonly: $.i18n("validate_lettersonly"),
        letterswithbasicpunc: "Por favor, forne&ccedil;a apenas letras ou pontua&ccedil;??es.",
        mobileNL: "Por favor, fornece&ccedil;a um n&uacute;mero v&aacute;lido de telefone.",
        mobileUK: "Por favor, fornece&ccedil;a um n&uacute;mero v&aacute;lido de telefone.",
        nieES: "Por favor, forne&ccedil;a um NIE v&aacute;lido.",
        nifES: "Por favor, forne&ccedil;a um NIF v&aacute;lido.",
        nowhitespace: "Por favor, n&atilde;o utilize espa&ccedil;os em branco.",
        pattern: "O formato fornenecido &eacute; inv&aacute;lido.",
        phoneNL: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
        phoneUK: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
        phoneUS: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
        phonesUK: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
        postalCodeCA: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
        postalcodeIT: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
        postalcodeNL: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
        postcodeUK: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
        postalcodeBR: $.i18n("validate_postalcode"),
        require_from_group: $.validator
            .format("Por favor, forne&ccedil;a pelo menos {0} destes campos."),
        skip_or_fill_minimum: $.validator
            .format("Por favor, optar entre ignorar esses campos ou preencher pelo menos {0} deles."),
        stateUS: "Por favor, forne&ccedil;a um estado v&aacute;lido.",
        strippedminlength: $.validator
            .format("Por favor, forne&ccedil;a pelo menos {0} caracteres."),
        time: $.i18n("validate_time"),
        time12h: "Por favor, forne&ccedil;a um hor&aacute;rio v&aacute;lido, no intervado de 01:00 e 12:59 am/pm.",
        url2: "Por favor, fornece&ccedil;a uma URL v&aacute;lida.",
        vinUS: "O n&uacute;mero de identifica&ccedil;&atilde;o de ve&iacute;culo informada (VIN) &eacute; inv&aacute;lido.",
        zipcodeUS: "Por favor, fornece&ccedil;a um c&oacute;digo postal americano v&aacute;lido.",
        ziprange: "O c&oacute;digo postal deve estar entre 902xx-xxxx e 905xx-xxxx",
        cpfBR: $.i18n("validate_cpf")
    });

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
            "emptyTable": $.i18n("datatable_emptytable"),
            "info": $.i18n("datatable_info"),
            "infoEmpty": $.i18n("datatable_infoempty"),
            "infoFiltered": $.i18n("datatable_info"),
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": '<span>' + $.i18n("datatable_lengthmenu") +
                '</span> _MENU_',
            "loadingRecords": $.i18n("datatable_loading"),
            "processing": $.i18n("datatable_processing"),
            "search": '<span>' + $.i18n("datatable_search") +
                '</span> _INPUT_',
            "zeroRecords": $.i18n("datatable_zerorecords"),
            "paginate": {
                'first': $.i18n("datatable_first"),
                'last': $.i18n("datatable_last"),
                'next': '&rarr;',
                'previous': '&larr;'
            },
            "aria": {
                "sortAscending": $.i18n("datatable_sortascending"),
                "sortDescending": $.i18n("datatable_sortdescending")
            }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group')
                .addClass('dropup');
        },
        preDrawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group')
                .removeClass('dropup');
        }
    });

    // External table additions
    // ------------------------------

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder',
        $.i18n("datatable_filter"));

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

    $("#lnkHome").click(function () {
        $(location).attr('href', 'dashboard.php');
    });

    $("#lnkProfile").click(function () {
        $(location).attr('href', 'profile.php');
    });

    $("#lnkLogOut").click(function () {
        doLogoff();
    });

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    /**
     * Modulos do Sistema
     */

    $("#dsp_statistics").hide();

    $("#dsp_map").addClass('col-md-12').removeClass('col-md-10');

    	if ($.parseJSON(sessionStorage.getItem("administrator")) == 1) {
		$(".resource_admin").show();
	} else {
		if (sessionStorage.getItem("userLimit") == -1) {
			$(".resource_manager").show();
            $(".resource_admin").hide();
            
		} else {
			$(".resource_manager").hide();
			$(".resource_admin").hide();
		}		
	}
	


    $("#noty4").hide();
    $("#noty3").hide();

    if (sessionStorage.getItem("version41") == "1") {
        $("#noty4").show();
    } else {
        $("#noty3").show();
    }

    if ((sessionStorage.getItem('logged') == '1')) {
        //doCheckNotifications();
    }

    $("#user_photo").attr('src', sessionStorage.getItem('photo'));

    //Lo comente ya que encriptaba el titulo del sitio web
    //if (sessionStorage.getItem('website_title')) {
    //    document.title = sessionStorage.getItem('website_title');
    //    $("#crighttitle").html(sessionStorage.getItem('website_title'));
    //    (sessionStorage.getItem('website') == "" ? $("#crighturl").attr("href", "#") : $("#cright").attr("href", sessionStorage.getItem('website')));
    //}
    
    //Lo comente ya que encriptaba el titulo del sitio web
});

// Este evendo ?? acionado ap??s o carregamento da p??gina
$(window).load(function () {
    // Ap??s a leitura da pagina o evento fadeOut do loader ?? acionado,
    // esta com delay para ser perceptivo em ambiente fora do servidor.
    jQuery("#loader_site").delay(1500).fadeOut("slow");
});
/*******************************************************************************
 * Realiza o logoff do sistema
 *
 *
 * @return void
 ******************************************************************************/

function doLogoff() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n('title_logging_out'));

    $.ajax({
        type: "DELETE",
        url: sessionStorage.getItem('url') + "session/",
        cache: false,
        headers: {
            "Authorization": "Basic " +
                btoa(sessionStorage.getItem('email') + ":" +
                    sessionStorage.getItem('password'))
        },
        error: function (response) {
            /*
             * switch(response.status) { case 400:
             * doOpenAlertError($.i18n("message_user_not_permission"));
             * break; case 401:
             * doOpenAlertError($.i18n("message_user_unauthorized"));
             * break; default:
             * doOpenAlertError($.i18n("message_error_performing"));
             * break; }
             */

             // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')
            $(location).attr('href', "login.php");
        },
        success: function (response) {
            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')

            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            $(location).attr('href', "login.php");
        }
    });

}

/*******************************************************************************
 * Limpa os campos do formulario
 *
 *
 * @return void
 ******************************************************************************/

function doFormClear() {

    doCloseAlerts();

    $(":input").not(":button, :submit, :reset").each(function () {
        this.value = this.defaultValue;
    });

}

// ****************************************************************************************************************************************************************

function insertOption(sel, val, text) {
    var y = document.createElement('option');
    y.value = val;
    y.text = text;

    var x = document.getElementById(sel);
    try {
        x.add(y, null); // standards compliant
    } catch (ex) {
        x.add(y); // IE only
    }
}

function limpaSelect(sel) {

    var x = document.getElementById(sel);

    if (x > 0) {
        for (i = x.length - 1; i >= 1; i--) {
            x.remove(i);
        }
    }
}

function getWidth() {
    // Thiago Marotta Couto
    // thiagomarotta@gmail.com
    // http://isbyte.com/
    // December, 06 - 2008
    return window.innerWidth ? window.innerWidth : /* For non-IE */
        document.documentElement ? document.documentElement.clientWidth :
        /*
         * IE
         * 6+
         * (Standards
         * Compilant
         * Mode)
         */
        document.body ? document.body.clientWidth :
        /*
         * IE 4
         * Compatible
         */
        window.screen.width;
    /*
     * Others (It is not browser
     * window size, but screen
     * size)
     */
}

function getHeight() {
    // Thiago Marotta Couto
    // thiagomarotta@gmail.com
    // http://isbyte.com/
    // December, 06 - 2008
    return window.innerHeight ? window.innerHeight : /* For non-IE */
        document.documentElement ? document.documentElement.clientHeight :
        /*
         * IE
         * 6+
         * (Standards
         * Compilant
         * Mode)
         */
        document.body ? document.body.clientHeight :
        /*
         * IE 4
         * Compatible
         */
        window.screen.height;
    /*
     * Others (It is not browser
     * window size, but screen
     * size)
     */
}

function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
// *************************************************************************************
// Fun????o strpos( haystack, needle, offset)
//
// Funcionnalidade: Retorna a posi????o de um texto baseado em outro.
// Par??metros : haystack = texto ou palavra ; needle = texto, plavra ou letra a
// ser buscada ; offset = numero maximo de saltos
// Exemplo : strpos('Kevin van Zonneveld', 'e', 5);
// returns : 14
// *************************************************************************************

function strpos(haystack, needle, offset) {

    var i = (haystack + '').indexOf(needle, offset);
    return i === -1 ? false : i;
}

// *************************************************************************************
// Fun????o Atualiza_Opener()
//
// Funcionnalidade: Atualiza a p??gina opener da popup que chamar a fun????o.
// *************************************************************************************

function Atualiza_Opener() {

    window.opener.location.reload();
}

/*
 * Function : dump() Arguments: The data - array,hash(associative array),object
 * The level - OPTIONAL Returns : The textual representation of the array. This
 * function was inspired by the print_r function of PHP. This will accept some
 * data as the argument and return a text that will be a more readable version
 * of the array/hash/object that is given.
 */

function dump(arr, level) {
    var dumped_text = "";
    if (!level)
        level = 0;

    // The padding given at the beginning of the line.
    var level_padding = "";
    for (var j = 0; j < level + 1; j++)
        level_padding += "    ";

    if (typeof (arr) == 'object') { // Array/Hashes/Objects
        for (var item in arr) {
            var value = arr[item];

            if (typeof (value) == 'object') { // If it is an array,
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value, level + 1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value +
                    "\"\n";
            }
        }
    } else { // Stings/Chars/Numbers etc.
        dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
    }
    return dumped_text;
}

function activateEnterasTab() {
    // get only input tags with class data-entry
    textboxes = $("input, select, radio, checkbox"); // .data-entry
    // now we check to see which browser is being used
    if ($.browser.mozilla) {
        $(textboxes).keypress(checkForEnter);
    } else {
        $(textboxes).keydown(checkForEnter);
    }
}

function checkForEnter(event) {
    if (event.keyCode == 13) {
        currentBoxNumber = textboxes.index(this);
        if (textboxes[currentBoxNumber + 1] != null) {
            nextBox = textboxes[currentBoxNumber + 1];
            nextBox.focus();
            nextBox.select();
            event.preventDefault();
            return false;
        }
    }
}

function blockUI(elem) {

    var block = elem.parent();
    $(block).block({
        message: $('.blockui-animation-container'),
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            width: 36,
            height: 36,
            color: '#fff',
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });

    var animation = elem.data("animation");
    $('.blockui-animation-container')
        .addClass("animated " + animation)
        .one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
                elem.removeClass("animated " + animation);
            });

    return block;

}

function basicIcon(url, label, speed, colorLabel, iconIgnition) {

    return new L.Icon.Label({
        shadowUrl: null,
        iconSize: new L.Point(40, 40),
        iconAnchor: new L.Point(0, 0),
        labelAnchor: new L.Point(36, 5),
        wrapperAnchor: new L.Point(12, 13),
        labelText: "<div style='min-width:50px'>"+label +
            "<br /><span style='font-size:8px;'>" +
            speed +
            " " +
            findSpeedUnit(sessionStorage.getItem('speedUnit')).title +
            "</span></div>" +
            iconIgnition,
        iconUrl: url,
        labelClassName: colorLabel
    });
}

function getIcon(val, text, speed, nocommunication, alarm, input, deviceId, ignition) {

    var colorLabel = 'sweet-red-label';
    var iconAlert = 'Alert';
    $("#device_" + deviceId).css("background-color", "#B71D1C");

    if (nocommunication == false && alarm == false) {
        iconAlert = '';
        colorLabel = 'sweet-deal-label';
        $("#device_" + deviceId).css("background-color", "#336442");
    }

    if (nocommunication == false && speed > 0 && alarm == false) {
        iconAlert = 'Moving';
        colorLabel = 'sweet-blue-label';
        $("#device_" + deviceId).css("background-color", "#0016B0");
    }

    if ((nocommunication == false && input == true) && alarm == false) {
        iconAlert = 'Input';
        colorLabel = 'sweet-orange-label';
        $("#device_" + deviceId).css("background-color", "#ED6F09");
    }


    iconIgnition = "";

    switch (ignition) {
        case true:
            iconIgnition = '<img src="assets/img/icons/ignition-on.png" title="Encendido ACC" style="float: right; height:24px; width: 24px; margin-top:-15px;margin-right:-3px;"/>';
            break;
        case false:
            iconIgnition = '<img src="assets/img/icons/ignition-off.png" title="APagado ACC"  style="float: right; height:24px; width: 24px; margin-top:-15px;margin-right:-3px;"/>';
            break;
        default:
            iconIgnition = '<img src="assets/img/icons/none.png" title="No disponible"  style="float: right; height:12px; width: 12px; margin-top:-10px; margin-right:-3px;"/>';
            break;
    }


    return basicIcon('assets/img/icons/' + val + iconAlert + '.png', text,
        speed, colorLabel, iconIgnition);
}

function getIconImage(val, speed, nocommunication, alarm, input) {

    var iconAlert = 'Alert';

    if (nocommunication == false && alarm == false) {
        iconAlert = '';
    }

    if (nocommunication == false && speed > 0 && alarm == false) {
        iconAlert = 'Moving';
    }

    if ((nocommunication == false && input == true) && alarm == false) {
        iconAlert = 'Input';
    }

    var icon;

    switch (val) {
        case "bicycle":
            icon = 'assets/img/icons/bicycle' + iconAlert + '.png';
            break;
        case "arrow":
            icon = 'assets/img/icons/arrow' + iconAlert + '.png';
            break;
        case "bus":
            icon = 'assets/img/icons/bus' + iconAlert + '.png';
            break;
        case "car":
            icon = 'assets/img/icons/car' + iconAlert + '.png';
            break;
        case "motorcycle":
            icon = 'assets/img/icons/motorcycle' + iconAlert + '.png';
            break;
        case "person":
            icon = 'assets/img/icons/person' + iconAlert + '.png';
            break;
        case "plane":
            icon = 'assets/img/icons/plane' + iconAlert + '.png';
            break;
        case "ship":
            icon = 'assets/img/icons/ship' + iconAlert + '.png';
            break;
        case "truck":
            icon = 'assets/img/icons/truck' + iconAlert + '.png';
            break;
        default:
            icon = 'assets/img/icons/default' + iconAlert + '.png';
            break;
    }

    return icon;
}

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};

function convertSpeed(speed, m) {

    var _speed = 0;
    var vals = ulSpeed.convert(speed, m);

    switch (sessionStorage.getItem('speedUnit')) {
        case "knots":
            _speed = (vals ? vals[2] : 0);
            break;
        case "mph":
            _speed = (vals ? vals[1] : 0);
            break;
        case "kmh":
            _speed = (vals ? vals[2] : 0);
            break;
        default:
            _speed = (vals ? vals[0] : 0);
            break;
    }

    return _speed;
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW",
        "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    return $.i18n("title_direction_" + arr[(val % 16)].toLowerCase());
}

function convertMeters(meters, unit) {

    switch (unit) {
        case "km":
            var km = meters / 1000;
            return km.toFixed(1) + " km";
            break;

        case "mi":
            return (meters / 1609.344) + " mi";
            break;

        case "nmi":
            return (meters / 1, 852) + " nmi";
            break;

        default:
            return meters;
            break;
    }

}

String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


function findClient(cli) {
    var o = {
        id: 0,
        name: ''
    };
    $.each($.parseJSON(sessionStorage.getItem('clients')), function (index,
        value) {
        if (cli == value.id) {
            o = {
                id: value.id,
                name: value.name
            };
        }
    });
    return o;
}

function findDevice(device) {
    return _.find(devices, function (obj) {
        return obj.deviceId == device;
    });
}

function findDeviceByName(name) {
    return _.find(devices, function (obj) {
        return obj.name == name;
    });
}

function findDriver(driver) {
    return _.find(driversByDevice, function (obj) {
        return obj.deviceId == driver;
    }) || {};
}

function findEventType(type) {
    return _.find(EventTypes, function (obj) {
        return obj.id == type;
    }) || {name: ''};
}

//function findEventType(type) {
//	return _.find(EventTypes, function (obj) {
//		return obj.id == type;
//	});
//}

function findGeofence(geofence) {
    return _.find(geofences, function (obj) {
        return obj.geofenceId == geofence;
    }) || {name: 'Cerca sin nombre'};
}

//function findGeofence(geofence) {
//	return _.find(geofences, function (obj) {
//		return obj.geofenceId == geofence;
//	});
//}

function findNotification(notification) {
    return _.find(notification, function (obj) {
        return obj.notificationId == notification;
    });
}

function findCategoryType(type) {
    return _.find(CategoryType, function (obj) {
        return obj.id == type;
    });
}

function findCommandTypes(type) {
    return _.find(commandTypes, function (obj) {
        return obj.type == type;
    });
}

function findPanel(panel) {
    return _.find(panels, function (obj) {
        return obj.type == panel;
    });
}

function findSpeedUnit(su) {
    return _.find(speedUnit, function (obj) {
        return obj.type == su;
    });
}

function findNotifications(noty) {
    return _.find(notifications, function (obj) {
        return obj.type == noty;
    });
}

function findNotificationsWeb(noty) {

    var retorno = false;

    var objIndex = notifications.findIndex((obj => obj.type == noty));

    if (typeof notifications[objIndex] != 'undefined') {
        if (typeof notifications[objIndex].web != 'undefined') {
            retorno = notifications[objIndex].web;
        }
    }

    return retorno;
}


function findApp(app) {
    return _.find(listApps, function (obj) {
        return obj.name == app;
    });
}


function findAlarms(arr, id, time) {

    var found_alarms = [];

    found_alarms = $.grep(arr, function (v) {
        return v.deviceId === id && v.serverTime === time;
    });

    return found_alarms;
}

function foundAlarms(arr, id, time) {

    var found_alarms = [];

    found_alarms = $.grep(arr, function (v) {
        return v.deviceId === id && v.serverTime === time;
    });

    return (found_alarms.length > 0 ? true : false);
}

function findGroup(group) {

    var found_group = [];

    found_group = $.grep(groups, function (v) {
        return v.groupId === group;
    });

    return found_group;
}

function findUser(user) {

    var found_user = [];

    found_user = $.grep(users, function (v) {
        return v.userId === user;
    });

    return found_user;
}

function findUserByEmail(email) {

    var found_user = [];

    found_user = $.grep(users, function (v) {
        return v.email === email;
    });

    return found_user;
}

function findPanel(panel) {
    return _.find(panels, function (obj) {
        return obj.type == panel;
    });
}

function isNullAndUndef(variable) {

    return (variable !== null && variable !== undefined);
}

function CheckUrl(url) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        var http = new XMLHttpRequest();
    } else { // code for IE6, IE5
        var http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function timeConvert2(s) {
    return ""; // String.format( "%03d:%02d", ms / 3600000, ( ms / 60000 ) % 60
    // );
};

function timeConvert(t) {
    // var d = new Date();
    // d.parse(t);
    // return d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    /*
     * if (mins >= 24 * 60 || mins < 0) { throw new RangeError("Valid input
     * should be greater than or equal to 0 and less than 1440."); } var h =
     * mins / 60 | 0, m = mins % 60 | 0; return
     * moment.utc().hours(h).minutes(m).format("HH:mm:ss");
     */
    return t;
}

function initializeSwitchery() {

    if (Array.prototype.forEach) {
        var elems = Array.prototype.slice.call(document
            .querySelectorAll('.switchery'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html);
        });
    } else {
        var elems = document.querySelectorAll('.switchery');
        for (var i = 0; i < elems.length; i++) {
            var switchery = new Switchery(elems[i]);
        }
    }

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    $("#latitude").val(position.coords.latitude);
    $("#longitude").val(position.coords.longitude);
}

function changeLocale(locale) {

    $.i18n({
        locale: locale
    });

    sessionStorage.setItem('language', locale);

    $('[data-i18n]').i18n();
}

function loadSwitchery() {
    // Initialize multiple switches
    if (Array.prototype.forEach) {
        var elems = Array.prototype.slice.call(document
            .querySelectorAll('.switchery'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html);
        });
    } else {
        var elems = document.querySelectorAll('.switchery');
        for (var i = 0; i < elems.length; i++) {
            var switchery = new Switchery(elems[i]);
        }
    }

}

function getTimeLimitOld(time) {
    // moment.locale('pt-br');
    var data1 = moment(time, 'YYYY-MM-DD HH:mm:ss');
    var data2 = moment();

    return (data2.diff(data1, 'minutes') > sessionStorage.getItem('timeLimit') ?
        true :
        false);
}

function getTimeLimit(time, status) {

    st = false;
    var data1 = moment(time, 'YYYY-MM-DD HH:mm:ss');
    var data2 = moment();

    if (status == "online") {
        st = true;
    } else if (status == "offline") {
        st = false;
    } else if (status == "unknown") {
        st = false;
    } else if (data2.diff(data1, 'minutes') > 120 && status == "movement") {
        st = false;
    } else {
        st = true;
    }

    return !st;

}

function hhmmss(value, time) {
    return moment.duration(value, time).format("HH:mm:ss")
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
function clearMarkers(m) {
    for (i = 0; i < markers.length; i++) {
        m.removeLayer(markers[i]);
    }
}
*/
function encrypt(str) {
    if (!str)
        str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(str.charCodeAt(pos) ^ key);
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}

function decrypt(str) {
    if (!str)
        str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(key ^ str.charCodeAt(pos));
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}

function doCheckNotifications() {

    var params = new Object();
    params.userId = sessionStorage.getItem("userid");

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "notifications/",
        data: JSON.stringify(params),
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " +
                btoa(sessionStorage.getItem('email') + ":" +
                    sessionStorage.getItem('password'))
        },
        error: function (response) {
            switch (response.status) {
                case 400:
                    // doOpenAlertError('Usu??rio n??o possui permiss??o
                    // para esta opera????o.');
                    break;
                case 401:
                    // doOpenAlertError('Usu??rio n??o autorizado.');
                    break;
                default:
                    // doOpenAlertError('Erro ao realizar opera????o!\n
                    // Contacte o suporte t??cnico.\n
                    // Erro:'+response.statusText);
                    break;
            }
        },
        success: function (response) {

            // Javascript sourced data
            notifications.splice(0);

            $.each(response, function (key, value) {

                notifications.push({
                    type: value.type,
                    web: value.web
                });

            });

            if (!listed) {
                doNotifications();
                listed = true;
            }

        }

    });

}

function doNotifications() {
    var params = "";
    var page = pathname.substring(pathname.lastIndexOf('/') + 1);

    $.each(devices, function (index, value) {
        params += "deviceId=" + value.deviceId + "&";
    });

    params += "type=allEvents&";

    var data_ini = moment().subtract(1, 'minutes');
    var data_end = moment();

    params += "from=" + data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&";
    params += "to=" + data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "reports/events",
        data: params,
        contentType: 'application/json',
        cache: false,
        headers: {
            "Authorization": "Basic " +
                btoa(sessionStorage.getItem('email') + ":" +
                    sessionStorage.getItem('password'))
        },
        error: function (response) {
            switch (response.status) {
                /**case 400:
                    doOpenAlertError($.i18n("message_user_not_permission"));
                    break;
                case 401:
                    doOpenAlertError($.i18n("message_user_unauthorized"));
                    break;
                default:
                    doOpenAlertError($.i18n("message_error_performing"));
                    break;*/
            }
        },
        success: function (response) {

            var count = 0;
            $.each(response, function (key, value) {

                if (foundAlarms(events, value.deviceId, value.serverTime) == false) {

                    var objIndex = devices.findIndex(function (device) {
                        return device.deviceId == value.deviceId;
                    });

                    events.push({
                        id: value.id,
                        deviceId: value.deviceId,
                        deviceName: findDevice(value.deviceId).name,
                        deviceIcon: findCategoryType(devices[objIndex].category).icon,
                        serverTime: value.serverTime,
                        type: value.type,
                        typeName: findEventType(value.type).name
                    });


                    if (findNotificationsWeb(value.type) == true) {
                        /**
                                                $.notify(findDevice(value.deviceId).name + '\n'+ findEventType(value.type).name,
                                                    "success", {
                                                        position: "right",
                                                        clickToHide: true,
                                                        autoHideDelay: 50000,
                                                        showAnimation: 'slideDown',
                                                        // show animation duration
                                                        showDuration: 400,
                                                        // hide animation
                                                        hideAnimation: 'slideUp',
                                                        // hide animation duration
                                                        hideDuration: 200
                                                    });
                        */
                    }

                    if (page.indexOf("dashboard") != -1) {
                        $('#notifications_list')
                            .append('<li><a href="#" class="notification-item"><span class="dot bg-warning"></span>[' +
                                findDevice(value.deviceId).name +
                                '] ' +
                                moment(value.serverTime)
                                .format('DD/MM/YYYY HH:mm:ss') +
                                ' -> ' +
                                findEventType(value.type).name +
                                '</a></li>');
                    }


                    count++;

                }

            });

            clearTimeout(lastEventsTimeOut);

            lastEventsTimeOut = setTimeout(doNotifications, 60000);

            if (page.indexOf("dashboard") != -1) {
                if (openListDevices == false) {
                    doUpdateListEvents();
                }
            } else {
                $("#notifications_count").html(count);
            }


            //$("#notifications_count").html(count);
        }
    });

    clearTimeout(notificationTimeOut);

    // notificationTimeOut = setTimeout(doNotifications,4000);

}

function sendLock(id) {

    $("#device_close").click();

    swal({
        title: $.i18n("title_confirm_lock"),
        text: $.i18n("title_message_lock"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: false
    }, function () {

        doOpenAlertWait($.i18n("title_wait"), $
            .i18n("title_sending_command"));

        var params = new Object();
        params.deviceId = id;
        params.type = "engineStop";

        $.ajax({
            type: "POST",
            url: sessionStorage.getItem('url') + "commands/send",
            data: JSON.stringify(params),
            contentType: "application/json",
            cache: false,
            headers: {
                "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
                "Accept": "application/json"
            },
            error: function (response) {

                switch (response.status) {
                    case 400:
                        if (/Device is not online/i
                            .test(response.responseText)) {
                            doOpenAlertError($
                                .i18n("message_device_not_online"));
                        } else {
                            if (/is not supported/i
                                .test(response.responseText)) {
                                doOpenAlertError($
                                    .i18n("message_command_is_not_suported"));
                            } else {
                                doOpenAlertError($
                                    .i18n("message_user_not_permission"));
                            }
                        }
                        break;
                    case 401:
                        doOpenAlertError($
                            .i18n("message_user_unauthorized"));
                        break;
                    case 404:
                        doOpenAlertError($
                            .i18n("message_user_no_matching"));
                        break;
                    case 405:
                        doOpenAlertError($
                            .i18n("message_method_not_allowed"));
                        break;
                    default:
                        doOpenAlertError($
                            .i18n("message_error_performing"));
                        break;
                }
            },
            success: function (response) {

                doOpenAlertSucess($.i18n("title_success"), $
                    .i18n("message_sent_lock_command"),
                    3000);

            }

        });

    });

}

function sendUnLock(id) {

    $("#device_close").click();

    swal({
        title: $.i18n("title_confirm_unlock"),
        text: $.i18n("title_message_unlock"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: false
    }, function () {

        doOpenAlertWait($.i18n("title_wait"), $
            .i18n("title_sending_command"));

        var params = new Object();
        params.deviceId = id;
        params.type = "engineResume";

        $.ajax({
            type: "POST",
            url: sessionStorage.getItem('url') + "commands/send",
            data: JSON.stringify(params),
            contentType: "application/json",
            cache: false,
            headers: {
                "Authorization": "Basic " +
                    btoa(sessionStorage.getItem('email') + ":" +
                        sessionStorage.getItem('password')),
                "Accept": "application/json"
            },
            error: function (response) {
                switch (response.status) {
                    case 400:
                        if (/Device is not online/i
                            .test(response.responseText)) {
                            doOpenAlertError($
                                .i18n("message_device_not_online"));
                        } else {
                            if (/is not supported/i
                                .test(response.responseText)) {
                                doOpenAlertError($
                                    .i18n("message_command_is_not_suported"));
                            } else {
                                doOpenAlertError($
                                    .i18n("message_user_not_permission"));
                            }
                        }
                        break;
                    case 401:
                        doOpenAlertError($
                            .i18n("message_user_unauthorized"));
                        break;
                    case 404:
                        doOpenAlertError($
                            .i18n("message_user_no_matching"));
                        break;
                    case 405:
                        doOpenAlertError($
                            .i18n("message_method_not_allowed"));
                        break;
                    default:
                        doOpenAlertError($
                            .i18n("message_error_performing"));
                        break;
                }
            },
            success: function (response) {

                doOpenAlertSucess($.i18n("title_success"), $
                    .i18n("message_sent_unlock_command"),
                    3000);


            }

        });

    });

}


//Activar y desactivar alarma
function sendArm(id) {

    $("#device_close").click();

    swal({
        title: $.i18n("title_confirm_arm1"),
        text: $.i18n("title_message_arm"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: false
    }, function () {

        doOpenAlertWait($.i18n("title_wait"), $
            .i18n("title_sending_command"));

        var params = new Object();
        params.deviceId = id;
        params.type = "alarmArm";

        $.ajax({
            type: "POST",
            url: sessionStorage.getItem('url') + "commands/send",
            data: JSON.stringify(params),
            contentType: "application/json",
            cache: false,
            headers: {
                "Authorization": "Basic " +
                    btoa(sessionStorage.getItem('email') + ":" +
                        sessionStorage.getItem('password')),
                "Accept": "application/json"
            },
            error: function (response) {
                switch (response.status) {
                    case 400:
                        if (/Device is not online/i
                            .test(response.responseText)) {
                            doOpenAlertError($
                                .i18n("message_device_not_online"));
                        } else {
                            if (/is not supported/i
                                .test(response.responseText)) {
                                doOpenAlertError($
                                    .i18n("message_command_is_not_suported"));
                            } else {
                                doOpenAlertError($
                                    .i18n("message_user_not_permission"));
                            }
                        }
                        break;
                    case 401:
                        doOpenAlertError($
                            .i18n("message_user_unauthorized"));
                        break;
                    case 404:
                        doOpenAlertError($
                            .i18n("message_user_no_matching"));
                        break;
                    case 405:
                        doOpenAlertError($
                            .i18n("message_method_not_allowed"));
                        break;
                    default:
                        doOpenAlertError($
                            .i18n("message_error_performing"));
                        break;
                }
            },
            success: function (response) {

                doOpenAlertSucess($.i18n("title_success"), $
                    .i18n("message_sent_arm_command"),
                    3000);


            }

        });

    });

}


function sendDisarm(id) {

    $("#device_close").click();

    swal({
        title: $.i18n("title_confirm_disarm1"),
        text: $.i18n("title_message_disarm"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: $.i18n("title_yes"),
        cancelButtonText: $.i18n("title_no"),
        closeOnConfirm: false
    }, function () {

        doOpenAlertWait($.i18n("title_wait"), $
            .i18n("title_sending_command"));

        var params = new Object();
        params.deviceId = id;
        params.type = "alarmDisarm";

        $.ajax({
            type: "POST",
            url: sessionStorage.getItem('url') + "commands/send",
            data: JSON.stringify(params),
            contentType: "application/json",
            cache: false,
            headers: {
                "Authorization": "Basic " +
                    btoa(sessionStorage.getItem('email') + ":" +
                        sessionStorage.getItem('password')),
                "Accept": "application/json"
            },
            error: function (response) {
                switch (response.status) {
                    case 400:
                        if (/Device is not online/i
                            .test(response.responseText)) {
                            doOpenAlertError($
                                .i18n("message_device_not_online"));
                        } else {
                            if (/is not supported/i
                                .test(response.responseText)) {
                                doOpenAlertError($
                                    .i18n("message_command_is_not_suported"));
                            } else {
                                doOpenAlertError($
                                    .i18n("message_user_not_permission"));
                            }
                        }
                        break;
                    case 401:
                        doOpenAlertError($
                            .i18n("message_user_unauthorized"));
                        break;
                    case 404:
                        doOpenAlertError($
                            .i18n("message_user_no_matching"));
                        break;
                    case 405:
                        doOpenAlertError($
                            .i18n("message_method_not_allowed"));
                        break;
                    default:
                        doOpenAlertError($
                            .i18n("message_error_performing"));
                        break;
                }
            },
            success: function (response) {

                doOpenAlertSucess($.i18n("title_success"), $
                    .i18n("message_sent_disarm_command"),
                    3000);


            }

        });

    });

}







////
function changeIconsAlerts(nocommunication, value) {

    $(".statusCar").attr("src", "assets/img/icons/car_off.png").attr("title",
        $.i18n("title_ignition_off"));
    $(".lockCar").attr("src", "assets/img/icons/car_unlock.png").attr("title",
        $.i18n("title_device_unlocked"));
    $(".sirenCar").attr("src", "assets/img/icons/car_siren_off.png").attr(
        "title", $.i18n("title_siren_off"));
    $(".panicCar").attr("src", "assets/img/icons/car_panic_off.png").attr(
        "title", $.i18n("title_alert_off"));

    if ((value.attributes.ignition != null ? value.attributes.ignition : false) == true) {
        $(".statusCar").attr("src", "assets/img/icons/car_on.png").attr(
            "title", $.i18n("title_ignition_on"));
    }

    if ((value.attributes.out1 != null ? value.attributes.out1 : false) == true) {
        $(".lockCar").attr("src", "assets/img/icons/car_lock.png").attr(
            "title", $.i18n("title_device_locked"));
    }

    if ((value.attributes.out2 != null ? value.attributes.out2 : false) == true) {
        $(".sirenCar").attr("src", "assets/img/icons/car_siren_on.png").attr(
            "title", $.i18n("title_siren_on"));
    }

    if (nocommunication == true ||
        ((value.attributes.alarm != null ?
            (value.attributes.alarm == "sos" ? true : false) :
            false) == true)) {
        $(".panicCar").attr("src", "assets/img/icons/car_panic_on.png").attr(
            "title", $.i18n("title_alert_on"));
    }
}





function reverseGeo(latitude, longitude, destino) {

    var getMyData = (function() {
        return {
            format: "jsonv2",
            lat: latitude,
            lon: longitude,
            zoom: 17,
            "accept-language": "en",
            addressdetails: 1
        };
    })

    var myURL = "https://nominatim.openstreetmap.org/reverse";
    var res = "Address not found";
    // success: function(data, textStatus, jqXHR) {
    /** 
     * 
     *            var xmlData = data,
                    xmlDoc = $.parseXML(xmlData),
                    $xml = $(xmlDoc),
                    $result = $xml.find("result");


        dataType: "xml",
        url: myURL,
        type: "GET",
        data: getMyData(),
        mimeType: "xml",



    */

    $.ajax({
        dataType: "json",
        url: myURL,
        type: "GET",
        data: getMyData(),
        mimeType: "json",
        success: function(data, textStatus, jqXHR) {
            console.log(data.display_name);

            /*var xmlData = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
                xmlDoc = $.parseXML(xmlData),
                $xml = $(xmlDoc),
                res = $xml.find("title");*/
            //console.log(res.text())
            //var xmlDoc = data
            //var x = xmlDoc.getElementByTagName('road')[0];
            //var res = x.textContent;
            //var xmlDoc = data.responseXML;

            //var x = xmlDoc.getElementsByTagName("road")[0].childNodes[0].nodeValue;

            //console.log("EL XML" + x);
            res = data.display_name;
            //console.log("Respuesta la calle" + res.text());
            //destino.innerHTML = '<br />Longitude: ' + longitude + '<br />Latitude: ' + latitude + '<br />Calle: ' + res;
            $('#lubica').val(res + ' | Lon: ' + longitude + ' | Lat: ' + latitude);
            $('#lati').val(latitude);
            $('#lon').val(longitude);
            $('#dir').val(res);


        },
        error: function(response) {
            console.log("There was a mistake");

        }
    });


}




function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}




/**
 * Carrega lista dos devices
 *
 *
 * @return void
 */

function getDevices() {

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
            limpaSelect("deviceIdFind");

            $.each(response, function (key, value) {
                insertOption("deviceId", value.id, value.name);
                insertOption("deviceIdFind", value.id, value.name);

                devices.push({
                    deviceId: value.id,
                    name: value.name,
                    category: value.category,
                    uniqueId: value.uniqueId,
                    groupId: value.groupId,
                    input1: (!('input1' in value.attributes) ? "input1" : value.attributes.input1),
                    input2: (!('input2' in value.attributes) ? "input2" : value.attributes.input2)
                });
            });

        }
    });

}

/**
 * Carrega lista dos grupos
 *
 *
 * @return void
 */

function getGroups() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "groups/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
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

            groups.splice(0);

            limpaSelect("groupId");

            $.each(response, function (key, value) {
                insertOption("groupId", value.id, value.name);
                groups.push({
                    groupId: value.id,
                    name: value.name
                });
            });

        }
    });

}


function getDrivers() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "drivers/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
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

            drivers.splice(0);

            limpaSelect("driverId");

            $.each(response, function (key, value) {
                insertOption("driverId", value.id, value.name, value.uniqueId);
                drivers.push({
                    driverId: value.id,
                    name: value.name,
                    uniqueId: value.uniqueId
                });
            });

        }
    });

}
//Mantenimientos
function getMaintenance() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "maintenance/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
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

            maintenances.splice(0);

            limpaSelect("maintenanceId");

            $.each(response, function (key, value) {
                insertOption("maintenanceId", value.id, value.name, value.type, value.start, value.period);
                maintenances.push({
                    maintenanceId: value.id,
                    name: value.name,
                    type: value.type,
                    start: value.start,
                    period: value.period
                });
            });

        }
    });

}
//Fin mantenimientos

///Funcion para revisar sesiones y mandar mensaje popup
//$( document ).ready(function() {
//    setInterval(function () {
//        console.log("reviso session");
//        checkSession();
//        
//   }, 3660000);
//3660000  61 minutos
//});
/////Fin de mensaje

function checkSession() {

	if (moment().isAfter(sessionStorage.getItem('expireTime'))) {
		doOpenAlertError($.i18n("title_session_expired"));
		setTimeout(function () {
			$(location).attr('href', "login.php");
		}, 1500);
	} else {
		sessionStorage.setItem('expireTime', moment().add('minutes', 300));
	}

}

function checkPermission() {

	var page = pathname.substring(pathname.lastIndexOf('/') + 1);
	var type = (sessionStorage.getItem("administrator") == "1" ? "admin" : "user");

	var found_modules = $.grep(listApps, function (v) {
		return v.name === page && v.module === type;
	});

	if (found_modules.length == 0) {
		setTimeout(function () {
			$(location).attr('href', "error401.php");
		}, 1000);
	}

}
/**
 * Carrega lista dos geofences
 *
 *
 * @return void
 */

function getGeofences() {

    $.ajax({
        type: "GET",
        url: sessionStorage.getItem('url') + "geofences/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
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

            geofences.splice(0);

            let el = document.getElementById('geofenceId')

            if (el) {
                limpaSelect("geofenceId");
            }

            $.each(response, function (key, value) {
                if (el) {
                    insertOption("geofenceId", value.id, value.name);
                }

                geofences.push({
                    geofenceId: value.id,
                    name: value.name,
                    area: value.area
                });
            });

        }
    });

}



/**
 * Carrega lista dos usuarios
 *
 *
 * @return void
 */

function getUsers() {

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "users/",
        cache: false,
        headers: {
            "Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
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

            limpaSelect("userId");
            limpaSelect("userIdFind");

            $.each(response, function (key, value) {
                insertOption("userId", value.id, value.name);
                insertOption("userIdFind", value.id, value.name);
            });

        }
    });

}

function fromWKT2Json(WKTstr) {
    var mods = {};
    var convertToPointArray = function (ptArrayString) {
        var points = [],
            ptStringArray = ptArrayString.replace(/\)|\(/gi, "").split(",");
        ptStringArray.forEach(function (pt) {

            var splitpt = pt.trim().split(" "),
                x = parseFloat(splitpt[0], 10),
                y = parseFloat(splitpt[1], 10);

            points[points.length] = [x, y];
        });
        return points;
    };

    mods.POINT = function (tailStr) {
        ///point should be in the following format:
        //    (xxxx yyyy)
        console.log(tailStr);
        var point = tailStr.replace(/\)|\(/gi, "").trim().split(" ");
        return {
            type: 'point',
            x: parseFloat(point[0], 10),
            y: parseFloat(point[1], 10)
        };
    };
    mods.MULTILINESTRING = function (tailStr) {
        //should be in the following format:
        //    MULTILINESTRING((10 10, 20 20), (15 15, 30 15))
        ///strip outermost parenthesis
        tailStr = tailStr.replace(/(\(\()|(\)\))/gi, '');
        //split on tailing parenthesis and comma
        var paths = [],
            pathsRaw = tailStr.split("),"); ///show now have ['(x1 y1, x2 y2,....)','(x1 y1, x2 y2,....)',...]

        pathsRaw.forEach(function (p) {
            paths[paths.length] = convertToPointArray(p);

        });
        return {
            type: 'polyline',
            paths: paths
        };
    };

    mods.POLYGON = function (tailStr) {
        var ml = mods.MULTILINESTRING(tailStr);
        ///DIFFERENCES BETWEEN THIS AND MULTILINE IS THAT THE PATHS ARE RINGS
        return {
            type: 'polygon',
            coordinates: ml.paths
        };
    };
    mods.MULTIPOLYGON = function (tailStr) {
        console.error('MULTIPOLYGON - not implemented');
    };
    mods.MULTIPOINT = function (tailStr) {
        return {
            type: 'multipoint',
            points: convertToPointArray(tailStr)
        };
    };
    mods.LINESTRING = function (tailStr) {
        //only close translation is multipoint
        return mods.MULTIPOINT(tailStr);

    };
    //chunk up the incoming geometry WKT  string
    var geoArray = WKTstr.split("("),
        head = geoArray.shift().trim(), ///head should be the geometry type
        tail = '(' + (geoArray.join("(").trim()); ///reconstitute the body

    return mods[head](tail);
}


function setPolygon(value, mymap) {

    if (value.area.lastIndexOf('POLYGON', 0) === 0) {

        var content = value.area.match(/\([^()]+\)/);
        var latlngs = [];

        if (content !== null) {
            var coordinates = content[0].match(/-?\d+\.?\d*/g);

            if (coordinates !== null) {

                for (i = 0; i < coordinates.length; i += 2) {
                    lat = Number(coordinates[i]);
                    lon = Number(coordinates[i + 1]);
                    latlngs.push([lat, lon]);
                }

                var polygon = L.polygon(latlngs, {
                    color: 'blue'
                }).addTo(mymap);

                geofences.push({
                    geofenceId: value.id,
                    name: value.name,
                    area: value.area,
                    polygon: polygon
                });

            }
        }

    } else if (value.area.lastIndexOf('CIRCLE', 0) === 0) {

        var content = value.area.match(/\([^()]+\)/);

        if (content !== null) {
            var coordinates = content[0].match(/-?\d+\.?\d*/g);

            if (coordinates !== null) {

                var center = [Number(coordinates[0]), Number(coordinates[1])];
                var circle = L.circle(center, {
                    radius: Number(coordinates[2])
                }).addTo(mymap);

                geofences.push({
                    geofenceId: value.id,
                    name: value.name,
                    area: value.area,
                    polygon: circle
                });

            }
        }


    } else if (value.area.lastIndexOf('LINESTRING', 0) === 0) {

        var content = value.area.match(/\([^()]+\)/);
        if (content !== null) {
            var coordinates = content[0].match(/-?\d+\.?\d*/g);
            if (coordinates !== null) {
                var latlngs = [];

                for (i = 0; i < coordinates.length; i += 2) {
                    lat = Number(coordinates[i]);
                    lon = Number(coordinates[i + 1]);
                    latlngs.push([lat, lon]);
                }

                var polyline = L.polyline(latlngs, {
                    color: 'blue'
                }).addTo(mymap);

                geofences.push({
                    geofenceId: value.id,
                    name: value.name,
                    area: value.area,
                    polygon: polyline
                });

            }

        }

    }


}

function clearPolygons(mymap) {

    $.each(geofences, function (key, value) {
        value.polygon.remove();
    });

    geofences.splice(0);

}

function mergeAttributes(arr1, arr2) {
    var array_result = "{";

    $.each(arr1, function (key, value) {
        var obj = "\"" + key + "\" : \"" + value + "\",";
        array_result += obj;
    });

    $.each(arr2, function (key, value) {
        if (!(key in arr1)) {
            var obj = "\"" + key + "\" : \"" + value + "\",";
            array_result += obj;
        }
    });

    return $.parseJSON(array_result.substr(0, array_result.length - 1) + "}");
}

function isMobile()
{
    var userAgent = navigator.userAgent.toLowerCase();
    if( userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 )
        return true;
}

/**

ATUALIZA????O 1.344
- Corre????o de permiss??o das notifica????es para os veiculos do usu??rio
- Corre????o em algumas tradu????es
- Corre????o na permiss??o de usu??rio manager

ATUALIZA????O 1.342
- Corre????o menu usu??rios
- adi????o de link para google maps no endere??o do popup


ATUALIZA????O 1.335
- Corre????o no compartilhamento de ve??culos
- Corre????o na Tradu????o
- atualiza????o peri??dica do painel de comunica????o
- inclus??o de novos icones
- adi????o de campo placa no cadastro de ve??culos
- adi????o de campos modelo de IMEI na listagem de comunica????o
- corre????o de outros bugs

ATUALIZA????O 1.330
- Op????o de atributos GT06 e H02 alternative nos veiculos
- desativar mapas do google
- idioma padr??o portugues
- atualiza????o peri??dica do painel de comunica????o
- corre????o de bugs

ATUALIZA????O 1.322
- corre????o de icones e labels
- corre????o do zoom ao carregar
- corre????o de bot??o de bloqueio/desbloqueio dashboard
- melhoria no desempenho
- corre????o de bugs

ATUALIZA????O 1.320
- Fun????o manter conectado
- corre????o de bugs


ATUALIZA????O 1.309
- retirada de mensagem de atualiza????o (via parametro)
- status do veiculo herdado do traccar.
- reordena????o de colunas e exporta????o de relatorios do dashboard
- corre????o de bugs
-> manter dados n??o compartilh??veis do traccar
-> corre????o na compatibilidade da 3.16

ATUALIZA????O 1.308
- padronizar logomarca
- problemas no seletor de tradu????es
- recupera????o de senha.
- problema na sele????o de mapas
- melhoria no carregamento e desempenho
- possibilidade de acessar endere??os VPS com SSL
- corre????o parcial da tradu????o
- corre????o de bugs
- melhoria no c??digo

ATUALIZA????O 1.301
- favicon (apple-icon.png, favicon.png e favicon.ico)
- Contador de acessos do usu??rio
- relat??rio de ultimos acessos
- reformula????o do motor dos relat??rios
- Bot??es de impress??o e exporta????o em Excel nos relat??rios
- melhoria no carregamento de algumas p??ginas
 */