<?php	
	include_once "header.php";
?>
	<!-- Bootstrap Material Datetime Picker Css -->
	<link href="assets/js/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
	
	<!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
    
	<!-- datatables buttons-->
	<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">
    
   <!-- 
   <script type="text/javascript">
	var useris = sessionStorage.getItem("userid");
    </script>				
    -->

		<!-- MAIN CONTENT -->
		<div class="main-content">
			<div class="container-fluid">
				<h3 class="page-title" data-i18n="mnu_users">Users</h3>
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
                                    
                                    
                                    
                                    <input type="text" id="token" style="display: none"  name="token" class="form-control" maxlength="50" placeholder="Token" value="l24Zl40ntc8gHHgfJvc3etI3lxsVgocu" />
                                    
                                    <div class="row" >
                                     		 <div class="col-md-3" >
											<div class="col-xs-8" id="field_photo">
												<div class="form-group">													 
												
												</div>
											</div>
                                        </div>						
                                     </div>	
                                     
                                  <div class="col-md-15">&nbsp;</div>	
                                    
                                    <div class="row">
                                    
                                   
                                    
            					    <div class="form-group">
                                    
                                    <div class="col-md-3">		
									    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
										<input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />
								    </div>								    							   
								    
								    <div class="form-group">
                                    <div class="col-md-3">		
									    <label for="email" style="font-weight:normal">Email</label>
										<input type="text" id="email" name="email" class="form-control" maxlength="120" placeholder="" />
								    </div>

									 <div class="form-group">
							            <div class="col-md-3">
                                       										    
										    <div class="form-group">
											    <label for="password" style="font-weight:normal" data-i18n="title_password">Password</label>
												<input type="password" id="password" name="password" class="form-control" maxlength="20" placeholder="" />
										    </div>
										</div>
									</div>
                                    
                                    <div class="col-md-3">
		                                    <div class="form-group">
											    <label for="contact" style="font-weight:normal">Zoom</label>
												<input type="text" id="zoom" name="zoom" class="form-control" maxlength="2" placeholder="" value="18"/>
										    </div>
										</div>
                                    
                                    
                                   
                                    	</div>
                                        	</div>
                                            	</div>
                                                
                                                

									<div class="row">
                                    
                                     <div class="col-md-3">										    
										    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_readonly">ReadOnly</label>
							                    <select class="select-search" id="readonly" name="readonly">	
							                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
									                    <option value="true" data-i18n="title_yes">Sim</option>											                    							                    
									                    <option value="false" data-i18n="title_no" selected="selected">Não</option>							                    
							                    </select>
						                    </div>                                                                      
										</div>
							            
							         <div class="col-md-3">	
											<!--<div class="form-group" id="field_panel" style="display:none">-->
                                            <div class="form-group" >
							                    <label style="font-weight:normal" data-i18n="title_app_default">App Default</label>
							                    <select class="select-search" id="panel" name="panel">	
							                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
									                    <option value="map" data-i18n="mnu_dashboard" selected="selected">Dashboard</option>
									                    <option value="communication" data-i18n="mnu_communication">Communicatiom</option>
							                    </select>
						                    </div>		     
										</div>
								

									
							            <div class="col-md-3">		
		                                    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_distance">Distance</label>
							                    <select class="select-search" id="distanceUnit" name="distanceUnit">		
							                    		<option value="" data-i18n="title_select2">Select an option...</option>									                    											                    											                    
									                       <option value="km">Kilometros</option>											                    											                    
															<option value="mi">Millas</option>
															<option value="nmi">Millas nauticas</option>						                    
							                    </select>
						                    </div>
										</div>	
                                        
                                        
                                        
                                        <!--	<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="deviceLimit" style="font-weight:normal" >Limite de dispositivos</label>
												<input type="text" id="deviceLimit" name="deviceLimit" class="form-control" maxlength="20" placeholder="" />
										    </div>
										</div>
                                        
                                        	<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="userLimit" style="font-weight:normal" >Limite de usuarios</label>
												<input type="text" id="userLimit" name="userLimit" class="form-control" maxlength="20" placeholder="" />
										    </div>
										</div>-->
                                        
                                        
                                          <div class="col-md-3">						                    
						                    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_speed">Speed</label>
							                    <select class="select-search" id="speedUnit" name="speedUnit">	
							                    		<option value="" data-i18n="title_select2">Sselect an option...</option>										                    											                    											                    
									                  	<option value="kn">Knots</option>											                    
															<option value="kmh">Km/h</option>
															<option value="mph">Mph</option>						                    
							                    </select>
						                    </div>
										</div>
                                        
                                        </div>	
                                       
								

									<div class="row">
 
                                        <div class="col-md-3">
		                                    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_disabled">Disabled</label>
							                    <select class="select-search" id="disabled" name="disabled">	
							                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
									                    <option value="true" data-i18n="title_yes">Sim</option>											                    							                    
									                    <option value="false" data-i18n="title_no" selected="selected">Não</option>							                    
							                    </select>
						                    </div>		     
										</div>
                                        
                                           <div class="col-md-3">                                    
		                                    <div class="form-group" id="expirationTim1">
							                    <label for="expirationTime" style="font-weight:normal" >Data de validade</label>
                                            <input type="text" id="expirationTime" name="expirationTime"class="form-control datetimepicker" maxlength="30"data-mask="9999-99-99" placeholder="" style="float:left" />
						                    </div>				                                           
										</div>
                                        
                                       
                                            	<div class="col-md-3 resource_admin">
                                                 <div class="form-group" >
		                                    
							                    <label style="font-weight:normal" data-i18n="title_register">register</label>
							                    <select class="select-search" id="register" name="register">	
							                    		<option value="" data-i18n="title_select2">Sselect an option...</option>										                    											                    											                    
									                    <!--<option value="true" data-i18n="title_yes">Yes</option>											                    							                    
									                    <option value="false" data-i18n="title_no">No</option>-->
                                                        
                                                        <option value="true">Sim</option>											                    							                    
									                    <option value="false" selected="selected">Não</option>							                    
							                    </select>
						                    </div>
                                          	</div>  
                                            
                                        
                                         <div class="col-md-3 resource_admin" >                                    
		                                    <div class="form-group">
							                    <label style="font-weight:normal" >Admin</label>
							                    <select class="select-search" id="administrator" name="administrator">	
							                    		<option value=""  data-i18n="title_select2">Select an option...</option>										                    											                    											                    
									                    <option value="true" data-i18n="title_yes">Sim</option>											                    							                    
									                    <option value="false" data-i18n="title_no"selected>Não</option>							                    
							                    </select>
						                    </div>										                                           
										</div>
                                        
                                        	
	                                    <div class="col-md-3">                                    
		                                    <div class="form-group">
							                    <label style="font-weight:normal" >Tipo de perfil</label>
							                    <select class="select-search" id="perfil" name="perfil">	
							                    		<option value=""  data-i18n="title_select2">Sselect an option...</option>										                    											                    											                    
									                    <option value="seg" data-i18n="perfil_seg" selected>track and safety</option>											                    							                    
									                    <option value="dia" data-i18n="perfil_dia" >Diagnostic and security</option>	
                                                        <option value="hab" data-i18n="perfil_hab">driving and prevising accident</option>								                    
							                    </select>
						                    </div>										                                           
										</div>
                                        
                                        
                                           <div class="col-md-3">
		                                    <div class="form-group">
											    <label for="phone" style="font-weight:normal" data-i18n="title_phone">Phone</label>
												<input type="text" id="phone" name="phone" class="form-control" maxlength="60" placeholder="" />
										    </div>
										</div>
		
                                        
                                        	<div class="col-md-5" id="URLoginV">
		                                    <div class="form-group">
											   <!-- <label style="font-weight:normal" data-i18n="title_url_provider">Provider URL</label> --> 
											    <div id="URLogin"><input type="hidden" id="URLoginI" value="" class="form-control" name="URLoginI" /></div>												
										    </div>											    
										</div>                                     
									</div>
                                    
                                    
                                    
                                    
                                    
                                    
                                    <h3 class="page-title" >Endereço</h3>

								    <div class="row">
                                    
                                    	<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="document" style="font-weight:normal" data-i18n="title_document">CPF</label>
												<input type="text" id="document" name="document" class="form-control" maxlength="20" placeholder="CPF" />
										    </div>
										</div>
                                    
                                    	<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="address" style="font-weight:normal" data-i18n="title_address">Address</label>
												<input type="text" id="address" name="address" class="form-control" maxlength="50" placeholder="Endereço" />
										    </div>
										</div>
                                        
							            <div class="col-md-3">                                                       
								            <div class="form-group">
									            <label for="latitude" style="font-weight:normal" data-i18n="title_latitude">Lattitude</label>
                                                <input type="text" id="latitude" name="latitude" class="form-control" maxlength="11" placeholder="Não Preencher" data-mask="(99) 9999-9999"/>
								            </div>
								        </div>
                                        
                                        	<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="neighborhood" style="font-weight:normal" data-i18n="title_neighborhood">Neighborhood</label>
												<input type="text" id="neighborhood" name="neighborhood" class="form-control" maxlength="50" placeholder="Colonia" />
										    </div>
										</div>
                                        
                                        </div>
                                        
                                        
								       <div class="row">
									
                                                             
										<!--<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="state" style="font-weight:normal" data-i18n="title_state">State</label>
												<input type="text" id="state" name="state" class="form-control" maxlength="30" placeholder="Pais" />
										    </div>
										</div>-->
                                        
                                         <div class="col-md-3">		
		                                    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_state">Estado</label>
							                    <select class="select-search" id="state" name="state">		
