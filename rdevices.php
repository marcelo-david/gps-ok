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
	 <!-- graficas -->
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/data.js"></script>
	<script src="https://code.highcharts.com/modules/drilldown.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
    
    	<style type="text/css">
		
		.highcharts-figure, .highcharts-data-table table {
		    min-width: 450px; 
		    max-width: 800px;
		    margin: 1em auto;
		}

		#container {
		    height: 850px;
            width: 850px;
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
		    padding: 0.5em 0;
		    
            font-size: 0.5em;
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
			<h3 class="page-title" data-i18n="title_reports_devices">Report Devices</h3>
			<div class="panel panel-headline">
				<div class="panel-body">					
					<div class="tab-content">							  
					    <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					         					    
							<div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_disabled">Disabled</label>
			                    <select class="select-search" id="disabled" name="disabled">
					                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>
										<option value="yes" data-i18n="title_yes">Yes</option>
										<option value="no" data-i18n="title_no">No</option>
										<option value="all" data-i18n="title_all">All</option>
			                    </select>
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
								<th data-i18n="title_list_id">ID</th>					          
								<th data-i18n="title_name">Name</th>
								<th data-i18n="title_identifier">UniqueId</th>                                                                              
								<th data-i18n="title_group">Group</th>
								<th data-i18n="title_category">Category</th>
								<th data-i18n="title_model">Model</th>
								<th data-i18n="title_phone">Phone</th>                                                               
								<th data-i18n="title_disabled">Disabled</th>                                        
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
    <script src="assets/js/plugins/ui/moment/moment-timezone-with-data.min.js"></script>    
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
	<script src="assets/js/apps/commons/rdevices.js"></script>
	
<?php	
	include_once "footer.php";
?>
