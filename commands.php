<?php	
	include_once "header.php";
?>
	<!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
	
	<!-- datatables buttons-->
	<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">
		
	<!-- MAIN CONTENT -->
	<div class="main-content">
		<div class="container-fluid">
			<h3 class="page-title" data-i18n="mnu_commands">Commandos</h3>
			<div class="panel panel-headline">
				<div class="panel-body">
					
					<div class="tab-content">							  
					    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
    					     
    					    <div class="form-group">
			                    <label style="font-weight:normal" data-i18n="title_device">Dispositivos</label>
			                    <select class="select-search" id="deviceId" name="deviceId">											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma opção...</option>											                    
			                    </select>
		                    </div>
		                    
		                    <div class="form-group">
			                    <label style="font-weight:normal"  data-i18n="title_command">Commando</label>
			                    <select class="select-search" id="type" name="type">											                    											                    											                    
					                    <option value="" data-i18n="title_select2">Selecione uma opção...</option>											                    
			                    </select>
		                    </div>		                    		                    
		                  
						    <div class="form-group" id="custom_command" style="display: none">
							    <label for="name" style="font-weight:normal" data-i18n="title_string">Cordão</label>
								<input type="text" id="custom" name="custom" class="form-control" maxlength="250" placeholder="" />
						    </div>								                                                                                                                                                      
																			   
                            <div class="text-right">
                                <button type="submit" class="btn btn-primary" name="btnSend"><span data-i18n="button_send">Eviar</span><i class="icon-arrow-right14 position-right"></i></button>
                                &nbsp; &nbsp; &nbsp;
							    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Limpar</span> </button>                                                           
                            </div>                                                                                            
                    </form>
                    <hr />
                    
                                        
				    <table class="table datatable-js" id="datatable">
                        <thead>
                            <tr>                                                	                            	
                            	<th data-i18n="title_time">Tempo</th>                                                               
                                <th data-i18n="title_device_name">Nome do dispositivo</th>                                            
                                <th data-i18n="title_result">Resultado</th>
                            </tr>
                        </thead>
                    </table>							  							
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
	<script src="assets/js/apps/commons/commands.js"></script>
	
          <?php	
	include_once "footer.php";
?>