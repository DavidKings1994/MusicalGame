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

        },

        save: function(data) {
            data.append('action', 'createSong');
            data.append('chords', JSON.stringify(this.chords));
            for (var pair of data.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
            }
            $.ajax({
                url: './php/controllers/SongController.php',
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false,
                data: data,
                success: function(msg) {
                    console.log(msg);
                }
            });
        }
    };

    return Song;
});
