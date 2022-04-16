var lastEventsTimeOut;
var notificationTimeOut;
var listed = false;
var cfgCulture = 'es';
var xw = screen.width / 2 - 920 / 2;
var x2 = screen.width / 2 - 1240 / 2;
var app_version = "1.344";
var pathname = String(window.location.pathname); // Returns path only
var currenturl = String(window.location.href); // Returns full URL
//var logomark = "../../logo.jpg";
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
        name: 'pgroups.php'
    },
    ///Inicio de modulos proveedores
    {
         module: 'admin',
        name: 'dashboard_provider.php'
    }, {
         module: 'user',
        name: 'dashboard_provider.php'
    },{
         module: 'admin',
        name: 'devices_provider.php'
    }, {
         module: 'user',
        name: 'devices_provider.php'
    },{
         module: 'admin',
        name: 'notifications_provider.php'
    }, {
         module: 'user',
        name: 'notifications_provider.php'
    },{
         module: 'admin',
        name: 'dnotifications_provider.php'
    }, {
         module: 'user',
        name: 'dnotification_provider.php'
    },{
         module: 'admin',
        name: 'groups_provider.php'
    }, {
         module: 'user',
        name: 'groups_provider.php'
    },{
         module: 'admin',
        name: 'geofences_provider.php'
    }, {
         module: 'user',
        name: 'geofences_provider.php'
    },{
         module: 'admin',
        name: 'dgeofences_provider.php'
    }, {
         module: 'user',
        name: 'dgeofences_provider.php'
    },{
         module: 'admin',
        name: 'profile_provider.php'
    }, {
         module: 'user',
        name: 'profile_provider.php'
    },{
         module: 'admin',
        name: 'playback_provider.php'
    }, {
         module: 'user',
        name: 'playback_provider.php'
    },{
         module: 'admin',
        name: 'terms_provider.php'
    }, {
         module: 'user',
        name: 'terms_provider.php'
    },{
         module: 'admin',
        name: 'list_devices_provider.php'
    }, {
         module: 'user',
        name: 'list_devices_provider.php'
    },{
         module: 'admin',
        name: 'drivers_provider.php'
    }, {
         module: 'user',
        name: 'drivers_provider.php'
    },{
         module: 'admin',
        name: 'ddrivers_provider.php'
    }, {
         module: 'user',
        name: 'ddrivers_provider.php'
    },{
         module: 'admin',
        name: 'maintenance_provider.php'
    }, {
         module: 'user',
        name: 'maintenance_provider.php'
    },{
         module: 'admin',
        name: 'dmaintenance_provider.php'
    }, {
         module: 'user',
        name: 'dmaintenance_provider.php'
    },{
         module: 'admin',
        name: 'list_task_provider.php'
    }, {
         module: 'user',
        name: 'list_task_provider.php'
    },{
         module: 'admin',
        name: 'lista_task_provider.php'
    }, {
         module: 'user',
        name: 'lista_task_provider.php'
    },{
         module: 'admin',
        name: 'report_email_provider.php'
    }, {
         module: 'user',
        name: 'report_email_provider.php'
    },{
         module: 'admin',
        name: 'status_provider.php'
    }, {
         module: 'user',
        name: 'status_provider.php'
    },{
         module: 'admin',
        name: 'logon_provider.php'
    }, {
         module: 'user',
        name: 'logon_provider.php'
    },{
         module: 'admin',
        name: 'events_provider.php'
    }, {
         module: 'user',
        name: 'events_provider.php'
    },{
         module: 'admin',
        name: 'trips_provider.php'
    }, {
         module: 'user',
        name: 'trips_provider.php'
    },{
         module: 'admin',
        name: 'routes_provider.php'
    }, {
         module: 'user',
        name: 'routes_provider.php'
    },{
         module: 'admin',
        name: 'stops_provider.php'
    }, {
         module: 'user',
        name: 'stops_provider.php'
    },{
         module: 'admin',
        name: 'mobileye_provider.php'
    }, {
         module: 'user',
        name: 'mobileye_provider.php'
    },{
         module: 'admin',
        name: 'can_obd_provider.php'
    }, {
         module: 'user',
        name: 'can_obd_provider.php'
    },{
         module: 'admin',
        name: 'codigos_can_provider.php'
    }, {
         module: 'user',
        name: 'codigos_can_provider.php'
    },{
         module: 'admin',
        name: 'users_provider.php'
    }, {
         module: 'user',
        name: 'users_provider.php'
    },
    {
         module: 'admin',
        name: 'task_provider.php'
    }, {
         module: 'user',
        name: 'task_provider.php'
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
    name: "Command output",
}, {
    id: "deviceOnline",
    name: "Device online"
}, {
    id: "deviceUnknown",
    name: "Device Unknown"
}, {
    id: "deviceOffline",
    name: "Device Offline"
}, {
    id: "deviceMoving",
    name: "Device Moving"
}, {
    id: "deviceStopped",
    name: "Device Stopped"
}, {
    id: "deviceOverspeed",
    name: "Device Overspeed"
}, {
    id: "deviceFuelDrop",
    name: "Device FuelDrop"
}, {
    id: "geofenceEnter",
    name: "Geofence Enter"
}, {
    id: "geofenceExit",
    name: "Geofence Exit"
}, {
    id: "alarm",
    name: "Alarm"
}, {
    id: "alarmGeneral",
    name: "General"
}, {
    id: "alarmSos",
    name: "SOS"
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
    name: "Photocell activated"
}, {
    id: "alarmLockOpen",
    name: "Lock Open"
}, {
    id: "alarmLockClosed",
    name: "Lock Closed"
}, {
    id: "alarmLockRing",
    name: "Lock Ring"
}, {
     id: "alarmAlarma activada",
    name: "Alarm activated"
}, {
    id: "alarmAlarma desactivada",
    name: "Alarm Deactivated"
}, {
    id: "alarmVehiculo desbloqueado",
    name: "Vehiculo desbloqueado"
}, {
    id: "alarmVehiculo bloqueado",
    name: "Vehiculo bloqueado"
}, {
    id: "alarmVibration",
    name: "Vibration"
}, {
    id: "alarmMovement",
    name: "Moving"
}, {
    id: "alarmLowspeed",
    name: "Low Speed"
}, {
    id: "alarmOverspeed",
    name: "Overspeed"
}, {
    id: "alarmFallDown",
    name: "FallDown"
}, {
    id: "alarmLowPower",
    name: "Low Power"
}, {
    id: "alarmLowBattery",
    name: "Low Battery"
}, {
    id: "alarmFault",
    name: "Fault"
}, {
   id: "alarmPowerOff",
    name: "Power OFF"
}, {
    id: "alarmPowerOn",
    name: "Power On"
}, {
    id: "alarmDoor",
    name: "Alarm Door"
}, {
    id: "alarmLock",
    name: "Alarm Lock"
}, {
    id: "alarmUnlock",
    name: "Alarm Unlock"
}, {
    id: "alarmGeofence",
    name: "Alarm Geofence"
}, {
    id: "alarmGeofenceExit",
    name: "Alarm GeofenceExit"
}, {
    id: "alarmGpsAntennaCut",
    name: "Alarm GpsAntennaCut"
}, {
    id: "alarmAccident",
    name: "Accident"
}, {
    id: "alarmTow",
    name: "Tow"
}, {
    id: "alarmIdle",
    name: "Idle"
}, {
    id: "alarmHighRpm",
    name: "High RPM"
}, {
    id: "alarmHardAcceleration",
    name: "Hard Acceleration"
}, {
    id: "alarmHardBraking",
    name: "Hard Braking"
}, {
    id: "alarmHardCornering",
    name: "Hard Cornering"
}, {
    id: "alarmLaneChange",
    name: "Lane Change"
}, {
    id: "alarmFatigueDriving",
    name: "Fatigue Driving"
}, {
    id: "alarmPowerCut",
    name: "PowerCut"
}, {
    id: "alarmPowerRestored",
    name: "PowerRestored"
}, {
    id: "alarmJamming",
    name: "Jamming"
}, {
    id: "alarmTemperature",
    name: "Temperature"
}, {
    id: "alarmParking",
    name: "Parking"
}, {
    id: "alarmShock",
    name: "Alarm Shock"
}, {
    id: "alarmBonnet",
    name: "Bonnet"
}, {
    id: "alarmFootBrake",
    name: "FootBrake"
}, {
    id: "alarmFuelLeak",
    name: "FuelLeak"
}, {
    id: "alarmTampering",
    name: "Tampering"
}, {
    id: "alarmRemoving",
    name: "Removing"
}, {
    id: "ignitionOn",
    name: "Ignition ON"
}, {
    id: "ignitionOff",
    name: "Ignition OFF"
}, {
    id: "maintenance",
    name: "Maintenance required"
}, {
    id: "textMessage",
    name: "Text Message Received"
}, {
    id: "driverChanged",
    name: "Driver Changed"
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
    title: 'Flecha'
}, {
    id: "bicycle",
    url: "assets/img/icons/bicycle.png",
    img: "<img src='assets/img/icons/bicycle.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bicycle",
    title: 'Bicicleta'
}, {
    id: "boat",
    url: "assets/img/icons/boat.png",
    img: "<img src='assets/img/icons/boat.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-boat",
    title: 'Barco'
}, {
    id: "bus",
    url: "assets/img/icons/bus.png",
    img: "<img src='assets/img/icons/bus.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bus",
    title: 'Autobus'
}, {
    id: "car",
    url: "assets/img/icons/car.png",
    img: "<img src='assets/img/icons/car.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-car",
    title: 'Carro'
}, {
    id: "crane",
    url: "assets/img/icons/crane.png",
    img: "<img src='assets/img/icons/crane.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-crane",
    title: 'Guincho'
}, {
    id: "null",
    url: "assets/img/icons/default.png",
    img: "<img src='assets/img/icons/default.png' style='height: 30px; width: 30px;'/>",
    icon: "",
    title: 'Ninguno'
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
    title: 'Motocicleta'
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
    title: 'Persona'
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
    title: 'Avión'
}, {
    id: "ship",
    url: "assets/img/icons/ship.png",
    img: "<img src='assets/img/icons/ship.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-ship",
    title: 'Navio'
}, {
    id: "tractor",
    url: "assets/img/icons/tractor.png",
    img: "<img src='assets/img/icons/tractor.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-tractor",
    title: 'Trator'
}, {
    id: "truck",
    url: "assets/img/icons/truck.png",
    img: "<img src='assets/img/icons/truck.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-truck",
    title: 'Camión'
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
    title: 'Guincho'
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
    title: 'Ambulância'
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
    title: 'Empilhadeira'
}, {
    id: "bulldozer",
    url: "assets/img/icons/bulldozer.png",
    img: "<img src='assets/img/icons/bulldozer.png' style='height: 30px; width: 30px;'/>",
    icon: "fa-bulldozer",
    title: 'Pá Carregadeira'
}];

