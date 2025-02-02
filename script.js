window.onload = function () {
    let player; // YouTube Player
    let audioPlayer = new Audio(); // HTML5 Audio Player
    let useYouTube = true; // Mặc định ưu tiên YouTube

    let avatar = document.getElementById('avatar');
    let volumeControl = document.getElementById('volume-control');
    let volumeSlider = document.getElementById('volume-slider');

    if (!avatar || !volumeControl || !volumeSlider) {
        console.error("❌ Không tìm thấy một số phần tử HTML cần thiết.");
        return;
    }

    volumeControl.style.opacity = '0';

    function onYouTubeIframeAPIReady() {
        console.log("✅ YouTube API Loaded!");
        try {
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
        } catch (error) {
            console.error("⛔ Lỗi khi tải YouTube API! Chuyển sang phát nhạc offline...");
            useYouTube = false;
            playRandomMusic();
        }
    }

    function onPlayerReady(event) {
        console.log("✅ YouTube Player Ready!");
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
        { title: "Love For You", url: "nQVaRFP-ppw", file: "music/loveli.mp3", image: "images/citi.jpg" },
        { title: "PoPiPo", url: "TNf3GPizM58", file: "music/song2.mp3", image: "images/citi.jpg" },
        { title: "Bài hát 3", url: "def456uvw", file: "music/song3.mp3", image: "images/citi.jpg" }
    ];

    let currentMusic = musicList[0]; // Lưu trữ bài hát hiện tại

    function playRandomMusic() {
        let availableMusic = musicList.filter(music => music.url || music.file); // Lọc những bài hát có nguồn hợp lệ
        let randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];

        if (!randomMusic) {
            console.warn("⚠ Không tìm thấy nhạc khả dụng! Giữ nguyên nhạc cũ.");
            return;
        }

        currentMusic = randomMusic;
        console.log(`🎵 Đang phát: ${randomMusic.title}`);

        if (useYouTube && player && typeof player.loadVideoById === 'function') {
            player.loadVideoById(randomMusic.url);
            setTimeout(() => {
                if (player && typeof player.playVideo === 'function') {
                    player.playVideo();
                }
            }, 3000);
        } else {
            console.warn("⚠ Không thể phát YouTube! Chuyển sang phát nhạc từ thư mục.");
            audioPlayer.src = randomMusic.file;
            audioPlayer.play().catch(err => console.error("⛔ Lỗi khi phát nhạc offline:", err));
        }

        avatar.src = randomMusic.image && randomMusic.image.trim() !== "" ? randomMusic.image : "images/citi.jpg";
    }

    avatar.addEventListener('click', (event) => {
        // Không còn chức năng tạm dừng khi chạm vào avatar
        if (useYouTube && player && typeof player.getPlayerState === 'function') {
            const state = player.getPlayerState();
            if (state !== YT.PlayerState.PLAYING) {
                player.playVideo();
            }
        } else {
            if (audioPlayer.paused) {
                audioPlayer.play();
            }
        }

        volumeControl.style.opacity = '1';
        setTimeout(() => { volumeControl.style.opacity = '0'; }, 3000);
        showTapEffect(event);
    });

    avatar.addEventListener('dblclick', (event) => {
        let previousMusic = currentMusic;
        playRandomMusic();
        if (currentMusic === previousMusic) {
            console.warn("⚠ Không tìm thấy nhạc mới, giữ nguyên bài hát cũ.");
        }

        volumeControl.style.opacity = '1';
        setTimeout(() => { volumeControl.style.opacity = '0'; }, 3000);
        showTapEffect(event);
    });

    volumeSlider.addEventListener('input', (e) => {
        if (useYouTube && player) {
            player.setVolume(e.target.value);
        } else {
            audioPlayer.volume = e.target.value / 100;
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

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
};
