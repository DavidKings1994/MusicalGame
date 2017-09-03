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

    GameNamespace.prototype.update = function () {

    };

    GameNamespace.prototype.render = function () {
        requestAnimationFrame( GameNamespace.prototype.render );
        GameNamespace.prototype.update();
        GameNamespace.renderer.render(GameNamespace.scene, GameNamespace.camera);
    };

    $.fn.initGame = function( parameters ) {
        //inicializar escena
        GameNamespace.scene = new THREE.Scene();
		GameNamespace.camera = new THREE.PerspectiveCamera( 75, parameters.windowWidth/parameters.windowHeight, 0.1, 1000 );

		GameNamespace.renderer = new THREE.WebGLRenderer();
		GameNamespace.renderer.setSize( parameters.windowWidth, parameters.windowHeight );
		$(this).append( GameNamespace.renderer.domElement );

        // crear jugadores
        GameNamespace.players = new Array(parameters.numberOfPlayers);
        for (var i = 0; i < GameNamespace.players.length; i++) {
            GameNamespace.players[i] = new Player({
                index: i,
                songPath: ''
            });
            GameNamespace.scene.add( GameNamespace.players[i].mesh );
        }

        var totalSpace = (5 * parameters.numberOfPlayers) - 4;
        var center = (parameters.numberOfPlayers > 1 ? (totalSpace / 2) : 0);
        GameNamespace.camera.position.x = center;
		GameNamespace.camera.position.z = 10;
        GameNamespace.camera.position.y = 5;
        GameNamespace.camera.lookAt(new THREE.Vector3(center, 0, 0));

        GameNamespace.prototype.render();
    }
});
