// Danh sách tên file GIF trong thư mục
const gifList = [
  "nuko/nukoBigHeart.gif",
  "nuko/nukoBlowHeart.gif",
  "nuko/nukoBlowKiss1.gif",
  "nuko/nukoBlowKiss2.gif",
  "nuko/nukoBlowKiss3.gif",
  "nuko/nukoBlowKiss4.gif",
  "nuko/nukoBlowKiss5.gif",
  "nuko/nukoBouquet.gif",
  "nuko/nukoCuddle.gif",
  "nuko/nukoCuteLove.gif",
  "nuko/nukoDanceHeart.gif",
  "nuko/nukoHeart1.gif",
  "nuko/nukoHeart2.gif",
  "nuko/nukoHeart3.gif",
  "nuko/nukoHeart4.gif",
  "nuko/nukoHeartBeat.gif",
  "nuko/nukoHeartBlink.gif",
  "nuko/nukoHeartExcited.gif",
  "nuko/nukoHeartEyes.gif",
  "nuko/nukoHeartHitHead.gif",
  "nuko/nukoHeartInside.gif",
  "nuko/nukoHeartInvasion.gif",
  "nuko/nukoHeartsFlying.gif",
  "nuko/nukoHeartsLaying.gif",
  "nuko/nukoHeartThrow.gif",
  "nuko/nukoHoldingHeart.gif",
  "nuko/nukoHug.gif",
  "nuko/nukoHugHeart.gif",
  "nuko/nukoILikeYou.gif",
  "nuko/nukoILoveYou.gif",
  "nuko/nukoJumpHeart.gif",
  "nuko/nukoKiss1.gif",
  "nuko/nukoKissShy.gif",
  "nuko/nukoLove1.gif",
  "nuko/nukoLove2.gif",
  "nuko/nukoLove3.gif",
  "nuko/nukoLove4.gif",
  "nuko/nukoLoveBalloon.gif",
  "nuko/nukoLoveGift.gif",
  "nuko/nukoLoveLetter1.gif",
  "nuko/nukoLoveLetter2.gif",
  "nuko/nukoPeekHeadHeart.gif",
  "nuko/nukoPeekHeart.gif",
  "nuko/nukoPeekShyHeart.gif",
  "nuko/nukoRose.gif",
  "nuko/nukoSexy.gif",
  "nuko/nukoSexy2.gif",
  "nuko/nukoSukiLoveYou.gif",
];

let currentGif = null; // Variable to store the currently displayed GIF
let timeoutId = null;   // Variable to store the timeout ID

function showTapEffect(event) {
  // Remove the current GIF if it exists
  if (currentGif) {
    document.body.removeChild(currentGif);
    currentGif = null;
  }
  // Clear any pending timeout
    clearTimeout(timeoutId);

  // Chọn ngẫu nhiên một GIF từ danh sách
  let randomIndex = Math.floor(Math.random() * gifList.length);
  let randomGif = gifList[randomIndex];

  //Correct path
  randomGif = `/timez/${randomGif}`;

  let tapEffect = document.createElement("img");
  tapEffect.src = randomGif;
  tapEffect.style.position = "absolute";
  tapEffect.style.width = "50px";
  tapEffect.style.height = "50px";
  tapEffect.style.left = `${event.clientX - 25}px`;
  tapEffect.style.top = `${event.clientY - 25}px`;
  tapEffect.style.pointerEvents = "none";
  tapEffect.style.opacity = "1";
  tapEffect.style.transition = "opacity 0.5s ease-out";

  document.body.appendChild(tapEffect);
  currentGif = tapEffect; // Store the current GIF

  timeoutId = setTimeout(() => {
    tapEffect.style.opacity = "0";
    timeoutId = setTimeout(() => {
      if (currentGif === tapEffect) {
        document.body.removeChild(tapEffect);
        currentGif = null;
      }
    }, 500);
  }, 500);
}

// Thêm event listener cho document
document.addEventListener("click", showTapEffect);
