<?php	
	include_once "header.php";
?>
<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="title_share">Share Devices</h3>
					<div class="panel panel-headline">
						<div class="panel-body">
							
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="title_data">Data</a></li>							  							  
							</ul>						
							<div class="tab-content">
							  <div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                					     
                					    <div class="form-group">
						                    <label style="font-weight:normal" data-i18n="title_device">Device</label>
						                    <select class="select-search" id="deviceId" name="deviceId">											                    											                    											                    
								                    <option value="" data-i18n="title_select2">Selecione uma op&ccedil;&atilde;o...</option>											                    
						                    </select>
					                    </div>

									    <div class="form-group">
						                    <label style="font-weight:normal" data-i18n="title_user">User</label>
						                    <input type="text" id="email" name="email" class="form-control" maxlength="150" placeholder="" />
						                    <span style="font-size: 11px">*Email del usuario a compartir el dispositivo</span>
					                    </div>                                                                             
																						   
                                        <div class="text-right">
                                            <button type="submit" class="btn btn-primary" name="btnPrepareSave"><span data-i18n="button_save">Save</span><i class="icon-arrow-right14 position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
                                            <button type="btn" class="btn btn-danger" name="btnDelete"><span data-i18n="button_delete">Delete</span><i class="icon-eraser position-right"></i></button>
                                            &nbsp; &nbsp; &nbsp;
										    <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
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
	<script type="text/javascript" src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
	<script type="text/javascript" src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
	<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/apps/i8n.js"></script>
	<script src="assets/js/plugins/yspeed.js"></script>		
	<script src="assets/js/plugins/underscore-min.js"></script>
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/share.js"></script>
	

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
            <p><span class="text-custom" data-i18n="login_message">Message</span><span class="text-custom" data-i18n="mnu_toggle_contact_help">Help</span></p>
            </div>
