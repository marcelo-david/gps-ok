<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>

<!doctype html>
<html lang="en">
        <head>
        <title data-i18n="header_title">&nbsp;</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <!-- CSS -->
        <link rel="stylesheet" href="assets/css/icons/icomoon/styles.css" type="text/css"/>
        <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="assets/css/vendor/icon-sets.css"/>
        <link rel="stylesheet" href="assets/css/main.min.css"/>
        <link rel="stylesheet" href="assets/css/style.css"/>
        <!-- GOOGLE FONTS -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <!-- ICONS -->
        <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-touch-icon" />
        <link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon.png" />
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />

    </head>

    <body>
        <div id="loader_site">
                        <!--			<img src="assets/img/loader.gif"/>-->
            <img src="assets/img/loader.webp"/>
            <div id="divElement" data-i18n="title_loading" style="margin-top: -30px">
                Group OK+...
            </div>
        </div>
        <!-- WRAPPER -->
        <div id="wrapper">

            <!-- SIDEBAR -->
            <div class="sidebar">
                <div style="background: white;position: relative;text-align: center;}">
                    <img src="assets/img/white-logo.png" alt="" height="60"/>
                </div>
                <!--<div class="brand over"></div>-->


                <div class="sidebar-scroll">
                    <nav>
                        <ul class="nav">

                            <font color="white"><h5><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Navigation </li></h5></font>

                            <li class="resource_track">
                                <a href="#subPagesDashboard" data-toggle="collapse" class="collapsed"><i class="lnr lnr-home"></i> <span data-i18n="mnu_dashboard">Dashboard</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesDashboard" class="collapse ">
                                    <ul class="nav">
                                        <!--	<li class="resource_track"> <a href="dashboard.php" class="lnr lnr-map-marker" data-i18n="mnu_map">Map</a></li>-->
                                        <li class="resource_track"><a href="dashboard.php" class=""><span data-i18n="mnu_map">Map</span></a></li>



                                        <li class="resource_track"><a href="main.php" class="" data-i18n="mnu_communication">Communication</a></li>

                                    </ul>
                                </div>
                            </li>

                            <li class="resource_track">
                                <a href="#subPagesDevice" data-toggle="collapse" class="collapsed"><i class="lnr lnr-code"></i> <span data-i18n="mnu_devices">Devices</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesDevice" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="devices.php" class="" data-i18n="mnu_registration">Registration</a></li>
                                        <li class="resource_manager"><a href="share.php" class="" data-i18n="mnu_share">Share</a></li>

                                    </ul>
                                </div>
                            </li>

                            <!--<li class="resource_admin resource_manager" id="mnu_notifications">-->
                            <li class="resource_track">
                                <a href="#subPagesnotifications" data-toggle="collapse" class="collapsed"><i class="lnr lnr-alarm"></i> <span data-i18n="mnu_notifications">Notifications</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesnotifications" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="notifications.php" class="" data-i18n="mnu_notifications">Notifications</a></li>
                                        <li><a href="dnotification.php" class="" data-i18n="mnu_asig_notifications">Assign notifications</a></li>

                                    </ul>
                                </div>
                            </li>




                            <li class="resource_track">
                                <a href="#subPagesGroups" data-toggle="collapse" class="collapsed"><i class="lnr lnr-location"></i> <span data-i18n="mnu_groups">Groups</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesGroups" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="groups.php" class="" data-i18n="mnu_new_group">Registration</a></li>
                                        <!--	<li><a href="dgroups.php" class="" data-i18n="mnu_asing_group">Asing group</a></li>
                                                                            <li><a href="ggeofences.php" class="" data-i18n="mnu_asig_geofences">GeoFences</a></li>-->
                                    </ul>
                                </div>
                            </li>



                            <li class="resource_track">
                                <a href="#subPagesgeofences" data-toggle="collapse" class="collapsed"><i class="lnr lnr-map-marker"></i> <span data-i18n="mnu_geofences">GeoFences</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesgeofences" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="geofences.php" class="" data-i18n="mnu_geofences">GeoFences</a></li>
                                        <li><a href="dgeofences.php" class="" data-i18n="mnu_asig_geofences">Assign GeoFences</a></li>

                                    </ul>
                                </div>
                            </li>




                        <!--<li class="resource_track"><a href="geofences.php" class=""><i class="lnr lnr-map-marker"></i> <span data-i18n="mnu_geofences">GeoFences</span></a></li>-->

                            <li class="resource_manager" id="mnu_permissions">
                                <a href="#subPagesPermission" data-toggle="collapse" class="collapsed"><i class="lnr lnr-eye"></i> <span data-i18n="mnu_permission">Permission</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesPermission" class="collapse ">
                                    <ul class="nav">
                                        <li><a  href="pdevices.php" class="" data-i18n="mnu_devices">Devices</a></li>
                                        <li><a href="pgroups.php" class="" data-i18n="mnu_groups">Groups</a></li>
                                        <li><a href="pgeofences.php" class="" data-i18n="mnu_geofences">GeoFences</a></li>
                                    </ul>
                                </div>
                            </li>


                            <li class="resource_manager" id="mnu_users">
                                <a href="#subPagesUsers" data-toggle="collapse" class="collapsed"><i class="lnr lnr-users"></i> <span data-i18n="mnu_users">Users</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                                <div id="subPagesUsers" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="users.php" class="" data-i18n="mnu_new_user">Registration</a></li>
                                    </ul>
                                </div>
                            </li>

                            <li class="resource_manager">
                              
                           <a class="boleto" href="https://www.asaas.com/login/auth" target="_blank"><i class="icon-credit-card"></i> <span>Faturamento</a>

                                <div id="subPageshelp" class="collapse ">
                                    <ul class="nav">
                            
                                    </ul>
                                </div>
                            </li>

                           
                                    <div id="subPageshelp" class="collapse ">
                                    <ul class="nav">
                                        <li><a href="terms.php" data-i18n="mnu_terms">Terms Use</a></li>
                                        <li><a href="list_devices.php" data-i18n="mnu_config_gps">Config gps</a></li>
                                    </ul>
                                    </div>
                                </li>

                        </ul>
                    </nav>


                </div>
                <!--<div class="help-box">
                <font color="white"><h4><span class="text-custom" data-i18n="mnu_toggle_contact_help">Help</span></h4></font>

                    <p class="m-b-0"><span class="text-custom" data-i18n="mnu_toggle_contact_email">Email</span></p>
                    <p class="m-b-0"><span class="text-custom" data-i18n="mnu_toggle_contact_phone">Phone</span></p>
                </div>	-->
            </div>



            <!-- END SIDEBAR -->
            <!-- MAIN -->
            <div class="main">
                <!-- NAVBAR -->
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-btn">
                            <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
                        </div>
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-menu">
                                <span class="sr-only" data-i18n="mnu_toggle_navigation">Toggle Navigation</span>
                                <i class="fa fa-bars icon-nav"></i>
                            </button>
                        </div>
                        <div id="navbar-menu" class="navbar-collapse collapse">

                            <ul class="nav navbar-nav navbar-right">

                                <li class="dropdown" style="display:none">
                                    <a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                                        <i class="lnr lnr-alarm"></i>
                                        <span class="badge bg-danger" id="notifications_count">0</span>
                                    </a>
                                    <ul class="dropdown-menu notifications" id="notifications_list">
                                    </ul>
                                </li>
                                <li class="resource_track" ><a href="playback.php" class=""><i class="lnr lnr lnr-film-play"></i> <span data-i18n="title_play-back">play-back</span></a></li>
