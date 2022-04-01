<?php
session_start();
ini_set("display_errors","0");
include_once "conf.php";

$_SESSION["GOOGLE_KEY"] = $google_key;

$return = null;
$return->server = $traccar_host;
$return->googlekey = $google_key;

echo json_encode($return);

?>
