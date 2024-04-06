window.onload = function() {
    var audio = document.getElementById('audio');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('a');
    var currentTrack = 0;

    // Play selected track
    function playTrack(link) {
        audio.src = link.getAttribute('href');
        audio.play();
        for (var i = 0; i < tracks.length; i++) {
            tracks[i].parentNode.classList.remove('active');
        }
        link.parentNode.classList.add('active');
    }

    // Play next track
    function playNext() {
        currentTrack = (currentTrack + 1) % tracks.length;
        playTrack(tracks[currentTrack]);
    }

    audio.addEventListener('ended', playNext);

    for (var i = 0; i < tracks.length; i++) {
        tracks[i].addEventListener('click', function(e) {
            e.preventDefault();
            playTrack(this);
        });
    }
};
