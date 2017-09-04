<?php
	include_once  'connection.php';
	$conexion = new Conexion();
	$resul = mysqli_query($conexion->GetConexion(), "CALL Login('".$_POST["email"]."', '".sha1($_POST["pass"])."')");
	if(!$resul) {
		echo "CALL failed: (" . $link->errno . ") " . $link->error;
	}
	if(mysqli_num_rows($resul) == 1) {
		$row = mysqli_fetch_assoc($resul);
        session_start();
		$_SESSION['idPlayer'] = $row["idPlayer"];
        $_SESSION['name'] = $row["name"];
        $_SESSION['mail'] = $row["mail"];
		header("Location: ./../index.php");
	} else {
		header("Location: ./../landing.php");
	}
	exit;
?>
