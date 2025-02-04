let musicPlayer;
const musicUrls = [
    'https://youtu.be/jQLyNVbSaW8?si=GlldOyW6kJtNTjPB',
    'https://youtu.be/gft21nuD8XQ?si=J6cCkTv6fWtWbMr3',
    'https://soundcloud.com/user-123456789/song',
];

let currentTrack = 0;
let isVideoVisible = false;
let soundcloudWidget;

function onYouTubeIframeAPIReady() {
    musicPlayer = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: extractYouTubeID(musicUrls[currentTrack]),
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("Player ready!")
}

function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function createSoundCloudPlayer(url) {
    soundcloudWidget = SC.Widget(url);
    soundcloudWidget.bind(SC.Widget.Events.READY, function() {
        soundcloudWidget.play();
    });
    return soundcloudWidget;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextTrack();
    }
}

document.getElementById('avatar').addEventListener('click', function() {
    if (musicPlayer && musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
        musicPlayer.playVideo();
    }
    if (soundcloudWidget) {
        soundcloudWidget.play();
    }
});

document.getElementById('avatar').addEventListener('dblclick', function() {
    playNextTrack();
});

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
            soundcloudWidget.pause();
        }
    } else if (url.includes('soundcloud.com')) {
        if (musicPlayer) {
            musicPlayer.pauseVideo();
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

window.onload = initMusicPlayer;

document.getElementById('toggle-video-gif').addEventListener('click', function() {
    const playerContainer = document.getElementById('player-container');
    isVideoVisible = !isVideoVisible;
    if (isVideoVisible) {
      playerContainer.style.display = 'flex';
      //we dont need to resume the video here
    } else {
      playerContainer.style.display = 'none';
      //we dont need to pause the video here
    }
});
