define(['three'],  function(THREE) {

    var Note = function() {
        this.shape = new THREE.CubeGeometry(1,0.5,1);
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
