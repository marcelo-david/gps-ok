<?php	
	include_once "header.php";
?>
<!-- datatables buttons-->
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">								

			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title">Calculated attributes</h3>
					<div class="panel panel-headline">
						<div class="panel-body">
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form">Create new record</a></li>							  
							  <li><a data-toggle="tab" href="#tab_list">List</a></li>
							</ul>						
							<div class="tab-content">
							  <div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                					     
                					    <input type="text" id="id" name="id" value="" style="display: none" />

										<div class="form-group">
										    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
											<input type="text" id="description" name="description" class="form-control" maxlength="80" placeholder="" />
									    </div>
                					     
                					    <div class="form-group">
						                    <label style="font-weight:normal" >Type</label>
						                    <select class="select-search" id="type" name="type">
								                    <option value="" data-i18n="title_select2">Select an option...</option>
													<option value="string" data-i18n="string">String</option>
													<option value="number" data-i18n="number">Number</option>
													<option value="boolean" data-i18n="booleano">Boolean</option>
						                    </select>
					                    </div>    

										<div class="form-group">
						                    <label style="font-weight:normal" >Attribute</label>
						                    <select class="select-search" id="attribute" name="attribute">
								                    <option value="">Select an option...</option>
                                                    <option value="alarm" data-i18n="title_alarm">Alarm</option>
													<option value="event" data-i18n="title_event">Event</option>
													<option value="ignition" data-i18n="title_ignition">Ignition</option>	
                                                    <option value="battery" data-i18n="title_battery">Batterry</option>
													<option value="batteryLevel"data-i18n="title_batteryLevel">Battery level</option>
													<option value="status" data-i18n="title_status">Status</option>	
                                                    <option value="power" data-i18n="title_power">Power</option>
                                                    <option value="distance" data-i18n="title_distance">Distance</option>
                                                    <option value="totalDistance"data-i18n="title_totalDistance" >Total distance</option>
                                                    <option value="geofence"data-i18n="title_geofence" >Geo-fence</option>												
						                    </select>
					                    </div>    
					                    					                    
                                        <div class="row">
								            <div class="col-md-8">                                                       
									            <div class="form-group">
										            <label for="expression" style="font-weight:normal">Expression</label>
	                                                <textarea rows="4" id="expression" name="expression" class="form-control" placeholder=""> </textarea>
									            </div>
									        </div>
                                        </div>                                                                         
																						   
                                        <div class="text-right">
                                            <button type="submit" class="btn btn-primary" name="btnSave">Save<i class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
										    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> Clear</button>                                                           
                                        </div>                                                                                            
			                    </form>
							  </div>
							  <div id="tab_list" class="tab-pane fade">
							    <!--
							    <div class="panel-heading">							                            
		                            <div class="heading-elements">
			                            <ul class="icons-list">
        		                            <li><a data-action="reload" name="lnkRefreshGrid" title="Update"></a></li>
        	                            </ul>
    	                            </div>
	                         </div>-->	                         	
                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                            <th>ID</th>	
                                            <th>Description</th>					          
											<th>Attribute</th>	
                                            <th>Type</th>
											<th>Expression</th>
                                            <th>&nbsp;</th>
                                        </tr>
		                            </thead>
	                            </table>
							  </div>
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
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/aliases.js"></script>
	
          <?php	
	include_once "footer.php";
?>
