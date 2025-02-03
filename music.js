let musicPlayer;  // Biến lưu trữ player

// Danh sách URL của YouTube hoặc SoundCloud
const musicUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',  // Ví dụ URL YouTube
    'https://soundcloud.com/user-123456789/song',  // Ví dụ URL SoundCloud
    // Thêm các URL vào danh sách
];

let currentTrack = 0;  // Track hiện tại trong danh sách

// Chức năng tạo YouTube Player
function onYouTubeIframeAPIReady() {
    musicPlayer = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: extractYouTubeID(musicUrls[currentTrack]),
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Lấy ID video từ URL YouTube
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Chức năng tạo SoundCloud Player
function createSoundCloudPlayer(url) {
    const widget = SC.Widget(url);
    widget.bind(SC.Widget.Events.READY, function() {
        widget.play();
    });
    return widget;
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
        musicPlayer.loadVideoById(extractYouTubeID(url));
    } else if (url.includes('soundcloud.com')) {
        createSoundCloudPlayer(url);
    }
}

// Khởi tạo player
function initMusicPlayer() {
    if (musicUrls[0].includes('youtube.com')) {
        onYouTubeIframeAPIReady();
    } else if (musicUrls[0].includes('soundcloud.com')) {
        createSoundCloudPlayer(musicUrls[0]);
    }
}

// Chạy khi trang web đã tải xong
window.onload = initMusicPlayer;
