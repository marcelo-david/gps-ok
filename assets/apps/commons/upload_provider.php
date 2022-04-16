<?php


ini_set("display_errors",0);

$option = $_REQUEST["option"];

if ($option == "profile") {

	if (isset($_FILES["file"]["name"]) && $_FILES["file"]["error"] == 0){

		$arquivo_tmp 	= $_FILES[ 'file' ][ 'tmp_name' ];
		$nome 			= $_FILES[ 'file' ][ 'name' ];

		$extensao=strtolower(pathinfo($nome,PATHINFO_EXTENSION));

		$destino = $_SERVER['DOCUMENT_ROOT'].$_REQUEST["prefix"].'assets/img/users/'.$_REQUEST["userid"].'.'.$extensao;

		if (move_uploaded_file($arquivo_tmp, $destino)) {
			echo "0";
		} else {
			echo "1";
		}

	

	}

}

?>