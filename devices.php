<?php	
	include_once "header.php";
?>


			<!-- datatables buttons-->
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">					

			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="mnu_devices">Devices</h3>
					<div class="panel panel-headline">
						<div class="panel-body">
							
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="title_data">Data</a></li>							  
							  <li><a data-toggle="tab" href="#tab_list" data-i18n="title_list">List</a></li>
							</ul>						
							<div class="tab-content">
							  <div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >

                                        <input type="text" id="id" name="id" style="display: none">

										<div class="row">
                                        <div class="col-md-3" >
											<div class="col-xs-12" id="field_photo">
												<div class="form-group">													 
											
												</div>
											</div>
                                             </div>
											<div class="row">
										
										</div>
                                        
                                       <div class="row">
											<h2>Informações do veículo</h2>
										</div>
                                        
                                                                                                                        
                                        	
							
					                    	<div class="col-md-2">
							                <div class="form-group">
										    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
											<input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />
                                                 
									        </div>
						                    </div>
						                    
								            <div class="col-md-2">                                                       
                                            <div class="form-group">     
										    <label for="uniqueId" style="font-weight:normal" data-i18n="title_identifier">Identifier</label>
	                                                <input type="text" id="uniqueId" name="uniqueId" class="form-control" maxlength="50" placeholder="" />
									            </div>
									        </div>
                                            
                                           
                                            
                                            <div class="col-md-3">                                                       
									        <div class="form-group">
										     <label for="phone" style="font-weight:normal" data-i18n="title_phone">Phone</label>
	                                                <input type="text" id="phone" name="phone" class="form-control" maxlength="15" placeholder="" data-mask="(99) 9999-9999"/>
									            </div>
									        </div>
                                            
                                            
                                            
                                            
                                            
                                            
                                             <div class="col-md-3">                                                       
									        <div class="form-group">
										     <label for="protocol" style="font-weight:normal" data-i18n="title_protocol">Protocol</label>
	                                                <select class="select-search" id="protocol" name="protocol">											                    											                    											                    
								                    <option value=""data-i18n="title_select2">Select an option ...</option>
                                                        <option value="GT-06">Concox GT-06 : 5023</option>
                                                        <option value="Iwatcher"data-i18n="title_iwatcher">E3,E3+ Porta: 5056</option>
                                                      <option value="Coban"data-i18n="title_coban">Coban TKS Porta: 5001</option>	
                                                      <option value="Suntech"data-i18n="title_suntech">Suntech Porta: 5011</option>	
                                                      <option value="CRX"data-i18n="title_crx">CRX Porta: 5023</option>
                                                      <option value="Android"data-i18n="STG100,50 Porta: 5058">STG100,50 Porta: 5058</option>	
                                                      <option value="iOS"data-i18n="title_ios">iOS</option>	
													  <option value="iOS"data-i18n="Android Porta: 5055">Android</option>	
