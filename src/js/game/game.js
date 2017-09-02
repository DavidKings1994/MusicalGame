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
            GameNamespace.players[i] = new Player();
        }

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		GameNamespace.scene.add( cube );

		GameNamespace.camera.position.z = 5;

        GameNamespace.prototype.render();
    }
});
