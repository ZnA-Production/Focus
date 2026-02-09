let timer = null;
let totalTime = 0;
let remainingTime = 0;

const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const app = document.getElementById("app");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const themeToggle = document.getElementById("themeToggle");

// ================= FULLSCREEN =================
function requestFullScreen() {
  if (app.requestFullscreen) app.requestFullscreen();
  else if (app.webkitRequestFullscreen) app.webkitRequestFullscreen();
}

// ================= START =================
startBtn.addEventListener("click", () => {
  const h = parseInt(hoursInput.value) || 0;
  const m = parseInt(minutesInput.value) || 0;
  const s = parseInt(secondsInput.value) || 0;

  totalTime = h * 3600 + m * 60 + s;

  if (totalTime <= 0) {
    alert("Masukkan waktu yang valid!");
    return;
  }

  requestFullScreen();

  remainingTime = totalTime;

  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  startBtn.disabled = true;

  timer = setInterval(updateTimer, 1000);
});

// ================= TIMER =================
function updateTimer() {
  remainingTime--;

  const h = Math.floor(remainingTime / 3600);
  const m = Math.floor((remainingTime % 3600) / 60);
  const s = remainingTime % 60;

  statusText.textContent = `Sisa waktu: ${h}j ${m}m ${s}d`;

  progressBar.style.width = (remainingTime / totalTime) * 100 + "%";

  if (remainingTime <= 0) {
    clearInterval(timer);
    selesai();
  }
}

// ================= SELESAI =================
function selesai() {
  statusText.textContent = "Waktu habis. Fokus selesai ✅";
  progressBar.style.width = "0%";

  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  startBtn.disabled = false;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

// ================= THEME TOGGLE =================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});
