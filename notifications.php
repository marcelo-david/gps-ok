<?php	
	include_once "header.php";
?>

<!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
			<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">	
            
            
				<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<h3 class="page-title" data-i18n="title_notifications">Notifications</h3>
					<div class="panel panel-headline">
						<div class="panel-body">							
							<ul class="nav nav-tabs">
							  <li class="active"><a data-toggle="tab" href="#tab_form" id="pane_form" data-i18n="mnu_events">Event</a></li>				  
							  <li><a data-toggle="tab" href="#tab_alarm" id="alarm" data-i18n="title_alarm">Alarmas</a></li>
                              <li><a data-toggle="tab" href="#tab_mobileye" id="mobileye" data-i18n="notifications_mobileye">Mobileye</a></li>	
                             
							</ul>
                            
                            						
					<div class="tab-content">
                            
						<div id="tab_form" class="tab-pane fade in active">
							    <form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                                <table class="table datatable-js" id="datatable">
		                            <thead>
			                            <tr>
                                           <th data-i18n="title_type_notifications">Type of Notification</th>					          
	                                            <th data-i18n="title_sendviaweb">Send via Web</th>
	                                            <th data-i18n="title_sendviamail">Send via Mail</th>                                                                              
												<th data-i18n="title_sendviasms">Send via SMS</th>                                                                              
												<th data-i18n="title_sendviafirebase">Send via Push</th> 
                                                <th data-i18n="title_sendviatelegram">Send via Telegram</th>                                                             
                                        </tr>
		                            </thead>
	                            </table>
                                                                                                                                                               
			                    </form>	
							  </div>
                              
                         	
                            <div id="tab_alarm" class="tab-pane fade">
							    <form id="form_alarm" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                                <table class="table datatable-js" id="datatable1">
		                            <thead>
			                            <tr>
                                           <th data-i18n="title_type_notifications">Type of Notification</th>					          
	                                            <th data-i18n="title_sendviaweb">Send via Web</th>
	                                            <th data-i18n="title_sendviamail">Send via Mail</th>                                                                              
												<th data-i18n="title_sendviasms">Send via SMS</th>                                                                              
												<th data-i18n="title_sendviafirebase">Send via Push</th> 
                                                <th data-i18n="title_sendviatelegram">Send via Telegram</th>                                                             
                                        </tr>
		                            </thead>
	                            </table>
                                                                                                                                                            
			                    </form>	
							  </div>
                              
                                 <div id="tab_mobileye" class="tab-pane fade">
							    <form id="form_mobileye" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                                <table class="table datatable-js" id="datatable2">
		                            <thead>
			                            <tr>
                                           <th data-i18n="title_type_notifications">Type of Notification</th>					          
	                                            <th data-i18n="title_sendviaweb">Send via Web</th>
	                                            <th data-i18n="title_sendviamail">Send via Mail</th>                                                                              
												<th data-i18n="title_sendviasms">Send via SMS</th>                                                                              
												<th data-i18n="title_sendviafirebase">Send via Push</th> 
                                                <th data-i18n="title_sendviatelegram">Send via Telegram</th>                                                             
                                        </tr>
		                            </thead>
	                            </table>                                                                                                                  
			                    </form>	
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
	<script src="assets/js/plugins/forms/styling/switchery.min.js"></script>
	<script src="assets/js/plugins/forms/styling/switch.min.js"></script>
		            	
	<script src="assets/js/apps/general.js"></script>			
	<script src="assets/js/apps/commons/notifications.js"></script>
	

        	          <?php	
	include_once "footer.php";
?>
