<?php	
	include_once "header.php";
?>	

<!-- Bootstrap Material Datetime Picker Css -->
<link href="assets/js/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css"/>

<!-- datatables buttons-->
<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css"/>

<!-- leaflet -->
<link rel="stylesheet" href="assets/js/plugins/leaflet/leaflet.css"/>
<link rel="stylesheet" href="assets/js/plugins/leaflet/Icon.Label.css"/>
<link rel="stylesheet" href="assets/js/plugins/leaflet/leaflet.pm.css" />

<style type="text/css">
    #datatable.datatable-js tr {
        cursor: pointer;
    }
    .highlight {
        background: #fafad2;
    }
    #mapid2 {
        background-color: #fff;
    }
</style>
<!-- MAIN CONTENT -->
<div class="main-content">
    <div class="container-fluid">
        <h3 class="page-title" data-i18n="title_playback">title_playback</h3>
        <div class="panel panel-headline">
            <div class="panel-body">
                <div class="tab-content">
                    <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded" role="form">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label style="font-weight:normal" data-i18n="title_device">Device</label>
                                    <select class="select-search" id="deviceId" name="deviceId">
                                        <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label style="font-weight:normal" data-i18n="title_term">title_term</label>
                                    <select class="select-search" id="term" name="term">
                                        <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
                                        <option value="CUSTOM" data-i18n="title_custom">Personalizado</option>
                                        <option value="TODAY" data-i18n="title_today">Hoy</option>
                                        <option value="YESTERDAY" data-i18n="title_yesterday">Ayer</option>
                                        <option value="WEEK" data-i18n="title_week">Semana actual</option>
                                        <option value="LAST_WEEK" data-i18n="title_last_week">Semana anterior</option>
                                        <option value="MONTH" data-i18n="title_month">Mes actual</option>
                                        <option value="LAST_MONTH" data-i18n="title_last_month">Mes anterior</option>
                                    </select>
                                </div>
                                <div class="row term-controls hidden">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                            <input type="text" id="from" name="from" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
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
                                <div id="mapid2"></div>
                            </div>
                        </div>
                    </form>
                    <hr />

                    <table class="table datatable-js" id="datatable">
                        <thead>
                            <tr>
                                <th data-i18n="title_device_name">Nome do dispositivo</th>
                                <th data-i18n="title_validate">Valido</th>
                                <th data-i18n="title_device_time">Data e hora</th>
                                <th data-i18n="title_latitude">latitud</th>
                                <th data-i18n="title_longitude">longitude</th>
                                <th data-i18n="title_altitude">Altitude</th>
                                <th data-i18n="title_speed">Velocidade</th>
                                <th data-i18n="title_course">Endereço</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END MAIN CONTENT -->

<!-- Javascript -->
<script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
<script src="assets/js/bootstrap/bootstrap.min.js"></script>
<script src="assets/js/plugins/toastr/toastr.min.js"></script>
<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
<script src="assets/js/plugins/ui/moment/moment.min.js"></script>
<script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
<!-- Bootstrap Material Datetime Picker Plugin Js -->
<script src="assets/js/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>
<script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
<script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
<script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
<script src="assets/js/plugins/yspeed.js"></script>
<script src="assets/js/plugins/underscore-min.js"></script>
<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
<script src="assets/js/apps/i8n.js"></script>
<script src="assets/js/klorofil.min.js"></script>
<!-- moment-duration-format plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-duration-format/1.3.0/moment-duration-format.min.js"></script>
<script src="assets/js/plugins/leaflet/leaflet.js"></script>
<script src="assets/js/plugins/leaflet/Icon.Label.js"></script>
<script src="assets/js/plugins/leaflet/Icon.Label.Default.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=&v=3"></script>
<script src="assets/js/plugins/leaflet/google.js"></script>
<!-- datatable export -->
<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
<script src="assets/js/apps/general.js"></script>
<script src="https://bbecquet.github.io/Leaflet.PolylineDecorator/dist/leaflet.polylineDecorator.js"></script>
<script src="assets/js/apps/commons/playback.js"></script>
 <?php
	include_once "footer.php";
?>
