<?php	
	include_once "header.php";
?>
		<!-- MAIN CONTENT -->
		<div class="main-content">
			<div class="container-fluid">
				<h3 class="page-title">Server</h3>
				<div class="panel panel-headline">
					<div class="panel-body">			
						<ul class="nav nav-tabs">
						  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="title_data">Data</a></li>							  
						  <li><a data-toggle="tab" href="#tab_terms" data-i18n="title_terms">Terms</a></li>
						</ul>														
						<div class="tab-content">				
							<div id="tab_form" class="tab-pane fade in active">		  
								<form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
										<input type="text" id="id" name="id" style="display: none"/>
										
										<div class="row">
											<div class="col-md-4">                                                       
												<div class="form-group">
													<label style="font-weight:normal; font-size:xx-large">Configurações do servidor</label>
													<span id="version"></span>                             
												</div>
											</div>
											
											<div class="col-md-2">                                                       
												&nbsp;
											</div>
											
											<div class="col-md-6">                                                       
												<div class="form-group">
													<label  style="font-weight:normal; font-size:xx-large">Informações do sistema</label><br />
													<span id="app_version"></span>                             
												</div>
											</div>
										</div>
										
										<div class="row">
											<div class="col-md-4">										    
												<div class="form-group">
													<label style="font-weight:normal" >Permitir registro de usuários</label>
													<select class="select-search" id="registration" name="registration">	
															<option value="">Selecine uma opção...</option>										                    											                    											                    
															<option value="true">Sim</option>											                    							                    
															<option value="false">Não</option>							                    
													</select>
												</div>                                                                      
											</div>
											<div class="col-md-2"></div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="name" style="font-weight:normal">Nome</label>
												<!--	<input type="text" id="name" name="name" class="form-control" maxlength="60" placeholder="" readonly="readonly" />-->
                                                	<input type="text" id="name" name="name" class="form-control" maxlength="60" placeholder="" />
												</div>
											</div>
										</div>
										
										<div class="row">
											<div class="col-md-4">										    
												<div class="form-group">
													<label style="font-weight:normal" >Ler apenas</label>
													<select class="select-search" id="readonly" name="readonly">	
															<option value="">Selecione uma opção...</option>										                    											                    											                    
															<option value="true">Sim</option>											                    							                    
															<option value="false">Não</option>							                    
													</select>
												</div>                                                                      
											</div>
											<div class="col-md-2">&nbsp;</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="city" style="font-weight:normal">Cidade</label>
													<input type="text" id="city" name="city" class="form-control" maxlength="60" placeholder=""/>
												</div>
											</div>
										</div>								

										<div class="row">
											<div class="col-md-4">		
												<div class="form-group">
													<label style="font-weight:normal" >Unidade de distância</label>
													<select class="select-search" id="distanceUnit" name="distanceUnit">		
															<option value="">Selecione uma opção...</option>									                    											                    											                    
                                                            <option value="km">Kilometros</option>											                    											                    
															<option value="mi">Milhas</option>
															<option value="nmi">Milhas náuticas</option>						                    
													</select>
												</div>
											</div>
											<div class="col-md-2">&nbsp;</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="state" style="font-weight:normal">Estado</label>
													<input type="text" id="state" name="state" class="form-control" maxlength="2" placeholder=""/>
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-4">						                    
												<div class="form-group">
													<label style="font-weight:normal" >Unidade de velocidade</label>
													<select class="select-search" id="speedUnit" name="speedUnit">	
															<option value="">Selecione uma opão..</option>										                    											                    											                    
														<option value="kn">Knots</option>											                    
															<option value="kmh">Km/h</option>
															<option value="mph">Mph</option>							                    
													</select>
												</div>
											</div>
											<div class="col-md-2">&nbsp;</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="phone" style="font-weight:normal">Telefone</label>
													<input type="text" id="phone" name="phone" class="form-control" maxlength="15" placeholder=""/>
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-4">                                                       
												<div class="form-group">
													<label for="latitude" style="font-weight:normal">Latitude</label>
													<input type="text" id="latitude" name="latitude" class="form-control" maxlength="11" placeholder="" data-mask="(99) 9999-9999"/>
												</div>
											</div>
											<div class="col-md-2">Geolocalização
												<div class="form-group">
                                                
													<img src='assets/img/icons/default.png' onclick="getLocation()" style="height: 32px; width: 32px; vertical-align:sub" title="Obtener GeoLocalizaci&oacute;n" />
												</div>
											</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="email" style="font-weight:normal">Email</label>
													<input type="text" id="email" name="email" class="form-control" maxlength="150" placeholder=""/>
												</div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-4">
												<div class="form-group">
													<label for="model" style="font-weight:normal">Longitude</label>
													<input type="text" id="longitude" name="longitude" class="form-control" maxlength="11" placeholder="" />
												</div>
											</div>
                                            
                                            
											<div class="col-md-2">&nbsp;</div>
											<div class="col-md-6">
												<div class="form-group">
													<label for="logomark" style="font-weight:normal">Logo</label><br />
													<img id="preview_logomark" src="#" style="cursor: pointer; width: 175px; height: 45px;" /><br />													
												</div>												
											</div>	
                                            
                                            									
										</div>
										
										<div class="row">
											<div class="col-md-4">
												<div class="form-group">
													<label for="contact" style="font-weight:normal">Zoom</label>
													<input type="text" id="zoom" name="zoom" class="form-control" maxlength="2" placeholder="" />
												</div>
											</div>

											<div class="col-md-4">
											<div class="form-group">
													<label style="font-weight:normal" >Mensagem de posição</label>
													<select class="select-search" id="message_load_positions" name="message_load_positions">	
															<option value="">Selecione uma opção...</option>										                    											                    											                    
															<option value="1">Sim</option>											                    
															<option value="0">Não</option>															
													</select>
												</div>
											</div>

										
									
											<div class="col-md-4">
												<div class="form-group">
													<label for="facebook" style="font-weight:normal">Facebook</label>
													<input type="text" id="facebook" name="facebook" class="form-control" maxlength="80" placeholder="" /><br />
													<span style="font-size: 10px">* https://www.facebook.com/</span>
												</div>												
											</div>
                                            
                                            
                                            <div class="col-md-4">
												<div class="form-group">
													<label for="twitter" style="font-weight:normal">Twitter</label>
													<input type="text" id="twitter" name="twitter" class="form-control" maxlength="80" placeholder="" /><br />
													<span style="font-size: 10px">* https://twitter.com/</span>
												</div>
											</div>

                                            
						                  <div class="col-md-4">
												<div class="form-group">
													<label for="website" style="font-weight:normal">Website</label>
													<input type="text" id="website" name="website" class="form-control" maxlength="180" placeholder="" /><br />													
												</div>
											</div>
                                           
											<div class="col-md-4">
												<div class="form-group">
													<label for="playstore" style="font-weight:normal">App PlayStore</label>
													<input type="text" id="playstore" name="playstore" class="form-control" maxlength="150" placeholder="" /><br />
												</div>
											</div>
										
										</div>
										
										<div class="row">
											<div class="col-md-4">
												<div class="form-group">
													<label for="applestore" style="font-weight:normal">App AppleStore</label>
													<input type="text" id="applestore" name="applestore" class="form-control" maxlength="150" placeholder="" /><br />
												</div>
											</div>
										
										
											<div class="col-md-4">
											<div class="form-group">
													<label for="playstore" style="font-weight:normal">Tempo de atualização do mapa</label>
													<input type="text" id="map_refresh" name="map_refresh" class="form-control" maxlength="2" placeholder="" /><br />
													<span style="font-size: 10px">* Em segundos</span>
												</div>
											</div>
                                            
                                            
                                            <div class="col-md-4">
											<div class="form-group">
												<label style="font-weight:normal" >Ativar Google Maps</label>
													<select class="select-search" id="google_maps" name="google_maps">	
															<option value="">Selecione uma opção...</option>										                    											                    											                    
															<option value="true" data-i18n="title_yes">Sim</option>											                    
															<option value="false" data-i18n="title_no">Não</option>															
													</select>
												</div>
											</div>

                                            
                                            </div>
										
										<div class="row">							            								        
											<div class="col-md-4">&nbsp;</div>
											<div class="col-md-2">&nbsp;</div>								        								        
											<div class="col-md-6">                                                       
												<div class="text-right">
													<button type="submit" class="btn btn-primary" name="btnSave">Salve<i class="icon-arrow-right14 position-right"></i></button>
													&nbsp; &nbsp; &nbsp;
													<button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> Resetar </button>                                                           
												</div>
											</div>
										</div>	
                                        
                                        
                            <div class="row">
							<h2>Google Maps key</h2>
							</div>
                                        
                                         <div class="row">
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="appkey" style="font-weight:normal">Chave licença</label>
													<input type="text" id="appkey" name="appkey" class="form-control" maxlength="150" placeholder="" /><br />
												</div>
											</div>   
                                            
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="goolekey" style="font-weight:normal">Google Maps key</label>
													<input type="text" id="googlekey" name="googlekey" class="form-control" maxlength="150" placeholder="" /><br />
												</div>
											</div> 
                                            
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="mapbox" style="font-weight:normal">Mapbox key</label>
													<input type="mapbox" id="mapbox" name="mapbox" class="form-control" maxlength="150" placeholder="" /><br />
												</div>
											</div> 
                                  </div>
                                  
                        <div class="row">
						<h2>Mail server configuration</h2>
						</div>
                                            
                                  <div class="row">
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="smtp_server" style="font-weight:normal">Smtp Server</label>
													<input type="text" id="smtp_server" name="smtp_server" class="form-control" maxlength="150" placeholder="" />
												</div>
											</div>
                                            
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="smtp_port" style="font-weight:normal">SMTP Port</label>
													<input type="text" id="smtp_port" name="smtp_port" class="form-control" maxlength="5" placeholder="" />
												</div>
											</div>
                                            <div class="col-md-4">
												<div class="form-group">
													<label style="font-weight:normal" >SMTP AUTH?</label>
													<select class="select-search" id="smtp_auth" name="smtp_auth">	
															<option value="">Selecione uma opção...</option>										                    											                    											                    
															<option value="true">Sim</option>											                    
															<option value="false">NO</option>									                    							                   
													</select>
												</div>
											</div>
                                            
                                            	<div class="col-md-4">
												<div class="form-group">
													<label style="font-weight:normal" >SMTP SECURE</label>
													<select class="select-search" id="smtp_ssl" name="smtp_ssl">	
															<option value="">Selecione uma opção...</option>										                    											                    											                    
															<option value="ssl">SSL</option>											                    
															<option value="tls">TLS</option>
															<option value="">NONE</option>							                    
													</select>
												</div>
											</div>
                                            
                                            <div class="col-md-4">
												<div class="form-group">
													<label for="smtp_username" style="font-weight:normal">SMTP Username</label>
													<input type="text" id="smtp_username" name="smtp_username" class="form-control" maxlength="150" placeholder="" />
												</div>
											</div>
                                            
                                            	<div class="col-md-4">
												<div class="form-group">
													<label for="smtp_password" style="font-weight:normal">SMTP Password</label>
													<input type="password" id="smtp_password" name="smtp_password" class="form-control" maxlength="20" placeholder="" />
												</div>
											</div>
                                    </div>
                                        
                                        																																																												
								</form>						  						 
							</div>
							<div id="tab_terms" class="tab-pane fade">						    
							<form id="form_terms" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
									
									<div class="row">
										<div class="form-group">											
											<textarea id="term" name="term" class="form-control" rows="20" placeholder=""></textarea>
										</div>
									</div>
									
									<div class="row">							            								        
										<div class="text-right">
											<button type="button" class="btn btn-primary" name="btnSaveTerm">Salve<i class="icon-arrow-right14 position-right"></i></button>
										</div>								
									</div>																																																													
								</form>						  						 
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
	<script src="assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/extensions/responsive.min.js"></script>	
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
	<script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
	<script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
	<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/apps/i8n.js"></script>

	<script src="assets/js/plugins/yspeed.js"></script>		
	<script src="assets/js/plugins/underscore-min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/server.js"></script>
	

        	<style>
            .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #58ACFA;
            color: white;
            text-align: center;
            }
            </style>
			<script src="assets/js/apps/commons/commons.js"></script>	
			<script src="assets/js/plugins/underscore-min.js"></script>
			<script src="assets/js/plugins/notifications/notify.js"></script>
			<script src="assets/js/plugins/ui/moment/moment-timezone.js"></script>
    		<script src="assets/js/plugins/ui/moment/moment-timezone-with-data.min.js"></script>	
			<script src="assets/js/plugins/jquery.cookie.js"></script>
            <div class="footer">
            <p><span class="text-custom" data-i18n="login_message">Menssagem</span><span class="text-custom" data-i18n="mnu_toggle_contact_help">Socorro</span></p>
            </div>
