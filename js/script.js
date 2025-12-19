function sendMessage() {
  alert("Pesan berhasil dikirim. Terima kasih!");
}

function showDetail(project) {
  alert("Detail project: " + project);
}

// STEP AKTIF SAAT INI (dimulai dari 0 = step pertama)
let currentStep = 0;

// FUNGSI SIMULASI ALUR LAYANAN
function nextStep() {
  // Ambil semua elemen dengan class "step"
  const steps = document.querySelectorAll(".step");

  // Hapus status aktif dari step sekarang
  steps[currentStep].classList.remove("active");

  // Pindah ke step berikutnya
  currentStep++;

  // Kalau sudah step terakhir, balik ke awal
  if (currentStep >= steps.length) {
    currentStep = 0;
  }

  // Aktifkan step yang baru
  steps[currentStep].classList.add("active");
}


function submitTicket() {
  alert("Tiket berhasil dikirim.\nStatus: Menunggu Analisis");
}


