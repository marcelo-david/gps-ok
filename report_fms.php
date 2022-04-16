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
    
    	
      <!-- graficas 
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/drilldown.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>-->
    
    	<style type="text/css">
		
		.highcharts-figure, .highcharts-data-table table {
		    min-width: 360px; 
		    max-width: 800px;
		    margin: 1em auto;
		}

		.highcharts-data-table table {
			font-family: Verdana, sans-serif;
			border-collapse: collapse;
			border: 1px solid #EBEBEB;
			margin: 10px auto;
			text-align: center;
			width: 100%;
			max-width: 500px;
		}
		.highcharts-data-table caption {
		    padding: 1em 0;
		    font-size: 1.2em;
		    color: #555;
		}
		.highcharts-data-table th {
			font-weight: 600;
		    padding: 0.5em;
		}
		.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
		    padding: 0.5em;
		}
		.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
		    background: #f8f8f8;
		}
		.highcharts-data-table tr:hover {
		    background: #f1f7ff;
		}

	</style>
	
	
	<!-- MAIN CONTENT -->
	<div class="main-content">
		<div class="container-fluid">
			<h3 class="page-title" data-i18n="title_report_fms">Report FMS</h3>
			<div class="panel panel-headline">
				<div class="panel-body">
                <ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" >Reporte de FMS 1</a></li>				  
							  <li><a data-toggle="tab" href="#tab_fms2" id="fms2" >Reporte de FMS 2 Relevadores</a></li>
                              <li><a data-toggle="tab" href="#tab_fms3" id="fms3" >Reporte de FMS 3 Puertas</a></li>	
                             
							</ul>
                
					
					<div class="tab-content">	
                    	<div id="tab_form" class="tab-pane fade in active">						  
					    <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     
    					    <div class="form-group">
			                    <label style="font-weight:normal"  data-i18n="title_device">Device</label>
			                    <select class="select-search" id="deviceId" name="deviceId" multiple="multiple">											                    											                    											                    
					                    <option value=""  data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>
						    <div class="row">
					            <div class="col-md-4">                                                       
						            <div class="form-group">
							            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                        <input type="text" id="from" name="from" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" /> <span data-i18n="title_period_end">Date end</span> 
                                        <input type="text" id="to" name="to" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" /> 
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
                            	<th data-i18n="title_time">Time</th>					          
                                <th data-i18n="title_device_name">Device Name</th>
                                 <th >Combustible total usado</th>
                                 <th >Nivel de combustible</th>
                                 <th >Velocidad de motor</th>
                                 <th >Horas totales de motor funcionando</th>
                                       
                                <!--<th data-i18n="title_name_attribute">Type</th>-->                                                                          
                               <!-- <th >Velocidad</th>-->                             	                                                                                                                                         
                            </tr>
                        </thead>
                    </table>
                    <figure class="highcharts-figure">
					    <div id="container"></div>
                        <img id="image"/>
					    <p class="highcharts-description">
					        <!--aqui puede ir texto-->
					    </p>
					</figure>	
                    </div>
                    
                    <div id="tab_fms2" class="tab-pane fade">
							    <form id="form_report2" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     
    					    <div class="form-group">
			                    <label style="font-weight:normal"  data-i18n="title_device">Device</label>
			                    <select class="select-search" id="deviceId2" name="deviceId2" multiple="multiple">											                    											                    											                    
					                    <option value=""  data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>
						    <div class="row">
					            <div class="col-md-4">                                                       
						            <div class="form-group">
							            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                        <input type="text" id="from2" name="from2" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" /> <span data-i18n="title_period_end">Date end</span> 
                                        <input type="text" id="to2" name="to2" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" /> 
						            </div>
						        </div>
                            </div>									                                                                                                                                                      
																			   
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary" name="btnGenerate2"><span data-i18n="button_generate">Generate</span><i class="icon-arrow-right14 position-right"></i></button>
                                &nbsp; &nbsp; &nbsp;
							    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
                            </div>                                                                                            
                    </form>
                    
                    <hr />
                    
				    <table class="table datatable-js" id="datatable2">
                        <thead>
                            <tr>                   
                            	<th data-i18n="title_time">Time</th>					          
                                <th data-i18n="title_device_name">Device Name</th>
                                 <th >Relay state 1</th>
                                 <th >Relay state 2</th>
                                 <th >Relay state 3</th>
                                 <th >Relay state 4</th>
                                 <th >Relay state 5</th>
                                 <th >Relay state 6</th>
                                 <th >Relay state 7</th>
                                 <th >Relay state 8</th>
                                 
                                       
                                <!--<th data-i18n="title_name_attribute">Type</th>-->                                                                          
                               <!-- <th >Velocidad</th>-->                             	                                                                                                                                         
                            </tr>
                        </thead>
                    </table>
                    <figure class="highcharts-figure">
					    <div id="container"></div>
                        <img id="image"/>
					    <p class="highcharts-description">
					        <!--aqui puede ir texto-->
					    </p>
					</figure>	
	</div>
    
                            <div id="tab_fms3" class="tab-pane fade">
							    <form id="form_report3" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     
    					    <div class="form-group">
			                    <label style="font-weight:normal"  data-i18n="title_device">Device</label>
			                    <select class="select-search" id="deviceId3" name="deviceId3" multiple="multiple">											                    											                    											                    
					                    <option value=""  data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
			                    </select>
		                    </div>
						    <div class="row">
					            <div class="col-md-4">                                                       
						            <div class="form-group">
							            <label for="from" style="font-weight:normal" data-i18n="title_period">Period</label>
                                        <input type="text" id="from3" name="from3" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99" /> <span data-i18n="title_period_end">Date end</span> 
                                        <input type="text" id="to3" name="to3" class="form-control datetimepicker" maxlength="20" placeholder=""  data-mask="99/99/9999 99:99:99" /> 
						            </div>
						        </div>
                            </div>									                                                                                                                                                      
																			   
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary" name="btnGenerate3"><span data-i18n="button_generate">Generate</span><i class="icon-arrow-right14 position-right"></i></button>
                                &nbsp; &nbsp; &nbsp;
							    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
                            </div>                                                                                            
                    </form>
                    
                    <hr />
                     <div class="table-responsive">
				    <table class="table datatable-js" id="datatable3">
                        <thead>
                            <tr>                   
                            	<th data-i18n="title_time">Time</th>					          
                                <th data-i18n="title_device_name">Device Name</th>
                                 <th >Puerta 1 <br/> Bloqueada<br/> Abierta <br/> Habilitada </th>
                                <th >Puerta 2 <br/> Bloqueada<br/> Abierta <br/> Habilitada </th>
                                <th >Puerta 3 <br/> Bloqueada<br/> Abierta <br/> Habilitada </th>
                                <th >Puerta 4 <br/> Bloqueada<br/> Abierta <br/> Habilitada </th>
                                <th >Puerta 5 <br/> Bloqueada<br/> Abierta <br/> Habilitada </th>
                                 <!--<th >Puerta6<br/>Bloqueada<br/>Abierta<br/>Habilitada</th>
                                 <th >Puerta7<br/>Bloqueada<br/>Abierta<br/>Habilitada</th>
                                 <th >Puerta8<br/>Bloqueada<br/>Abierta<br/>Habilitada</th>
                                 <th >Puerta9<br/>Bloqueada<br/>Abierta<br/>Habilitada</th>
                                 <th >Puerta10<br/>Bloqueada<br/>Abierta<br/>Habilitada</th>-->         	                                                                                                                                         
                            </tr>
                        </thead>
                    </table>
                    </div>
                   <!-- <figure class="highcharts-figure">
					    <div id="container"></div>
                        <img id="image"/>
					    <p class="highcharts-description">
					       
					    </p>
					</figure>-->	
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
    <script src="assets/js/plugins/ui/moment/moment-timezone.js"></script>
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
	
	<!-- datatable export -->	
	<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
	
	<script src="assets/js/apps/general.js"></script>	
	<script src="assets/js/apps/commons/report_fms.js"></script>
	

        	<?php	
	include_once "footer.php";
?>
