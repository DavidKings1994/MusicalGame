define(['bootstrap', './game/game'],  function(Bootstrap, Game) {

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
        $('#game').empty();
        $('#game').initGame({
            numberOfPlayers: 1,
            windowHeight: 600,
            windowWidth: 800,
            mode: 'record'
        });
        $("#startMenu").hide();
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
