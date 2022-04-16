<!doctype html>
<html lang="en">
<?php
session_start();
ini_set("display_errors","0");

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>
        <head>
        <title></title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <!-- CSS -->
        <link rel="stylesheet" href="assets/css/icons/icomoon/styles.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/css/vendor/icon-sets.css" />
        <link rel="stylesheet" href="assets/css/main.min.css" />
        <link rel="stylesheet" href="assets/css/style.css" />
        <!--<script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>-->
        <script src="assets/js/jquery/jquery-latest.min.js" type="text/javascript"></script>
        <!-- GOOGLE FONTS -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css"/>
        <!-- ICONS -->
        <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-touch-icon" />
        <link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon.png" />
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
        <link href="assets/js/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
        <!--<link rel="stylesheet" href="assets/js/plugins/leaflet/leaflet.css">-->
        <link rel="stylesheet" href="assets/js/plugins/leaflet/Icon.Label.css" />
        <link href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet" />
        <link rel="stylesheet" href="assets/css/1.3.4-leaflet.css" />
        <link rel="stylesheet" href="assets/js/plugins/Leafletmarkercluster/dist/MarkerCluster.Default.css" />
        <!-- datatables buttons-->
        <link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqie5juTTLrAgLCDwk-2Ilbw0Hf9ImOCY&v=3"></script>
         <!--<script src="https://maps.googleapis.com/maps/api/js?key=&v=3"></script>-->
        <link rel="stylesheet" href="assets/css/styles.css"/>

        <!--Fecha y hora local-->
        <script src="assets/js/moment-with-locales.js" type="text/javascript"></script>
        <script src="assets/js/moment-timezone-with-data.js" type="text/javascript"></script>
        <style>
            .leaflet-touch .leaflet-control-layers,
            .leaflet-touch .leaflet-bar {
                /**border: 2px solid rgb(255, 89, 0) !important;*/
            }
            .leaflet-touch .leaflet-control-layers-toggle {
                width: 40px;
                height: 40px;
            }

            .leaflet-control-layers {
                border-radius: 5px !important;
                right:50px!important;
            }
            .leaflet-top {
                top:-10px;
                /*z-index: 1049;*/
            }
            .sweet-deal-label {
                background-color: #336442;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: #fff;
                font-weight: bold;
                z-index: 2000;
            }
            .sweet-blue-label {
                background-color: #0016B0;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: #fff;
                font-weight: bold;
                z-index: 2000;
            }
            .sweet-orange-label {
                background-color: #ED6F09;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: #fff;
                font-weight: bold;
                z-index: 2000;
            }
            .sweet-red-label {
                background-color: #B71D1C;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: #fff;
                font-weight: bold;
                z-index: 2000;
            }
            .modal-dialog-report {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }
            .modal-content-report {
                height: auto;
                min-height: 100%;
                border-radius: 0;
            }
            @media (min-width: 767px) {
            }

        </style>
    </head>
    <body>
        <div id="loader_site">
            <!--			<img src="assets/img/loader.gif"/>-->
            <img src="assets/img/loader.webp" />
            <div id="divElement" data-i18n="title_loading" style="margin-top: -10px">Aguarde o carregamento...
            </div>
        </div>
        <div id='cssmenu'>
            <ul >
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="lnr lnr-user"></i>
                        <!-- <img id="user_photo" src="assets/img/users/" class="" alt="Avatar" style="height: 20px; width: 20px"/> -->							
                        Bem-vindo: <span id="user_name">&nbsp;</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="profile.php"><i class="lnr lnr-user"></i><span data-i18n="mnu_profile">Perfil</span></a></li>	
                        <li><a href="notifications.php"><i class="lnr lnr-eye"></i><span data-i18n="mnu_notifications">Notificações</span></a></li>																										
                        <li><a id="lnkLogOut" href="#"><i class="lnr lnr-exit"></i> <span data-i18n="mnu_logout">Sair</span></a></li>	
                    </ul>  
                </li>
                <li><a href='main.php'><i class="lnr lnr-home"></i><span data-i18n="title_panel_control">Painel de controle</span></a></li>
                <li><a href='geofences.php'><i class="lnr lnr-map-marker"></i><span data-i18n="mnu_geofences">Geocercas</span></a></li>
                <li class="resource_manager"><a href='events.php'><i class="lnr lnr-file-empty"></i><span data-i18n="title_devices">Relatórios</span></a></li>
                <span class="dateday" id="dateday"></span>
                <span class="dateday" id="datedays"></span>
                <span class="datetime" id="datetime"></span>
                <img src="assets/img/logo.png"  class="fleet" alt="Logo" />
            </ul>
        </div>
        <script type="text/javascript">
            moment.locale('pt-br');
            var update = function () {
                var date = moment(new Date()).tz("America/São Paulo");

                dateday.html(date.format('dddd'));
                datedays.html(date.format('Do MMM'));
                datetime.html(date.format('h:mm A'));
            };
            datetime = $('#datetime');
            dateday = $('#dateday');
            datedays = $('#datedays');
            update();
           
        </script>
        <!-- WRAPPER -->
        <div id="wrapper" class="map">
            <div id="mapid"></div>
            <div class="circle_container">
                <div class="circle_common new-event-soundtrue" title="Som" id="btnSound" style="background-image: url(assets/img/icons/alarm.png); "></div>
                <div class="circle_common" title="Veículos" id="btnDevices" style="background-image: url(assets/img/icons/list_car.png); "></div>
                <div class="circle_common" title="Alertas" id="btnAlerts" style="background-image: url(assets/img/icons/notification.png); "></div>
                <div class="circle_common" title="Geo-Cercas" id="btnFences" style="background-image: url(assets/img/icons/geofence_off.png); "></div>
                <!--<div class="circle_common" title="Playback" id="btnPlayback" style="background-image: url(assets/img/icons/playback.png); "></div>-->
                <div class="circle_common" title="Playback Mapa" id="btnPlaybackMap" style="background-image: url(assets/img/icons/playback.png); "></div>
                <div class="circle_common" title="Seguir" id="btnRoutes" style="background-image: url(assets/img/icons/route_off.png); "></div>
                <div class="circle_common" title="StreetView" id="btnStreetView" style="background-image: url(assets/img/icons/street-view.png); "></div>
                <div class="circle_common" title="Administração" id="btnAdmin" style="background-image: url(assets/img/icons/gears.png); "></div>
