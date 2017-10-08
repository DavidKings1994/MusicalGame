define(['three'],  function(THREE) {

    var Note = function(parameters) {
        this.length = parameters.length;
        this.position = parameters.position;
        this.laneIndex = parameters.laneIndex;
        this.tapped = false;
        this.shape = new THREE.CubeGeometry(1, 0.5, this.length);
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( this.shape, this.material );
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    };

    Note.prototype = {
        constructor: Note,

        update: function() {

        },

        render: function() {

        }
    };

    return Note;

});
