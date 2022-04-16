
<?php	
	include_once "header.php";
?>			
 <!-- App css -->
        <link href="assets/css/core_main.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components_main.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons_main.css" rel="stylesheet" type="text/css" />
        <link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css"/>
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-profile" id="panel_profile" style="height: 100%;">
						<div class="clearfix">
                        <div class="panel panel-headline">
                        	<div class="panel-heading">
					<h3 class="panel-title" >Painel de controle</h3>
					<!--<p class="panel-subtitle">&nbsp;</p>-->
				</div>
                </div>
				<div class="tab-content">																		
					<div class="tab-pane fade in active" id="tab_vehicles">
                         <div class="row">
                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-chart-areaspline widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow" ><span data-i18n="title_vehicles">Dispositivos</span></p>
                                        <h2><span id="countVehicles">0</span><small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                        <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div><!-- end col -->
                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-av-timer widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow" ><span data-i18n="title_geofences">GeoCercas</span></p>
                                        <h2><span id="countGeoFences">0</span>   <small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                        <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-account-convert widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow"><span data-i18n="title_groups">Grupos</span></p>
                                       <h2><span id="countGroups">0</span>   <small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                        <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div><!-- end col -->

                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-layers widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow"><span data-i18n="mnu_drivers">Motoristas</span></p>
                                        <h2><span id="countDrivers">0</span>   <small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                          <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div><!-- end col -->

                            <!-- end col -->
                            <div class="col-lg-2 col-md-4 col-sm-6 resource_manager">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-account-multiple widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow"><span data-i18n="mnu_users">Usuários</span></p>
                                        <h2><span id="countUsers">0</span>   <small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                         <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div>
                            <!-- end col -->
                            <div class="col-lg-2 col-md-4 col-sm-6">
                                <div class="card-box widget-box-one">
                                    <i class="mdi mdi-download widget-one-icon"></i>
                                    <div class="wigdet-one-content">
                                        <p class="m-0 text-uppercase font-600 font-secondary text-overflow"><span data-i18n="maintenance">Manutenção</span></p>
                                        <h2><span id="countMaintenance">0</span>   <small><i class="mdi mdi-arrow-up text-success"></i></small></h2>
                                        <p class="text-muted m-0"> <b><span data-i18n="title_list_total">Totais</span></b> </p>
                                    </div>
                                </div>
                            </div><!-- end col -->
                        </div>                            
                <!-- TODO LIST -->
					<div class="panel">
						<div class="panel-heading">
						<h3 class="panel-title">&nbsp;</h3>
							<div class="right">
								<!--<button type="button" class="btn-toggle-collapse"><i class="lnr lnr-chevron-up"></i></button>-->
								<button type="button" class="btn-reload" id="refreshGrid"><i class="lnr lnr-sync"></i></button>
							</div>
						</div>
						<div class="panel-body">
							<table class="table datatable-js" id="datatable">
	                            <thead>
		                            <tr>
		                            	<th>#</th>                                  					         
                                        <th data-i18n="title_name">Nome</th>
										<th data-i18n="title_identifier">IMEI</th>
                                        <th data-i18n="title_group">Grupo</th>										   
										<th data-i18n="title_model">Modelo</th>
                                        <th data-i18n="title_protocol">Protocolo</th> 
										<th data-i18n="title_phone">Telefone</th>                                                                             
                                        <th data-i18n="title_device_time">Tempo do dispositivo</th>					                                                                                        
                                        <th data-i18n="title_latitude">Latitude</th>
                                        <th data-i18n="title_longitude">Longitude</th>                                                                                                       
										<th data-i18n="title_address">Endereço</th> 
                                        <th data-i18n="title_speed">Velocidade</th>
                                        <th data-i18n="title_course">Curso</th>										
                                        <th>&nbsp;</th>
                                    </tr>
	                            </thead>
                            </table>
						</div>
					</div>
                       	</div>
								</div>
								<!-- END TABBED CONTENT -->
							</div>
							<!-- END RIGHT COLUMN -->
						</div>
					</div>
				</div>
			</div>
            
            <!-- Button trigger modal -->
	<button id="btnViewDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewInfoDevice"  style="display: none">&nbsp;</button>
	<button id="btnMapDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewMapDevice"  style="display: none">&nbsp;</button>
	
	<!-- Modal -->
	<div class="modal fade" id="viewInfoDevice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document" style="width:65%">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel"><span data-i18n="title_device">Dispositivo </span><span id="titleViewDevice"></span></h4>
	      </div>
	      <div class="modal-body">
	      
	      	<div class="row">
	            <div class="col-md-10">
	            	<div id="bodyViewDevice"></div><hr />
	            	<div id="inputsViewDevice">	            		
	            		<span class="label label-default" id="deviceInput1" data-i18n="title_input1">Entrada 1</span>
	            		<span class="label label-default" id="deviceInput2" data-i18n="title_input2">Entrada 2</span>
	            	</div>															    
				</div>	      		
	            <div class="col-md-2">	
	            	<img class="statusCar" src="assets/img/icons/car_off.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="lockCar"   src="assets/img/icons/car_unlock.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="sirenCar"  src="assets/img/icons/car_siren_off.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="panicCar"  src="assets/img/icons/car_panic_off.png" style="width: 64px; height: 64px" /><br /><br />
				</div>
			</div>
	      </div>
	      
	      <div class="modal-footer">
   	        <button id="device_lock" type="button" class="btn btn-danger" data-i18n="title_lock" style="float: left;">Bloquear</button>
	      	<button id="device_unlock" type="button" class="btn btn-info" data-i18n="title_unlock" style="float: left;">Desbloquear</button>
            <button id="device_arm" type="button" class="btn btn-danger"  data-i18n="title_arm" style="float: left;">Armar</button>
            <button id="device_disarm" type="button" class="btn btn-info"  data-i18n="title_disarm" style="float: left;">Disarmar</button>
	      	
	        <button id="device_close" type="button" class="btn btn-default" data-dismiss="modal" data-i18n="title_close">Fechar</button>	        
	      </div>
	    </div>
	  </div>
	</div>
	
	
	<div class="modal fade" id="viewMapDevice" tabindex="-1" role="dialog" aria-labelledby="myModalLabelMap">
	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabelMap"><span data-i18n="title_device">Device </span><span id="titleMapDevice"></span></h4>
	      </div>
	      <div class="modal-body">	      	
	      	<div class="row">
	            <div class="col-md-10">
					<img src="#" id="imgMapDevice" style="position: relative; top:0; left: 0;width: 100%;height: 320px;" />
				</div>	      		
	            <div class="col-md-2">	
	            	<img class="statusCar" src="assets/img/icons/car_off.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="lockCar"   src="assets/img/icons/car_unlock.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="sirenCar"  src="assets/img/icons/car_siren_off.png" style="width: 64px; height: 64px" /><br /><br />
	            	<img class="panicCar"  src="assets/img/icons/car_panic_off.png" style="width: 64px; height: 64px" /><br /><br />
				</div>
			</div>	      	
	      	<hr />
	      	<span id="footerMapDevice"></span>
	      </div>
	      <div class="modal-footer">	      	
	        <button type="button" class="btn btn-default" data-dismiss="modal" data-i18n="title_close">Fechar</button>	        
	      </div>
	    </div>
	  </div>
	</div>		
	<!-- /Modal -->
		<!-- END MAIN CONTENT -->
			<!-- Javascript -->
			<script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
			<script src="assets/js/bootstrap/bootstrap.min.js"></script>
			<script src="assets/js/plugins/toastr/toastr.min.js"></script>
			<script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
		    <script src="assets/js/plugins/ui/moment/moment.min.js"></script>
		    <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
			<script src="assets/js/klorofil.min.js"></script>
			<script src="assets/js/plugins/tables/datatables/datatables.min.js"></script>
			<script src="assets/js/plugins/tables/datatables/extensions/responsive.min.js"></script>	
			<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
			<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
			<script type="text/javascript" src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
			<script type="text/javascript" src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
			<script src="assets/js/plugins/forms/validation/validate.min.js"></script>			
			<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
			<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
			<script src="assets/js/apps/i8n.js"></script>
			<script src="assets/js/plugins/yspeed.js"></script>		
			<script src="assets/js/plugins/underscore-min.js"></script>
			<script src="assets/js/plugins/forms/inputs/jquery.maskMoney.min.js"></script>
            <!-- datatable export -->	
	        <script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>	            	
			<script src="assets/js/apps/general.js"></script>
            <script src="assets/js/apps/dashboards/communications.js"></script>
<?php	
	include_once "footer.php";
?>