<option value="" data-i18n="title_select2">Select an option...</option>									                    											                    											                    
<option value="AF">Afganistan</option>
<option value="AL">Albania</option>
<option value="DE">Alemania</option>
<option value="AD">Andorra</option>
<option value="AO">Angola</option>
<option value="AI">Anguilla</option>
<option value="AQ">Ant&aacute;rtida</option>
<option value="AG">Antigua y Barbuda</option>
<option value="AN">Antillas Holandesas</option>
<option value="SA">Arabia Saud&iacute;</option>
<option value="DZ">Argelia</option>
<option value="AR">Argentina</option>
<option value="AM">Armenia</option>
<option value="AW">Aruba</option>
<option value="AU">Australia</option>
<option value="AT">Austria</option>
<option value="AZ">Azerbaiy&aacute;n</option>
<option value="BS">Bahamas</option>
<option value="BH">Bahrein</option>
<option value="BD">Bangladesh</option>
<option value="BB">Barbados</option>
<option value="BE">B&eacute;lgica</option>
<option value="BZ">Belice</option>
<option value="BJ">Benin</option>
<option value="BM">Bermudas</option>
<option value="BY">Bielorrusia</option>
<option value="MM">Birmania</option>
<option value="BO">Bolivia</option>
<option value="BA">Bosnia y Herzegovina</option>
<option value="BW">Botswana</option>
<option value="BR">Brasil</option>
<option value="BN">Brunei</option>
<option value="BG">Bulgaria</option>
<option value="BF">Burkina Faso</option>
<option value="BI">Burundi</option>
<option value="BT">But&aacute;n</option>
<option value="CV">Cabo Verde</option>
<option value="KH">Camboya</option>
<option value="CM">Camer&aacute;n</option>
<option value="CA">Canad&aacute;</option>
<option value="TD">Chad</option>
<option value="CL">Chile</option>
<option value="CN">China</option>
<option value="CY">Chipre</option>
<option value="VA">Ciudad del Vaticano (Santa Sede)</option>
<option value="CO">Colombia</option>
<option value="KM">Comores</option>
<option value="CG">Congo</option>
<option value="CD">Congo, Rep&uacute;blica Democr&aacute;tica del</option>
<option value="KR">Corea</option>
<option value="KP">Corea del Norte</option>
<option value="CI">Costa de Marf&iacute;l</option>
<option value="CR">Costa Rica</option>
<option value="HR">Croacia (Hrvatska)</option>
<option value="CU">Cuba</option>
<option value="DK">Dinamarca</option>
<option value="DJ">Djibouti</option>
<option value="DM">Dominica</option>
<option value="EC">Ecuador</option>
<option value="EG">Egipto</option>
<option value="SV">El Salvador</option>
<option value="AE">Emiratos &Aacute;rabes Unidos</option>
<option value="ER">Eritrea</option>
<option value="SI">Eslovenia</option>
<option value="MX" selected>M&eacute;xico</option>
<option value="US">U.S</option>
<option value="ES">Espa&ntilde;a</option>
<option value="EE">Estonia</option>
<option value="ET">Etiop&iacute;a</option>
<option value="FJ">Fiji</option>
<option value="PH">Filipinas</option>
<option value="FI">Finlandia</option>
<option value="FR">Francia</option>
<option value="GA">Gab&oacute;n</option>
<option value="GM">Gambia</option>
<option value="GE">Georgia</option>
<option value="GH">Ghana</option>
<option value="GI">Gibraltar</option>
<option value="GD">Granada</option>
<option value="GR">Grecia</option>
<option value="GL">Groenlandia</option>
<option value="GP">Guadalupe</option>
<option value="GU">Guam</option>
<option value="GT">Guatemala</option>
<option value="GY">Guayana</option>
<option value="GF">Guayana Francesa</option>
<option value="GN">Guinea</option>
<option value="GQ">Guinea Ecuatorial</option>
<option value="GW">Guinea-Bissau</option>
<option value="HT">Hait&iacute;</option>
<option value="HN">Honduras</option>
<option value="HU">Hungr&iacute;a</option>
<option value="IN">India</option>
<option value="ID">Indonesia</option>
<option value="IQ">Irak</option>
<option value="IR">Ir&aacute;n</option>
<option value="IE">Irlanda</option>
<option value="BV">Isla Bouvet</option>
<option value="CX">Isla de Christmas</option>
<option value="IS">Islandia</option>
<option value="KY">Islas Caim&aacute;n</option>
<option value="CK">Islas Cook</option>
<option value="CC">Islas de Cocos o Keeling</option>
<option value="FO">Islas Faroe</option>
<option value="HM">Islas Heard y McDonald</option>
<option value="FK">Islas Malvinas</option>
<option value="MP">Islas Marianas del Norte</option>
<option value="MH">Islas Marshall</option>
<option value="UM">Minor United States Islands</option>
<option value="PW">Islas Palau</option>
<option value="SB">Islas Salom&oacute;n</option>
<option value="SJ">Islas Svalbard y Jan Mayen</option>
<option value="TK">Islas Tokelau</option>
<option value="TC">Islas Turks y Caicos</option>
<option value="VI">Islas V&iacute;rgenes (EEUU)</option>
<option value="VG">Islas V&iacute;rgenes (Reino Unido)</option>
<option value="WF">Islas Wallis y Futuna</option>
<option value="IL">Israel</option>
<option value="IT">Italia</option>
<option value="JM">Jamaica</option>
<option value="JP">Jap&oacute;n</option>
<option value="JO">Jordania</option>
<option value="KZ">Kazajist&aacute;n</option>
<option value="KE">Kenia</option>
<option value="KG">Kirguizist&aacute;n</option>
<option value="KI">Kiribati</option>
<option value="KW">Kuwait</option>
<option value="LA">Laos</option>
<option value="LS">Lesotho</option>
<option value="LV">Letonia</option>
<option value="LB">L&iacute;bano</option>
<option value="LR">Liberia</option>
<option value="LY">Libia</option>
<option value="LI">Liechtenstein</option>
<option value="LT">Lituania</option>
<option value="LU">Luxemburgo</option>
<option value="MK">Macedonia, Ex-Rep&uacute;blica Yugoslava de</option>
<option value="MG">Madagascar</option>
<option value="MY">Malasia</option>
<option value="MW">Malawi</option>
<option value="MV">Maldivas</option>
<option value="ML">Mal&iacute;</option>
<option value="MT">Malta</option>
<option value="MA">Marruecos</option>
<option value="MQ">Martinica</option>
<option value="MU">Mauricio</option>
<option value="MR">Mauritania</option>
<option value="YT">Mayotte</option>
<option value="FM">Micronesia</option>
<option value="MD">Moldavia</option>
<option value="MC">M&oacute;naco</option>
<option value="MN">Mongolia</option>
<option value="MS">Montserrat</option>
<option value="MZ">Mozambique</option>
<option value="NA">Namibia</option>
<option value="NR">Nauru</option>
<option value="NP">Nepal</option>
<option value="NI">Nicaragua</option>
<option value="NE">N&iacute;ger</option>
<option value="NG">Nigeria</option>
<option value="NU">Niue</option>
<option value="NF">Norfolk</option>
<option value="NO">Noruega</option>
<option value="NC">Nueva Caledonia</option>
<option value="NZ">Nueva Zelanda</option>
<option value="OM">Om&aacute;n</option>
<option value="NL">Pa&iacute;ses Bajos</option>
<option value="PA">Panam&aacute;</option>
<option value="PG">Pap&uacute;a Nueva Guinea</option>
<option value="PK">Paquist&aacute;n</option>
<option value="PY">Paraguay</option>
<option value="PE">Per&uacute;</option>
<option value="PN">Pitcairn</option>
<option value="PF">Polinesia Francesa</option>
<option value="PL">Polonia</option>
<option value="PT">Portugal</option>
<option value="PR">Puerto Rico</option>
<option value="QA">Qatar</option>
<option value="UK">Reino Unido</option>
<option value="CF">Rep&uacute;blica Centroafricana</option>
<option value="CZ">Rep&uacute;blica Checa</option>
<option value="ZA">Rep&uacute;blica de Sud&aacute;frica</option>
<option value="DO">Rep&uacute;blica Dominicana</option>
<option value="SK">Rep&uacute;blica Eslovaca</option>
<option value="RE">Reuni&oacute;n</option>
<option value="RW">Ruanda</option>
<option value="RO">Rumania</option>
<option value="RU">Rusia</option>
<option value="EH">Sahara Occidental</option>
<option value="KN">Saint Kitts y Nevis</option>
<option value="WS">Samoa</option>
<option value="AS">Samoa Americana</option>
<option value="SM">San Marino</option>
<option value="VC">San Vicente y Granadinas</option>
<option value="SH">Santa Helena</option>
<option value="LC">Santa Luc&iacute;a</option>
<option value="ST">Santo Tom&eacute; y Pr&iacute;ncipe</option>
<option value="SN">Senegal</option>
<option value="SC">Seychelles</option>
<option value="SL">Sierra Leona</option>
<option value="SG">Singapur</option>
<option value="SY">Siria</option>
<option value="SO">Somalia</option>
<option value="LK">Sri Lanka</option>
<option value="PM">St Pierre y Miquelon</option>
<option value="SZ">Suazilandia</option>
<option value="SD">Sud&aacute;n</option>
<option value="SE">Suecia</option>
<option value="CH">Suiza</option>
<option value="SR">Surinam</option>
<option value="TH">Tailandia</option>
<option value="TW">Taiw&aacute;n</option>
<option value="TZ">Tanzania</option>
<option value="TJ">Tayikist&aacute;n</option>
<option value="TF">Territorios franceses del Sur</option>
<option value="TP">Timor Oriental</option>
<option value="TG">Togo</option>
<option value="TO">Tonga</option>
<option value="TT">Trinidad y Tobago</option>
<option value="TN">T&uacute;nez</option>
<option value="TM">Turkmenist&aacute;n</option>
<option value="TR">Turqu&iacute;a</option>
<option value="TV">Tuvalu</option>
<option value="UA">Ucrania</option>
<option value="UG">Uganda</option>
<option value="UY">Uruguay</option>
<option value="UZ">Uzbekist&aacute;n</option>
<option value="VU">Vanuatu</option>
<option value="VE">Venezuela</option>
<option value="VN">Vietnam</option>
<option value="YE">Yemen</option>
<option value="YU">Yugoslavia</option>
<option value="ZM">Zambia</option>
<option value="ZW">Zimbabue</option>						                    
							                    </select>
						                    </div>
										</div>
                                        

									 
                                        
							            <div class="col-md-3">
		                                    <div class="form-group">
											    <label for="model" style="font-weight:normal" data-i18n="title_longitude">Longitude</label>
												<input type="text" id="longitude" name="longitude" class="form-control" maxlength="11" placeholder="Não Preencher" />
										    </div>
										</div>
									
										<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="city" style="font-weight:normal" data-i18n="title_city">City</label>
												<input type="text" id="city" name="city" class="form-control" maxlength="50" placeholder="Cidade" />
										    </div>
										</div>
                                        	
										<div class="col-md-3">
		                                    <div class="form-group">
											    <label for="postal_code" style="font-weight:normal" data-i18n="title_postalcode">Postal Code</label>
												<input type="text" id="postal_code" name="postal_code" class="form-control" maxlength="11" placeholder="CEP" />
										    </div>
										</div>
                                      </div>
                                    
                                                <div class="text-right">
                                        <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Save</span><i class="icon-arrow-right14 position-right"></i></button>
                                        &nbsp; &nbsp; &nbsp;
									    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
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
                                        <!-- <th>Foto</th>-->					          
                                        <th data-i18n="title_name">Name</th>
                                        <th data-i18n="title_email">Email</th>                                                                                                                      
										<!--<th data-i18n="title_phone">Phone</th>-->                                                                                                 
										<!--<th data-i18n="title_state">State</th>-->
                                        <th data-i18n="title_type">Tipo</th>
                                        <th data-i18n="title_disabled">Disabled</th>                                        
										<!--<th data-i18n="title_register">Register</th>-->
                                        <th data-i18n="title_manager">Disabled</th>     
                                        <th data-i18n="title_expira">Time expire</th>                                
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
        
        
        	<!-- Button trigger modal -->
			<button type="button" class="btn btn-primary" data-toggle="modal" id="displayPhoto" data-target="#displayPhotoModal">&nbsp;</button>

			<!-- Modal -->
			<div class="modal fade" id="displayPhotoModal" tabindex="-1" role="dialog" aria-labelledby="displayPhotoModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title" id="displayPhotoTitle"></h2>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<img id="displayPhotoPreview" src="" />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>					
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
	<script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
	<script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
	<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/apps/i8n.js"></script>
	<script src="assets/js/plugins/forms/styling/switchery.min.js"></script>
	<script src="assets/js/plugins/forms/styling/switch.min.js"></script>
    <script src="assets/js/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>	

	<script src="assets/js/plugins/yspeed.js"></script>		
	<script src="assets/js/plugins/underscore-min.js"></script>
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/users.js"></script>
	
          <?php	
	include_once "footer.php";
?>
