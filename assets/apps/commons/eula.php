<?php

  
 /*******************
  * gravar eula
  *******************/

ini_set("display_errors",0);

file_put_contents("../../../eula.txt", $_REQUEST["term"] . PHP_EOL);

echo "OK";

?>