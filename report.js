function stars(rating) {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return `${full}${empty}`;
}

const ZODIAC_EMOJI = {
  Rat: "🐭",
  Ox: "🐂",
  Tiger: "🐯",
  Rabbit: "🐰",
  Dragon: "🐲",
  Snake: "🐍",
  Horse: "🐴",
  Goat: "🐐",
  Monkey: "🐵",
  Rooster: "🐓",
  Dog: "🐶",
  Pig: "🐷"
};

function card(title, icon, body, rating) {
  return `
    <article class="card">
      <div class="card-head">
        <h3><span class="card-icon" aria-hidden="true">${icon}</span><strong>${title}</strong></h3>
        <div class="card-rating" aria-label="${rating} out of 5 stars">
          <span class="stars">${stars(rating)}</span>
          <span class="rating-value">${rating}/5</span>
        </div>
      </div>
      <p>${body}</p>
    </article>
  `;
}

function paperCutSvg(zodiacEmoji) {
  return `
    <svg viewBox="0 0 140 140" role="img" aria-label="Traditional paper-cut zodiac motif">
      <rect x="4" y="4" width="132" height="132" rx="8" fill="#b40513" stroke="#ebbe6c" stroke-width="3"></rect>
      <rect x="18" y="18" width="104" height="104" rx="6" fill="none" stroke="#f8dba0" stroke-width="1.6"></rect>
      <circle cx="70" cy="70" r="33" fill="none" stroke="#f7d799" stroke-width="2"></circle>
      <path d="M70 22v96M22 70h96M36 36l68 68M104 36l-68 68" stroke="#f8e4b8" stroke-width="1.5" opacity="0.55"></path>
      <text x="70" y="84" text-anchor="middle" fill="#fdf4dc" font-size="44">${zodiacEmoji}</text>
    </svg>
  `;
}

function fallbackProfileScore(forecast) {
  const confidenceScore = (forecast.confidence && typeof forecast.confidence.score === "number")
    ? forecast.confidence.score
    : 0.55;
  const r = forecast.sectionRatings || {};
  const keys = ["career", "relationships", "money", "healthEnergy", "keyMonths", "doActions", "avoidActions", "ichingLens"];
  const avgStars = keys.reduce((sum, key) => sum + (r[key] || 3), 0) / keys.length;
  const starComponent = (avgStars / 5) * 70;
  const confidenceComponent = confidenceScore * 30;
  return Math.max(0, Math.min(100, Math.round(starComponent + confidenceComponent)));
}

function renderReport(forecast) {
  const panel = document.getElementById("report-panel");
  const empty = document.getElementById("empty-panel");
  const grid = document.getElementById("report-grid");
  const s = forecast.sections;

  document.getElementById("report-title").textContent = forecast.title;
  document.getElementById("report-note").textContent = forecast.yearNote;
  document.getElementById("overall-summary").innerHTML = `<p>${forecast.overallSummary}</p>`;
  document.getElementById("profile-summary").innerHTML = `<p>${forecast.profileSummary}</p>`;
  document.getElementById("zodiac-en").textContent = `Zodiac: ${forecast.zodiac.english}`;
  document.getElementById("zodiac-paper-cut").innerHTML = paperCutSvg(ZODIAC_EMOJI[forecast.zodiac.english] || "✨");
  const profileScore = typeof forecast.profileScore === "number" ? forecast.profileScore : fallbackProfileScore(forecast);
  document.getElementById("profile-score-box").innerHTML = `Profile Score<br><strong>${profileScore}%</strong>`;

  const r = forecast.sectionRatings || {};
  const zodiacIcon = ZODIAC_EMOJI[forecast.zodiac.english] || "✨";

  grid.innerHTML = [
    card("Birth Zodiac", zodiacIcon, s.birthZodiac, r.birthZodiac || 3),
    card("Noble Zodiac", "🤝", s.nobleZodiac, r.nobleZodiac || 3),
    card("Career", "💼", s.career, r.career || 3),
    card("Relationships", "💞", s.relationships, r.relationships || 3),
    card("Money", "💰", s.money, r.money || 3),
    card("Health / Energy", "🧧", s.healthEnergy, r.healthEnergy || 3),
    card("Key Months", "🗓️", s.keyMonths, r.keyMonths || 3),
    card("Do", "✅", s.doActions.join("; "), r.doActions || 3),
    card("Avoid", "⛔", s.avoidActions.join("; "), r.avoidActions || 3),
    card("I Ching Lens", "☯️", s.ichingLens, r.ichingLens || 3)
  ].join("");

  document.getElementById("report-confidence").innerHTML = `Confidence: <span class="pill good">${forecast.confidence.label}</span> (${Math.round(forecast.confidence.score * 100)} / 100)`;

  const assumptionsEl = document.getElementById("report-assumptions");
  assumptionsEl.innerHTML = "";
  if (forecast.assumptions.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No major input assumptions detected.";
    assumptionsEl.appendChild(li);
  } else {
    forecast.assumptions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      assumptionsEl.appendChild(li);
    });
  }

  empty.hidden = true;
  panel.hidden = false;
}

(function init() {
  const raw = sessionStorage.getItem("forecast2026");
  const empty = document.getElementById("empty-panel");

  if (!raw) {
    empty.hidden = false;
    return;
  }

  try {
    const forecast = JSON.parse(raw);
    renderReport(forecast);
  } catch (error) {
    empty.hidden = false;
    return;
  }

  const downloadBtn = document.getElementById("download-pdf-btn");
  downloadBtn.addEventListener("click", () => {
    window.print();
  });
})();
