document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
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
  });
  