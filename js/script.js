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

const params = new URLSearchParams(window.location.search);
const service = params.get("service");

if (service) {
  const textarea = document.querySelector("textarea");
  if (textarea) {
    textarea.value =
      "Konsultasi layanan: " + service.replace("-", " ");
  }
}

if (service) {
  const selectService = document.getElementById("service");
  if (selectService) {
    selectService.value = service.replace("-", " ");
  }
}

// FUNGSI SIMULASI TIKET LAYANAN
function submitTicket() {
  const service = document.getElementById("service").value;
  const name = document.querySelector('input[placeholder="Nama"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const message = document.querySelector("textarea").value;

  const ticket = {
    id: "TKT-" + Date.now(),
    service,
    name,
    email,
    message,
    status: "Menunggu Analisis",
    reply: ""
  };

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));

  alert("Tiket berhasil dikirim.\nStatus: Menunggu Analisis");

  document.querySelector("form").reset();
}

function loadTickets() {
  const container = document.getElementById("ticketList");
  if (!container) return;

  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  if (tickets.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Belum ada tiket.</p>";
    return;
  }

  container.innerHTML = "";

  tickets.forEach(ticket => {
container.innerHTML += `
  <div class="ticket-card">
    <!-- HEADER -->
    <div class="ticket-header">
      <div class="ticket-left">
        <input 
          type="checkbox" 
          class="ticket-checkbox" 
          value="${ticket.id}"
        >
        <div>
          <h3 class="ticket-id">${ticket.id}</h3>
          <span class="ticket-service">${ticket.service}</span>
        </div>
      </div>

      <span class="ticket-status status-${ticket.status.replace(" ", "-")}">
        ${ticket.status}
      </span>
    </div>

    <!-- BODY -->
    <div class="ticket-content">
      <div class="ticket-row">
        <span class="ticket-label">Masalah</span>
        <p class="ticket-text">${ticket.message}</p>
      </div>

      <div class="ticket-row">
        <span class="ticket-label">Jawaban Teknisi</span>
        <p class="ticket-text">
          ${ticket.reply || "<em>Belum ada respon</em>"}
        </p>
      </div>
    </div>
  </div>
    `;
  });
}

loadTickets();

let tickets = JSON.parse(localStorage.getItem("tickets"));
tickets[0].status = "Selesai";
tickets[0].reply = "Silakan reset password melalui menu recovery Windows.";
localStorage.setItem("tickets", JSON.stringify(tickets));



function deleteSelectedTickets() {
  const checked = document.querySelectorAll(".ticket-checkbox:checked");

  if (checked.length === 0) {
    alert("Pilih minimal satu tiket yang ingin dihapus.");
    return;
  }

  if (!confirm(`Hapus ${checked.length} tiket terpilih?`)) return;

  const idsToDelete = Array.from(checked).map(cb => cb.value);

  let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets = tickets.filter(ticket => !idsToDelete.includes(ticket.id));

  localStorage.setItem("tickets", JSON.stringify(tickets));
  loadTickets();
}

document.addEventListener("click", e => {
  const card = e.target.closest(".ticket-card");
  if (!card) return;

  const checkbox = card.querySelector(".ticket-checkbox");
  if (e.target !== checkbox) {
    checkbox.checked = !checkbox.checked;
  }
});