v													  
						                    </select>
									            </div>
									        </div>
                                            
                                          <!--  <div class="col-md-2">
							                <div class="form-group">
										    <label for="brand" style="font-weight:normal" data-i18n="title_brand">Brand</label>
											<input type="text" id="brand" name="brand" class="form-control" maxlength="15" placeholder="" />
									        </div>
						                    </div>-->
                                            
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										     <label for="brand" style="font-weight:normal" data-i18n="title_brand">Brand</label>
	                                                <select class="select-search" id="brand" name="brand">											                    											                    											                    
								                    <option value=""data-i18n="title_select2">Select an option ...</option>	
                                                     <option value="Celular">Celular</option>	
                                                     <option value="Chevrolet">Chevreolet</option>	
                                                      <option value="Nissa">Nissan</option>	
                                                      <option value="Volkswagen">Volkswagen</option>	
                                                      <option value="Kia">Kia</option>	
                                                      <option value="Honda">Honda</option>
                                                      <option value="Ford">Ford</option>
                                                      <option value="Mazda">Mazda</option>
                                                      <option value="Hyundai">Hyundai</option>
                                                      <option value="Renault">Renault</option>
                                                      <option value="Suzuki">Suzuki</option>
                                                      <option value="Seat">Seat</option>
                                                      <option value="BMW">BMW</option>
                                                      <option value="Volvo">Volvo</option>
                                                      <option value="Lilcoln">Lincoln</option>
                                                       <option value="Porsche">Porsche</option>
                                                        <option value="Jaguar">Jaguar</option>
                                                         <option value="Chysler">Chysler</option>
                                                      											                    								                    
						                    </select>
									            </div>
									        </div>
                                            
                                            
                                            
                                            
                                        </div>  
                                        
                                        
                                           <div class="row">
					                    
						                    
								         <!-- <div class="col-md-2">                                                       
                                            <div class="form-group">     
										    <label for="year" style="font-weight:normal" data-i18n="title_year">Year</label>
											<input type="text" id="year" name="year" class="form-control" maxlength="15" placeholder="" />
									        </div>
									        </div>-->
                                            
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										     <label for="year" style="font-weight:normal" data-i18n="title_year">Year</label>
	                                                <select class="select-search" id="year" name="year">											                    											                    											                    
								                    <option value=""data-i18n="title_select2">Select an option ...</option>	
                                                     <option value="1980">1980</option>	
                                                     <option value="1981">1981</option>	
                                                     <option value="1982">1982</option>	
                                                     <option value="1983">1983</option>	
                                                     <option value="1984">1984</option>	
                                                     <option value="1985">1985</option>	
                                                     <option value="1986">1986</option>	
                                                     <option value="1987">1987</option>	
                                                     <option value="1988">1988</option>	
                                                     <option value="1989">1989</option>	
                                                     <option value="1990">1990</option>	
                                                     <option value="1991">1991</option>	
                                                     <option value="1992">1992</option>	
                                                     <option value="1993">1993</option>	
                                                     <option value="1994">1994</option>	
                                                     <option value="1995">1995</option>	
                                                     <option value="1996">1996</option>	
                                                     <option value="1997">1997</option>	
                                                     <option value="1998">1998</option>	
                                                     <option value="1999">1999</option>	
                                                     <option value="2000">2000</option>	
                                                     <option value="2001">2001</option>	
                                                     <option value="2002">2002</option>	
                                                     <option value="2003">2003</option>	
                                                     <option value="2004">2004</option>	
                                                     <option value="2005">2005</option>	
                                                     <option value="2006">2006</option>	
                                                     <option value="2007">2007</option>	
                                                     <option value="2008">2008</option>	
                                                     <option value="2009">2009</option>
                                                     <option value="2010">2010</option>
                                                     <option value="2011">2011</option>
                                                     <option value="2012">2012</option>
                                                     <option value="2013">2013</option>
                                                     <option value="2014">2014</option>
                                                     <option value="2015">2015</option>
                                                     <option value="2016">2016</option>	
                                                     <option value="2017">2017</option>
                                                     <option value="2018">2018</option>
                                                     <option value="2019">2019</option>
                                                     <option value="2020">2020</option> 
													 <option value="2010">2021</option>
                                                     <option value="2011">2022</option>
                                                     <option value="2012">2024</option>
                                                     <option value="2013">2025</option>
                                                     <option value="2014">2025</option>
                                                     <option value="2015">2026</option>
                                                     <option value="2016">2027</option>	
                                                     <option value="2017">2028</option>
                                                     <option value="2018">2029</option>
                                                     <option value="2019">2030</option>
                                                    
						                    </select>
									            </div>
									        </div>
                                            
                                            
                                            
                                            
                                            <!--<div class="col-md-2">                                                       
									        <div class="form-group">
										    <label for="color" style="font-weight:normal" data-i18n="title_color">Color</label>
											<input type="text" id="color" name="color" class="form-control" maxlength="15" placeholder="" />
									        </div>
									        </div>-->
                                            
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										     <label for="color" style="font-weight:normal" data-i18n="title_color">Color</label>
	                                                <select class="select-search" id="color" name="color">											                    											                    											                    
								                    <option value=""data-i18n="title_select2">Select an option ...</option>	
													<option value="Cinza">Cinza</option> 
                                                     <option value="Grafit">Grafit</option>  													
                                                     <option value="Negro">Preto</option>
                                                      <option value="Prata">Prata</option>  													 
                                                      <option value="Blanco">Branco</option>	
                                                      <option value="Amarillo">Amarelo</option>	
                                                      <option value="Azul">Azul</option>	
                                                      <option value="Verde">Verde</option>
                                                      <option value="Rosa">Rosa</option>  
													  <option value="Vermelho">Vermelho</option> 
													  
						                    </select>
									            </div>
									        </div>
                                            
                                            <div class="col-md-4">                                                       
									        <div class="form-group">
										    <label for="serie" style="font-weight:normal" data-i18n="title_serie">Series</label>
											<input type="text" id="serie" name="serie" class="form-control" maxlength="20" placeholder="" />
									        </div>
									        </div>
                                            
                                            
                                             <div class="col-md-2">                                                       
									        <div class="form-group">
										    <label for="plate" style="font-weight:normal" data-i18n="title_plate">Plate</label>
	                                        <input type="text" id="plate" name="plate" class="form-control" maxlength="15" placeholder="" />
									        </div>
									        </div>
                                            
                                             <div class="col-md-2">                                                       
									        <div class="form-group">
										     <label for="model" style="font-weight:normal" data-i18n="title_model">Model</label>
											<input type="text" id="model" name="model" class="form-control" maxlength="50" placeholder="" />
									        </div>
									        </div>
                                        </div>
                                         <div class="row">
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										    <label for="contact" style="font-weight:normal" data-i18n="title_contact">Contact</label>
											<input type="text" id="contact" name="contact" class="form-control" maxlength="50" placeholder="" />
									        </div>
									        </div>
                                            
                                          <div class="col-md-4">                                                       
									        <div class="form-group">
										    <label for="comment" style="font-weight:normal" data-i18n="title_comment">Comment</label>
											<input type="text" id="comment" name="comment" class="form-control" maxlength="50" placeholder="" />
									        </div>
									        </div>
                                            
                                            <div class="col-md-3">                                                       
									        <div class="form-group">
										     <label for="company" style="font-weight:normal" data-i18n="title_company">Company</label>
	                                                <select class="select-search" id="company" name="company">											                    											                    											                    
								                    <option value=""data-i18n="title_select2">Select an option ...</option>	
                                                     <option value="Telcel" >Allcom</option>
                                                      <option value="Movistar">Vivo</option>		
                                                      <option value="Unefon">Algar</option> 													 
                                                      <option value="Movistar">Oi</option>	
                                                      <option value="Unefon">Tim</option>
                                                      <option value="Unefon">Voxter</option> 													 
                                                      <option value="Movistar">Datatem</option>	
                                                      <option value="Unefon">Claro</option>	
                                                      <option value="Unefon">Outros</option> 													 												  
						                    </select>
									            </div>
									        </div>
                                            
                                            <div class="col-md-3">                                                       
									        <div class="form-group">
										    <label for="speedLimit" style="font-weight:normal" data-i18n="title_speedlimit">Speed Limit</label>
										            <div class="input-group mb-2 mr-sm-2 mb-sm-0">										            	
	                                                	<input type="text" id="speedLimit" name="speedLimit" class="form-control" maxlength="5" placeholder=""  pattern= "[0-9]"/>
	                                                	<div class="input-group-addon"><span id="speedUnit"></span></div>
	                                                </div>
									        </div>
									        </div>
                                            
                                            
                                        </div>


	                               <div class="row">
											<h2>Categorias e grupos</h2>
										</div>
                                         

                                  <div class="row">
					                    	<div class="col-md-3">
							                <div class="form-group">
										   <label style="font-weight:normal" data-i18n="title_category">Category</label>
						                    <select class="select-search" id="category" name="category">											                    											                    											                    
								                    <option value="" 		   data-i18n="title_select2">Select an option ...</option>											                    								                    
						                    </select>
									        </div>
						                    </div>
						                    
								          <div class="col-md-3">                                                       
                                            <div class="form-group">     
										    <label style="font-weight:normal" data-i18n="title_group">Group</label>
						                    <select class="select-search" id="groupId" name="groupId">											                    											                    											                    
								                    <option value="" 		   data-i18n="title_select2">Select an option ...</option>											                    
						                    </select>
									        </div>
									        </div>
                                            
                                            <div class="col-md-3">
                                            
							                    <div class="form-group">
								                    <label style="font-weight:normal" data-i18n="title_fuel">Fuel</label>
								                    <select class="select-search" id="fuel" name="fuel">											                    											                    											                    
										                    <option value=""  		  data-i18n="title_select2">Select an option ...</option>											                    
															<option value="flex"  	  					       >Flex</option>
										                    <option value="gasoline"  data-i18n="title_gasoline">Gasoline</option>
										                    <option value="alcohol"   data-i18n="title_alcohol">Alcohol</option>
										                    <option value="diesel"    data-i18n="title_diesel">Diesel</option>
										                    <option value="gnv"  	  data-i18n="title_gnv">GNV</option>															
								                    </select>
							                    </div>
						                    </div>
                                                
								            <div class="col-md-3">                                                       
									            <div class="form-group">
										            <label for="autonomy" style="font-weight:normal" data-i18n="title_autonomy">Autonomy</label>
										            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
	                                                	<input type="text" id="autonomy" name="autonomy" class="form-control" maxlength="2" placeholder=""/>
	                                                	<div class="input-group-addon"><span>Km/l</span></div>
	                                                </div>
									            </div>
									        </div>
                                            
                                            
                                            
                                            
                                            
                                            
                                        </div>
        		                    
					              <div class="row resource_manager">
											<h2>Entradas / Saídas</h2>
                                            
                                            
                                            
                                            
                                            
                                            	<div class="col-md-3">
							                    <div class="form-group">
								                    <label style="font-weight:normal" data-i18n="title_input1">Input 1</label>
								                    <select class="select-search" id="input1" name="input1">											                    											                    											                    
										                    <option value=""  		  data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                             <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>
								                    </select>
							                    </div>
						                    </div>
						                    
								            <div class="col-md-3">                                                       
									            <div class="form-group">
										            <label style="font-weight:normal" data-i18n="title_input2">Input2</label>
								                    <select class="select-search" id="input2" name="input2">											                    											                    											                    
										                    <option value=""  		  data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                             <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>
								                    </select>
									            </div>
									        </div>
                                            
                                             <div class="col-md-3">                                                       
									            <div class="form-group">
										            <label style="font-weight:normal" data-i18n="title_input3">Input3</label>
								                    <select class="select-search" id="input3" name="input3">											                    											                    											                    
										                    <option value=""  		  data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                             <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>
								                    </select>
									            </div>
									        </div>
                                            
                                             <div class="col-md-3">                                                       
									            <div class="form-group">
										            <label style="font-weight:normal" data-i18n="title_input4">Input4</label>
								                    <select class="select-search" id="input4" name="input4">											                    											                    											                    
										                    <option value=""  		  data-i18n="title_select2">Select an option ...</option>											                    
										                     <option value="door"  	  data-i18n="title_door1">Door</option>
                                                             <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>
								                    </select>
									            </div>
									        </div>
                                            
                                            
                                           
                                            <!--	<div class="col-md-3">
							                    <div class="form-group">
								                    <label style="font-weight:normal">GT06 Alternativo</label>
								                    <select class="select-search" id="gt06" name="gt06">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="true"  >Si</option>
										                    <option value="false" >No</option>										                    
								                    </select>
							                    </div>
						                    </div>
						                    
								            <div class="col-md-3">                                                       
									            <div class="form-group">
													<label style="font-weight:normal">G05 Alternativo</label>
								                    <select class="select-search" id="h02" name="h02">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="true"  >Si</option>
										                    <option value="false" >No</option>										                    
								                    </select>
									            </div>
									        </div>-->
                                            <div class="col-md-3">                                                       
									            <div class="form-group">
													<label style="font-weight:normal"data-i18n="title_output1">Output 1</label>
								                    <select class="select-search" id="output1" name="output1">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                             <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>									                    
								                    </select>
									            </div>
									        </div>
                                            
                                             <div class="col-md-3">                                                       
									            <div class="form-group">
													<label style="font-weight:normal" data-i18n="title_output2">Output 2</label>
								                    <select class="select-search" id="output2" name="output2">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                   <option value="door"  	  data-i18n="title_door1">Door</option>
                                                            <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>									                    
								                    </select>
									            </div>
									        </div>
                                            
                                             <div class="col-md-3">                                                       
									            <div class="form-group">
													<label style="font-weight:normal" data-i18n="title_output3">Output 3</label>
								                    <select class="select-search" id="output3" name="output3">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                            <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>									                    
								                    </select>
									            </div>
									        </div>
                                            
                                            
                                             <div class="col-md-3">                                                       
									            <div class="form-group">
													<label style="font-weight:normal" data-i18n="title_output4">Output 4</label>
								                    <select class="select-search" id="output4" name="output4">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="door"  	  data-i18n="title_door1">Door</option>
                                                            <option value="engine"   data-i18n="title_engine">Engine</option>
										                    <option value="bucket"    data-i18n="title_bucket">Bucket</option>
										                    <option value="winch"     data-i18n="title_winch">Whinc</option>										                    
										                    <option value="chest"  	  data-i18n="title_chest">Chest</option>
										                    <option value="fuel_port" data-i18n="title_fuel_port">Fuel Port</option>
										                    <option value="press" 	  data-i18n="title_press">Hydraulic press</option>									                    
								                    </select>
									            </div>
									        </div>
                                            
                                            
                                            <div class="col-md-3 resource_admin">
		                                    <div class="form-group">
							                    <label style="font-weight:normal" data-i18n="title_disabled">Disabled</label>
							                    <select class="select-search" id="disabled" name="disabled">	
							                    		<option value="" data-i18n="title_select2">Select an option...</option>										                    											                    											                    
									                    <option value="true" data-i18n="title_yes">Yes</option>											                    							                    
									                    <option value="false" data-i18n="title_no">No</option>							                    
							                    </select>
						                    </div>		     
										</div>
                                        
                                     <!-- <div class="col-md-3">
							                <div class="form-group">
										    <label for="company1" style="font-weight:normal" data-i18n="title_company1">Company</label>
											<input type="text" id="company1" name="company1" class="form-control" maxlength="80" placeholder="" />
                                                 
									       </div>
						              </div>
                                        
                                      	<div class="col-md-2">
							                <div class="form-group">
										    <label for="subcompany" style="font-weight:normal" data-i18n="title_subcompany">Sub-Company</label>
											<input type="text" id="subcompany" name="subcompany" class="form-control" maxlength="80" placeholder="" />
                                                 
									        </div>
						                    </div>-->
                                            
										</div>
					                   
					                    
					                             

											

										<!--<div class="row">
					                    	<div class="col-md-5">
							                    <div class="form-group">
								                    <label style="font-weight:normal">GT06 Alternativo</label>
								                    <select class="select-search" id="gt06" name="gt06">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="true"  >Si</option>
										                    <option value="false" >No</option>										                    
								                    </select>
							                    </div>
						                    </div>
						                    
								            <div class="col-md-4">                                                       
									            <div class="form-group">
													<label style="font-weight:normal">G05 Alternativo</label>
								                    <select class="select-search" id="h02" name="h02">											                    											                    											                    
										                    <option value=""  	 data-i18n="title_select2">Select an option ...</option>											                    
										                    <option value="true"  >Si</option>
										                    <option value="false" >No</option>										                    
								                    </select>
									            </div>
									        </div>											
											
                                        </div>	-->                              
													
										<div id="miodometro">
								

											<div class="row">
											
												
												<div class="col-md-5 resource_admin">                                                       
												 <div class="form-group" id="totalDistanceField">
														<label for="totalDistance" style="font-weight:normal" data-i18n="odometer">Odometer</label>
														<div class="input-group mb-2 mr-sm-2 mb-sm-0">
															<input type="text" id="totalDistance" name="totalDistance" class="form-control" maxlength="20" placeholder=""/>
															<div class="input-group-addon"><span>Km</span></div>
														</div>
													</div>
												</div>
												
												
											
												
												<div class="col-md-5 resource_admin">                                                       
												 <div class="form-group" id="hoursField">
														<label for="hoursengine" style="font-weight:normal" data-i18n="hours_engine">Engine hours</label>
														<div class="input-group mb-2 mr-sm-2 mb-sm-0">
															<input type="text" id="hours" name="hours" class="form-control" maxlength="20" placeholder=""/>
															<div class="input-group-addon"><span>Hrs</span></div>
														</div>
													</div>
												</div>									
												
											</div>   
										</div>             
                                                    
                                        <!--<div class="text-right">
                                            <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Save</span><i class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
										    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
                                        </div> -->
                                           <div class="row">
								            <div class="col-md-2">                                                       
									            <div class="form-group">
						                       <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Save</span></button>
                                            </div>
									        </div>
                                           
                                            <div class="col-md-2">                                                       
							                <div class="form-group">
						                                                             
										    <button class="btn" type="reset" name="btnClear" >  <span data-i18n="button_clear">Clear</span> </button>                                                           
                                            </div>
									        </div>
                                            
                                        </div>                                                                                            
			                    </form>
							  </div>


							  <div id="tab_list" class="tab-pane fade">
							   
							    <div class="panel-heading">							                            
		                            <div class="heading-elements">
			                            <ul class="icons-list">
        		                            <li><a data-action="reload" name="lnkRefreshGrid" title="Update"></a></li>
        	                            </ul>
    	                            </div>
	                         </div>

                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                            <th data-i18n="title_list_id">ID</th>	
                                             <th >Foto</th>				          
                                            <th data-i18n="title_name">Name</th>
											<th data-i18n="title_group">Group</th>
                                            <th data-i18n="title_identifier">UniqueId</th>                                                                              
                                            <th data-i18n="title_category">Category</th>					                                                                                        
                                            <th data-i18n="title_create_device">Create</th>
											<th data-i18n="title_plate">Plate</th>
                                            <th data-i18n="title_phone">Phone</th>                                                               
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

			<!-- Button trigger modal 
			<button type="button" class="btn btn-primary" data-toggle="modal" id="displayPhoto" data-target="#displayPhotoModal">&nbsp;</button>

			
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
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>					
				</div>
				</div>
			</div>
			</div>
            -->
            
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
	<script src="assets/js/plugins/yspeed.js"></script>		
	<script src="assets/js/plugins/underscore-min.js"></script>
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/devices.js"></script>
	
          <?php	
	include_once "footer.php";
?>
