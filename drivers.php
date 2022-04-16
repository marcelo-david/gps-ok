<?php	
	include_once "header.php";
?>
<!-- datatables buttons-->
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css"/>	
            	<!-- Bootstrap Material Datetime Picker Css -->
	<link href="assets/js/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />		
    
    	<!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">		

			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="title_rfid">Motoristas</h3>
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
													<img id="preview_photo" src="#" title="Clic para agregar una foto."/>
													<input type="file" id="fileUpload" value="" style="height:65px; "/>
												</div>
											</div>
                                             </div>
										 </div>
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                             <div class="row">
                                            
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										    <label for="name" style="font-weight:normal" data-i18n="title_name">Nome</label>
											<input type="text" id="name" name="name" class="form-control" maxlength="20" placeholder="" />
                                          </div>
									        </div>
                                            
                                            
                                              
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										     <label for="description" style="font-weight:normal" data-i18n="title_description">Description</label>
											<input type="text" id="description" name="description" class="form-control" maxlength="20" placeholder="" />
									    
                                          </div>
									        </div>
                                            
                                            
                                            <div class="col-md-3">                                                       
									        <div class="form-group">
										      <label for="uniqueId" style="font-weight:normal" data-i18n="title_number_rfid">Drivers</label>
                                            <input type="text" id="uniqueId" name="uniqueId" class="form-control" maxlength="20" placeholder="" />
											<!--<textarea id="uniqueId" name="uniqueId" class="form-control" maxlength="20" rows="4"></textarea>-->
                                          </div>
									        </div>
                                            
                                            
                                            
                                              
                                            <div class="col-md-3">                                                       
									        <div class="form-group">
										       <label for="licence" style="font-weight:normal" data-i18n="title_licence">Licence</label>
											<input type="text" id="licence" name="licence" class="form-control" maxlength="20" placeholder="" />
									    
                                          </div>
									        </div>
                                            
                                               
                                            <div class="col-md-2">                                                       
									        <div class="form-group">
										        <label for="licencetype" style="font-weight:normal" data-i18n="title_licence_type">Type</label>
											<input type="text" id="licencetype" name="licencetype" class="form-control" maxlength="20" placeholder="" />
									   
                                          </div>
									        </div>
                                            
                                            
                                        </div>  
                                        
                                        
                                         <div class="row">
					                    
                                           
                                            
                                               <div class="col-md-2">                                                       
									        <div class="form-group">
										         <label for="antiquity" style="font-weight:normal" data-i18n="title_licence_antiquity">Antiquity</label>
											<input type="text" id="antiquity" name="antiquity" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999" />
									   
                                          </div>
									        </div>
                                            
                                            
                                            
                                               <div class="col-md-2">                                                       
									        <div class="form-group">
										        <label for="licencestar" style="font-weight:normal" data-i18n="title_licence_start_date">Licence start date</label>
											<input type="text" id="licencestar" name="licencestar" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999" />
									    
                                          </div>
									        </div>
                                            
                                            
                                            
                                            
                                             <div class="col-md-3">                                                       
									        <div class="form-group">
										       <label for="licenceend" style="font-weight:normal" data-i18n="title_licence_end_date">Licece end date</label>
											<input type="text" id="licenceend" name="licenceend" class="form-control datetimepicker" maxlength="20" placeholder="" data-mask="99/99/9999" />
									   
                                          </div>
									        </div>
                                            
                                            
                                            
                                              <div class="col-md-3">                                                       
									        <div class="form-group">
										       <label for="nationality" style="font-weight:normal" data-i18n="title_licence_nationality">Nationality</label>
											<input type="text" id="nationality" name="nationality" class="form-control" maxlength="20" placeholder="" />
									    
                                          </div>
									        </div>
                                            
                                            
                                            
                                              <div class="col-md-2">                                                       
									        <div class="form-group">
										       <label for="rfc" style="font-weight:normal" data-i18n="title_licence_driver_rfc">RFC</label>
											<input type="text" id="rfc" name="rfc" class="form-control" maxlength="20" placeholder="" />
									    
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
							    
							    <div class="panel-heading">							                            
		                            <div class="heading-elements">
			                            <ul class="icons-list">
        		                            <li><a data-action="reload" name="lnkRefreshGrid" title="Atualizar"></a></li>
        	                            </ul>
    	                            </div>
	                         </div>

                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                            <th data-i18n="title_list_id">ID</th>  
                                             <th>Foto</th>                                          		         
                                            <th data-i18n="title_name">Name</th> 
                                            <th data-i18n="title_description">Description</th> 
                                            <th data-i18n="title_number_rfid">Drivers</th>   
                                            <th data-i18n="title_licence">Licence</th>
                                            <!--<th data-i18n="title_licence_driver_rfc">RFC</th>-->
                                            <!--<th data-i18n="title_licence_type">Licence type</th> 
                                            <!--<th data-i18n="title_licence_antiquity">
                                            <!--<th data-i18n="title_licence_nationality">Nationality</th>   --> 
                                            <th data-i18n="title_licence_start_date">Start date</th>
                                            <th data-i18n="title_licence_end_date">End date</th>                                                                                                                                                                                             
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
	<script src="assets/js/klorofil.min.js"></script>
	<script src="assets/js/plugins/ui/moment/moment.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
	<!-- datatable export -->	
    <script src="assets/js/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>	   
	<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
	<script type="text/javascript" src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
	<script type="text/javascript" src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
	<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/apps/i8n.js"></script>
	            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/drivers.js"></script>
	          <?php	
	include_once "footer.php";
?>