<?php
$file = $_SERVER["DOCUMENT_ROOT"].$_POST["prefix"].'assets/img/logo.jpg';
$handle = fopen($file, 'w') or die('Cannot open file');
$data = $_REQUEST["logo"];
fwrite($handle, $data);
fclose($handle);
?>