define(['howler', './note'],  function(Howler, Note) {

    var Song = function(parameters) {
        var self = this;
        this.songPath = parameters.songPath;
        this.idSong = parameters.idSong;
        this.chords = [];
        if (this.songPath != null && this.songPath != '') {
            this.sound = new Howl({
                src: [self.songPath],
                format: ['mp3']
            });
            if (self.idSong != null) {
                $.ajax({
                    url: './php/controllers/SongController.php',
                    type: 'POST',
                    data: {
                        action: 'getSongChords',
                        idSong: self.idSong
                    },
                    success: function(msg) {
                        self.chords = JSON.parse(msg);
                        console.log(self.chords);
                        self.howlerId = self.sound.play();
                        $(document).trigger('songStarted');
                    }
                });
            }

            $(document).on('pause', function() {
                self.sound.pause(self.howlerId);
            });

            $(document).on('continue', function() {
                self.sound.play(self.howlerId);
            });
        }
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
