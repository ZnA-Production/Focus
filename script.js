let timer;
let remainingTime = 0;
let totalTime = 0;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const toggleTheme = document.getElementById("toggleTheme");

// Mode gelap / terang
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Meminta izin notifikasi
if ("Notification" in window) {
  Notification.requestPermission();
}

startBtn.addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("minutes").value);

  if (isNaN(minutes) || minutes <= 0) {
    alert("Masukkan waktu yang valid (dalam menit)");
    return;
  }

  remainingTime = minutes * 60;
  totalTime = remainingTime;

  startBtn.style.display = "none";
  stopBtn.style.display = "block";

  status.textContent = "Mode senyap aktif";
  progressBar.style.width = "100%";

  document.title = "🔕 Focus Mode Aktif";

  timer = setInterval(() => {
    remainingTime--;

    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;

    status.textContent = `Sisa waktu: ${min} menit ${sec} detik`;

    const progress = (remainingTime / totalTime) * 100;
    progressBar.style.width = progress + "%";

    if (remainingTime <= 0) {
      clearInterval(timer);
      selesai();
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  selesai(true);
});

function selesai(dihentikan = false) {
  startBtn.style.display = "block";
  stopBtn.style.display = "none";

  document.title = "Focus Mode";
  progressBar.style.width = "0%";

  if (!dihentikan) {
    status.textContent = "Waktu habis. Mode senyap selesai";

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Focus Mode Selesai", {
        body: "Waktu belajar selesai. Kamu bisa menggunakan gawai kembali."
      });
    } else {
      alert("Waktu habis! Mode senyap selesai.");
    }
  } else {
    status.textContent = "Mode senyap dihentikan";
  }
}
