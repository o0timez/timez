let musicPlayer; // Declare musicPlayer outside the functions so it's globally accessible
const musicUrls = [
    // Thêm các URL vào danh sách
    // Ví dụ URL YouTube
    'https://youtu.be/jQLyNVbSaW8?si=GlldOyW6kJtNTjPB',
    'https://youtu.be/gft21nuD8XQ?si=J6cCkTv6fWtWbMr3',
    // Ví dụ URL SoundCloud
    'https://soundcloud.com/user-123456789/song',
   
];

let currentTrack = 0;  // Track hiện tại trong danh sách
let isVideoVisible = false; //Track the video visibility
let soundcloudWidget; // Declare a variable to hold the SoundCloud widget instance

function onYouTubeIframeAPIReady() {
    musicPlayer = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: extractYouTubeID(musicUrls[currentTrack]), // Replace with your default video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // The player is now ready. You can start playing here if you want.
    console.log("Player ready!")
    //play if you want when player is loaded
    //musicPlayer.playVideo();
}
// Lấy ID video từ URL YouTube
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
// Chức năng tạo SoundCloud Player
function createSoundCloudPlayer(url) {
    soundcloudWidget = SC.Widget(url); // Store the widget instance
    soundcloudWidget.bind(SC.Widget.Events.READY, function() {
        soundcloudWidget.play();
    });
    return soundcloudWidget;
}

// Điều khiển trạng thái của player (lặp lại nhạc)
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextTrack();
    }
}

// Phát nhạc khi avatar được nhấn
document.getElementById('avatar').addEventListener('click', function() {
    if (musicPlayer && musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
        musicPlayer.playVideo();
    }
    if (soundcloudWidget) {
        soundcloudWidget.play(); // Play the SoundCloud track if present
    }
});

// Đổi nhạc khi double click
document.getElementById('avatar').addEventListener('dblclick', function() {
    playNextTrack();
});

// Phát nhạc ngẫu nhiên từ danh sách
function playNextTrack() {
    currentTrack = Math.floor(Math.random() * musicUrls.length);
    const url = musicUrls[currentTrack];

    if (url.includes('youtube.com')) {
        if(musicPlayer){
        musicPlayer.loadVideoById(extractYouTubeID(url));
        }else{
            onYouTubeIframeAPIReady();
        }
        if (soundcloudWidget) {
            soundcloudWidget.pause(); // Pause SoundCloud if it's playing
        }
    } else if (url.includes('soundcloud.com')) {
        if (musicPlayer) {
            musicPlayer.pauseVideo(); // Pause YouTube if it's playing
        }
        createSoundCloudPlayer(url);
    }
    console.log("play next track")
}
function initMusicPlayer() {
    if (musicUrls[0].includes('youtube.com')) {
        onYouTubeIframeAPIReady();
    } else if (musicUrls[0].includes('soundcloud.com')) {
        createSoundCloudPlayer(musicUrls[0]);
    }
}
// Chạy khi trang web đã tải xong
window.onload = initMusicPlayer;
document.getElementById('toggle-video-gif').addEventListener('click', function() {
    const playerContainer = document.getElementById('player-container');
    isVideoVisible = !isVideoVisible;
    if (isVideoVisible) {
      playerContainer.style.display = 'flex'; //Make the player visible
      if (musicPlayer && musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING && musicUrls[currentTrack].includes('youtube.com')) {
        musicPlayer.playVideo(); //resume the video
      }
      if (soundcloudWidget) {
        soundcloudWidget.play(); //resume soundcloud
      }
    } else {
      playerContainer.style.display = 'none'; // Hide the player
      if (musicPlayer) {
        musicPlayer.pauseVideo();
      }
      if (soundcloudWidget) {
        soundcloudWidget.pause();
      }
    }
});
