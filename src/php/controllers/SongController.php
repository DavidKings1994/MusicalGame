<?php
include_once  './../connection.php';
include_once  './../templates/songListItem.php';
$conexion = new Conexion();

if(isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'songList': {
            $resul = mysqli_query($conexion->GetConexion(), "CALL songList()");
            $songs = array();
            while($row = mysqli_fetch_assoc($resul)) {
                $songs[] = $row;
            }
            echo createSongList($songs);
            break;
        }
        case 'getSongChords': {
            $query = mysqli_prepare($conexion->GetConexion(), "CALL getSongChords(?)");
            $query->bind_param('i', $_POST['idSong']);
            if ($query->execute()) {
                $query->bind_result($chords);
                if ($query->fetch()) {
                    echo $chords;
                } else {
                    $query->error;
                }
            } else {
                $query->error;
            }
            break;
        }
        case 'createSong': {
            $allow = array("mp3");
            $todir = $_SERVER['DOCUMENT_ROOT'].'/assets/music/';
            if (!is_dir($todir)) {
                mkdir($todir, 0755, true);
            }
            $fileError = $_FILES['song']['error'];
            if($fileError == UPLOAD_ERR_OK) {
                if ( !!$_FILES['song']['tmp_name'] ) {
                    $info = explode('.', strtolower( $_FILES['song']['name']) );
                    if ( in_array( end($info), $allow) ) {
                        $milliseconds = round(microtime(true) * 1000);
                        $info = pathinfo($_FILES['song']['name']);
                        $ext = $info['extension'];
                        $newname = $milliseconds.".".$ext;
                        if ( move_uploaded_file( $_FILES['song']['tmp_name'], $todir . $newname ) ) {
                            session_start();
                            $songPath = './assets/music/' . $newname ;
                            $query = mysqli_prepare($conexion->GetConexion(), "CALL createSong(?,?,?,?,?)");
                            $query->bind_param('sisss',
                                $_POST['name'],
                                $_SESSION['idPlayer'],
                                $_POST['chords'],
                                $_POST['dificulty'],
                                $songPath
                            );
                            if($query->execute()) {
                                echo "Cancion lista!";
                            } else {
                                echo $query->error;
                            }
                        } else {
                            echo "No se pudo mover el archivo";
                        }
                    } else {
                        echo "formato no aceptado";
                    }
                } else {
                    echo "La cancion no se ha subido correctamente";
                }
            } else {
                echo "Ha ocurrido un error al subir la cancion";
            }
            break;
        }
        default: {
            echo "Accion no valida";
        }
    }
}
?>
