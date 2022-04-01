
<!doctype html>
<html lang="es" class="fullscreen-bg">

<head>
	<title></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<!-- CSS -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/vendor/icon-sets.css">
	<link rel="stylesheet" href="assets/css/main.min.css">
	<!-- FOR DEMO PURPOSES ONLY. You should remove this in your project -->
	<link rel="stylesheet" href="assets/css/style.css">
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
	<!-- ICONS -->
	<link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon.png">
</head>

<body>
	<!-- WRAPPER -->
	<div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle">
				<div class="auth-box ">
					<div class="left">
						<div class="content over">							
							<form class="form-auth-small" method="post" action="#" enctype="application/x-www-form-urlencoded" id="form_data">
								<input type="text" id="password" name="password" value="" style="display: none" />
								<div class="form-group">
									<label for="signup-email" class="control-label sr-only">Email</label>
									<input type="email" class="form-control" name="email" id="email" value="" placeholder="Email">
								</div>								
								<div class="form-group clearfix">
									<label class="fancy-checkbox element-left">										
									</label>
								</div>
								<button type="button" name="btnRecover" onclick="return false;" class="btn btn-primary btn-lg btn-block" data-i18n="recover_btn_recover">RECOVER</button>
								<button type="button" name="btnBack" onclick="return false;" class="btn btn-success btn-lg btn-block" data-i18n="recover_btn_back">BACK</button>								
								<div class="bottom">
									
								</div>
							</form>
						</div>
					</div>
					<div class="right">
						<div class="overlay"></div>
						<div class="content text">
							<h1 class="heading" data-i18n="recover_message">Recuperar Senha.</h1>
							<p data-i18n="recover_sub_message">Digite seu email e uma nova senha de acesso ser&aacute; enviado para seu email cadastrado!</p>
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
	<script src="assets/js/plugins/jquery.gen.password.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
	<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
	<script src="assets/js/apps/i8n.js"></script>
	<script src="assets/js/plugins/underscore-min.js"></script>
			
	<script src="assets/js/apps/general.js"></script>
	<script src="assets/js/apps/commons/recover.js"></script>
</body>

</html>