var commandTypes = [{

    type: "custom",
    title: "Comando personalizado"
}, {
    type: "deviceIdentification",
    title: "Identificacióno de dispositivo"
}, {
    type: "positionSingle",
    title: "Reporte de única posicion"
}, {
    type: "positionPeriodic",
    title: "Actualización periodica"
}, {
    type: "positionStop",
    title: "Detener posiciones"
}, {
    type: "engineStop",
    title: "Apagar motor"
}, {
    type: "engineResume",
    title: "Encender motor"
}, {
    type: "alarmArm",
    title: "Activar alarma"
}, {
    type: "geoMove",
    title: "Activar Geo-virtual"
}, {
    type: "geoStop",
    title: "Desactivar Geo-virtual"
}, {
    type: "alarmDisarm",
    title: "Desactivar alarma"
}, {
    type: "setTimezone",
    title: "Definir fuso horário"
}, {
    type: "requestPhoto",
    title: "Solicitar foto"
}, {
    type: "powerOff",
    title: "Apagar GPS"
}, {
    type: "rebootDevice",
    title: "Reiniciar dispositivo"
}, {
    type: "sendSms",
    title: "Enviar SMS"
}, {
    type: "sendUssd",
    title: "Enviar USSD"
}, {
    type: "sosNumber",
    title: "Definir numero SOS"
}, {
    type: "silenceTime",
    title: "Definir Tempo no Silencioso"
}, {
    type: "setPhonebook",
    title: "Definir lista telefônica"
}, {
    type: "voiceMessage",
    title: "Mensagem de voz"
}, {
    type: "message",
    title: "Mensaje"
}, {
    type: "voiceMessage",
    title: "Monitoramento de Voz"
}, {
    type: "outputControl",
    title: "Controle de saída"
}, {
    type: "voiceMonitoring",
    title: "Monitoramento de Voz"
}, {
    type: "setAgps",
    title: "Definir AGPS"
}, {
    type: "setIndicator",
    title: "Definir Indicator"
}, {
    type: "configuration",
    title: "Configuración"
}, {
    type: "getVersion",
    title: "Solicitar version"
}, {
    type: "firmwareUpdate",
    title: "Actualizar firmware"
}, {
    type: "modePowerSaving",
    title: "Modificar a Economia de Energia"
}, {
    type: "modeDeepSleep",
    title: "Modifique o Sono Profundo"
}, {
    type: "movementAlarm",
    title: "Alarme de Movimento"
}, {
    type: "alarmRemove",
    title: "Remover SOS"
}, {
    type: "alarmBattery",
    title: "Alarme de Batería"
}, {
    type: "alarmSos",
    title: "SOS"
}, {
    type: "alarmClock",
    title: "Alarme Horario"
}, {
    type: "alarmSpeed",
    title: "Alarme de Excesso de Velocidad"
}, {
    type: "alarmFall",
    title: "Falha no Alarme"
}, {
    type: "alarmVibration",
    title: "Vibrando"
},{
    type: "obd",
    title: "Activar OBDII"
},{
    type: "setOdometer",
    title: "Definir Odómetro"
},{
    type: "armMoto",
    title: "Armar Moto"
},{
    type: "mobileye",
    title: "Activar Mobileye"
},{
    type: "fms",
    title: "Activar FMS"
},{
    type: "disarmMoto",
    title: "Desarmar Moto"
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
    // verifica se a janela está aberta
    if (janela != null && !janela.closed) {} else if (janela != null && janela.closed) { // se a janela foi fechada,
        // limpo a variavel janela
        // para permitir que ela
        // seja re-aberta
        janela = null;
    }
    // só abre a janela se a variavel 'janela' é nula
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
        imageUrl: '../../assets/img/loader-sesion.gif',
        
        html: true
    });
}


