let timer;
let totalTime = 0;
let remainingTime = 0;

const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const app = document.getElementById("app");

const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

// ==========================
// FULLSCREEN
// ==========================
function enterFullscreen() {
  if (app.requestFullscreen) {
    app.requestFullscreen();
  }
}

// Paksa tetap fullscreen
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && remainingTime > 0) {
    enterFullscreen();
    alert("Focus Mode aktif! Tidak bisa keluar sebelum waktu habis.");
  }
});

// Cegah refresh / keluar
window.addEventListener("beforeunload", (e) => {
  if (remainingTime > 0) {
    e.preventDefault();
    e.returnValue = "";
  }
});

// ==========================
// START
// ==========================
startBtn.addEventListener("click", () => {
  const h = parseInt(inputHours.value) || 0;
  const m = parseInt(inputMinutes.value) || 0;
  const s = parseInt(inputSeconds.value) || 0;

  totalTime = (h * 3600) + (m * 60) + s;

  if (totalTime <= 0) {
    alert("Masukkan waktu yang valid (jam / menit / detik)");
    return;
  }

  remainingTime = totalTime;

  inputHours.disabled = true;
  inputMinutes.disabled = true;
  inputSeconds.disabled = true;
  startBtn.disabled = true;

  enterFullscreen();

  timer = setInterval(updateTimer, 1000);
});

// ==========================
// UPDATE TIMER
// ==========================
function updateTimer() {
  remainingTime--;

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  statusText.textContent =
    `Sisa waktu: ${hours}j ${minutes}m ${seconds}d`;

  const progress = (remainingTime / totalTime) * 100;
  progressBar.style.width = progress + "%";

  if (remainingTime <= 0) {
    clearInterval(timer);
    selesai();
  }
}

// ==========================
// SELESAI
// ==========================
function selesai() {
  statusText.textContent =
    "Waktu habis. Kamu bebas menggunakan gawai 😊";

  progressBar.style.width = "0%";

  inputHours.disabled = false;
  inputMinutes.disabled = false;
  inputSeconds.disabled = false;
  startBtn.disabled = false;

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
