<?php	
	include_once "header.php";
?>
	<!-- datatables buttons-->
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">					

			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="title_permission_geofences">Permission Geofences</h3>
					<div class="panel panel-headline">
						<div class="panel-body">
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="title_data">Data</a></li>							  
							  <li><a data-toggle="tab" href="#tab_list" data-i18n="title_list">List</a></li>
							</ul>						
							<div class="tab-content">
							  <div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                					     
                					    <div class="form-group">
						                    <label style="font-weight:normal" data-i18n="title_geofence">Geofence</label>
						                    <select class="select-search" id="geofenceId" name="geofenceId">											                    											                    											                    
								                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
						                    </select>
					                    </div>

									    <div class="form-group">
						                    <label style="font-weight:normal" data-i18n="title_user">User</label>
						                    <select class="select-search" id="userId" name="userId">											                    											                    											                    
								                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
						                    </select>
					                    </div>                                                                             
																						   
                                        <div class="text-right">
                                            <button type="submit" class="btn btn-primary" name="btnSave"><span  data-i18n="button_save">Save</span><i class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
										    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span  data-i18n="button_clear">Clear</span> </button>                                                           
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
	                         	<div class="row">
							    	<div class="col-md-4">
										<div class="form-group">
						                    <label style="font-weight:normal" data-i18n="title_search_user">Search User</label>
						                    <select class="select-find" id="userIdFind" name="userIdFind">											                    											                    											                    
								                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
						                    </select>
					                    </div>
					                </div>
					            </div>
					            <hr />
                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                            <th data-i18n="title_list_id">ID</th>					          
                                            <th data-i18n="title_name">Name</th>
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
	<script src="assets/js/apps/commons/pgeofences.js"></script>
	
          <?php	
	include_once "footer.php";
?>