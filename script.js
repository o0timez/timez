let player;
let avatar = document.getElementById('avatar');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'nQVaRFP-ppw', 
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(100);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        avatar.classList.add('playing');
    } else {
        avatar.classList.remove('playing');
    }

    // Lặp lại bài hát thay vì phát bài mới
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

const musicList = [
    { title: "Love For You", url: "nQVaRFP-ppw", image: "images/citi.jpg" },
    { title: "Bài hát 2", url: "abc123xyz", image: "images/citi.jpg" },
    { title: "Bài hát 3", url: "def456uvw", image: "" }
];

function playRandomMusic() {
    const randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
    player.loadVideoById(randomMusic.url);
    player.playVideo();
    avatar.src = randomMusic.image || "images/citi.jpg";
}

avatar.addEventListener('click', () => {
    if (!player || typeof player.getPlayerState !== 'function') return;

    const state = player.getPlayerState();
    if (state === -1 || state === YT.PlayerState.ENDED || state === YT.PlayerState.CUED) {
        playRandomMusic();
    } else if (state !== YT.PlayerState.PLAYING) {
        player.playVideo();
    } else {
        document.getElementById('volume-control').classList.add('show-volume');
        setTimeout(() => {
            document.getElementById('volume-control').classList.remove('show-volume');
        }, 3000);
    }
});

document.getElementById('volume-slider').addEventListener('input', (e) => {
    player.setVolume(e.target.value);
});