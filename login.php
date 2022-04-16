    <!DOCTYPE html>
    <html>
	<?php
// ini_set("display_errors","0");
header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');
?>
	<head>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    
    <!-- Global stylesheets -->
    <link href="assets/css/bootstrap_login2.css" rel="stylesheet" type="text/css"/>  
    <link href="assets/css/styles_login2.css" rel="stylesheet" type="text/css"/>
    <link href="assets/css/core_login2.css" rel="stylesheet" type="text/css"/>
    <link href="assets/css/components_login2.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="assets/css/style.css"/>

	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet"/>
	<!-- ICONS -->	
	<link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-touch-icon" />
	<link rel="icon" type="image/png" sizes="96x96" href="assets/img/favicon.png" />	
	<link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />

      
	<style>
    .footer {
        position: fixed;
            left: 0;
                bottom: 0;
                width: 100%;
                background-color: #00b132;
                padding: 5px;
                color: #ededed;
                color: white;
                text-align: center;
                }

            .background-outh {
        background: linear-gradient(
     rgba(0, 0, 0, 0.1),
                    rgba(0, 0, 0, 0.1)
            ),

          url(assets/img/logo.gif);
        }
        </style>
    </head>


        <body class="login-container background-outh  pace-done" style="background-size: cover; background-position: center bottom"><div class="pace  pace-inactive"><div class="pace-progress" style="transform: translate3d(100%, 0px, 0px);" data-progress-text="100%" data-progress="99">
        <div class="pace-progress-inner"></div>
    </div>
        <div class="pace-activity"></div></div>


        <!-- Page container -->
        <div class="page-container" style="min-height:NaNpx">

    <!-- Page content -->
    <div class="page-content">
        <!-- Main content -->
        <div class="content-wrapper">
   
    <!-- Simple login form -->
    	<form class="form-auth-small" method="post" action="#" enctype="application/x-www-form-urlencoded" id="form_data">
        <div class="panel panel-body login-form">
            <div class="text-center">
             <div class="row text-center" style="padding-bottom: 15px">
        <a href="" class="logo">
        <img src="assets/img/logo.png" width="295px" height="100px" />
                    </a>
    </div>
                <h5 class="content-group"><small class="display-block">Introduza as suas credenciais</small></h5>
            </div>
            <div class="form-group has-feedback has-feedback-left">
                <input type="text" placeholder="Usuário ou e-mail" name="email" class="form-control" id="email" required="">
                <div class="form-control-feedback">
                    <i class="icon-user text-muted"></i>
                </div>
            </div>
            <div class="form-group has-feedback has-feedback-left">
                <input type="password" placeholder="Senha" name="password" class="form-control" id="password" required="">
                <div class="form-control-feedback">
                    <i class="icon-lock2 text-muted"></i>
                </div>
            </div>
            <div class="form-group clearfix">
                                
									<label class="fancy-checkbox element-left">
										<input type="checkbox" id="remember"/>
										<span data-i18n="login_btn_remember">Lembrar-me</span>
									</label>
								</div>
            
            <div class="form-group">
           <button type="button" name="btnLogin" onclick="return false;" class="btn btn-primary btn-lg btn-block" data-i18n="login_btn_login">ENTRAR</button>
               <!-- <button type="submit" class="btn bg-blue btn-block" data-i18n="login_btn_login">Login<i class="icon-arrow-right14 position-right"></i></button>-->
            </div>
           <div class="bottom">
			 <!--<span><i class="fa fa-lock"></i> <a href="recover.php" data-i18n="login_forgot">Forgot password?</a></span>
			</div>
           <div class="content-divider text-muted form-group">
            <!--<span>Acceso Aplicaciones</span>-->
            </div>
            <ul class="list-inline form-group list-inline-condensed text-center">
             <a id="btnAppleStore" href="#" target="_blank"><img src="assets/img/apple-store.png" class="apple-store" /></a>
								<a id="btnPlayStore"  href="#" target="_blank"><img src="assets/img/play-store.png" class="play-store" /></a>
            </ul>        
            <!-- <button type="button" name="btnRegister" onclick="return false;" class="btn btn-success btn-lg btn-block" data-i18n="login_btn_register">REGISTRAR</button> -->
           </div>
    </form>
    <!-- /simple login form -->
        </div>
        <!-- /Main content -->
    </div>
        </div>
        <div class="footer">
        <span data-i18n="login_message">Rodapé</span>
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
    <script src="assets/js/plugins/jquery.cookie.js"></script>
	<script src="assets/js/apps/general.js"></script>
	<script src="assets/js/apps/commons/login.js"></script>
        </body>
		 </body>
	
		</script>
<!-- WhatsHelp.io widget --><script type="text/javascript">
    (function () {
        var options = {
            facebook: "", // Facebook page ID
            whatsapp: "+558140422454", // WhatsApp number 96061782
            greeting_message: "Olá, posso ajudá-lo? Basta enviar-nos uma mensagem agora para falar com um de nossos atendentes.", // Text of greeting message
            call_to_action: "Clique para falar conosco!", // Call to action
            button_color: "#FF6550", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "facebook,whatsapp,sms,email,call" // Order of buttons
        };
        var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();
</script><!-- /WhatsHelp.io widget -->
<!-- /WhatsHelp.io widget -->

        </html>
