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
