<?php	
	include_once "header.php";
?>
	<link rel="stylesheet" href="assets/js/plugins/leaflet/leaflet.css">        	        	
			<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css" />
			<!--<link rel="stylesheet" href="assets/js/plugins/leafletsearch/src/leaflet-search.css" />-->        	

			<!-- datatables buttons-->
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">					        	
        	<style>

			#mapgeo { 				
				height: 600px;				  				
			 }

			.search-input {
				font-family:Courier
			}
			.search-input,
			.leaflet-control-search {
				max-width:20%;
			}
			
			div#search {				
				position: relative;
				bottom: 600px;
				right: 50px; 
				width: 100%;
				height: auto;
				float: right;
				padding: 10px;
				z-index: 1000;
			}
			div#search input {
				width: 100%;				
			}
			div#results {
				font-style: sans-serif;
				color: black;
				font-size: 75%;				
				z-index: 1000;
				background-color: #fff;
				border-radius: 15px;
				-moz-border-radius: 15px;
			}


			</style>


			<div class="main-content">
		<div class="container-fluid">
			<h3 class="page-title" data-i18n="command_auto">Command automatics</h3>
			<div class="panel panel-headline">
				<div class="panel-body">
					
					<div class="tab-content">							  
					    <form id="form_command_auto" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     <div style="display:none;">
    					     	<input type="text" id="command_auto_id" name="command_auto_id">
    					     	<input type="text" id="user_id" name="user_id">
    					     	<input type="text" id="token" name="token">
    					     </div>
    					    <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_device">Device</label>
			                     <!--<select class="select-search" id="deviceId" name="deviceId" multiple="multiple">-->	
                                <select class="select-search" id="deviceId" name="deviceId" >											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>

		                    <!--<label>Geocercas</label>
		                    <input type="checkbox" id="geocercas"/>
		                    <label>Motor</label>
		                    <input type="checkbox" id="motor"/>
		                    <label>Movimiento/Detenido</label>
		                    <input type="checkbox" id="moving_stopped"/>
		                    <br>
                            -->
                            
                              <label data-i18n="command_geofence">Geofences</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		                    <input type="checkbox" id="geocercas"/><br/>
		                    
                            <label data-i18n="command_ignition">Ignici&oacute;n ON/OFF</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
		                    <input type="checkbox" id="motor"/><br/>
                            <label data-i18n="command_move_stop">Move/Stop</label>&nbsp;&nbsp;
                            
		                    <input type="checkbox" id="moving_stopped"/><br/>
                            <br/>
		                    <br/>
                            
                            <div class="form-group" id="tipeGeo">
						                    <label style="font-weight:normal" data-i18n="title_geofence">Geofence</label>
						                    <select class="select-search" id="geofenceId" name="geofenceId">											                    											                    											                    
								                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
						                    </select>
					                    </div>


                            
                        
                            
                            	<div class="form-group" id="geofence">
			                    <label style="font-weight:normal" data-i18n="title_type_geo">type</label>
			                    <select class="select-search" id="type_geo" name="type_geo">
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
                                        <option value="geofenceEnter" data-i18n="title_geofenceEnter" >Geofence enter</option>		
                                        <option value="geofenceExit" data-i18n="title_geofenceExit">Geofence exit</option>
                                       
			                    </select>
		                    </div>


		                    <div class="form-group" id="motorAcc">
			                    <label style="font-weight:normal">Ignici&oacute;n (Contacto)</label>
			                    <select class="select-search" id="motorOnOff" name="motorOnOff">
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
                                        <option value="ignitionOff">Ignici&oacute;n OFF</option>		
                                        <option value="ignitionOn">Ignici&oacute;n ON</option>
                                       
			                    </select>
		                    </div>

		                    <div class="form-group" id="mov_stop">
			                    <label style="font-weight:normal">Dispositivo Movimiento/Detenido</label>
			                    <select class="select-search" id="moving_stop" name="moving_stop">
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
                                           <option value="deviceMoving">Dispositivo en Movimiento</option>		
                                        <option value="deviceStopped">Dispositivo Detenido</option>
                                       
			                    </select>
		                    </div>
                            
                            
                            <div class="form-group">
			                    <label style="font-weight:normal"  data-i18n="title_command">Command</label>
			                    <select class="select-search" id="type" name="type" multiple="multiple">											                    											                    											                    
					            	<option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>	
                            
                            <div class="form-group" id="custom_command" >
                                        <label for="name" style="font-weight:normal" data-i18n="title_string">String</label>
                           <input type="text" id="custom" name="custom" class="form-control" maxlength="250" placeholder="Ingrese un comando personalizado"/>
                            </div>
                            
                            
                            
                            
                            
                            
                             
                             	<div class="form-group">	
									    <label for="name" style="font-weight:normal" data-i18n="title_send_command_auto">Send command automatics</label>
										<input type="text" id="time" name="time" class="form-control" maxlength="100" placeholder="" />
								    </div>
                            
                             <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_status">Status</label>
			                    <select class="select-search" id="status" name="status" >											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>	
                                        <option value="disabled"data-i18n="title_disabled" >Disabled</option>		
                                        <option value="enable" data-i18n="title_activated">Enable</option>										                    
			                    </select>
		                    </div>
                            
                            
		                    
		                   <!-- <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_group">Group</label>
			                    <select class="select-search" id="groupId" name="groupId" multiple="multiple">											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>-->
						    
						   <!-- <div class="row">
					            <div class="col-md-4">                                                       
						            <div class="form-group">
							            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                        <input type="text" id="from" name="from" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" /> <span data-i18n="title_period_end">Date end</span> 
                                        <input type="text" id="to" name="to" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" /> 
						            </div>
						        </div>
                            </div>	-->								                                                                                                                                                      
																			   
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary" name="btnGenerate"><span data-i18n="button_generate">Generate</span><i class="icon-arrow-right14 position-right"></i></button>
                                &nbsp; &nbsp; &nbsp;
							    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
                            </div>                                                                                            
                    </form>
                    <hr />
                    
				    <table class="table datatable-js" id="datatable">
                        <thead>
                            <tr>                                			         
                                <th data-i18n="title_device_name">Device Name</th>
                                <th data-i18n="title_geofence">Geofence</th>
                                <th data-i18n="title_type">Type</th>
                                <th>MotorOn/Off</th>
                                <th>Movimiento/Detenido</th>
                                <th data-i18n="title_command">Command</th>
                                <th data-i18n="title_time_seg">Time</th>
                                <th data-i18n="title_status">Status</th>
                                <th>Fecha creacion</th>      
                                <th>Ultima vez</th>
                                <th data-i18n="title_command_sends">No. sends</th>
                                <th>Acciones</th>                                                		                                                                                                                                             
                            </tr>
                        </thead>
                    </table>							  							
				</div>
			</div>
		</div>
	</div>
	<!-- END MAIN CONTENT -->

	<!-- Javascript -->
	<script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
	<script src="assets/js/bootstrap/bootstrap.min.js"></script>
	<script src="assets/js/plugins/toastr/toastr.min.js"></script>
	<script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
	<script src="assets/js/klorofil.min.js"></script>
	<!-- datatable export -->	
	<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
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
	
	<script src="assets/js/plugins/leaflet/leaflet.js"></script>
	<script src="assets/js/plugins/leaflet/Icon.Label.js"></script>
	<script src="assets/js/plugins/leaflet/Icon.Label.Default.js"></script>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8Dnp2eemNYf92yS2Pe89BaE39jVqkVW4&v=3"></script>
	<script src="assets/js/plugins/leaflet/google.js"></script>
	<!--<script src="assets/js/plugins/leafletsearch/src/leaflet-search.js"></script>-->
	
	<script src="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js"></script>
	<script src="assets/js/plugins/tokml/tokml.js"></script>
			            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/command_auto.js"></script>
	
          <?php	
	include_once "footer.php";
?>