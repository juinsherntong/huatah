document.getElementById("forecast-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = (formData.get("name") || "").toString().trim();
  const dob = (formData.get("dob") || "").toString();
  const country = (formData.get("country") || "").toString().trim();
  const timezone = (formData.get("timezone") || "").toString().trim();
  const birthTime = (formData.get("birthTime") || "").toString();
  const gender = (formData.get("gender") || "").toString();

  if (!name || !dob || !country) {
    alert("Please provide name, date of birth, and country.");
    return;
  }

  const forecast = window.ForecastEngine.buildForecast({
    name,
    dob,
    country,
    timezone,
    birthTime,
    gender
  });

  sessionStorage.setItem("forecast2026", JSON.stringify(forecast));
  window.location.href = "report.html";
});
