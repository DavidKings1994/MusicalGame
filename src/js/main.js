define(['bootstrap', 'howler', './game/game'],  function(Bootstrap, Howler, Game) {

    $("#pauseMenu").hide();

    $('#btnPlay').click(function() {
        $("#startMenu").hide();
        $("#songList").show();
        $.ajax({
            url: './php/controllers/SongController.php',
            type: 'POST',
            data: {
                action: 'songList'
            },
            success: function(list) {
                $('#songList .panel-body').empty();
                $('#songList .panel-body').append(list);
                $('[data-toggle="tooltip"]').tooltip();

                $('#songList a').on('mouseenter', function(event) {
                    var self = this;
                    var sound = new Howl({
                        src: [$(this).attr('data-path')],
                        format: ['mp3']
                    });
                    var id = sound.play();
                    sound.fade(0, 1, 2000, id);

                    $(this).on('mouseleave', function() {
                        sound.fade(1, 0, 2000, id).stop(id);
                    });

                    $(this).off('click');
                    $(this).on('click', function() {
                        sound.stop(id);
                        $("#startMenu").hide();
                        $('#songList .panel-body').empty();
                        $("#songList").hide();
                        $('#game').empty();
                        $('#game').initGame({
                            numberOfPlayers: 1,
                            windowHeight: 600,
                            windowWidth: 800,
                            mode: 'play',
                            songPath: $(self).attr('data-path'),
                            idSong: $(self).attr('data-idSong')
                        });
                    });
                });
            }
        });
    });

    $('#btnRecord').click(function() {
        $('#uploadSong').trigger('click');
        $('#uploadSong').on('change', function(event) {
            $('#game').empty();
            $('#game').initGame({
                numberOfPlayers: 1,
                windowHeight: 600,
                windowWidth: 800,
                mode: 'record'
            });
            $("#startMenu").hide();

            var sound = new Howl({
                src: [window.URL.createObjectURL(event.target.files[0])],
                format: ['mp3']
            });

            sound.once('load', function(){
                $(document).trigger('recordStarted');
                sound.play();
            });

            sound.once('end', function(){
                $('#game').empty();
                $("#songForm").show();
            });

            sound.on('loaderror', function(code, message){
                console.log(message);
            });
        });
    });

    $("#saveSong").click(function() {
        window.Game.players[0].song.save(new FormData($("#uploadSongForm")[0]));
        $("#songForm").hide();
        $("#startMenu").show();
    });

    $('#btnMultiplayer').click(function() {
        $('#game').empty();
        $('#game').initGame({
            numberOfPlayers: 2,
            windowHeight: 600,
            windowWidth: 800,
            mode: 'play'
        });
        $("#startMenu").hide();
    });

    $('#saveConfig').click(function() {

    });

    $(document).on('pause', function(){
        $("#pauseMenu").show();
    });

    $(document).on('unpause', function(){
        $("#pauseMenu").hide();
    });

    $('#btnContinue').click(function() {
        $("#pauseMenu").hide();
        $(document).trigger('continue');
    });

    $('#btnExit').click(function() {
        $("#pauseMenu").hide();
        $('#game').empty();
        $("#startMenu").show();
    });
});
