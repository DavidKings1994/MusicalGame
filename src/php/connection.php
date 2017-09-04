<?php
class Conexion {
    private $servidor = 'localhost';
    private $usuario = 'root';
    private $contraseña = 'root';
    private $bd = 'guitar_champion';
    private $conexion = null;

    function __construct() {
        $this->conexion = mysqli_connect($this->servidor, $this->usuario, $this->contraseña, $this->bd)
            or die('No se pudo conectar: ' . mysql_error());
    }

    function __destruct() {
        mysqli_close($this->conexion);
    }

    function GetConexion() {
        return $this->conexion;
    }

    function CrearConexion() {
        $this->conexion = mysqli_connect($this->servidor, $this->usuario, $this->contraseña, $this->bd)
            or die('No se pudo conectar: ' . mysql_error());
    }

    function CerrarConexion() {
        mysqli_close($this->conexion);
    }
}
?>
