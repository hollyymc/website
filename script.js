let topZ = 10;    // keeps the most recently clicked window on top
let opened = 0;    // used to stagger new windows so they don't stack exactly

// ----- Open / focus / close windows -----
function bringToFront(win) {
  win.style.zIndex = ++topZ;
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (win.hidden && !win.style.left) {
    win.style.left = 40 + opened * 30 + "px";
    win.style.top = 50 + opened * 30 + "px";
    opened++;
  }
  win.hidden = false;
  bringToFront(win);
}

// Anything with data-open="window-id" opens that window (dock, folders, VS Code list)
document.querySelectorAll("[data-open]").forEach((el) => {
  el.addEventListener("click", () => openWindow(el.dataset.open));
});

document.querySelectorAll(".window").forEach((win) => {
  win.addEventListener("pointerdown", () => bringToFront(win));
  // red and yellow buttons both close the window
  win.querySelectorAll(".close, .min").forEach((btn) => {
    btn.addEventListener("click", () => (win.hidden = true));
  });
});

// ----- Drag windows by their title bar -----
document.querySelectorAll(".titlebar").forEach((bar) => {
  bar.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    const win = bar.parentElement;
    const dx = e.clientX - win.offsetLeft;
    const dy = e.clientY - win.offsetTop;
    bar.setPointerCapture(e.pointerId);

    function move(ev) {
      win.style.left = ev.clientX - dx + "px";
      win.style.top = Math.max(28, ev.clientY - dy) + "px"; // stay below the menu bar
    }
    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", () => bar.removeEventListener("pointermove", move), { once: true });
  });
});

// ----- Notes: switch between notes -----
document.querySelectorAll("[data-note]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".note").forEach((n) => (n.hidden = true));
    document.querySelectorAll("[data-note]").forEach((b) => b.classList.remove("active"));
    document.getElementById(btn.dataset.note).hidden = false;
    btn.classList.add("active");
  });
});

// ----- Mail: open the visitor's email app with the message filled in -----
document.getElementById("mail-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = encodeURIComponent(f.get("message") + "\n\n– " + f.get("name"));
  const subject = encodeURIComponent(f.get("subject"));
  window.location.href = `mailto:holly.k.mchugh@gmail.com?subject=${subject}&body=${body}`;
});

// ----- Clock in the menu bar -----
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleString([], {
    weekday: "short", hour: "2-digit", minute: "2-digit",
  });
}
updateClock();
setInterval(updateClock, 30000);
