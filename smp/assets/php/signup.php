<?php 

    $ign = $_POST['ign'] . PHP_EOL;
    $dcn = $_POST['dcn'] . PHP_EOL;

    file_put_contents("../database/ign.txt", $ign, FILE_APPEND | LOCK_EX);
    file_put_contents("../database/dcn.txt", $dcn, FILE_APPEND | LOCK_EX);
?>