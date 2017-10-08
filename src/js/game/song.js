define(['howler', './note'],  function(Howler, Note) {

    var Song = function(parameters) {
        var self = this;
        var d = new Date();
        this.startTime = d.getTime();
        this.delay = 3000; // miliseconds before the song starts
        this.unitsPerSecond = 1;
        this.speed = this.unitsPerSecond / 30; //units per second
        this.deltaTime = 0;
        this.actualTime = this.startTime;
        this.pasttime = this.actualTime;
        this.songPath = parameters.songPath;
        this.idSong = parameters.idSong;
        this.lanes = new Array(4);
        this.noteGroup = new THREE.Group();
        this.songLoaded = false;
        this.initDone = false;
        for (var i = 0; i < this.lanes.length; i++) {
            this.lanes[i] = [];
        }
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
                        let json = JSON.parse(msg)
                        console.log(json);
                        self.readSong(json);
                        self.songLoaded = true;
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
            let d = new Date();
            if (this.songLoaded) {
                this.deltaTime = this.actualTime - this.pasttime;
                this.pasttime = this.actualTime;
                this.actualTime = d.getTime();

                if (!this.initDone) {
                    if ((d.getTime() - this.startTime) > this.delay) {
                        this.howlerId = this.sound.play();
                        $(document).trigger('songStarted');
                        this.initDone = true;
                    }
                }

                this.noteGroup.position.z += this.speed;
            } else {
                this.startTime = d.getTime();
            }
        },

        render: function() {

        },

        readSong: function(lanes) {
            let delayDistance = 3 * this.unitsPerSecond;
            for (var l = 0; l < lanes.length; l++) {
                for (var i = 0; i < lanes[l].length; i += 2) {
                    let noteLength = (lanes[l][i + 1] - lanes[l][i]) / this.unitsPerSecond; // length = segundos / velocidad
                    let zPos = -((lanes[l][i] * this.unitsPerSecond) + (noteLength / 2) + delayDistance);
                    let position = new THREE.Vector3(l - 1.5, 0.5, zPos);
                    let note = new Note({
                        laneIndex: l,
                        length: noteLength,
                        position: position
                    });
                    this.lanes[l].push(note);
                    this.noteGroup.add(note.mesh);
                }
            }
            $(document).trigger('songReady');
        },

        save: function(data) {
            data.append('action', 'createSong');
            data.append('chords', JSON.stringify(this.lanes));
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
