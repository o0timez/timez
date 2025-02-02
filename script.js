window.onload = function () {
    let player; // YouTube Player
    let audioPlayer = new Audio(); // HTML5 Audio Player
    let useYouTube = true; // Mặc định ưu tiên YouTube
    let isPlaying = false; // Thêm trạng thái để theo dõi trạng thái phát nhạc
    let avatar = document.getElementById('avatar');
    let volumeControl = document.getElementById('volume-control');
    let volumeSlider = document.getElementById('volume-slider');

    if (!avatar || !volumeControl || !volumeSlider) {
        console.error("❌ Không tìm thấy một số phần tử HTML cần thiết.");
        return;
    }

    volumeControl.style.opacity = '0';

    // Danh sách nhạc
    const musicList = [
        { title: "Love For You", url: "nQVaRFP-ppw", file: "music/loveli.mp3", image: "images/citi.jpg" },
        { title: "PoPiPo", url: "TNf3GPizM58", file: "music/PoPiPo.mp3", image: "images/citi.jpg" },
        { title: "Caramella Girls", url: "6-8E4Nirh9s", file: "music/Caramella Girls.mp3", image: "images/citi.jpg" }
    ];
    let currentMusic = musicList[0]; // Bài hát hiện tại

    // Khởi tạo YouTube Player
    function onYouTubeIframeAPIReady() {
        console.log("✅ YouTube API Loaded!");
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: currentMusic.url, // Nhạc đầu tiên
            playerVars: {
                'autoplay': 0, // KHÔNG Tự động phát khi khởi tạo
                'controls': 0,
                'disablekb': 1,
                'modestbranding': 1,
                'playsinline': 1
            },
            events: {
                'onReady': (event) => {
                    console.log("✅ YouTube Player Ready!");
                    event.target.setVolume(100);
                },
                'onStateChange': onPlayerStateChange
            }
        });
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            avatar.classList.add('playing');
            isPlaying = true;
        } else {
            avatar.classList.remove('playing');
            isPlaying = false;
        }

        if (event.data === YT.PlayerState.ENDED) {
            playRandomMusic();
        }
    }

    // Chọn nhạc ngẫu nhiên và phát
    function playRandomMusic() {
        let availableMusic = musicList.filter(music => music.url || music.file);
        if (availableMusic.length === 0) {
            console.warn("⚠ Không có bài hát khả dụng!");
            return;
        }

        let randomMusic;
        do {
            randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];
        } while (randomMusic === currentMusic);

        currentMusic = randomMusic;
        console.log(`🎵 Đang phát: ${randomMusic.title}`);

        if (useYouTube && player && typeof player.loadVideoById === 'function') {
            player.loadVideoById(randomMusic.url);
            setTimeout(() => {
                if (!isPlaying) {
                    player.playVideo();
                }
            }, 2000); // Đợi 2s rồi mới chạy
        } else {
            console.warn("⚠ Không thể phát YouTube! Chuyển sang phát nhạc từ thư mục.");
            audioPlayer.src = randomMusic.file;
            audioPlayer.play().catch(err => console.error("⛔ Lỗi khi phát nhạc offline:", err));
        }

        avatar.src = randomMusic.image && randomMusic.image.trim() !== "" ? randomMusic.image : "images/citi.jpg";
    }

    // Click vào avatar để phát nhạc (không tạm dừng)
    avatar.addEventListener('click', (event) => {
        if (!isPlaying) {
            if (useYouTube && player && typeof player.getPlayerState === 'function') {
                player.playVideo();
            } else if (audioPlayer.paused) {
                audioPlayer.play();
            }
        }

        volumeControl.style.opacity = '1';
        setTimeout(() => volumeControl.style.opacity = '0', 3000);
        showTapEffect(event);
    });

    // Double tap để đổi nhạc
    avatar.addEventListener('dblclick', (event) => {
        let previousMusic = currentMusic;
        playRandomMusic();
        if (currentMusic === previousMusic) {
            console.warn("⚠ Không tìm thấy nhạc mới, giữ nguyên bài hát cũ.");
        }

        volumeControl.style.opacity = '1';
        setTimeout(() => volumeControl.style.opacity = '0', 3000);
        showTapEffect(event);
    });

    // Điều chỉnh âm lượng
    volumeSlider.addEventListener('input', (e) => {
        if (useYouTube && player) {
            player.setVolume(e.target.value);
        } else {
            audioPlayer.volume = e.target.value / 100;
        }
    });

    document.body.addEventListener('click', (event) => {
        showTapEffect(event);
    });

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
};

function showTapEffect(event) {
    console.log("showTapEffect not defined in provided context")
}
