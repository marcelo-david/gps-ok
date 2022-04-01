<?php	
	include_once "header.php";
?>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo $_SESSION["GOOGLE_KEY"]?>&v=3"></script>
<link rel="stylesheet" href="//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
<!-- datatables buttons-->
<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">

	<style>

		.container {
  max-width: 640px;
  max-height: 640px;
  margin: 0 auto
}

.google_map
{
	display: block;    
    background-repeat: no-repeat;
    background-position: 50% 50%;
    line-height: 0;
}

.google_map img
{
	max-width: 100%;
    opacity: 0;
}

		.sweet-deal-label {
			background-color: #FE57A1;
			background-color: #336442;
			-moz-box-shadow: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			color: #fff;
			font-weight: bold;
			z-index: 2000;
		}

		.sweet-blue-label {
			background-color: #FE57A1;
			background-color: #0016B0;
			-moz-box-shadow: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			color: #fff;
			font-weight: bold;
			z-index: 2000;
		}

		.sweet-orange-label {
			background-color: #FE57A1;
			background-color: #ED6F09;
			-moz-box-shadow: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			color: #fff;
			font-weight: bold;
			z-index: 2000;
		}
		
		.sweet-red-label {
			background-color: #FE57A1;
			background-color: #B71D1C;
			-moz-box-shadow: none;
			-webkit-box-shadow: none;
			box-shadow: none;
			color: #fff;
			font-weight: bold;
			z-index: 2000;
		}
	</style>
	<!-- datatables buttons-->
	<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">
	
	<!-- MAIN CONTENT -->
	<div class="main-content">
		<div class="container-fluid">
			<!-- OVERVIEW -->
			<div class="panel panel-headline">
				<div class="panel-heading">
					<h3 class="panel-title" data-i18n="title_communications">Communications</h3>
					<!--<p class="panel-subtitle">&nbsp;</p>-->
				</div>
					
			</div>
			<!-- END OVERVIEW -->
							
			
			<div class="row">
				<div class="col-md-12">
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
										<th data-i18n="title_group">Group</th>              					         
                                        <th data-i18n="title_name">Name</th>
										<th data-i18n="title_identifier">IMEI</th>										   
										<th data-i18n="title_model">Model</th>
                                        <th data-i18n="title_protocol">Protocol</th> 
										<th data-i18n="title_phone">Phone</th>                                                                             
                                        <th data-i18n="title_device_time">Device Time</th>					                                                                                        
                                        <th data-i18n="title_latitude">Latitude</th>
                                        <th data-i18n="title_longitude">Longitude</th>                                                                                                       
										<th data-i18n="title_address">Address</th> 
                                        <th data-i18n="title_speed">Speed</th>
                                        <th data-i18n="title_course">Course</th>										
                                        <th>&nbsp;</th>
                                    </tr>
	                            </thead>
                            </table>
						</div>
					</div>
					<!-- END TODO LIST -->
				</div>				
			</div>			
		</div>
	</div>
	
	<!-- Button trigger modal -->
	<button id="btnViewDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewInfoDevice"  style="display: none">&nbsp;</button>
	<button id="btnMapDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewMapDevice"  style="display: none">&nbsp;</button>
	
	<!-- Modal -->
	<div class="modal fade" id="viewInfoDevice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel"><span data-i18n="title_device">Device </span><span id="titleViewDevice"></span></h4>
	      </div>
	      <div class="modal-body">
	      
	      	<div class="row">
	            <div class="col-md-10">
	            	<div id="bodyViewDevice"></div><hr />
	            	<div id="inputsViewDevice">	            		
	            		<span class="label label-default" id="deviceInput1" data-i18n="title_input1">Input 1</span>
	            		<span class="label label-default" id="deviceInput2" data-i18n="title_input2">Input 2</span>
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
   	        <button id="device_lock" type="button" class="btn btn-danger" data-i18n="title_lock" style="float: left;">Block</button>
	      	<button id="device_unlock" type="button" class="btn btn-info" data-i18n="title_unlock" style="float: left;">UnBlock</button>
	      	
	        <button id="device_close" type="button" class="btn btn-default" data-dismiss="modal" data-i18n="title_close">Close</button>	        
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
					<img src="#" id="imgMapDevice" style="position: absolute; top:0; left: 0;width: 100%;height: 100%;" />
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
	        <button type="button" class="btn btn-default" data-dismiss="modal" data-i18n="title_close">Close</button>	        
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
	<script src="assets/js/klorofil.min.js"></script>

	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
	<script src="assets/js/plugins/forms/styling/switchery.min.js"></script>
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
	<script src="assets/js/plugins/pickers/daterangepicker.js"></script>
	<script src="assets/js/plugins/leaflet/leaflet.js"></script>
	<script src="assets/js/plugins/leaflet/Icon.Label.js"></script>
	<script src="assets/js/plugins/leaflet/Icon.Label.Default.js"></script>
	
	<script src="assets/js/plugins/toastr/toastr.min.js"></script>	
	<script src="assets/js/plugins/yspeed.js"></script>		
	<script src="assets/js/plugins/underscore-min.js"></script>	
	<script src="assets/js/plugins/md5/jquery.md5.js"></script>	

	<script src="assets/js/plugins/leaflet/google.js"></script>
	
	<!-- datatable export -->	
	<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>


	<script src="assets/js/apps/general.js"></script>
		
	
	
	
	<script src="assets/js/apps/dashboards/communications.js"></script>
                  <?php	
	include_once "footer.php";
?>
