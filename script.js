const yes = document.getElementById("yes");
const no = document.getElementById("no");
const mascot = document.getElementById("mascot");
const msg = document.getElementById("msg");
const win = document.getElementById("win");

const faces = ["🐥", "🐻", "🐰", "🐱", "🐼", "🦆"];
const lines = [
  "ห้ามหนีนะ! 😤",
  "จับไม่ได้หรอก~ ปุ่มนี้ไวมาก 💨",
  "อาบน้ำแล้วหอมนะ 🌸",
  "กดอีกฝั่งสิ! 🛁",
  "ปุ่มนี้ไม่ยอมให้กดหรอก 🙈",
  "เป็ดน้อยร้องไห้แล้วนะ 🥺",
];
let count = 0;

function dodge() {
  const pad = 12;
  const w = no.offsetWidth;
  const h = no.offsetHeight;

  // ถ้ายังไม่ได้ลอยออกมา ให้ลอยออกจากการ์ดก่อน
  if (!no.classList.contains("run")) {
    const r = no.getBoundingClientRect();
    no.classList.add("run");
    no.style.left = r.left + "px";
    no.style.top = r.top + "px";
  }

  // สุ่มตำแหน่งใหม่ที่อยู่ห่างจากปุ่มอาบน้ำ
  const yr = yes.getBoundingClientRect();
  let x, y, tries = 0;
  do {
    x = pad + Math.random() * (window.innerWidth - w - pad * 2);
    y = pad + Math.random() * (window.innerHeight - h - pad * 2);
    tries++;
  } while (
    tries < 30 &&
    x < yr.right + 20 && x + w > yr.left - 20 &&
    y < yr.bottom + 20 && y + h > yr.top - 20
  );
  no.style.left = x + "px";
  no.style.top = y + "px";

  count++;
  msg.textContent = lines[count % lines.length];
  mascot.textContent = faces[count % faces.length];
  mascot.classList.remove("shake");
  void mascot.offsetWidth;
  mascot.classList.add("shake");
}

// หนีเมื่อเมาส์เข้าใกล้ / แตะ / โฟกัสด้วยคีย์บอร์ด
["mouseenter", "pointerdown", "touchstart", "focus"].forEach((ev) =>
  no.addEventListener(ev, (e) => {
    e.preventDefault();
    dodge();
  }, { passive: false })
);
no.addEventListener("click", (e) => {
  e.preventDefault();
  dodge();
});

// ถ้าเมาส์เข้าใกล้ปุ่มก่อนชน ก็หนีเลย
document.addEventListener("mousemove", (e) => {
  const r = no.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  if (Math.hypot(e.clientX - cx, e.clientY - cy) < 90) dodge();
});

yes.addEventListener("click", () => {
  win.hidden = false;
});