let timer;
let remainingTime = 0;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");

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
  startBtn.style.display = "none";
  stopBtn.style.display = "block";

  status.textContent = "Mode senyap aktif";

  // Simulasi mode senyap
  document.title = "🔕 Focus Mode Aktif";

  timer = setInterval(() => {
    remainingTime--;

    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;

    status.textContent = `Sisa waktu: ${min} menit ${sec} detik`;

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

  if (!dihentikan) {
    status.textContent = "Waktu habis. Mode senyap selesai";

    // Notifikasi selesai
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

