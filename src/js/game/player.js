define(['./song'],  function(Song) {

    var Player = function(parameters) {
        this.index = parameters.index;
        this.song = new Song({
            songPath: parameters.songPath,
            idSong: parameters.idSong
        });
        this.rails = [
            {
                key: parameters.keys[0],
                status: false,
                mesh: null
            },
            {
                key: parameters.keys[1],
                status: false,
                mesh: null
            },
            {
                key: parameters.keys[2],
                status: false,
                mesh: null
            },
            {
                key: parameters.keys[3],
                status: false,
                mesh: null
            },
        ];
        this.streak = 0;
        this.powerUp = 0;

        // inicializa la figura del mastil
        var geometry = new THREE.BoxGeometry( 4, 0.5, 13 );
		var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.position.x = this.index * 5;

        // inicializa la figura de los botones
        for (var i = 0; i < this.rails.length; i++) {
            var hitArea = new THREE.BoxGeometry( 1, 1, 1 );
            var hitMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
            hitMaterial.transparent = true;
            hitMaterial.opacity = 0.7;
            hitMaterial.needsUpdate = true;
            this.rails[i].mesh = new THREE.Mesh( hitArea, hitMaterial );
            this.rails[i].mesh.position.x = i - 1.5;
            this.rails[i].mesh.position.z = 6;
            this.rails[i].mesh.position.y = 0.5;
            this.mesh.add(this.rails[i].mesh);
        }

        $(document).on('songReady', () => {
            this.mesh.add(this.song.noteGroup);
            console.log(this.song.noteGroup);
        });
    };

    Player.prototype = {
        constructor: Player,

        update: function() {
            this.song.update();
            for (var i = 0; i < this.rails.length; i++) {
                if (this.rails[i].status) {
                    this.rails[i].mesh.material.color.setHex(0x00ff00);
                } else {
                    this.rails[i].mesh.material.color.setHex(0x0000ff);
                }
            }
        },

        render: function() {

        }
    };

    return Player;
});
