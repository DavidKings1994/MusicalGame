define(['bootstrap', './game/game'],  function(Bootstrap, Game) {
    $('#game').initGame({
        numberOfPlayers: 1,
        windowHeight: 600,
        windowWidth: 800
    });

    $('#saveConfig').click(function() {
        
    });
});
