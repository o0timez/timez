window.onload = function () {
    let player;
    let avatar = document.getElementById('avatar');
    let volumeControl = document.getElementById('volume-control');
    let volumeSlider = document.getElementById('volume-slider');

    if (!avatar || !volumeControl || !volumeSlider) {
        console.error("Không tìm thấy một số phần tử HTML cần thiết.");
        return;
    }

    volumeControl.style.opacity = '0';

    function onYouTubeIframeAPIReady() {
        console.log("YouTube API Loaded!"); // Debug
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
        console.log("YouTube Player Ready!"); // Debug
        event.target.setVolume(100);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            avatar.classList.add('playing');
        } else {
            avatar.classList.remove('playing');
        }

        if (event.data === YT.PlayerState.ENDED) {
            player.playVideo();
        }
    }

    const musicList = [
        { title: "Love For You", url: "nQVaRFP-ppw", image: "images/citi.jpg" },
        { title: "PoPiPo", url: "TNf3GPizM58", image: "images/citi.jpg" },
        { title: "Bài hát 3", url: "def456uvw", image: "" }
    ];

    function playRandomMusic() {
        const randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
        if (player && typeof player.loadVideoById === 'function') {
            player.loadVideoById(randomMusic.url);
            player.playVideo();
            avatar.src = randomMusic.image && randomMusic.image.trim() !== "" ? randomMusic.image : "images/citi.jpg";
        } else {
            console.error('Player is not initialized properly');
        }
    }

    avatar.addEventListener('click', (event) => {
        if (!player || typeof player.getPlayerState !== 'function') {
            console.error('Player is not ready');
            return;
        }

        const state = player.getPlayerState();
        if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED || state === YT.PlayerState.CUED) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }

        volumeControl.style.opacity = '1';
        setTimeout(() => { volumeControl.style.opacity = '0'; }, 3000);
        showTapEffect(event);
    });

    avatar.addEventListener('dblclick', (event) => {
        playRandomMusic();
        volumeControl.style.opacity = '1';
        setTimeout(() => { volumeControl.style.opacity = '0'; }, 3000);
        showTapEffect(event);
    });

    volumeSlider.addEventListener('input', (e) => {
        if (player) {
            player.setVolume(e.target.value);
        }
    });

    function showTapEffect(event) {
        let tapEffect = document.createElement('img');
        tapEffect.src = 'images/YasCatExcited.gif';
        tapEffect.style.position = 'absolute';
        tapEffect.style.width = '50px';
        tapEffect.style.height = '50px';
        tapEffect.style.left = `${event.clientX - 25}px`;
        tapEffect.style.top = `${event.clientY - 25}px`;
        tapEffect.style.pointerEvents = 'none';
        tapEffect.style.opacity = '1';
        tapEffect.style.transition = 'opacity 0.5s ease-out';

        document.body.appendChild(tapEffect);

        setTimeout(() => {
            tapEffect.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(tapEffect);
            }, 500);
        }, 500);
    }

    document.body.addEventListener('click', (event) => {
        showTapEffect(event);
    });

    // Đặt API vào global scope để YouTube gọi được
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
};