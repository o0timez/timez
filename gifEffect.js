// Danh sách tên file GIF trong thư mục và thời gian (ms)
const gifDurations = new Map([
    ["nuko/nukoBigHeart.gif", 2200],
    ["nuko/nukoBlowHeart.gif", 3300],
    ["nuko/nukoBlowKiss1.gif", 3000],
    ["nuko/nukoBlowKiss2.gif", 3000],
    ["nuko/nukoBlowKiss3.gif", 3000],
    ["nuko/nukoBlowKiss4.gif", 3000],
    ["nuko/nukoBlowKiss5.gif", 3000],
    ["nuko/nukoBouquet.gif", 3000],
    ["nuko/nukoCuddle.gif", 3000],
    ["nuko/nukoCuteLove.gif", 3000],
    ["nuko/nukoDanceHeart.gif", 2500],
    ["nuko/nukoHeart1.gif", 3000],
    ["nuko/nukoHeart2.gif", 3000],
    ["nuko/nukoHeart3.gif", 3000],
    ["nuko/nukoHeart4.gif", 3000],
    ["nuko/nukoHeartBeat.gif", 2000],
    ["nuko/nukoHeartBlink.gif", 3000],
    ["nuko/nukoHeartExcited.gif", 3000],
    ["nuko/nukoHeartEyes.gif", 3000],
    ["nuko/nukoHeartHitHead.gif", 3000],
    ["nuko/nukoHeartInside.gif", 3000],
    ["nuko/nukoHeartInvasion.gif", 3000],
    ["nuko/nukoHeartsFlying.gif", 3000],
    ["nuko/nukoHeartsLaying.gif", 3000],
    ["nuko/nukoHeartThrow.gif", 3000],
    ["nuko/nukoHoldingHeart.gif", 3000],
    ["nuko/nukoHug.gif", 3000],
    ["nuko/nukoHugHeart.gif", 3000],
    ["nuko/nukoILikeYou.gif", 3000],
    ["nuko/nukoILoveYou.gif", 3000],
    ["nuko/nukoJumpHeart.gif", 3000],
    ["nuko/nukoKiss1.gif", 3000],
    ["nuko/nukoKissShy.gif", 3000],
    ["nuko/nukoLove1.gif", 3000],
    ["nuko/nukoLove2.gif", 3000],
    ["nuko/nukoLove3.gif", 3000],
    ["nuko/nukoLove4.gif", 3000],
    ["nuko/nukoLoveBalloon.gif", 3000],
    ["nuko/nukoLoveGift.gif", 3000],
    ["nuko/nukoLoveLetter1.gif", 3000],
    ["nuko/nukoLoveLetter2.gif", 3000],
    ["nuko/nukoPeekHeadHeart.gif", 3000],
    ["nuko/nukoPeekHeart.gif", 3000],
    ["nuko/nukoPeekShyHeart.gif", 3000],
    ["nuko/nukoRose.gif", 3000],
    ["nuko/nukoSexy.gif", 3000],
    ["nuko/nukoSexy2.gif", 3000],
    ["nuko/nukoSukiLoveYou.gif", 3000],
]);

const gifList = Array.from(gifDurations.keys());
const activeGifs = []; // Array to store active GIFs and their timeouts

//function to spread the new gif
function spread(center, radius){
    const angle = Math.random() * 2 * Math.PI;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return {x,y};
}
function showTapEffect(event) {
  // Remove the current GIF and timeout if they exist
  if(activeGifs.length > 0){
    const removeGifs = [...activeGifs]
    for(let gif of removeGifs){
      document.body.removeChild(gif.gif);
      clearTimeout(gif.timeout);
      const index = activeGifs.indexOf(gif);
      if (index > -1) { // only splice array when item is found
        activeGifs.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }
  // Chọn ngẫu nhiên một GIF từ danh sách
  let randomIndex = Math.floor(Math.random() * gifList.length);
  let randomGif = gifList[randomIndex];

  //Correct path
  randomGif = `/timez/${randomGif}`;

  let tapEffect = document.createElement("img");
  tapEffect.src = randomGif;
  tapEffect.style.position = "absolute";
  const randomWidth = Math.floor(Math.random() * 30) + 40;
  const randomHeight = Math.floor(Math.random() * 30) + 40;
  tapEffect.style.width = `${randomWidth}px`;
  tapEffect.style.height = `${randomHeight}px`;
  const spreadPos = spread({x: event.clientX, y: event.clientY}, 30);
  tapEffect.style.left = `${spreadPos.x - randomWidth/2}px`;
  tapEffect.style.top = `${spreadPos.y - randomHeight/2}px`;
  tapEffect.style.pointerEvents = "none";
  tapEffect.style.opacity = "1";

  document.body.appendChild(tapEffect);
  

  // Get the GIF duration and set a timeout to remove it
  const duration = gifDurations.get(gifList[randomIndex]);
  let currentTimeout = null;
  if(duration){
      currentTimeout = setTimeout(() => {
          document.body.removeChild(tapEffect);
          const index = activeGifs.findIndex(item => item.gif === tapEffect);
          if (index > -1) {
              activeGifs.splice(index, 1);
          }
      }, duration);
  }
  activeGifs.push({gif: tapEffect, timeout: currentTimeout}); // Add the GIF and timeout to the array

}

// Thêm event listener cho document
document.addEventListener("click", showTapEffect);
