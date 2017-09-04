<?php
include_once  './../connection.php';
$conexion = new Conexion();

if(isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'selectSong': {
            break;
        }
        case 'createSong': {
            break;
        }
    }
}
?>
