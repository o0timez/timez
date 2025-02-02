// Danh sách các URL GIF từ Cloudflare
const gifList = [
    "https://mybucket.r2.cloudflarestorage.com/nuko/gif1.gif",
    "https://mybucket.r2.cloudflarestorage.com/nuko/gif2.gif",
    "https://mybucket.r2.cloudflarestorage.com/nuko/gif3.gif",
    // Thêm các GIF khác ở đây
];

// Hiệu ứng click với GIF ngẫu nhiên
function showTapEffect(event) {
    if (gifList.length === 0) return;

    let randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    let tapEffect = document.createElement('img');
    tapEffect.src = randomGif;
    tapEffect.style.position = 'absolute';
    tapEffect.style.width = '40px';
    tapEffect.style.height = '40px';
    tapEffect.style.left = ${event.clientX - 25}px;
    tapEffect.style.top = ${event.clientY - 25}px;
    tapEffect.style.pointerEvents = 'none';
    tapEffect.style.opacity = '1';
    tapEffect.style.transition = 'opacity 0.5s ease-out';

    document.body.appendChild(tapEffect);

    setTimeout(() => {
        tapEffect.style.opacity = '0';
        setTimeout(() => document.body.removeChild(tapEffect), 500);
    }, 500);
}

// Lắng nghe sự kiện click trên toàn bộ trang
document.body.addEventListener('click', (event) => {
    showTapEffect(event);
});
