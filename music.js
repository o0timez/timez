let musicPlayer; // Biến lưu trữ YouTube player
let soundCloudWidget; // Biến lưu trữ SoundCloud widget
let currentTrack = 0; // Track hiện tại trong danh sách

// Danh sách URL của YouTube hoặc SoundCloud
const musicUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Ví dụ URL YouTube
    'https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-original', // Ví dụ URL SoundCloud
    // Thêm các URL vào danh sách
];

// Chức năng tạo YouTube Player
function onYouTubeIframeAPIReady() {
    console.log("onYouTubeIframeAPIReady");
    musicPlayer = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: extractYouTubeID(musicUrls[currentTrack]),
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
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
    console.log("createSoundCloudPlayer");
    const iframe = document.createElement('iframe');
    iframe.id = 'soundcloud_widget';
    iframe.width = '100%';
    iframe.height = '166';
    iframe.scrolling = 'no';
    iframe.frameborder = 'no';
    iframe.allow = 'autoplay';
    iframe.src = "https://w.soundcloud.com/player/?url=" + url + "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";
    document.body.appendChild(iframe);
    soundCloudWidget = SC.Widget(iframe);

    soundCloudWidget.bind(SC.Widget.Events.READY, function() {
        console.log("widget ready");
        soundCloudWidget.play();
    });
}

// Điều khiển trạng thái của player (lặp lại nhạc)
function onPlayerStateChange(event) {
    console.log("onPlayerStateChange");
    if (event.data === YT.PlayerState.ENDED) {
        playNextTrack();
    }
}
function onPlayerReady(event) {
    console.log("onPlayerReady");
    event.target.playVideo();
}

// Phát nhạc khi avatar được nhấn
document.getElementById('avatar').addEventListener('click', function() {
    if (musicPlayer && musicPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
        musicPlayer.playVideo();
    }
    if(soundCloudWidget) {
      soundCloudWidget.play();
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
        if(soundCloudWidget){
          soundCloudWidget.pause();
          document.getElementById('soundcloud_widget').remove();
        }
        musicPlayer.loadVideoById(extractYouTubeID(url));
    } else if (url.includes('soundcloud.com')) {
        if(musicPlayer){
          musicPlayer.pauseVideo();
        }
        if(soundCloudWidget){
          soundCloudWidget.load(url, {
            show_artwork: true,
            auto_play: true
          });
        } else {
          createSoundCloudPlayer(url);
        }
    }
}

// Khởi tạo player
function initMusicPlayer() {
    console.log("initMusicPlayer");
    if (musicUrls[0].includes('youtube.com')) {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else if (musicUrls[0].includes('soundcloud.com')) {
        createSoundCloudPlayer(musicUrls[0]);
    }
}

// Chạy khi trang web đã tải xong
window.onload = initMusicPlayer;
