define(['bootstrap', 'howler', './game/game'],  function(Bootstrap, Howler, Game) {

    $("#pauseMenu").hide();
    $('[data-toggle="tooltip"]').tooltip();

    $('#btnPlay').click(function() {
        $('#game').empty();
        $('#game').initGame({
            numberOfPlayers: 1,
            windowHeight: 600,
            windowWidth: 800,
            mode: 'play'
        });
        $("#startMenu").hide();
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
                var id = sound.play();
                sound.fade(0, 1, 1000, id);
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
