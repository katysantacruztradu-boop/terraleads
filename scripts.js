const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const demosFormatter = new Intl.NumberFormat("es-PE", {
  maximumFractionDigits: 0,
});

function calculateOpportunity() {
  const visits = Number(document.querySelector("#visits").value) || 0;
  const currentRate = Number(document.querySelector("#currentRate").value) / 100 || 0;
  const targetRate = Number(document.querySelector("#targetRate").value) / 100 || 0;
  const acv = Number(document.querySelector("#acv").value) || 0;
  const closeRate = Number(document.querySelector("#closeRate").value) / 100 || 0;

  const currentDemos = visits * currentRate;
  const targetDemos = visits * targetRate;
  const incrementalDemos = Math.max(targetDemos - currentDemos, 0);
  const annualOpportunity = incrementalDemos * closeRate * acv * 12;

  document.querySelector("#lostDemos").textContent =
    `${demosFormatter.format(incrementalDemos)} demos potenciales al mes`;
  document.querySelector("#lostRevenue").textContent =
    `Oportunidad anual estimada: ${formatter.format(annualOpportunity)}.`;
}

document.querySelector("#roiForm").addEventListener("submit", (event) => {
  event.preventDefault();
  calculateOpportunity();
});

calculateOpportunity();

const diagnosisForm = document.querySelector("#diagnosisForm");
const formSubmitBtn = document.querySelector("#formSubmitBtn");
const formStatus = document.querySelector("#formStatus");

if (diagnosisForm) {
  diagnosisForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!diagnosisForm.checkValidity()) {
      formStatus.textContent = "Por favor completa todos los campos requeridos.";
      formStatus.style.color = "#c35d45";
      return;
    }

    formSubmitBtn.disabled = true;
    formStatus.textContent = "";

    const data = Object.fromEntries(new FormData(diagnosisForm).entries());
    const body = [
      `Nombre: ${data.nombre}`,
      `Email: ${data.email}`,
      `Empresa: ${data.empresa}`,
      `Web: ${data.web}`,
      `Trafico mensual: ${data.trafico}`,
      `Principal problema: ${data.problema}`,
      `Objetivo 90 dias: ${data.objetivo}`,
    ].join("\n");

    window.location.href =
      `mailto:hola@leadsterra.com?subject=${encodeURIComponent("Diagnostico de conversion")}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = "Se abrirá tu cliente de email para enviar la solicitud.";
    formStatus.style.color = "#0f6f4f";
    formSubmitBtn.disabled = false;
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();

    const targetElement = document.querySelector(anchor.getAttribute("href"));
    if (!targetElement) return;

    const headerOffset = 72;
    const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();