$(document).ready(function () {

 

    Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }

    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    }

    /** session storage */
    sessionStorage.setItem('timeLimit', 60);

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

    changeLocale('es');
    /*
    (sessionStorage.getItem('language') == "" || sessionStorage.getItem('language') == "undefined") ?
        'br' :
        sessionStorage.getItem('language')); // locale default da página*/

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
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Digite para filtrar...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

    //Select2
    $(".select-search").select2({
        allowClear: false,
        placeholder: $.i18n("title_select2"),
        language: "es"
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
        dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
        number: $.i18n("validate_number"),
        digits: $.i18n("validate_digits"),
        creditcard: $.i18n("validate_creditcard"),
        equalTo: $.i18n("validate_equalto"),
        maxlength: $.validator
            .format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
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
        letterswithbasicpunc: "Por favor, forne&ccedil;a apenas letras ou pontua&ccedil;ões.",
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
        $(location).attr('href', 'dashboard_provider.php');
    });

    $("#lnkProfile").click(function () {
        $(location).attr('href', 'profile.php');
    });

    $("#btnExit").click(function () {
        doLogoff1();
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

// Este evendo é acionado após o carregamento da página
$(window).load(function () {
    // Após a leitura da pagina o evento fadeOut do loader é acionado,
    // esta com delay para ser perceptivo em ambiente fora do servidor.
    jQuery("#loader_site").delay(1500).fadeOut("slow");
});
/*******************************************************************************
 * Realiza o logoff do sistema
 *
 *
 * @return void
 ******************************************************************************/

function doLogoff1() {

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
            //$(location).attr('href', "../../login1.php");
            //$(location).attr('href', "provider/" + useris+ '/');
            $(location).attr('href', "provider/" + providerId + '/index.php');
            
            
             //var path= "provider/" + sessionStorage.getItem('providerId') + '/index.php'  ; //-->Editar la ruta
        },
        success: function (response) {
            
             
             
              //Si tiene providerID lo muestra  
    if(sessionStorage.getItem('providerId') > "1") {            
	        var providerId = sessionStorage.getItem("providerId");
            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')

            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            //$(location).attr('href', "../../login1.php");
             $(location).attr('href', "provider/" + providerId + '/index.php');
        
    
	}
    //Si no tiene providerId muestra logo por default de provedor ID 
    //sessionStorage.getItem('userid')   
    if(sessionStorage.getItem('userid') > "0") {
            var userid = sessionStorage.getItem("userid");
            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')

            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            //$(location).attr('href', "../../login1.php");
             $(location).attr('href', "provider/" + userid + '/index.php');
	}
             
             
             
             
             
             
             
             
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
// Função strpos( haystack, needle, offset)
//
// Funcionnalidade: Retorna a posição de um texto baseado em outro.
// Parâmetros : haystack = texto ou palavra ; needle = texto, plavra ou letra a
// ser buscada ; offset = numero maximo de saltos
// Exemplo : strpos('Kevin van Zonneveld', 'e', 5);
// returns : 14
// *************************************************************************************

function strpos(haystack, needle, offset) {

    var i = (haystack + '').indexOf(needle, offset);
    return i === -1 ? false : i;
}

// *************************************************************************************
// Função Atualiza_Opener()
//
// Funcionnalidade: Atualiza a página opener da popup que chamar a função.
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
            iconIgnition = '<img src="assets/img/icons/ignition-on.png" title="ACC ignition" style="float: right; height:24px; width: 24px; margin-top:-15px;margin-right:-3px;"/>';
            break;
        case false:
            iconIgnition = '<img src="assets/img/icons/ignition-off.png" title="ACC off"  style="float: right; height:24px; width: 24px; margin-top:-15px;margin-right:-3px;"/>';
            break;
        default:
            iconIgnition = '<img src="assets/img/icons/none.png" title="Not available"  style="float: right; height:12px; width: 12px; margin-top:-10px; margin-right:-3px;"/>';
            break;
    }


    return basicIcon('assets/img/icons/' + val + iconAlert + '.png', text,
        convertSpeed(speed), colorLabel, iconIgnition);
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
                    // doOpenAlertError('Usuário não possui permissão
                    // para esta operação.');
                    break;
                case 401:
                    // doOpenAlertError('Usuário não autorizado.');
                    break;
                default:
                    // doOpenAlertError('Erro ao realizar operação!\n
                    // Contacte o suporte técnico.\n
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
            "accept-language": "es",
            addressdetails: 1
        };
    })

    var myURL = "https://nominatim.openstreetmap.org/reverse";
    var res = "Endereço não localizado";
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
            console.log("Hubo un error");

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
                    doOpenAlertError('Usuário não possui permissão para esta operação.');
                    break;
                case 401:
                    doOpenAlertError('Usuário não autorizado.');
                    break;
                default:
                    doOpenAlertError('Erro ao realizar operação!\n Contacte o suporte técnico.\n Erro:' + response.statusText);
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
                    name: value.uniqueId
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
                    name: value.type,
                    name: value.start,
                    name: value.period
                });
            });

        }
    });

}
//Fin mantenimientos

