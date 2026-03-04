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
      <rect x="6" y="6" width="128" height="128" rx="10" fill="#bb0d1b"></rect>
      <circle cx="70" cy="70" r="41" fill="#fdf2d8"></circle>
      <circle cx="70" cy="70" r="29" fill="#bb0d1b"></circle>
      <path d="M70 24 L76 34 L88 34 L79 42 L82 54 L70 47 L58 54 L61 42 L52 34 L64 34 Z" fill="#fdf2d8"></path>
      <path d="M116 24 L120 30 L128 30 L122 35 L124 43 L116 38 L108 43 L110 35 L104 30 L112 30 Z" fill="#fdf2d8" opacity="0.9"></path>
      <path d="M24 24 L28 30 L36 30 L30 35 L32 43 L24 38 L16 43 L18 35 L12 30 L20 30 Z" fill="#fdf2d8" opacity="0.9"></path>
      <path d="M116 116 L120 122 L128 122 L122 127 L124 135 L116 130 L108 135 L110 127 L104 122 L112 122 Z" fill="#fdf2d8" opacity="0.9"></path>
      <path d="M24 116 L28 122 L36 122 L30 127 L32 135 L24 130 L16 135 L18 127 L12 122 L20 122 Z" fill="#fdf2d8" opacity="0.9"></path>
      <text x="70" y="84" text-anchor="middle" fill="#fdf2d8" font-size="42">${zodiacEmoji}</text>
    </svg>
  `;
}

function fallbackProfileScore(forecast) {
  const confidenceScore = (forecast.confidence && typeof forecast.confidence.score === "number")
    ? forecast.confidence.score
    : 0.55;
  const r = forecast.sectionRatings || {};
  const weightedSections = [
    { key: "career", weight: 0.2 },
    { key: "relationships", weight: 0.16 },
    { key: "money", weight: 0.2 },
    { key: "healthEnergy", weight: 0.16 },
    { key: "keyMonths", weight: 0.1 },
    { key: "doActions", weight: 0.08 },
    { key: "avoidActions", weight: 0.05 },
    { key: "ichingLens", weight: 0.03 },
    { key: "nobleZodiac", weight: 0.02 }
  ];
  const weightedStars = weightedSections.reduce((acc, item) => {
    return acc + (r[item.key] || 3) * item.weight;
  }, 0);
  const base = (weightedStars / 5) * 100;
  const confidenceAdjustment = (confidenceScore - 0.55) * 18;
  return Math.max(0, Math.min(100, Math.round(base + confidenceAdjustment)));
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
