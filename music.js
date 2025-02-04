let currentPlayer;
const musicUrls = [
    'https://youtu.be/jQLyNVbSaW8?si=GlldOyW6kJtNTjPB',
    'https://youtu.be/gft21nuD8XQ?si=J6cCkTv6fWtWbMr3',
    'https://soundcloud.com/user-70491581/lovly-lori-love-for-you-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
];

let currentTrack = 0;
let soundcloudWidget;
let musicPlayer;

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
    currentPlayer = 'youtube';
}

function onPlayerReady(event) {
    console.log("Player ready!");
}

function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function createSoundCloudPlayer(url) {
    const soundcloudPlayer = document.getElementById('soundcloud-player');
    soundcloudPlayer.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url);

    soundcloudWidget = SC.Widget(soundcloudPlayer);
    currentPlayer = 'soundcloud';
    soundcloudWidget.bind(SC.Widget.Events.READY, function () {
        soundcloudWidget.play();
    });
    soundcloudWidget.bind(SC.Widget.Events.PLAY, function () {
        startAvatarRotation();
    });
    soundcloudWidget.bind(SC.Widget.Events.PAUSE, function () {
        stopAvatarRotation();
    });
    soundcloudWidget.bind(SC.Widget.Events.FINISH, function () {
        soundcloudWidget.seekTo(0);
        soundcloudWidget.play();
    });
    return soundcloudWidget;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        musicPlayer.seekTo(0);
        musicPlayer.playVideo();
    } else if (event.data === YT.PlayerState.PLAYING) {
        startAvatarRotation();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        stopAvatarRotation();
    }
}

document.getElementById('avatar').addEventListener('click', function () {
    if (currentPlayer === 'youtube' && musicPlayer && musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
        musicPlayer.playVideo();
    } else if (currentPlayer === 'soundcloud' && soundcloudWidget) {
        soundcloudWidget.play();
    }
});

document.getElementById('avatar').addEventListener('dblclick', function () {
    playNextTrack();
});

function playNextTrack() {
    currentTrack = Math.floor(Math.random() * musicUrls.length);
    const url = musicUrls[currentTrack];

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        if (currentPlayer == 'youtube' && musicPlayer) {
            musicPlayer.loadVideoById(extractYouTubeID(url));
        } else {
            if(soundcloudWidget){
                soundcloudWidget.pause();
            }
            onYouTubeIframeAPIReady();
        }
    } else if (url.includes('soundcloud.com')) {
        if (currentPlayer == 'youtube' && musicPlayer) {
           musicPlayer.destroy();
        }
        createSoundCloudPlayer(url);
    }
    console.log("play next track");
}

function initMusicPlayer() {
    if (musicUrls[0].includes('youtube.com') || musicUrls[0].includes('youtu.be')) {
        onYouTubeIframeAPIReady();
    } else if (musicUrls[0].includes('soundcloud.com')) {
        createSoundCloudPlayer(musicUrls[0]);
    }
}

window.onload = initMusicPlayer;

// Event listener for toggle-video-gif
const toggleVideoGifButton = document.querySelector('.toggle-video-gif');
if (toggleVideoGifButton) {
    toggleVideoGifButton.addEventListener('click', function () {
        const playerContainer = document.getElementById('player-container');
        if (!playerContainer) {
            console.error("player-container element not found");
            return;
        }
        if (!musicPlayer && musicUrls[0].includes('youtube.com') || musicUrls[0].includes('youtu.be')) {
            onYouTubeIframeAPIReady();
        }
        // Toggle the container display
        if (playerContainer.style.display === 'flex') {
            playerContainer.style.display = 'none';
        } else {
            playerContainer.style.display = 'flex';
        }
    });
}

// Function to start the avatar rotation
function startAvatarRotation() {
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.classList.add('playing');
    }
}

// Function to stop the avatar rotation
function stopAvatarRotation() {
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.classList.remove('playing');
    }
}