<!--				<div class="circle_common"  title="Support" id="btnSupport"     style="background-image: url(assets/img/icons/whatsapphelp.png); "></div>-->
                <div class="circle_common" title="Sair" id="btnExit" style="background-image: url(assets/img/icons/powerroff.png); "></div>
                <div class="circle_online" title="Online" id="countOnline" style=" margin-top: 1px;">0</div>
                <div class="circle_offline" title="Offline" id="countOffline">0</div>
            </div>
        </div>
        <!-- Modal info window-->
        <!-- Button trigger modal -->
        <button id="btnViewDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal"
                data-target="#viewInfoDevice" style="display: none">
            &nbsp;
        </button>
        <div class="modal fade" id="viewInfoDevice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width:80%">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" id="device_close_arriba" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel"><span id="titleViewDevice"></span></h4>
                    </div>
                    <div class="modal-body">
                        <ul id="mytabs" class="nav nav-tabs nav-tabs-responsive  nav-pills" role="tablist">
                            <li class="nav-item active">
                                <a id="mnu_info" class="nav-link active" data-toggle="tab" href="#menu_1">
                                    <i class="fa fa-question-circle"></i> <span data-i18n="title_information">Informação do dispositivo</span></a>
                         
                            </li>
                            <li class="nav-item">
                                <a id="mnu_command" class="nav-link" data-toggle="tab" href="#menu_3">
                                    <i class="fa fa-gear"></i><span data-i18n="mnu_commands">Commandos</span></a>
                            </li>
                            <!-- <li class="nav-item" style="display:none">
                                 <a id="mnu_history" class="nav-link" data-toggle="tab" href="#menu_4">
                                 <i class="fa fa-history"></i> Historial</a>
                             </li>-->
                            <li class="nav-item">
                                <a id="mnu_alarms" class="nav-link" data-toggle="tab" href="#menu_5">
                                    <i class="fa fa-bell"></i><span data-i18n="title_alarm">Alarmes</span> </a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="menu_1">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div id="bodyViewDevice" style="font-size: 12px;"></div>
                                    </div>
                                </div>
                                <div class="col-md-14">
                                    <img class="iconStatus statusCar" src="assets/img/icons/car_off.png" />
                                    <img class="iconStatus lockCar" src="assets/img/icons/car_unlock.png" />
                                    <img class="iconStatus sirenCar" src="assets/img/icons/car_siren_off.png" />
                                    <img class="iconStatus panicCar" src="assets/img/icons/car_panic_off.png" />
                                    
                                    <div>      </div>
                                    <span id="iconStatus inputsViewDevice">
                                     <span data-i18n="title_sal_in">Tickets </span>&ensp;&ensp;&ensp;
                                        <span class="label label-default" id="deviceInput1" data-i18n="title_input1">Entrada 1</span>
                                        <span class="label label-default" id="deviceInput2" data-i18n="title_input2">Entrada 2</span>
                                        <span class="label label-default" id="deviceInput3" data-i18n="title_input3">Entrada 3</span>
                                        <span class="label label-default" id="deviceInput4" data-i18n="title_input4">Entrada 4</span>
                                    </span>
                                    <div></div>
                                    <span id="iconStatus outputsViewDevice">
                                    <span data-i18n="title_en_out">Saídas </span>&ensp;&ensp;&ensp;
                                        <span class="label label-default" id="deviceOutput1" data-i18n="title_Output1">Saída 1</span>
                                        <span class="label label-default" id="deviceOutput2" data-i18n="title_Output2">Saída 2</span>
                                        <span class="label label-default" id="deviceOutput3" data-i18n="title_Output3">Saída 3</span>
                                        <span class="label label-default" id="deviceOutput4" data-i18n="title_Output4">Saída 4</span>
                                    </span>
                                </div>
                            </div>
                            <div class="tab-pane" id="menu_2">
                                <img src="" id="device_photo" />
                            </div>
                            <div class="tab-pane" id="menu_3">
                                <div class="tab-content">
                                    <form id="form_send_command" method="post" action="#" enctype="application/x-www-form-urlencoded" role="form">
                                        <div class="form-group">
                                            <label style="font-weight:normal" data-i18n="title_command">Commando</label>
                                            <select class="select-search" id="type_command" name="type_command">
                                                <option value="" data-i18n="title_select2">Selecione uma opção...</option>
                                            </select>
                                        </div>
                                        <div class="form-group" id="custom_command" style="display: none">
                                            <label for="name" style="font-weight:normal" data-i18n="title_string">Cordão</label>
                                            <input type="text" id="custom" name="custom" class="form-control" maxlength="250" placeholder="Ingrese un comando personalizado"/>
                                        </div>

                                        <div class="text-right">
                                            <button type="button" class="btn btn-primary" name="btnSendCommand"><span
                                                    data-i18n="button_send">Enviar</span><i
                                                    class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
                                            <button class="btn" type="reset" name="btnClearCommand"> <i
                                                    class="icon-undo bigger-110"></i> <span
                                                    data-i18n="button_clear">Limpar</span> </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="tab-pane" id="menu_4" title="Historico">
                            </div>
                            <div class="tab-pane" id="menu_5" title="Alertas">
                                <div style="font-size: 12px;">
                                    <table id="list_table-s" class="table table-hover">
                                        <thead id="list_info_table_alerts" class="thead-dark">
                                            <tr>
                                                <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title_alerts"><span data-i18n="title_device_alarm">Dispositivo</span></th>
                                                <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title_alerts"><span data-i18n="title_alarm">Alarmes</span></th>
                                                <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title_alerts"><span data-i18n="title_date_time">Date/Hora</span></th>
                                            </tr>
                                        </thead>
                                        <tbody id="list_info_body_alerts"></tbody>
                                        <tfoot>                                       
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button id="device_lock" type="button" class="btn btn-danger" data-i18n="title_lock" style="float: left;">
                            Bloquear
                        </button>
                        <button id="device_unlock" type="button" class="btn btn-info" data-i18n="title_unlock" style="float: left;">
                           Desbloquear
                        </button>
                        
                        <button id="device_arm" type="button" class="btn btn-danger" data-i18n="title_arm" style="float: left;">
                           Alarme ligado
                        </button>
                        <button id="device_disarm" type="button" class="btn btn-info" data-i18n="title_disarm" style="float: left;">
                            Alarme desligado
                        </button>
                        <br /><br />
                        
                        <button id="device_close" type="button" class="btn btn-default" data-dismiss="modal" data-i18n="title_close">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button id="formularioDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewInfoDevice1" style="display: none">
            &nbsp;
        </button>
        <div class="modal fade" id="viewInfoDevice1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog"  role="document" style="width:85%">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="reportModalLabel">
                            <span id="titleViewReport" data-i18n="active_device_add">Ativo ativo</span>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <ul id="mytabs" class="nav nav-tabs nav-tabs-responsive  nav-pills" role="tablist">
                            <li class="nav-item active">
                                <a id="mnu_info" class="nav-link active" data-toggle="tab" href="#menu_11"> 
                                    <i class="fa fa-question-circle">&nbsp;&nbsp;</i><span data-i18n="title_information">Ativo ativo</span></a>
                            </li>
                            <li class="nav-item">
                                <a id="mnu_photo" class="nav-link" data-toggle="tab" href="#menu_22"> <i
                                        class="fa fa-question-circle"></i>&nbsp;&nbsp;<span data-i18n="title_homologate">GPS homologado</span></a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="menu_11">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div id="bodyViewDevice" style="font-size: 12px;"></div>
                                    </div>
                                </div>
                                <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded" role="form">
                                    <input type="text" id="id" name="id" style="display: none">
                                    <div class="form-group">
                                        <label for="name" style="font-weight:normal" data-i18n="title_name">Nome</label>
                                        <input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />    
                                    </div>
                                    <div class="form-group">     
                                        <label for="uniqueId" style="font-weight:normal" data-i18n="title_identifier">Identificador</label>
                                        <input type="text" id="uniqueId" name="uniqueId" class="form-control" maxlength="50" placeholder="" />
                                    </div>   
                                    <div class="form-group">
                                        <label style="font-weight:normal" data-i18n="title_category">Categoria</label>
                                        <select class="select-search" id="category" name="category">											                    											                    											                    
                                            <option value="" 		   data-i18n="title_select2">Selecione uma opção ...</option>											                    								                    
                                        </select>
                                    </div>                                               
                                    <div class="text-right" >
                                        <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Salvar</span><i
                                                class="icon-arrow-right14 position-right"></i></button>&nbsp; &nbsp; &nbsp;
                                        <button class="btn" type="reset" name="btnClear"> <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Limpar</span> </button>
                                    </div>             
                                </form>
                            </div>
                            <div class="tab-pane" id="menu_22">
                                <div class="form-group">
                                    <label style="font-weight:normal" data-i18n="title_to_connect_device">Para conectar o dispositivo GPS ao nosso servidor, use um dos endereços IP e PORT da lista abaixo</label>
