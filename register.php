
<!doctype html>
<html lang="en" class="fullscreen-bg">

<head>
	<title></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- CSS -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/vendor/icon-sets.css">
	<link rel="stylesheet" href="assets/css/main.css">
	<!-- FOR DEMO PURPOSES ONLY. You should remove this in your project -->
	<link rel="stylesheet" href="assets/css/style.css">
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
	<!-- ICONS -->
	<link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon.png">
	<style>
		
		#div {
			width:200px;
			height:100px;
			overflow: auto;
			
			}
		
	</style>
</head>

<body>
	<!-- WRAPPER -->
	<div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle">
				<div class="auth-box ">
					<div class="left">
					
						<div class="content">
						<div class="row text-center" style="padding-bottom: 15px">
						<a href="" class="logo">
						<img src="assets/img/logo.png" width="200px"/>
									</a>
					</div>
							<form id="form_data" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
								<input type="text" id="id" name="id" style="display: none">
            					     
            					    <div class="form-group">
									    <label for="name" style="font-weight:normal" data-i18n="title_name">Name</label>
										<input type="text" id="name" name="name" class="form-control" maxlength="80" placeholder="" />
								    </div>
								    
								    <div class="form-group">
									    <label for="name" style="font-weight:normal">Email</label>
										<input type="text" id="email" name="email" class="form-control" maxlength="120" placeholder="" />
								    </div>
																	   
								    <div class="form-group">
									    <label for="password" style="font-weight:normal" data-i18n="title_password">Password</label>
										<input type="password" id="password" name="password" class="form-control" maxlength="20" placeholder="" />
								    </div>
								    
									<div class="form-group clearfix">
										<label class="fancy-checkbox element-left">
											<input type="checkbox" id="terms" name="terms" value="accepted">
											<span data-i18n="register_title_i_read_terms">I read and agree terms.</span>
										</label>
									</div>																								    
																	   
                                    <div class="text-right">
                                        <button type="submit" class="btn btn-primary" name="btnSave"><span data-i18n="button_save">Save</span><i class="icon-arrow-right14 position-right"></i></button>
                                        &nbsp; &nbsp; &nbsp;
									    <button class="btn" type="button" name="btnBack"> <i class="icon-undo bigger-110"></i> <span data-i18n="button_back">Back</span> </button>                                                           
                                    </div> 
                                    
							</form>
						</div>
					</div>
					<div class="right">
												
						<div class="overlay"></div>
						<div class="content text"><br />
							<h1 class="heading" data-i18n="register_title_terms">I read and agree terms.</h1><br />															
							<p align="justify">
								<div  id="eula" style="overflow:scroll; height: 390px; width:auto">&nbsp;</div>
							</p>	
							
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
		
	<!-- END WRAPPER -->
	<script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
	<script src="assets/js/bootstrap/bootstrap.min.js"></script>
	<script src="assets/js/plugins/toastr/toastr.min.js"></script>	
	<script src="assets/js/klorofil.min.js"></script>
	<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="assets/js/plugins/tables/datatables/extensions/responsive.min.js"></script>
	<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>	
	<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
	<script src="assets/js/plugins/ui/moment/moment.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/plugins/underscore-min.js"></script>
	<script src="assets/js/apps/i8n.js"></script>
	
	<script src="assets/js/apps/general.js"></script>	
	<script src="assets/js/apps/commons/register.js"></script>
</body>

</html>