function checkSession() {

	if (moment().isAfter(sessionStorage.getItem('expireTime'))) {
		doOpenAlertError($.i18n("title_session_expired"));
		setTimeout(function () {
			$(location).attr('href', "../../login.php");
		}, 1500);
	} else {
		sessionStorage.setItem('expireTime', moment().add('minutes', 30));
	}

}

function checkPermission() {

	var page = pathname.substring(pathname.lastIndexOf('/') + 1);
	var type = (sessionStorage.getItem("admin") == "1" ? "admin" : "user");

	var found_modules = $.grep(listApps, function (v) {
		return v.name === page && v.module === type;
	});

	if (found_modules.length == 0) {
		setTimeout(function () {
			$(location).attr('href', "../../error401.php");
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

ATUALIZAÇÃO 1.344
- Correção de permissão das notificações para os veiculos do usuário
- Correção em algumas traduções
- Correção na permissão de usuário manager

ATUALIZAÇÃO 1.342
- Correção menu usuários
- adição de link para google maps no endereço do popup


ATUALIZAÇÃO 1.335
- Correção no compartilhamento de veículos
- Correção na Tradução
- atualização periódica do painel de comunicação
- inclusão de novos icones
- adição de campo placa no cadastro de veículos
- adição de campos modelo de IMEI na listagem de comunicação
- correção de outros bugs

ATUALIZAÇÃO 1.330
- Opção de atributos GT06 e H02 alternative nos veiculos
- desativar mapas do google
- idioma padrão portugues
- atualização periódica do painel de comunicação
- correção de bugs

ATUALIZAÇÃO 1.322
- correção de icones e labels
- correção do zoom ao carregar
- correção de botão de bloqueio/desbloqueio dashboard
- melhoria no desempenho
- correção de bugs

ATUALIZAÇÃO 1.320
- Função manter conectado
- correção de bugs


ATUALIZAÇÃO 1.309
- retirada de mensagem de atualização (via parametro)
- status do veiculo herdado do traccar.
- reordenação de colunas e exportação de relatorios do dashboard
- correção de bugs
-> manter dados não compartilháveis do traccar
-> correção na compatibilidade da 3.16

ATUALIZAÇÃO 1.308
- padronizar logomarca
- problemas no seletor de traduções
- recuperação de senha.
- problema na seleção de mapas
- melhoria no carregamento e desempenho
- possibilidade de acessar endereços VPS com SSL
- correção parcial da tradução
- correção de bugs
- melhoria no código

ATUALIZAÇÃO 1.301
- favicon (apple-icon.png, favicon.png e favicon.ico)
- Contador de acessos do usuário
- relatório de ultimos acessos
- reformulação do motor dos relatórios
- Botões de impressão e exportação em Excel nos relatórios
- melhoria no carregamento de algumas páginas
 */