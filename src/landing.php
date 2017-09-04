<?php
    session_start();
    if (isset($_SESSION['idPlayer'])) {
        header("Location: ./index.php");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Bienvenido</title>
        <link rel="shortcut icon" type="image/x-icon" href="img/guitar-icon.png"/>

        <!--[htmlclean-protect]-->
        <!-- inject:css -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
    </head>
    <body>
        <div class="content">
            <div class="row">
                <div id="registro" class="col-md-6">
                    <form class="form-horizontal" action="./php/controllers/PlayerController.php" method="post" enctype="multipart/form-data">
                        <input type="hidden" name="action" value="registro">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="name">Nombre:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Nombre de usuario" required maxlength="45">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="email">Correo:</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Correo electronico" required maxlength="100">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="pass">Contraseña:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="pass" name="pass" placeholder="Contraseña" required maxlength="45">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="pass2">Confirmar contraseña:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="pass2" name="pass2" placeholder="Contraseña" required maxlength="45">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-success">Registrarse</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="login" class="col-md-6">
                    <form class="form-horizontal" action="./php/login.php" method="post">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="email">Correo:</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Correo electronico" required maxlength="100">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="pass">Contraseña:</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="pass" name="pass" placeholder="Contraseña" required maxlength="45">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-success">Iniciar sesion</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--[htmlclean-protect]-->
        <!-- inject:js -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
    </body>
</html>
