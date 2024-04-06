document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i'); // Get the icon element
    const currentTimeElement = document.getElementById('currentTime');
    const totalDurationElement = document.getElementById('totalDuration');
  
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const muteBtn = document.getElementById('muteBtn');
  
    let playlistItems = document.querySelectorAll('#playlist li');
    let currentTrack = 0;
    let isMuted = false; // Tracks the mute state
  
    function playTrack(index) {
      if (index < 0 || index >= playlistItems.length) return;
      currentTrack = index; // Update the current track index
  
      const track = playlistItems[currentTrack];
      const trackSrc = track.getAttribute('data-src');
      const trackTitleElement = document.getElementById('trackTitle');
  
      if (audio.src !== trackSrc) { // Check if new source is different
        audio.src = trackSrc;
      }
      
      trackTitleElement.textContent = track.textContent; // Update the track title
      audio.play();
      playPauseIcon.textContent = 'pause'; // Update the play/pause icon
  
      // Update the playlist items for playing status
      playlistItems.forEach(item => item.classList.remove('playing'));
      track.classList.add('playing');
    }
  
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
  
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        playTrack(index);
      });
    });
  
    audio.addEventListener('ended', () => {
      playNextTrack();
    });
  
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
  
    function updateProgressBar() {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percentage + '%';
    }
  
    audio.addEventListener('timeupdate', updateProgressBar);
  
    progressContainer.addEventListener('click', (e) => {
      const clickPosition = (e.offsetX / progressContainer.offsetWidth) * audio.duration;
      audio.currentTime = clickPosition;
    });
  
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    audio.addEventListener('loadedmetadata', () => {
      totalDurationElement.textContent = formatTime(audio.duration);
    });
  
    audio.addEventListener('timeupdate', () => {
      currentTimeElement.textContent = formatTime(audio.currentTime);
    });
  
    function playNextTrack() {
      const nextTrackIndex = (currentTrack + 1) % playlistItems.length;
      playTrack(nextTrackIndex);
    }
  
    function playPreviousTrack() {
      const prevTrackIndex = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
      playTrack(prevTrackIndex);
    }
  
    nextBtn.addEventListener('click', playNextTrack);
    prevBtn.addEventListener('click', playPreviousTrack);
  
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted; // Toggle the mute state
      audio.muted = isMuted; // Apply the mute state to the audio element
      muteBtn.querySelector('i').textContent = isMuted ? 'volume_off' : 'volume_up'; // Update the button icon
    });
  });
  