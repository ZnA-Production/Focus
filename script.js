let timer = null;
let totalTime = 0;
let remainingTime = 0;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const toggleTheme = document.getElementById("toggleTheme");

// ======================
// MODE GELAP / TERANG
// ======================
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleTheme.textContent = "☀️";
  } else {
    toggleTheme.textContent = "🌙";
  }
});

// ======================
// IZIN NOTIFIKASI
// ======================
if ("Notification" in window) {
  Notification.requestPermission();
}

// ======================
// MULAI TIMER
// ======================
startBtn.addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("minutes").value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Masukkan waktu yang valid (minimal 1 menit)");
    return;
  }

  totalTime = minutes * 60;
  remainingTime = totalTime;

  startBtn.hidden = true;
  stopBtn.hidden = false;

  statusText.textContent = "Mode senyap aktif";
  progressBar.style.width = "100%";
  document.title = "🔕 Focus Mode Aktif";

  timer = setInterval(updateTimer, 1000);
});

// ======================
// HENTIKAN TIMER
// ======================
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  selesai(true);
});

// ======================
// UPDATE WAKTU
// ======================
function updateTimer() {
  remainingTime--;

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  statusText.textContent = 
    `Sisa waktu: ${minutes} menit ${seconds} detik`;

  const progress = (remainingTime / totalTime) * 100;
  progressBar.style.width = progress + "%";

  if (remainingTime <= 0) {
    clearInterval(timer);
    selesai(false);
  }
}

// ======================
// SELESAI
// ======================
function selesai(dihentikan) {
  startBtn.hidden = false;
  stopBtn.hidden = true;

  document.title = "Focus Mode";
  progressBar.style.width = "0%";

  if (dihentikan) {
    statusText.textContent = "Mode senyap dihentikan";
    return;
  }

  statusText.textContent = "Waktu habis. Mode senyap selesai";

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Focus Mode Selesai", {
      body: "Waktu belajar selesai. Kamu bisa menggunakan gawai kembali."
    });
  } else {
    alert("Waktu habis! Mode senyap selesai.");
  }
}
