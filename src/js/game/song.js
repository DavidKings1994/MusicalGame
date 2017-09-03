define(['./note'],  function(Note) {

    var Song = function(parameters) {
        this.songPath = parameters.songPath;
        this.chords = [];
    };

    Song.prototype = {
        constructor: Song,

        update: function() {

        },

        render: function() {

        },

        createNote: function(rail) {

        }
    };

    return Song;
});
