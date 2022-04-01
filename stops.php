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
	<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css" />
	
	<!-- MAIN CONTENT -->
	<div class="main-content">
		<div class="container-fluid">
			<h3 class="page-title" data-i18n="title_reports_stop">Report Stops</h3>
			<div class="panel panel-headline">
				<div class="panel-body">
					
					<div class="tab-content">							  
					    <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     
    					    <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_device">Device</label>
			                    <select class="select-search" id="deviceId" name="deviceId" multiple="multiple">											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>
		                    <!--
		                    <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_group">Group</label>
			                    <select class="select-search" id="groupId" name="groupId" multiple="multiple">											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>
                            -->
						    
						    <div class="row">
					            <div class="col-md-4">                                                       
						            <div class="form-group">
							            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                        <input type="text" id="from" name="from" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" /> <span data-i18n="title_period_end">Date end</span> 
                                        <input type="text" id="to" name="to" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" /> 
						            </div>
						        </div>
                            </div>
                            
                            <div class="row">
					            <div class="col-md-4">
				                    <div class="form-group">
					                    <label style="font-weight:normal" data-i18n="title_type">Tipo</label>
					                    <select class="select-search" id="type" name="type">											                    											                    											                    
							                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
							                    <option value="R" data-i18n="title_report">Report</option>											                    
							                    <option value="M" data-i18n="title_map">Map</option>
							                    <option value="A" data-i18n="title_both">Both</option>
					                    </select>
				                    </div>
				            	</div>                                    									                                                                                                                                                      
							</div>												   
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
                                <th data-i18n="title_start_time">Start Time</th>
                                <th data-i18n="title_address">Address</th>
                                <th data-i18n="title_end_time">End Time</th>     
                                <th data-i18n="title_duration">Duration</th>
                                <!--<th data-i18n="title_engine_hours">Engine Hours</th>-->
                                <!--<th data-i18n="title_fuel_spent">Fuel Expend</th>-->
                            </tr>
                        </thead>
					</table>							  							
					
					<div id="map">
						<div class="row">
							<div class="col-md-12" id="dsp_map">
								<div id="mapid2"  class="map"></div>
							</div>
						</div>
						<hr />
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
	
	<!--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8Dnp2eemNYf92yS2Pe89BaE39jVqkVW4&v=3"></script>-->
    <script src="https://maps.googleapis.com/maps/api/js?key=&v=3"></script>
	<script src="assets/js/plugins/leaflet/google.js"></script>
	
	<!-- datatable export -->	
	<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>

	<script src="assets/js/apps/general.js"></script>	
	<script src="assets/js/apps/commons/stops.js"></script>
	
          <?php	
	include_once "footer.php";
?>