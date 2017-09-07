<?php
    function createSongList($songs) {
        $list = '<div class="list-group">';
        foreach ($songs as $song) {
            $dificulty = '';
            switch ($song['dificulty']) {
                case 'EASY': {
                    $dificulty = "facil";
                    break;
                }
                case 'MEDIUM': {
                    $dificulty = "interemedia";
                    break;
                }
                case 'HARD': {
                    $dificulty = "dificil";
                    break;
                }
            }
            $list .= '
            <a href="#game" class="list-group-item" data-toggle="tooltip" data-idSong="' . $song['idSong'] . '" data-path="' . $song['path'] . '" title="Canción ' . $dificulty . '" data-placement="left">
                <div class="media">
                    <div class="media-left">
                        <img src="img/' . strtolower($song['dificulty']) . '.png" class="media-object" style="width:60px">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">' . $song['songName'] . '</h4>
                        <p>Creada por ' . $song['creatorName'] . '</p>
                    </div>
                </div>
            </a>';
        }
        $list .= '</div>';
        return $list;
    }
?>