<!--                                    <div >-->
<!--                                        <img class="server-flag" src="assets/img/icons/mx.png" style="height: 50px; width: 90px"/> &nbsp;&nbsp; <label style="font-size:14px; font-weight: bold" data-i18n="title_hosting_vps">Hosting Ip VPS</label> : <span id="server_ip"> </span> (<span data-i18n="title_south_of_america">(South of America)</span>)	                -->
<!--                                    </div>-->
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td><a href="#iwatcher"><img src="assets/img/devices/iwatcher.jpg" style="height: 90px; width: 120px"/><label style="font-weight:normal" data-i18n="title_iwatcher">Iwatcher</label></a></td>
                                                    <td><a href="#coban"><img src="assets/img/devices/coban.jpg" style="height: 90px; width: 120px"/><label style="font-weight:normal" data-i18n="title_coban">Coban</label></a></td>
                                                    <td><a href="#meitrack"><img src="assets/img/devices/meitrack.jpg" style="height: 90px; width: 120px"/><label  style="font-weight:normal" data-i18n="title_meitrack">Meitrack</label></a></td>
                                                    <td><a href="#ruptela"><img src="assets/img/devices/ruptela.jpg" style="height: 90px; width: 120px"/><label style="font-weight:normal" data-i18n="title_ruptela">Ruptela</label></a></td>
                                                    <td><a href="#android"><img src="assets/img/devices/android.jpg" style="height: 90px; width: 120px"/><label style="font-weight:normal" data-i18n="title_android">Android</label></a></td>
                                                    <td><a href="#ios"><img src="assets/img/devices/ios.jpg" style="height: 90px; width: 120px"/><label  style="font-weight:normal" data-i18n="title_ios">iOS</label></a></td>
                                                    <td><a href="#sinotrack"><img src="assets/img/devices/sinotrack.jpg" style="height: 90px; width: 120px"/><label  style="font-weight:normal" data-i18n="title_sinotrack">Sinotrack</label></a></td>
