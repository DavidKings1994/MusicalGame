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

        <!-- Menu de inicio -->
        <div id="startMenu" class="screen content-fluid">
            <div class="options col-md-6 offset-md-3">
                <div class="well well-lg">
                    <div class="page-header">
                        <h1>Menu inicial</h1>
                    </div>
                    <button type="button" id="btnPlay" class="btn btn-success btn-lg btn-block">Jugar</button>
                    <button type="button" id="btnRecord" class="btn btn-success btn-lg btn-block">Grabar cancion</button>
                    <button type="button" id="btnMultiplayer" class="btn btn-success btn-lg btn-block">Multijugador</button>
                    <input type="file" id="uploadSong" name="song" accept=".mp3">
                </div>
            </div>
        </div>

        <!-- Menu de pausa -->
        <div id="pauseMenu" class="screen content-fluid">
            <div class="options col-md-6 offset-md-3">
                <div class="well well-lg">
                    <div class="page-header">
                        <h1>Menu de pausa</h1>
                    </div>
                    <button type="button" id="btnContinue" class="btn btn-success btn-lg btn-block">Continuar</button>
                    <button type="button" id="btnExit" class="btn btn-success btn-lg btn-block">Salir</button>
                </div>
            </div>
        </div>

        <!-- Pantalla de juego -->
        <div id="game">

        </div>

        <!-- Lista de canciones -->
        <div id="songList">
            <div class="panel panel-primary">
                <div class="panel-heading">Lista de canciones</div>
                <div class="panel-body">
                    <div class="list-group">
                        <a href="#game" class="list-group-item" data-toggle="tooltip" title="Cancion facil" data-placement="left">
                            <div class="media">
                                <div class="media-left">
                                    <img src="img/easy.png" class="media-object" style="width:60px">
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">Titulo de la cancion</h4>
                                    <p>creada por tal persona en tal fecha</p>
                                </div>
                            </div>
                        </a>
                        <a href="#game" class="list-group-item" data-toggle="tooltip" title="Cancion intermedia" data-placement="left">
                            <div class="media">
                                <div class="media-left">
                                    <img src="img/medium.png" class="media-object" style="width:60px">
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">Titulo de la cancion</h4>
                                    <p>creada por tal persona en tal fecha</p>
                                </div>
                            </div>
                        </a>
                        <a href="#game" class="list-group-item" data-toggle="tooltip" title="Cancion dificil" data-placement="left">
                            <div class="media">
                                <div class="media-left">
                                    <img src="img/hard.png" class="media-object" style="width:60px">
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">Titulo de la cancion</h4>
                                    <p>creada por tal persona en tal fecha</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de configuraciones -->
        <div id="configurations" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Opciones</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="email">Volumen:</label>
                            <input type="range" class="form-control" name="volume" min="0" max="100">
                        </div>
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
