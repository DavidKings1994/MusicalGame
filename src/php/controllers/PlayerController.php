<?php
include_once  './../connection.php';
$conexion = new Conexion();

if(isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'registro': {
            if ($_POST['pass'] == $_POST['pass2']) {
                $query = mysqli_prepare($conexion->GetConexion(), "CALL signIn(?,?,?)");
                $pass = sha1($_POST['pass']);
                $query->bind_param('sss',
                    $_POST['name'],
                    $_POST['email'],
                    $pass
                );
                if($query->execute()) {
                    $conexion->CerrarConexion();
                    $conexion->CrearConexion();
                    $query2 = mysqli_prepare($conexion->GetConexion(), "CALL logIn(?,?)");
                    $query2->bind_param('ss',
                        $_POST['email'],
                        $pass
                    );
                    $row = mysqli_fetch_assoc($query2->execute());
                    session_start();
            		$_SESSION['idPlayer'] = $row["idPlayer"];
                    $_SESSION['name'] = $row["name"];
                    $_SESSION['mail'] = $row["email"];
                    header("Location: ./../../index.php");
                }
            } else {
                header("Location: ./../../landing.php");
            }
            break;
        }
    };
}
?>
