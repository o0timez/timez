let player;
let avatar = document.getElementById('avatar');
let volumeControl = document.getElementById('volume-control');

// Ẩn volume control khi mới load trang
volumeControl.style.opacity = '0';

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
    { title: "PoPiPo", url: "TNf3GPizM58?si", image: "images/citi.jpg" },
    { title: "Bài hát 3", url: "def456uvw", image: "" }
];

function playRandomMusic() {
    const randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
    player.loadVideoById(randomMusic.url);
    player.playVideo();
    avatar.src = randomMusic.image || "images/citi.jpg";
}

// Sự kiện khi nhấn vào avatar
avatar.addEventListener('click', (event) => {
    if (!player || typeof player.getPlayerState !== 'function') return;

    const state = player.getPlayerState();
    if (state === -1 || state === YT.PlayerState.ENDED || state === YT.PlayerState.CUED) {
        playRandomMusic();
    } else if (state !== YT.PlayerState.PLAYING) {
        player.playVideo();
    }

    // Hiện thanh volume khi nhấn vào avatar
    volumeControl.style.opacity = '1';

    // Ẩn lại sau 3s
    setTimeout(() => {
        volumeControl.style.opacity = '0';
    }, 3000);

    // Thêm hiệu ứng chạm vào
    showTapEffect(event);
});

// Điều chỉnh âm lượng
document.getElementById('volume-slider').addEventListener('input', (e) => {
    player.setVolume(e.target.value);
});

// Hiệu ứng chạm vào (hiện hình ảnh nhỏ ở vị trí chạm)
function showTapEffect(event) {
    let tapEffect = document.createElement('img');
    tapEffect.src = 'images/tap-effect.gif'; // Đổi thành ảnh hoặc GIF mong muốn
    tapEffect.style.position = 'absolute';
    tapEffect.style.width = '50px';  // Kích thước ảnh hiệu ứng
    tapEffect.style.height = '50px';
    tapEffect.style.left = `${event.clientX - 25}px`;
    tapEffect.style.top = `${event.clientY - 25}px`;
    tapEffect.style.pointerEvents = 'none';
    tapEffect.style.opacity = '1';
    tapEffect.style.transition = 'opacity 0.5s ease-out';

    document.body.appendChild(tapEffect);

    // Biến mất sau 0.5s
    setTimeout(() => {
        tapEffect.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tapEffect);
        }, 500);
    }, 500);
}