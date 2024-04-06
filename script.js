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
      playPauseBtn.textContent = 'Pause';
      playlistItems[currentTrack].classList.add('playing');
    }
  
    playPauseBtn.addEventListener('click', () => {
      if (audio.src) {
        if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = 'Pause';
        } else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
        }
      } else {
        playTrack(currentTrack);
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

    // Function to update the progress bar based on the current time
    function updateProgressBar() {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percentage;
      progressBar.setAttribute('max', 100);
    }
  
    // Update the progress bar while the audio is playing
    audio.addEventListener('timeupdate', updateProgressBar);
  
    // Seek functionality
    progressBar.addEventListener('input', () => {
      const time = (progressBar.value * audio.duration) / 100;
      audio.currentTime = time;
    });


    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playPauseIcon.textContent = 'pause'; // Change to pause icon
      } else {
        audio.pause();
        playPauseIcon.textContent = 'play_arrow'; // Change to play icon
      }
    });
  });
  