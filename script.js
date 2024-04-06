document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i'); // Get the icon element
    const volumeControl = document.getElementById('volumeControl');
    let playlistItems = document.querySelectorAll('#playlist li');
    let currentTrack = 0;
  
    function playTrack(index) {
      if (index < 0 || index >= playlistItems.length) return;
      if (currentTrack !== index) {
        playlistItems[currentTrack].classList.remove('playing');
        currentTrack = index;
      }
      audio.src = playlistItems[currentTrack].getAttribute('data-src');
      audio.play();
      playPauseIcon.textContent = 'pause'; // Correctly update the icon here
      playlistItems[currentTrack].classList.add('playing');
    }
  
    // Consolidate play/pause button logic
    playPauseBtn.addEventListener('click', () => {
      if (audio.src) {
        if (audio.paused) {
          audio.play();
          playPauseIcon.textContent = 'pause'; // Change to pause icon
        } else {
          audio.pause();
          playPauseIcon.textContent = 'play_arrow'; // Change to play icon
        }
      } else {
        playTrack(currentTrack); // Ensure the correct icon is set in playTrack
      }
    });
  
    volumeControl.addEventListener('input', () => {
      audio.volume = volumeControl.value;
    });
  
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        playTrack(index);
      });
    });
  
    audio.addEventListener('ended', () => {
      const nextTrack = (currentTrack + 1) % playlistItems.length;
      playTrack(nextTrack);
    });
  
    const progressBar = document.getElementById('progressBar');
  
    function updateProgressBar() {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
      progressBar.setAttribute('max', 100);
    }
  
    audio.addEventListener('timeupdate', updateProgressBar);
  
    progressBar.addEventListener('input', () => {
      const time = (progressBar.value * audio.duration) / 100;
      audio.currentTime = time;
    });
  });
  