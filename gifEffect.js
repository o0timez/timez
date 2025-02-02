// Tạo danh sách tên file GIF trong thư mục "nuko"
const gifList = [
    "nuko/1.gif",
    "nuko/2.gif",
    "nuko/3.gif",
    "nuko/4.gif",
    "nuko/5.gif",
    "nuko/6.gif"
    // Thêm các file GIF khác nếu biết tên, hoặc dùng phương thức tự động lấy danh sách file
];

// Hiệu ứng click với GIF ngẫu nhiên
function showTapEffect(event) {
    // Chọn ngẫu nhiên một GIF từ danh sách
    let randomGif = gifList[Math.floor(Math.random() * gifList.length)];

    let tapEffect = document.createElement('img');
    tapEffect.src = randomGif;
    tapEffect.style.position = 'absolute';
    tapEffect.style.width = '50px';
    tapEffect.style.height = '50px';
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
