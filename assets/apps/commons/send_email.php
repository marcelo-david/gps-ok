<?php

ini_set("display_errors",1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../lib/PHPMailer/Exception.php';
require '../../lib/PHPMailer/PHPMailer.php';
require '../../lib/PHPMailer/SMTP.php';

//PHPMailer Object
$mail = new PHPMailer;

//Enable SMTP debugging. 
$mail->SMTPDebug = 0;                               
$mail->Debugoutput = 'html';

//Set PHPMailer to use SMTP.
$mail->isSMTP(); 

//Set SMTP host name                          
echo $mail->Host 		= $_POST["smtp_server"];
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth 	= $_POST["smtp_auth"];                          
//Provide username and password     
$mail->Username 	= $_POST["smtp_username"];                 
$mail->Password 	= $_POST["smtp_password"];                           
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure 	= $_POST["smtp_ssl"];                           
//Set TCP port to connect to 
$mail->Port 		= (int)$_POST["smtp_port"];;                           

//From email address and name
$mail->setFrom($_POST["smtp_username"], $_POST["from_name"]);

//To address and name
$mail->addAddress($_POST["to"]); //Recipient name is optional

//Address to which recipient will reply
//$mail->addReplyTo($_POST["from"], "Reply");

//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = $_POST["subject"];;
$mail->Body = $_POST["body"];;

if(!$mail->send()) {
    echo "Error:Message not has been sent successfully: <br />". $mail->ErrorInfo;
} else {
    echo "Success: Message has been sent successfully";
}

?>