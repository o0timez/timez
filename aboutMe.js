document.addEventListener("DOMContentLoaded", function () {
    const aboutMeGif = document.getElementById("about-me-gif");
    const aboutMeModal = document.getElementById("about-me-modal");
    const aboutMeContent = document.getElementById("about-me-content");
    const closeBtn = document.querySelector(".close");

    // Khi nhấn vào ảnh GIF, tải nội dung từ aboutme.md
    aboutMeGif.addEventListener("click", function () {
        fetch("Aboutme/aboutme.md")
            .then(response => response.text())
            .then(text => {
                aboutMeContent.innerHTML = marked.parse(text);
                aboutMeModal.style.display = "block";
            });
    });

    // Khi nhấn nút đóng, ẩn hộp thoại
    closeBtn.addEventListener("click", function () {
        aboutMeModal.style.display = "none";
    });

    // Khi nhấn ra ngoài modal, cũng đóng hộp thoại
    window.addEventListener("click", function (event) {
        if (event.target === aboutMeModal) {
            aboutMeModal.style.display = "none";
        }
    });
});
