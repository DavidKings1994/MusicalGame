define(['./game/game'],  function(Game) {
    $('#game').initGame({
        numberOfPlayers: 1,
        windowHeight: 600,
        windowWidth: 800
    });
});
