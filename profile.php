<?php	
	include_once "header.php";
?>
	<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-profile" id="panel_profile" style="height: 100%;">
						<div class="clearfix">
							<!-- LEFT COLUMN -->
							<div class="profile-left">
								<!-- PROFILE HEADER -->
								<div class="profile-header">
									<div class="overlay"></div>
									<div class="profile-main">
										<form id="formPhoto" method="post" enctype="multipart/form-data">
                                        <!--<img id="profile_photo" src="assets/img/user.png" class="img-circle" alt="Avatar" style="height: 90px; width: 220px; cursor: pointer;" onclick="setImagePhoto()"  title="Click">-->
	                                        <a onclick="setImagePhoto()" style="cursor: pointer;position: absolute;left: 25px;" alt="foto 250x250" title="Alterar foto">
											    <i class="lnr lnr-pencil"> </i>
											    Editar foto
											</a>
											<img id="profile_photo" src="assets/img/user.png"  alt="Avatar" style="height: 250px; width: 250px; border: 5px solid #00aaff; border-radius: 50%; box-shadow: 2px 2px 10px 2px #ccc;"  title="Click"/>
											<input id="userid" value="" style="display: none"/>											
											<input id="option" value="profile" style="display: none"/>
											<input type="file" id="photo" name="photo" class="form-control" placeholder="" style="display: none"/>										
										</form>
										<h3  id="profile_name" class="name"></h3>
										<!--<span class="online-status status-available">Available</span>-->
									</div>
									<div class="profile-stat">
										<div class="row">
											<div class="col-md-4 stat-item">
												<span id="countVehicles">0</span> <span data-i18n="title_vehicles">Vehicles</span>
											</div>
											<div class="col-md-4 stat-item">
												<span id="countGeoFences">0</span> <span data-i18n="title_geofences">GeoFences</span>
											</div>
											<div class="col-md-4 stat-item">
												<span id="countGroups">0</span> <span data-i18n="title_groups">Groups</span>
											</div>
										</div>
									</div>
								</div>
								<!-- END PROFILE HEADER -->
								<!-- PROFILE DETAIL -->
								
								<div class="profile-detail">
									<div class="profile-info">
										<h4 class="heading" data-i18n="title_user_info">User Info</h4>
										<ul class="list-unstyled list-justify">
											<li>Email <span id="profile_email">&nbsp;</span></li>
											<li>Admin <span id="profile_admin">&nbsp;</span></li>
											<li><div data-i18n="title_distance">Distance</div><span id="profile_distance">&nbsp;</span><br /></li>
											<li><div data-i18n="title_speed">Speed </div><span id="profile_speed">&nbsp;</span><br /></li>
											<li>Latitude <span id="profile_latitude">&nbsp;</span></li>
											<li>Longitude <span id="profile_longitude">&nbsp;</span></li>
											<li>Zoom <span id="profile_zoom">&nbsp;</span></span></li>											
										</ul>
									</div>

									<div class="profile-info">
										<h4 class="heading" data-i18n="title_about">About</h4>
										<p align="justify">
											Um sistema completo com funções de bloqueio de veículo, histórico de movimento, relatório, bloqueio, sirene entre outras funcionabilidades em uma interface leve e fácil de usar que pode ser usada no computador e smartphone											
										</p>
									</div>
								
									<div class="profile-info">
										<h4 class="heading">Social</h4>
										<ul class="list-inline social-icons">
										<li><a href="#" class="facebook-bg" id="lnkFacebook" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a></li>
											<li><a href="#" class="twitter-bg" id="lnkTwitter"><i class="fa fa-twitter" target="_blank"></i></a></li>											
											<li><a href="#" class="github-bg" id="lnkEmail" title="Mail" target="_blank"><i class="fa fa-mail-forward"></i></a></li>
											<li><a href="#" class="about-me-bg" id="lnkSupport" title="Suporte" target="_blank"><i class="fa fa-support"></i></a></li>
											<li><a href="#" class="google-plus-bg" id="lnkGooglePlus"><i class="fa fa-google-plus"></i></a></li>											
										</ul>
									</div>									
									
								</div>
								<!-- END PROFILE DETAIL -->
							</div>
							
							<!-- END LEFT COLUMN -->
							<!-- RIGHT COLUMN -->
							<div class="profile-right">								
								<!-- TABBED CONTENT -->
								<div class="custom-tabs-line tabs-line-bottom left-aligned">
									<ul class="nav" role="tablist">
										<li style="display: none"><a id="pane_form" href="#tab_form" role="tab" data-toggle="tab">Recent Activity</a></li>
										<li style="display: none" class="active"><a id="pane_list" href="#tab_vehicles" role="tab" data-toggle="tab">Projects <span class="badge">7</span></a></li>
									</ul>
								</div>
								<div class="tab-content">																		
									<div class="tab-pane fade" id="tab_form">
										<h4 class="heading" data-i18n="title_edit_profile"> Edit Profile</h4>
										<form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
		                                    
		            					    <div class="form-group">
											    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
												<input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />
										    </div>
                                            
                                            
                                              <div class="form-group">
											    <label for="phone" style="font-weight:normal" data-i18n="title_phone">Phone</label>
												<input type="text" id="phone" name="phone" class="form-control" maxlength="80" placeholder="" />
										    </div>
                                            
                                             
										    
										    <div class="form-group">
											    <label for="name" style="font-weight:normal">Email</label>
												<input type="text" id="email" name="email" class="form-control" maxlength="120" placeholder="" />
										    </div>
		
											<div class="row">
									            <div class="col-md-4">								    
												    <div class="form-group">
													    <label for="password" style="font-weight:normal" data-i18n="title_password">Password</label>
														<input type="password" id="password" name="password" class="form-control" maxlength="20" placeholder="" />
												    </div>
												</div>
											</div>													
		
											<div class="row">
									            <div class="col-md-4">		
				                                    <div class="form-group">
									                    <label style="font-weight:normal" data-i18n="title_distance">Distance</label>
									                    <select class="select-search" id="distanceUnit" name="distanceUnit">		
									                    		<option value="" data-i18n="title_select2">Select an option...</option>									                    											                    											                    
											                    <option value="km" data-i18n="title_km">Kilometers</option>											                    
											                    <option value="mi" data-i18n="title_miles">Miles</option>
											                    <option value="nmi" data-i18n="title_nmi">Nautical mile</option>							                    
									                    </select>
								                    </div>
												</div>
											</div>
		
											<div class="row">
									            <div class="col-md-4">						                    
								                    <div class="form-group">
									                    <label style="font-weight:normal" data-i18n="title_speed">Speed</label>
									                    <select class="select-search" id="speedUnit" name="speedUnit">	
									                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
											                    <option value="kn">Knots</option>											                    
											                    <option value="kmh">Km/h</option>
											                    <option value="mph">Mph</option>							                    
									                    </select>
								                    </div>
												</div>
											</div>
		
										    <div class="row">
												<div class="col-md-14">
													<div class="col-md-4">                                                       
														<div class="form-group">
															<label for="latitude" style="font-weight:normal" data-i18n="title_latitude">Lattitude</label>
															<input type="text" id="latitude" name="latitude" class="form-control" maxlength="11" placeholder="" data-mask="(99) 9999-9999"/>
														</div>
													</div>		                                    		
											
													<div class="col-md-4">
														<div class="form-group">
															<label for="longitude" style="font-weight:normal" data-i18n="title_longitude">Longitude</label>
															<input type="text" id="longitude" name="longitude" class="form-control" maxlength="11" placeholder="" />
														</div>
													</div>
												</div>	
											</div>
											
											<div class="row">
									            <div class="col-md-4">
				                                    <div class="form-group">
													    <label for="zoom" style="font-weight:normal">Zoom</label>
														<input type="text" id="zoom" name="zoom" class="form-control" maxlength="2" placeholder="" />
												    </div>
												</div>
											</div>	
											
											<div class="row">
									            <div class="col-md-4">						                    
								                    <div class="form-group">
									                    <label style="font-weight:normal" data-i18n="mnu_language">Linguagem</label>
									                    <select class="select-search" id="language" name="language">	
									                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
											                    <!--<option value="br" data-i18n="mnu_portuguese">Portuguese</option>-->											                    											                    
											                   <option value="en" data-i18n="mnu_english">Port-BR</option>
                                                                <!-- <option value="es" data-i18n="mnu_spanish">Español</option>-->								                    
									                    </select>
								                    </div>
												</div>
											</div>
											
											<div class="row">
												<div class="col-md-14">											
									            	<div class="col-md-3">
														<div class="form-group">
															<label for="gasoline" style="font-weight:normal" data-i18n="title_gasoline">Gasoline</label>
															<input type="text" id="gasoline" name="gasoline" class="form-control fuel" maxlength="5" placeholder="" />
														</div>
													</div>
																							
													<div class="col-md-3">
														<div class="form-group">
															<label for="alcohol" style="font-weight:normal" data-i18n="title_alcohol">Alcohol</label>
															<input type="text" id="alcohol" name="alcohol" class="form-control fuel" maxlength="5" placeholder="" />
														</div>
													</div>
												
													<div class="col-md-3">
														<div class="form-group">
															<label for="diesel" style="font-weight:normal">Diesel</label>
															<input type="text" id="diesel" name="diesel" class="form-control fuel" maxlength="5" placeholder="" />
														</div>
													</div>												

													<div class="col-md-3">
														<div class="form-group">
															<label for="gnv" style="font-weight:normal" data-i18n="title_gnv">GNV</label>
															<input type="text" id="gnv" name="gnv" class="form-control fuel" maxlength="5" placeholder="" />
														</div>
													</div>
												</div>	
											</div>
		                                    											  
		                                    <div class="text-right">
		                                        <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_update">Update</span><i class="icon-arrow-right14 position-right"></i></button>
		                                        &nbsp; &nbsp; &nbsp;
									    		<button class="btn" type="reset" name="btnback" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_back">Back</span> </button>		                                                                                                   
		                                    </div>                                                                                            
				                    
										
										
										
									</div>
                                    
									<div class="tab-pane fade in active" id="tab_vehicles">
                                    <div class="text-right"><a name="btnEditProfile" href="#" class="btn btn-primary">Edit profile</a></div>
										<div class="table-responsive">
											<h4 class="heading" data-i18n="title_list_vehicles">List Vehicles</h4>
											<table class="table table-striped datatable-js" id="datatable">
												<thead>																	         
			                                        <th data-i18n="title_name">Name</th>
			                                        <th data-i18n="title_protocol">Protocol</th>                                                                              
			                                        <th data-i18n="title_device_time">Device Time</th>					                                                                                        
			                                        <th data-i18n="title_status">Status</th>
			                                        <th>&nbsp;</th>
												</thead>										
											</table>
										</div>
									</div>
                                    
                                    </form>
                                    
								</div>
								<!-- END TABBED CONTENT -->
							</div>
							<!-- END RIGHT COLUMN -->
						</div>
					</div>
				</div>
			</div>
			
			<!-- Button trigger modal -->
			<button id="btnViewDevice" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#viewInfoDevice" style="display: none">&nbsp;</button>
			
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
			            	<div id="bodyViewDevice"></div>								    
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
				            	
			<script src="assets/js/apps/general.js"></script>
			<script src="assets/js/apps/commons/profile.js"></script>
	

              <?php	
	include_once "footer.php";
?>