<!--                                                    <td><a href="#alematics"><img src="assets/img/devices/alematics.png" style="height: 90px; width: 120px"/><label  style="font-weight:normal" data-i18n="title_alematics">Alematics</label></a></td>-->
                                                </tr>
                                            </tbody>
                                        </table> 
                                    </div> 
                                </div>
                            </div>
                            <div id="iwatcher" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3> <label style="font-weight:normal" data-i18n="title_iwatcher">Iwatcher</label></h3>
                                    <span class="img-container"> 
                                        <a href="https://iwatcherapp.com/" ><img src="assets/img/devices/iwatcher.jpg" style="height: 100px; width: 100px"/></a>
                                    </span>
                                    <p>Descrição do produto: Spetrotec i-Watcher AVL é um dispositivo de monitoramento celular GSM / GPS versátil e econômico, fornecendo recursos de rastreamento online para vários veículos, de motocicletas a caminhões..</p>
                                    <p style="font-size:16px; font-weight: bold">Modelos soportados :</p>
                                    i-Watcher AVL<br/> i-Watcher CAN<br/> i-Watcher Cellular Alarm<br/> i-Watcher LOCK<br/>i-Watcher OBD<br/> i-Watcher GUARD
                                </div>
                            </div>
                            <div id="coban" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_coban">coban</label></h3>
                                    <span class="img-container"> 
                                        <a href="https://www.xexunspain.com/" ><img src="assets/img/devices/coban.jpg" style="height: 100px; width: 100px"/></a>
                                    </span>
                                    <p> Xexun Shenzhen Xexun Technology Co., Ltd is a high-tech corporation that became one of the leading manufacturers of GPS tracker.</p>
                                    <p>Xexun GPS trackers are used for a different device such as car, people and asset tracking.</p>
                                    <p style="font-size:16px; font-weight: bold">Supported Models :</p>
                                    GPS-303<br/> GPS-103<br/> TK103<br/> GPS-308<br/> GPS-108
                                </div>
                            </div>

                            <div id="android" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_android">android</label></h3>
                                    <span class="img-container"> 
                                        <a href="" ><img src="assets/img/devices/android.jpg" style="height: 100px; width: 160px"/></a>
                                    </span>
                                    <p>Nowadays, smartphones and tablets have become multipurpose devices for all kinds of tasks, and even as a GPS device. In this sense, it is no longer necessary to ask your employees or relatives to carry a GPS device in their pocket, simply install the GPS Tracker application on their mobile phones and follow them wherever they go, at no cost..</p>

                                    <p style="font-size:16px; font-weight: bold">Contact your service provider to activate your mobile device.</p>

                                </div>
                            </div>
                            <div id="sinotrack" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_sinotrack">Sinotrack</label></h3>
                                    <span class="img-container"> 
                                        <a href="http://www.sinotrack.com/" ><img src="assets/img/devices/sinotrack.jpg" style="height: 100px; width: 180px"/></a>
                                    </span>
                                    <p>Conecte sus conductores, vehículos, tareas, rutas, zonas geográficas, comunicaciones, todos los demás datos en una sola plataforma.</p>
                                    <p style="font-size:16px; font-weight: bold">Modelos soportados: </p>
                                    Sinotrack ST-901	<br/>
                                </div>
                            </div>
                            <div id="ruptela" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_ruptela">ruptela</label></h3>
                                    <span class="img-container"> 
                                        <a href="https://www.ruptela.es/" ><img src="assets/img/devices/ruptela.jpg" style="height: 100px; width: 100px"/></a>
                                    </span>
                                    <p>Conecte sus conductores, vehículos, tareas, rutas, zonas geográficas, comunicaciones, todos los demás datos en una sola plataforma.</p>
                                    <p style="font-size:16px; font-weight: bold">Modelos soportados: </p>
                                    FM-Eco4+ S<br/> FM-Eco4 light S<br/> FM-Pro4<br/> FM-Plug4<br/> FM-Eco4 light
                                </div>
                            </div>
                            <div id="meitrack" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_meitrack">Meitrack</label></h3>
                                    <span class="img-container"> 
                                        <a href="http://www.meitrack.com/" ><img src="assets/img/devices/meitrack.jpg" style="height: 100px; width: 100px"/></a>
                                    </span>
                                    <p>No todos los negocios son iguales y por eso ofrecemos múltiples rastreadores GPS junto con los varios accesorios para añadir tales como combustible / sensores de temperatura, cámaras, micrófonos y hasta lectores RFID.</p>
                                    <p style="font-size:16px; font-weight: bold">Modelos soportados: </p>
                                    MVT380<br/>  MT90<br/> MVT600<br/> MVT800<br/>
                                </div>
                            </div>
                            <div id="ios" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3><label style="font-weight:normal" data-i18n="title_ios">IiOS</label></h3>
                                    <span class="img-container"> 
                                        <a href="" ><img src="assets/img/devices/ios.jpg" style="height: 100px; width: 100px"/></a>
                                    </span>
                                    <p>Actualmente, los teléfonos inteligentes y tabletas se han convertido en dispositivos multiuso para todo tipo de tareas, e incluso como dispositivo GPS. En este sentido, ya no es necesario pedir a sus empleados o familiares que lleven consigo un dispositivo GPS en el bolsillo, simplemente instale la aplicación  Tracker GPS en sus teléfonos móviles y sígalos a donde vayan, sin ningún costo.</p>
                                    <p style="font-size:16px; font-weight: bold">Contacte a su proveedor de servicio para activar su dispositivo m&oacute;vil.</p>
                                </div>
                            </div>
                            <div id="alematics" class="modalDialog">
                                <div>
                                    <a href="#close1" title="Close1" class="close1">X</a>
                                    <h3> <label style="font-weight:normal" data-i18n="title_alematics">Alematics</label></h3>
                                    <span class="img-container"> 
                                        <a href="https://iwatcherapp.com/" ><img src="assets/img/devices/alematics.png" style="height: 80px; width: 130px"/></a>
                                    </span>
                                    <p>Descripción del producto: Alematics es un dispositivo de monitoreo celular GSM / GPS versátil y rentable, que proporciona capacidades de seguimiento en línea para varios vehículos, desde motocicletas hasta camiones.</p>
                                    <p style="font-size:16px; font-weight: bold">Modelos soportados :</p>
                                    AE1<br/>AM1<br/> AM3<br/> AM7<br/>AE3<br/>AT1
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button id="formulario_play_back" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewInfoDevice5" style="display: none">
            &nbsp;
        </button>
        <div class="modal fade" id="viewInfoDevice5" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog"  role="document" style="width:95%">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="reportModalLabel">
                            <span id="titleViewReport" data-i18n="title_playback">title_playback</span>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="menu_11">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div id="bodyViewDevice" style="font-size: 12px;"></div>
                                    </div>
                                </div>
                                <div class="tab-content">
                                    <div class="row">
                                        <form id="form_play" method="post" action="#" enctype="application/x-www-form-urlencoded" role="form">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label style="font-weight:normal" data-i18n="title_device">Dispositivo</label>
                                                    <select class="select-search" id="deviceId" name="deviceId">
                                                        <option value="" data-i18n="title_select2">Select an option...</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label style="font-weight:normal" data-i18n="title_term">title_term</label>
                                                    <select class="select-search" id="term" name="term">
                                                        <option value="" data-i18n="title_select2">Select an option...</option>
                                                        <option value="CUSTOM" data-i18n="title_custom">Personalized</option>
                                                        <option value="TODAY" data-i18n="title_today">Today</option>
                                                        <option value="YESTERDAY" data-i18n="title_yesterday">Yesterday</option>
                                                        <option value="WEEK" data-i18n="title_week">Current week</option>
                                                        <option value="LAST_WEEK" data-i18n="title_last_week">Last week</option>
                                                        <option value="MONTH" data-i18n="title_month">Current month</option>
                                                        <option value="LAST_MONTH" data-i18n="title_last_month">Last month</option>
                                                    </select>
                                                </div>
                                                <div class="row term-controls hidden">
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                                            <input type="text" id="from" name="from" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label for="to" style="font-weight:normal" data-i18n="title_period_end">Period</label>
                                                            <input type="text" id="to" name="to" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary" name="btnGenerate"><span data-i18n="button_generate">Generate</span><i class="icon-arrow-right14 position-right"></i></button>
                                                    &nbsp; &nbsp; &nbsp;
                                                    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>
                                                </div>
                                            </div>

                                            <div class="col-md-8">
                                                <div id="mapid3" ></div>
                                            </div>
                                        </form>
                                        <table class="table datatable-js1" id="datatable" style="display:none">
                                            <thead>
                                                <tr>
                                                    <th data-i18n="title_device_name">Dispositivo Nome</th>
                                                    <th data-i18n="title_validate">Choose</th>-
                                                    <th data-i18n="title_device_time">hour</th>
                                                    <th data-i18n="title_latitude">latitude</th>
                                                    <th data-i18n="title_longitude">longitude</th>
                                                    <th data-i18n="title_altitude">altitude</th>
                                                    <th data-i18n="title_speed">speed</th>
                                                   <th data-i18n="title_address">Address</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal report window-->
        <!-- Button trigger modal -->
        <button id="btnViewReport" type="button" class="btn btn-primary btn-lg" data-toggle="modal"
                data-target="#viewInfoReport" style="display: none">
            &nbsp;
        </button>
        <div class="modal fade" id="viewInfoReport" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel">
            <div class="modal-dialog modal-dialog-report modal-lg" role="document">
                <div class="modal-content modal-content-report">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" id="reportModalLabel"><span id="titleViewReport">Sistema de relatórios</span>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <!-- form -->
                        <div id="panel_report" class="table-responsive">
                            <div id="panel_form">
                                <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded" role="form" style="width:95%">
                                    <div class="form-group">
                                        <label style="font-weight:normal" data-i18n="title_devices">Dispositivos</label>
                                        <select class="select-search" id="report_id" name="report_id">
                                            <option value="" data-i18n="title_select2">Select an option...
                                            </option>
                                            <option value="0">Resumo</option>
                                            <option value="1">Eventos </option>
                                            <option value="2">Viagens </option>
                                            <option value="3">Rotas</option>
                                            <option value="4">Paradas</option>
                                            <option value="5">Periféricos</option>
                                            <option value="6" id="opt_report_user" style="display:none">Usuário</option>
                                            <option value="7">Dispositivos</option>
                                        </select>
                                    </div>
                                    <div class="form-group" id="field_device" style="display:none">
                                        <label style="font-weight:normal" data-i18n="title_device">Device</label>
                                        <select class="select-search" id="report_device" name="report_device"
                                                multiple="multiple">
                                            <option value="" data-i18n="title_select2">Select an option...
                                            </option>
                                        </select>
                                    </div>
                                   <!-- <div class="form-group" id="field_group" style="display:none">
                                        <label style="font-weight:normal" data-i18n="title_group">Group</label>
                                        <select class="select-search" id="report_group" name="report_group"
                                                multiple="multiple">
                                            <option value="" data-i18n="title_select2">Seleccione una opc&otilde;n...
                                            </option>
                                        </select>
                                    </div>-->
                                    <div class="form-group" id="field_event" style="display:none">
                                        <label style="font-weight:normal" data-i18n="title_event_type">Tipo de Evento</label>
                                        <select class="select-search" id="report_type" name="report_type"
                                                multiple="multiple">
                                            <option value="" data-i18n="title_select2">Selecione uma opção...
                                            </option>
                                            <option value="allEvents" data-i18n="title_allEvents">Todos os eventos</option>
                                            <option value="commandResult" data-i18n="title_commandResult">Resultado do Comando</option>
                                            <option value="deviceOnline" data-i18n="title_deviceOnline">Dispositivo está online</option>
                                            <option value="deviceUnknown" data-i18n="title_deviceUnknown">Dispositivo desconhecido</option>
                                            <option value="deviceOffline" data-i18n="title_deviceOffline">Dispositivo está offline</option>
                                            <option value="deviceMoving" data-i18n="title_deviceMoving">Dispositivo movendo </option>
                                            <option value="deviceStopped" data-i18n="title_deviceStopped">Dispositivo parado</option>
                                            <option value="deviceOverspeed" data-i18n="title_deviceOverspeed">Dispositivo excede limite velocidade</option>
                                            <option value="geofenceEnter" data-i18n="title_geofenceEnter">Dispositivo entra na geocerca</option>
                                            <option value="geofenceExit" data-i18n="title_geofenceExit">Dispositivo sai da geocerca</option>
                                            <option value="alarm" data-i18n="title_alarm">Alarmes</option>
                                            <option value="ignitionOn" data-i18n="title_ignitionOn">Ignição ligada</option>
                                            <option value="ignitionOff" data-i18n="title_ignitionOff">Ignição desligada</option>
                                            <option value="maintenance" data-i18n="title_maintenance">Manutenção requerida</option>
                                            <option value="driverChanged" data-i18n="title_driverChanged">Motorista trocado</option>
                                        </select>
                                    </div>
                                    <div class="row" id="field_period" style="display:none">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label style="font-weight:normal" data-i18n="title_period">Período</label>
                                                <select class="select-search" id="report_period" name="report_period">
                                                    <option value="" data-i18n="title_select2">Selecione uma opção...</option>
                                                    <option value="0">Hoje</option>
                                                    <option value="1">Ontem</option>
                                                    <!--<option value="2">Esta Semana</option>
                                                    <option value="3">Semana Pasada</option>
                                                    <option value="4">Este Mes</option>-->
                                                    <option value="5">Personalizado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" id="field_period_custom" style="display:none">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="report_from" style="font-weight:normal"
                                                       data-i18n="title_period">Período</label>
                                                <input type="text" id="report_from" name="report_from"
                                                       class="form-control datetimepicker" maxlength="20"
                                                       data-mask="99/99/9999 99:99:99" placeholder="" style="float:left" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="report_to" style="font-weight:normal">&nbsp;</label>
                                                <input type="text" id="report_to" name="report_to"
                                                       class="form-control datetimepicker" data-mask="99/99/9999 99:99:99"
                                                       maxlength="20" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group" id="field_disabled" style="display:none">
                                        <label style="font-weight:normal" data-i18n="title_disabled">Disabilitado</label>
                                        <select class="select-search" id="report_disabled" name="report_disabled">
                                            <option value="" data-i18n="title_select2">Selecione uma opção...
                                            </option>
                                            <option value="yes" data-i18n="title_yes">Sim</option>
                                            <option value="no" data-i18n="title_no">Não</option>
                                            <option value="all" data-i18n="title_all">Todos</option>
                                        </select>
                                    </div>
                                    <div class="text-right" id="field_buttons" style="display:none">
                                        <button type="submit" class="btn btn-primary" name="btnGenerateReport"><span
                                                data-i18n="button_generate">Gerar</span><i
                                                class="icon-arrow-right14 position-right"></i></button>
                                        &nbsp; &nbsp; &nbsp;
                                        <button class="btn" type="reset" name="btnClearReport"> <i
                                                class="icon-undo bigger-110"></i> <span
                                                data-i18n="button_clear">Limpar</span> </button>
                                    </div>
                                </form>
                            </div>
                            <!--<div id="panel_table" style="display:none">-->
                            <div id="panel_table" style="display:none">
                                <table class="table datatable-js" id="datatable_report">
                                    <thead id="datatable_report_header">
                                        <tr>
                                            <th data-i18n="title_device_name">Nome do dispositivo</th>
                                            <th data-i18n="title_distance">Distância</th>
                                            <th data-i18n="title_engine_hours">Horário de funcionamento</th>
                                            <th data-i18n="title_max_speed">Velocidade máxima</th>
                                            <th data-i18n="title_average_speed">Velocidade média</th>
                                            <th data-i18n="title_fuel_spent">Velocidade média</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                        </div>
                        <!-- /form -->
                    </div>
                    <div class="modal-footer">
                        <button id="report_back" type="button" class="btn btn-info" data-i18n="button_back"
                                style="display:none">
                           Voltar
                        </button>
                        <button id="report_close" type="button" class="btn btn-default" data-dismiss="modal"
                                data-i18n="title_close">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="pano"></div>
        <div id="container_footer" class="container_footer">
            <div style="width: 100%px; height: 160px; float:left; background-color:#fff; background-color: rgba(255, 255, 255, 0.1);">
                <table class="footer_info" >
                    <tr>
                        <td colspan="3" width="100%" bgcolor="#00a0f0">
                            <font color="#fff"> <label data-i18n="title_device" style="font-size:16px; font-weight: bold">Titulo do dispositivo</label> :
                            <span id="panel_device_name" style="font-size:16px; font-weight: bold">-</span></font>
                        </td>
                        <td width="100%" bgcolor="#00a0f0">
                            <span id="panel_device_status" style="font-size:18px; font-weight: bold">-</span>&nbsp;&nbsp;&nbsp;
                            <span id="btnCloseFooter">X</span>&nbsp;&nbsp;&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/clock.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_time">Time&nbsp;</span>
                        </td>
                        <td colspan="3">
                            <span id="panel_device_time">-</span>
                        </td>

                    </tr>

                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/odometer_level.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_speed">Velocidade</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_speed">-</span>
                        </td>
                        <td width="15%" style="border-left-style:solid; border-width: 1px; padding-left:4px">
                            <img src="assets/img/icons/navigation.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_course">Direção</span>
                        </td>
                        <td>
                            <span id="panel_device_course">-</span>
                        </td>
                    </tr>

                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/cmd.png" style="height: 16px; width: 16px" />
                            <span>IP</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_ip">-</span>
                        </td>
                        <td width="15%" style="border-left-style:solid; border-width: 1px; padding-left:4px">
                            <img src="assets/img/icons/information.png" style="height: 16px; width: 16px" />
                            <span>Protocolo&nbsp;</span>
                        </td>
                        <td>
                            <span id="panel_device_protocol">-</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%">
                            <img src="assets/img/icons/placeholder.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_address">Local</span>
                        </td>
                        <td colspan="9">
                            <span id="panel_device_address">-</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/movement-off.png" style="height: 16px; width: 16px" />
                            <span >Movimento&nbsp;</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_movement">-</span>
                        </td>
                        <td width="15%" style="border-left-style:solid; border-width: 1px; padding-left:4px">
                            <img src="assets/img/icons/alarm.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_alarm">Alarme</span>
                        </td>
                        <td>
                            <span id="panel_device_alarm">-</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/odometer.png" style="height: 16px; width: 16px" />
                            <span>Odometro</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_totalDistance">-</span>
                        </td>
                        <td width="15%" style="border-left-style:solid; border-width: 1px; padding-left:4px">
                            <img src="assets/img/icons/history.png" style="height: 16px; width: 16px" />
                            <span>Horas&nbsp;</span>
                        </td>
                        <td>
                            <span id="panel_device_hours">-</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="15%">
                            <img src="assets/img/icons/battery_level.png" style="height: 16px; width: 16px" />
                            <span data-i18n="title_battery">Batteria</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_battery">-</span>
                        </td> 
                        <td width="15%">
                            <img src="assets/img/icons/batteryLow.png" style="height: 16px; width: 16px" />
                            <span>Externa</span>
                        </td>
                        <td width="35%">
                            <span id="panel_device_batteryLow">-</span>
                        </td>
                    </tr>       
                </table>
            </div>
        </div>




        <script id="devices-template" type="text/template">
            <tr>
            <th scope="col" colspan="2" style="font-size:14px; font-weight: bold" id="list_info_title">Estado</th>
            <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title">Nome&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>

            </tr>
        </script>

        <script id="events-template" type="text/template">
            <tr>
            <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title">Veículos</th>
            <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title">Evento&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th scope="col" style="font-size:14px; font-weight: bold" id="list_info_title">Data&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            </tr>
        </script>



        <div id="list_info" class="table-responsive container_list slideout-menu">
            <div class="page-footer" id="list_devices">
                <div class="page-lista"><i class="lnr lnr-location"> </i>
                    <span data-i18n="title_list_fleet">Listas de Dispositivos</span> 
                </div>     
            </div>

            <div class="page-footer" id="list_alarms">
                <div class="page-lista"><i class="lnr lnr-alarm"> </i>
                    <span data-i18n="title_list_alarms">Listas alarmes</span> 
                </div>     
            </div>
            <table id="list_cuantos" style="height: 35px; width: 270px" align="center">
                                      
                <div class="resource_manager">
                    <button id="btnAdd" type="button" class="btn btn-primary" style="float: center;  height:35px; width:100%;">
                        <span data-i18n="active_device_add">Ativo ativo</span>
                    </button>
                </div>
                <br />                                

                <tr>
                    <td>
                        <div style="color: #0080FF; font-size:12px; font-weight: bold" align="center"  id="coutAlldev">
                            <span data-i18n="total">Total Dispositivos</span>
                        </div>
                    </td>
                    <td>
                        <div style="color: #088A29; font-size:12px; font-weight: bold" align="center"  id="countOnlinea">
                            <span data-i18n="linea">Dispositivos Online</span>
                        </div>
                    </td>
                    <td>
                        <div style="color: #DF0101; font-size:12px; font-weight: bold" align="center" id="countOfflinea">
                            <span data-i18n="fuera">Dispositivos Offline</span></div>
                    </td>
                </tr>
            </table>
            <table id="list_table-s" class="table table-hover">
                <thead id="list_info_table" class="thead-dark">
                </thead>
                <tbody id="list_info_body"></tbody>
                <tfoot>
                <input type="text" id="list_info_search" name="list_info_search" class="form-control" maxlength="20"
                       placeholder="Procurar dispositivo..." />
                </tfoot>
                    <!--<th scope="col">
                                                    <img id="btnClearAlerts" src="assets/img/icons/trash.png" style="height: 16px; width: 16px; cursor:pointer; margin-right:10px" />
                                            </th>
                                            </tr>-->
            </table>
        </div>
        <!-- /Modal -->
        <!-- END MAIN CONTENT -->
        <!-- Javascript -->
        <script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
        <script src="assets/js/bootstrap/bootstrap.min.js"></script>
        <script src="assets/js/plugins/toastr/toastr.min.js"></script>
        <script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="assets/js/klorofil.min.js"></script>
        <!-- datatable export -->
        <script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
        <script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="assets/js/plugins/forms/selects/select2.min.js"></script>
        <script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
        <script src="assets/js/plugins/forms/styling/switchery.min.js"></script>
        <script src="assets/js/plugins/forms/styling/switch.min.js"></script>
        <script src="assets/js/plugins/forms/validation/validate.min.js"></script>
        <script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
        <script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
        <script charset="UTF-8" src="assets/js/apps/i8n.js"></script>
        <script src="assets/js/plugins/forms/styling/uniform.min.js"></script>
        <script src="assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
        <script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
        <script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
        <script src="assets/js/plugins/ui/moment/moment.min.js"></script>
        <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
        <script src="assets/js/plugins/ui/moment/moment-timezone.js"></script>
        <!-- moment-duration-format plugin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-duration-format/1.3.0/moment-duration-format.min.js">
        </script>
        <script src="assets/js/plugins/pickers/daterangepicker.js"></script>
        <script src="assets/js/plugins/leaflet.js"></script>
    <!--<script src="assets/js/plugins/leaflet/leaflet.js"></script> -->
        <script src="assets/js/plugins/leaflet/Icon.Label.js"></script>
        <script src="assets/js/plugins/leaflet/Icon.Label.Default.js"></script>
        <script src="assets/js/plugins/toastr/toastr.min.js"></script>
        <script src="assets/js/plugins/yspeed.js"></script>
        <script src="assets/js/plugins/md5/jquery.md5.js"></script>
        <!--<script src="assets/js/plugins/leaflet/google.js"></script>-->
        <script src="assets/js/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
        <script src="assets/js/plugins/leaflet/Leaflet.GoogleMutant.js"></script>
        <script src="assets/js/apps/commons/commons.js"></script>
        <script src="assets/js/plugins/underscore-min.js"></script>
        <script src="assets/js/plugins/notifications/notify.js"></script>
        <script src="assets/js/plugins/ui/moment/moment-timezone.js"></script>
        <script src="assets/js/plugins/ui/moment/moment-timezone-with-data.min.js"></script>
        <script src="assets/js/plugins/Leafletmarkercluster/dist/leaflet.markercluster.js"></script>
        <script src="assets/js/plugins/leaflet/jquery.geo-1.0.0-b2.min.js"></script>
        <script src="assets/js/plugins/jquery.mask.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js"></script>
        <script src="assets/js/apps/general.js"></script>
        <script src="assets/js/plugins/jquery.cookie.js"></script>
        <script src="assets/js/apps/dashboards/dashboard.js"></script>
        <script src="assets/js/apps/commons/devicemap.js"></script>
        <!-- Playback mapa -->
        <script src="https://bbecquet.github.io/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js"></script>
        <script src="assets/js/plugins/leaflet/google.js"></script>
        <script src="assets/js/apps/commons/playback_map.js"></script>
        <!-- END WRAPPER -->
        <audio id='audio'>
            <source src="assets/alert.mp3" type="audio/mp3" />
        </audio>
        <audio id='audioSos'>
            <source src="assets/sos.mp3" type="audio/mp3" />
        </audio>
    </body>
</html>