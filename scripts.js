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

// Form submission handler for diagnosis form
const diagnosisForm = document.getElementById("diagnosisForm");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const formStatus = document.getElementById("formStatus");

if (diagnosisForm) {
  diagnosisForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!diagnosisForm.checkValidity()) {
      formStatus.textContent = "Por favor completa todos los campos requeridos.";
      formStatus.style.color = "#c35d45";
      return;
    }
    
    // Show loading state
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = "Enviando...";
    formStatus.textContent = "";
    
    // Collect form data
    const formData = new FormData(diagnosisForm);
    const data = Object.fromEntries(formData.entries());
    
    // IMPORTANT: Replace with your Formspree endpoint or other form service
    // Example: https://formspree.io/f/YOUR_FORM_ID
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        formStatus.textContent = "¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.";
        formStatus.style.color = "#0f6f4f";
        diagnosisForm.reset();
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      formStatus.textContent = "Hubo un error al enviar. Por favor intenta nuevamente o escribe directamente a hola@kathyweb.com";
      formStatus.style.color = "#c35d45";
    } finally {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = "Enviar para revision";
    }
  });
}

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 72;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Add active section indicator in navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.style.color = "var(--green)";
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();
