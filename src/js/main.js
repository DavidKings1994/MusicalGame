define(['bootstrap', './game/game'],  function(Bootstrap, Game) {
    
    $('[data-toggle="tooltip"]').tooltip();

    $('#game').initGame({
        numberOfPlayers: 1,
        windowHeight: 600,
        windowWidth: 800
    });

    $('#saveConfig').click(function() {

    });
});
