define(['./song'],  function(Song) {

    var Player = function(parameters) {
        this.index = parameters.index;
        this.song = new Song(parameters.songPath);
        this.streak = 0;
        this.powerUp = 0;
        var geometry = new THREE.BoxGeometry( 4, 0.5, 13 );
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.x = this.index * 5;
    };

    Player.prototype = {
        constructor: Player,

        update: function() {
            this.song.update();
        },

        render: function() {

        }
    };

    return Player;
});
