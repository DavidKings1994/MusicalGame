define(['three','./player'],  function(THREE, Player) {

    var GameNamespace = window.GameNamespace || {};
    window.THREE = THREE;

    require('./../../../node_modules/three/examples/js/loaders/OBJLoader.js');
    require('./../../../node_modules/three/examples/js/loaders/MTLLoader.js');

    var GameNamespace = ( function() {
        function GameNamespace() {
            var self = this, dataSettings;
            self.init(true);
        }
        return GameNamespace;
    }());

    GameNamespace.prototype.keyboardEvent = function(event) {
        if(GameNamespace.ready) {
            // eventos generales
            switch(event.keyCode) {
                case 27: {
                    if (event.type == 'keyup') {
                        if (GameNamespace.paused) {
                            $(document).trigger('unpause');
                        } else {
                            $(document).trigger('pause');
                        }
                    }
                    break;
                }
            }
            // eventos de cada jugador
            for (var i = 0; i < GameNamespace.players.length; i++) {
                switch(event.keyCode) {
                    case GameNamespace.players[i].rails[0].key: {
                        if (event.type == 'keydown') {
                            GameNamespace.players[i].rails[0].status = true;
                        } else if (event.type == 'keyup') {
                            GameNamespace.players[i].rails[0].status = false;
                        }
                        break;
                    }
                    case GameNamespace.players[i].rails[1].key: {
                        if (event.type == 'keydown') {
                            GameNamespace.players[i].rails[1].status = true;
                        } else if (event.type == 'keyup') {
                            GameNamespace.players[i].rails[1].status = false;
                        }
                        break;
                    }
                    case GameNamespace.players[i].rails[2].key: {
                        if (event.type == 'keydown') {
                            GameNamespace.players[i].rails[2].status = true;
                        } else if (event.type == 'keyup') {
                            GameNamespace.players[i].rails[2].status = false;
                        }
                        break;
                    }
                    case GameNamespace.players[i].rails[3].key: {
                        if (event.type == 'keydown') {
                            GameNamespace.players[i].rails[3].status = true;
                        } else if (event.type == 'keyup') {
                            GameNamespace.players[i].rails[3].status = false;
                        }
                        break;
                    }
                }
            }

            // record
            if (GameNamespace.mode == 'record') {
                GameNamespace.players[0].song.chords.push({
                    time: 0,
                    notes: []
                })
            }
        }
    }

    GameNamespace.prototype.update = function () {
        for (var i = 0; i < GameNamespace.players.length; i++) {
            GameNamespace.players[i].update();
        }
    };

    GameNamespace.prototype.render = function () {
        requestAnimationFrame( GameNamespace.prototype.render );
        GameNamespace.prototype.update();
        GameNamespace.renderer.render(GameNamespace.scene, GameNamespace.camera);
    };

    $.fn.initGame = function( parameters ) {
        //inicializar escena
        GameNamespace.ready = false;
        GameNamespace.paused = false;
        GameNamespace.mode = parameters.mode;
        GameNamespace.scene = new THREE.Scene();
		GameNamespace.camera = new THREE.PerspectiveCamera( 75, parameters.windowWidth/parameters.windowHeight, 0.1, 1000 );

		GameNamespace.renderer = new THREE.WebGLRenderer();
		GameNamespace.renderer.setSize( parameters.windowWidth, parameters.windowHeight );
		$(this).append( GameNamespace.renderer.domElement );

        // crear jugadores
        GameNamespace.players = new Array(parameters.numberOfPlayers);
        var keys = [
            [65,83,68,70],
            [72,74,75,76]
        ];
        for (var i = 0; i < GameNamespace.players.length; i++) {
            GameNamespace.players[i] = new Player({
                index: i,
                songPath: '',
                keys: keys[i]
            });
            GameNamespace.scene.add( GameNamespace.players[i].mesh );
        }

        var totalSpace = (5 * parameters.numberOfPlayers) - 4;
        var center = (parameters.numberOfPlayers > 1 ? (totalSpace / 2) : 0);
        GameNamespace.camera.position.x = center;
		GameNamespace.camera.position.z = 10;
        GameNamespace.camera.position.y = 5;
        GameNamespace.camera.lookAt(new THREE.Vector3(center, 0, 0));

        GameNamespace.ready = true;
        GameNamespace.prototype.render();

        document.addEventListener( 'keydown', GameNamespace.prototype.keyboardEvent, false );
        document.addEventListener( 'keyup', GameNamespace.prototype.keyboardEvent, false );
    }

    window.Game = GameNamespace;
});
