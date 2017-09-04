<?php
    session_start();
    if (!isset($_SESSION['idPlayer'])) {
        header("Location: ./landing.php");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <!-- src/index.html -->
        <meta charset="utf-8">
        <title>Guitar Champion</title>
        <link rel="shortcut icon" type="image/x-icon" href="img/guitar-icon.png"/>

        <!--[htmlclean-protect]-->
        <!-- inject:css -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">Guitar champion</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Juego</a></li>
                    <li><a href="#">Ranking</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#configurations">Configuracion</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="./php/logout.php"><span class="glyphicon glyphicon-log-out"></span> Cerrar sesion</a></li>
                </ul>
            </div>
        </nav>
        <div class="screen content-fluid">
            <div class="options col-md-6 offset-md-3">
                <ul>
                    <li class="option">
                        Play
                    </li>
                    <li class="option">
                        Multiplayer
                    </li>
                    <li class="option">
                        Options
                    </li>
                </ul>
            </div>
        </div>
        <div id="game">

        </div>
        <!-- Modal -->
        <div id="configurations" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                        <p>Some text in the modal.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" id="saveConfig">Guardar</button>
                    </div>
                </div>

            </div>
        </div>
        <!--[htmlclean-protect]-->
        <!-- inject:js -->
        <!-- endinject -->
        <!--[/htmlclean-protect]-->
    </body>
</html>
