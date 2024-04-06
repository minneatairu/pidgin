document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i'); // Get the icon element
    const volumeControl = document.getElementById('volumeControl');
    const currentTimeElement = document.getElementById('currentTime');
    const totalDurationElement = document.getElementById('totalDuration');

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
  


    let playlistItems = document.querySelectorAll('#playlist li');
    let currentTrack = 0;
  
    function playTrack(index) {
        if (index < 0 || index >= playlistItems.length) return;
        if (currentTrack !== index) {
          playlistItems[currentTrack].classList.remove('playing');
          currentTrack = index;
        }
        const trackTitleElement = document.getElementById('trackTitle');
        audio.src = playlistItems[currentTrack].getAttribute('data-src');
        trackTitleElement.textContent = playlistItems[currentTrack].textContent; // Update the track title
        audio.play();
        playPauseIcon.textContent = 'pause'; // Update the play/pause icon
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

    // Function to update the progress bar based on the current time
    function updateProgressBar() {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = percentage + '%';
    }
  
    audio.addEventListener('timeupdate', updateProgressBar);
  
    // Function to allow clicking on the progress bar to seek
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.addEventListener('click', (e) => {
      const clickPosition = (e.offsetX / progressContainer.offsetWidth) * audio.duration;
      audio.currentTime = clickPosition;
      
    });
  


  // Function to format time in minutes and seconds
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Display total duration
  audio.addEventListener('loadedmetadata', () => {
    totalDurationElement.textContent = formatTime(audio.duration);
  });

  // Update current time
  audio.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(audio.currentTime);

    // Also update the progress bar
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;
    progressBar.setAttribute('max', 100);
  });


  function playNextTrack() {
    const nextTrackIndex = (currentTrack + 1) % playlistItems.length;
    playTrack(nextTrackIndex);
  }

  function playPreviousTrack() {
    // This calculation ensures that the previous index wraps around to the last track if currently on the first track
    const prevTrackIndex = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    playTrack(prevTrackIndex);
  }

  nextBtn.addEventListener('click', playNextTrack);
  prevBtn.addEventListener('click', playPreviousTrack);

  const muteBtn = document.getElementById('muteBtn');
  let isMuted = false; // Tracks the mute state

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted; // Toggle the mute state
    audio.muted = isMuted; // Apply the mute state to the audio element
    muteBtn.querySelector('i').textContent = isMuted ? 'volume_off' : 'volume_up'; // Update the button icon
  });

  const captions = [
    { start: 0, end: 5, text: "Welcome to our audio presentation." },
    { start: 5, end: 10, text: "We're glad you're here with us." },
    { start: 10, end: 15, text: "Let's explore the main topic." },
    // Add more captions as needed...
  ];
  
  });
  