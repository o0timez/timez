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

    if (event.data === YT.PlayerState.ENDED) {
        playRandomMusic();
    }
}

const musicList = [
    { title: "Love For You", url: "nQVaRFP-ppw", image: "images/song1.jpg" },
    { title: "Bài hát 2", url: "abc123xyz", image: "images/song2.jpg" },
    { title: "Bài hát 3", url: "def456uvw", image: "" }
];

function playRandomMusic() {
    const randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
    player.loadVideoById(randomMusic.url);
    player.playVideo();
    avatar.src = randomMusic.image || "images/citi.jpg";
}

avatar.addEventListener('click', () => {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        playRandomMusic();
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