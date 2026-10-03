const yes = document.getElementById("yes");
const no = document.getElementById("no");
const win = document.getElementById("win");
const player = document.getElementById("player");

const VIDEO_ID = "3-5qfVP8Wlk";
let musicStarted = false;

// เบราว์เซอร์ไม่ให้เล่นเพลงเองจนกว่าจะมีการแตะ/คลิก จึงเริ่มเพลงตอนแตะครั้งแรก
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  const f = document.createElement("iframe");
  f.src =
    "https://www.youtube.com/embed/" + VIDEO_ID +
    "?autoplay=1&loop=1&playlist=" + VIDEO_ID + "&playsinline=1";
  f.allow = "autoplay; encrypted-media";
  f.title = "เพลงประกอบ";
  player.appendChild(f);
  player.hidden = false;
}
document.addEventListener("pointerdown", startMusic, { once: true });

// กดปุ่มไหนก็ขึ้นหน้าเดียวกัน
function showWin() {
  startMusic();
  win.hidden = false;
}
yes.addEventListener("click", showWin);
no.addEventListener("click", showWin);