<!--                                 <li class="resource_track"><a href="purchase.php" class=""><i class="lnr lnr-cart"></i> <span data-i18n="mnu_recharge">Recharge</span></a></li>-->
                                <li class="resource_track" ><a href="dashboard.php" class=""><i class="lnr lnr-map-marker"></i> <span data-i18n="mnu_map">Map</span></a></li>


                              <!-- <li class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-earth"></i> <span data-i18n="mnu_recharge">Recharge now</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                                                <ul class="dropdown-menu">
                                                        <li class="button_i8n" data-locale="en" >-->
                                                              <!--  <img src="assets/img/icons/eua.png" style="height: 22px; width: 22px;  cursor: pointer; float: left"  title="English"/>-->
                                <!--<a href="#" data-i18n="mnu_english">English</a>
                                </li>
                                <li class="button_i8n" data-locale="es">-->
                                       <!--<img src="assets/img/icons/mx.png" style="height: 22px; width: 22px; cursor: pointer; float: left" title="Portugu&ecirc;s"/>	-->
                              <!--	<a href="#"  data-i18n="mnu_spanish">Espa�ol</a>
                                </li>

                        </ul>
                </li>-->


                                <li class="dropdown resource_track">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-dice"></i> <span>Utilidades</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                                    <ul class="dropdown-menu">
									   <li class="resource_track" > <a class="boleto" href="https://www.asaas.com/segunda-via" target="_blank"><i class="icon-credit-card"></i> <span>Pagar fatura</a>
                                        <li class="resource_track" ><a href="drivers.php" class="" data-i18n="title_rfid">Drivers</a></li>
                                        <li class="resource_track" ><a href="ddrivers.php" class="" data-i18n="title_asig_rfid">Assign driver</a></li>
                                        <li class="resource_admin" ><a id="mnu_attribute" href="aliases.php" class=""> <span data-i18n="mnu_attribute">Attribute Aliases</span></a></li>
                                        <li class="resource_admin" ><a id="mnu_asig_attribute" href="daliases.php" class=""> <span data-i18n="mnu_asig_attribute"> Asig attributes</span></a>
                                        <li class="resource_track" ><a href="maintenance.php" class="" data-i18n="maintenance">;aintenance</a></li>
                                        <li class="resource_track" ><a href="dmaintenance.php" class="" data-i18n="asig_maintenance">Asig maintenance</a></li>

                                       <!--<li class="resource_track" ><a href="lista_task.php" id="iduser" class="" data-i18n="mnu_task">Task</a></li>
                                        <li class="resource_track" ><a href="report_mail.php"  id="iduser1" class="" data-i18n="report_mail">Report Mail</a></li>-->

                                        <!--Agregar funcionamiendo revisar como seria con Oswaldo-->
                                      <!--  <li class="resource_track" ><a href="command_auto.php"  class="" data-i18n="command_auto">Command automatics</a></li>-->


                                    </ul>
                                </li>


                                <li class="dropdown resource_track">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-calendar-full"></i> <span data-i18n="mnu_reports">Reports</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="status.php" class="" data-i18n="mnu_status_devices">Status devices</a></li>
                                        <li><a href="devices_all.php" class="" data-i18n="devices_all_ge1">Devices all</a></li>
                                        <li class="resource_manager"><a href="logon.php" class="" data-i18n="mnu_access">Access</a></li>
                                        <li><a href="summary.php" class="" data-i18n="mnu_summary">Summary</a></li>
                                        <li><a href="trips.php" class="" data-i18n="mnu_trips">Trips</a></li>
                                        <li><a href="routes.php" class="" data-i18n="mnu_route">Route</a></li>
                                        <li class="resource_manager"><a href="rusers.php" class="" data-i18n="mnu_users_list">List users</a></li>
                                        <li class="resource_admin"><a href="rdevices.php" class="" data-i18n="mnu_devices_disabled">Devices disabled</a></li>
                                        <!--<li><a href="mobileye.php" class="" data-i18n="title_reports_mobileye1">I-Watcher/Mobileye</a></li>
                                        <li><a href="can_obd.php" class="" data-i18n="title_reports_obd1">Reporte OBD</a></li>
                                        <li><a href="codigos_can.php" class="" data-i18n="title_reports_codigos1">Reporte CAN</a></li>
                                        <li><a href="report_fms.php" class="" data-i18n="title_report_fms1">Report FMS</a></li>
                                        <li><a href="report_task.php" id="iduser2" class="" data-i18n="title_report_task1">Task report</a></li>	-->

                                    </ul>
                                </li>

                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <!--	<img id="user_photo" src="assets/img/users/" class="img-circle" alt="Avatar" style="height: 30px; width: 100px">-->
                                        <img id="user_photo" src="assets/img/users/" class="" alt="Avatar" style="height: 20px; width: 40px"/>
                                        <span id="user_name">&nbsp;</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                                    <ul class="dropdown-menu">
                                        <li class="resource_admin"><a id="mnu_server" href="server.php"><i class="lnr lnr-cloud-sync"></i> <span data-i18n="mnu_server">Server</span></a></li>
                                        <li class="resource_admin"><a id="mnu_commands" href="commands.php"><i class="lnr lnr-dice"></i> <span data-i18n="mnu_commands">Commands</span></a></li>
                                        <li><a href="profile.php"><i class="lnr lnr-user"></i> <span data-i18n="mnu_profile">My Profile</span></a></li>
                                        <!--<li><a href="#"><i class="lnr lnr-envelope"></i> <span>Message</span></a></li>
                                                <li><a href="#"><i class="lnr lnr-store"></i> <span>Store</span></a></li>-->
                                        <li><a id="lnkLogOut" href="#"><i class="lnr lnr-exit"></i> <span data-i18n="mnu_logout">Logout</span></a></li>

                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <!-- END NAVBAR -->

