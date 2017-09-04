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
        var hitArea = new THREE.BoxGeometry( 4, 1, 1 );
        var hitMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
        hitMaterial.transparent = true;
        hitMaterial.opacity = 0.3;
        hitMaterial.needsUpdate = true;
        var hit = new THREE.Mesh( hitArea, hitMaterial );
        hit.position.z = 6;
        hit.position.y = 0.5;
        this.mesh.add(hit);
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
