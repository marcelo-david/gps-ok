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


			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="mnu_geofences">Geofences</h3>
					<div class="panel panel-headline">
						<div class="panel-body">							
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="title_data">Data</a></li>							  
							  <li><a data-toggle="tab" href="#tab_list" data-i18n="title_list">List</a></li>
							</ul>						
							<div class="tab-content">
							  <div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >

                                        <input type="text" id="id" name="id" style="display: none"/>
                                        <input type="text" id="area" name="area" style="display: none"/>                                                                                
                					     
                					    <div class="form-group">
										    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
											<input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />
									    </div>
									    									   
                                        <div class="form-group">
										    <label for="model" style="font-weight:normal" data-i18n="title_description">Description</label>
											<textarea id="description" name="description" class="form-control" maxlength="50" rows="1"></textarea>
									    </div>
                                                                                                                    
                                      <div class="form-group">
										    <label for="speedLimit" style="font-weight:normal" data-i18n="title_speedlimit">Speed Limit</label>
											<input id="speedLimit" name="speedLimit" class="form-control" type="number" maxlength="250" />
									    </div>
                                        
                                         <div class="form-group">
										<label for="addr" style="font-weight:normal; font-size: 16px; color: #000; font-weight: bold" >Search address</label><br />
												<input type="text" name="addr" value="" id="addr" size="20" />
												<button type="button" onclick="addr_search();" data-i18n="title_search">Search</button>
												<div id="results"></div>
									    </div>
                                      																			    
									    <div class="form-group">									    	
										    <label for="map" style="font-weight:normal" data-i18n="title_map">Map</label>
                                            										    
											<button type="button" class="btn btn-primary" name="btnClearMap" style="float: right"><span data-i18n="button_clear">Clear</span> <i class="icon-eraser position-right"></i></button><br />
											<hr />										    										    										   
											<div id="mapgeo"></div>	
                                            										
										<!--	<div id="search">
												<label for="addr" style="font-weight:normal; font-size: 14px; color: #fff; font-weight: bold" data-i18n="title_search">Localizar</label><br />
												<input type="text" name="addr" value="" id="addr" size="10" />
												<button type="button" onclick="addr_search();" data-i18n="title_search">Search</button>
												<div id="results"/></div>	
											</div>
                                            -->
                                            
                                            																					
									    </div>
									    <br /><br />
                                    									  
                                        <div>
                                            <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Save</span> <i class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
										    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span>  </button>                                                           
                                        </div>        
                                                                                                                            
			                    </form>
							  </div>
							  <div id="tab_list" class="tab-pane fade">
							    <!--
							    <div class="panel-heading">							                            
		                            <div class="heading-elements">
			                            <ul class="icons-list">
        		                            <li><a data-action="reload" name="lnkRefreshGrid" title="Atualizar"></a></li>
        	                            </ul>
    	                            </div>
	                         </div>-->

                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                            <th data-i18n="title_list_id">ID</th>				                                            	         
                                            <th data-i18n="title_name">Name</th>  
                                            <th data-i18n="title_description">Description</th>    
                                            <th data-i18n="title_actions">Description</th>                                                               
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
	
<script src="assets/js/plugins/leaflet/leaflet.js"></script>
<script src="assets/js/plugins/leaflet/Icon.Label.js"></script>
<script src="assets/js/plugins/leaflet/Icon.Label.Default.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATCg_k3dBkWpu8Fra9Mnpkhov9mlgeOGo&v=3"></script>
<script src="assets/js/plugins/leaflet/google.js"></script>
	<!--<script src="assets/js/plugins/leafletsearch/src/leaflet-search.js"></script>-->
	
	<script src="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js"></script>
	<script src="assets/js/plugins/tokml/tokml.js"></script>
			            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/geofences.js"></script>
	
          <?php	
	include_once "footer.php";
?>