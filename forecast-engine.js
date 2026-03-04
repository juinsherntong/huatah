const STEMS = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"];
const BRANCHES = ["Zi (Rat)", "Chou (Ox)", "Yin (Tiger)", "Mao (Rabbit)", "Chen (Dragon)", "Si (Snake)", "Wu (Horse)", "Wei (Goat)", "Shen (Monkey)", "You (Rooster)", "Xu (Dog)", "Hai (Pig)"];
const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];
const ZODIAC_ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
const BRANCH_TO_INDEX = {
  zi: 0,
  chou: 1,
  yin: 2,
  mao: 3,
  chen: 4,
  si: 5,
  wu: 6,
  wei: 7,
  shen: 8,
  you: 9,
  xu: 10,
  hai: 11
};
const ZODIAC_CN = {
  Rat: "鼠",
  Ox: "牛",
  Tiger: "虎",
  Rabbit: "兔",
  Dragon: "龙",
  Snake: "蛇",
  Horse: "马",
  Goat: "羊",
  Monkey: "猴",
  Rooster: "鸡",
  Dog: "狗",
  Pig: "猪"
};

const HORSE_YEAR_NOTE = "Using lunar-year method: Horse year 2026 (丙午 / Fire Horse) runs from 2026-02-17 to 2027-02-05. Optional solar-term interpretation: Li Chun starts around 2026-02-04.";
const HORSE_YEAR_NOTE_ZH = "采用农历年口径：2026 马年（丙午 / 火马）为 2026-02-17 至 2027-02-05。可选节气口径：立春约在 2026-02-04。";

const ELEMENT_TRAITS = {
  Wood: {
    career: "Growth and long-term planning are favored. Build skills and partnerships before forcing outcomes.",
    relationship: "Communication and emotional flexibility improve connection. Avoid stubborn expectations.",
    money: "Focus on gradual gains. Budgeting and structured investing beat speculative moves.",
    health: "Manage stress with movement and regular sleep. Avoid overcommitting energy.",
    doList: ["Invest in learning", "Expand network intentionally", "Review quarterly goals"],
    avoidList: ["Impulsive career moves", "Emotion-driven spending"]
  },
  Fire: {
    career: "Visibility is high in Fire Horse year; leadership opportunities appear if you stay disciplined.",
    relationship: "Passion is stronger. Balance intensity with listening and patience.",
    money: "Income momentum can rise, but so can spending. Use caps for discretionary expenses.",
    health: "Watch burnout cycles. Alternate high-output periods with recovery windows.",
    doList: ["Pitch ideas publicly", "Schedule recovery days", "Take calculated risks"],
    avoidList: ["Overpromising timelines", "Conflict escalation"]
  },
  Earth: {
    career: "Steady execution and reliability become your advantage in uncertain months.",
    relationship: "Consistency strengthens trust. Small repeated gestures matter more than big declarations.",
    money: "Protect cash flow and build reserves. Conservative decisions are rewarded.",
    health: "Digestive and energy rhythms improve with routine meals and fixed sleep windows.",
    doList: ["Build emergency buffer", "Document processes", "Simplify commitments"],
    avoidList: ["Carrying others' responsibilities", "Delaying practical fixes"]
  },
  Metal: {
    career: "Precision and standards support career progress. Strong year for specialization.",
    relationship: "Clarity helps, but avoid being overly critical in sensitive conversations.",
    money: "Audit subscriptions, debt, and leakages. Efficiency creates real gains.",
    health: "Breathwork and posture work help reduce tension from high mental focus.",
    doList: ["Tighten systems", "Negotiate from data", "Track KPIs monthly"],
    avoidList: ["Perfection paralysis", "All-or-nothing decisions"]
  },
  Water: {
    career: "Adaptability and timing are key. Wait for alignment, then act quickly.",
    relationship: "Empathy increases harmony. Maintain boundaries to avoid emotional overload.",
    money: "Diversify and keep liquidity. Use scenario planning before major commitments.",
    health: "Nervous-system regulation is central; reduce overstimulation and protect recovery time.",
    doList: ["Keep optionality", "Journal major decisions", "Plan for downside"],
    avoidList: ["Vague commitments", "Escaping difficult conversations"]
  }
};

const ELEMENT_TRAITS_ZH = {
  Wood: {
    career: "适合成长与长期规划。先建立能力和合作关系，再推动结果。",
    relationship: "沟通与弹性能提升关系质量，避免固执期待。",
    money: "以稳健增值为主。预算管理与结构化理财优于投机。",
    health: "通过规律运动与睡眠管理压力，避免能量透支。",
    doList: ["投资学习", "有策略地拓展人脉", "按季度复盘目标"],
    avoidList: ["冲动换工作", "情绪化消费"]
  },
  Fire: {
    career: "火马年曝光度较高，保持纪律可获得领导与表现机会。",
    relationship: "情感热度上升，需用倾听与耐心平衡强度。",
    money: "收入动能可提升，但花费也可能增加，建议设定支出上限。",
    health: "留意过劳节奏，在高强度输出后安排恢复周期。",
    doList: ["主动表达与提案", "预留恢复日", "进行可控风险尝试"],
    avoidList: ["过度承诺时间", "升级冲突"]
  },
  Earth: {
    career: "稳健执行与可靠性是优势，适合在波动中积累成果。",
    relationship: "稳定一致可增强信任，持续小行动胜过一次性表达。",
    money: "优先保护现金流与储备，保守决策更容易见效。",
    health: "规律饮食与固定作息有助于维持消化与精力节律。",
    doList: ["建立应急金", "沉淀流程文档", "简化承诺"],
    avoidList: ["替他人长期背责", "拖延现实问题"]
  },
  Metal: {
    career: "精度与标准化有利于发展，适合深耕专业能力。",
    relationship: "清晰表达有帮助，但需避免在敏感话题中过度苛刻。",
    money: "建议审计订阅、负债与资金漏损，效率就是收益。",
    health: "呼吸训练与姿态调整可缓解高强度思考带来的紧绷。",
    doList: ["收紧系统流程", "基于数据谈判", "按月跟踪关键指标"],
    avoidList: ["完美主义拖延", "非黑即白决策"]
  },
  Water: {
    career: "重在适应与时机判断，先等待对齐，再迅速行动。",
    relationship: "同理心有助和谐，但也要设定边界避免情绪过载。",
    money: "建议分散与保持流动性，大额决策前做情景推演。",
    health: "神经系统调节是关键，减少过度刺激并保护恢复时间。",
    doList: ["保留选择空间", "记录关键决策", "做下行情境预案"],
    avoidList: ["模糊承诺", "回避困难对话"]
  }
};

const MONTHS_BY_ELEMENT = {
  Wood: ["March", "April", "November"],
  Fire: ["May", "June", "October"],
  Earth: ["July", "September", "January 2027"],
  Metal: ["August", "September", "December"],
  Water: ["November", "December", "February 2027"]
};

const MONTHS_BY_ELEMENT_ZH = {
  Wood: ["3月", "4月", "11月"],
  Fire: ["5月", "6月", "10月"],
  Earth: ["7月", "9月", "2027年1月"],
  Metal: ["8月", "9月", "12月"],
  Water: ["11月", "12月", "2027年2月"]
};

const SECTION_KEYS = [
  "birthZodiac",
  "nobleZodiac",
  "career",
  "relationships",
  "money",
  "healthEnergy",
  "keyMonths",
  "doActions",
  "avoidActions",
  "ichingLens"
];

const ELEMENT_SHIFT = {
  Wood: 0,
  Fire: 1,
  Earth: 2,
  Metal: 3,
  Water: 4
};

const NOBLE_ZODIAC_MAP = {
  Rat: ["Dragon", "Monkey"],
  Ox: ["Snake", "Rooster"],
  Tiger: ["Horse", "Dog"],
  Rabbit: ["Goat", "Pig"],
  Dragon: ["Rat", "Monkey"],
  Snake: ["Ox", "Rooster"],
  Horse: ["Tiger", "Dog"],
  Goat: ["Rabbit", "Pig"],
  Monkey: ["Rat", "Dragon"],
  Rooster: ["Ox", "Snake"],
  Dog: ["Tiger", "Horse"],
  Pig: ["Rabbit", "Goat"]
};

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function getDayOfYear(dateUtc) {
  const start = new Date(Date.UTC(dateUtc.getUTCFullYear(), 0, 0));
  const diff = dateUtc - start;
  return Math.floor(diff / 86400000);
}

function deriveBirthElement(dateUtc) {
  const day = getDayOfYear(dateUtc);
  return ELEMENTS[day % 5];
}

function deriveYearPillar(gregorianYear) {
  const stem = STEMS[(gregorianYear - 4) % 10];
  const branch = BRANCHES[(gregorianYear - 4) % 12];
  return `${stem} ${branch}`;
}

function deriveZodiac(gregorianYear) {
  return ZODIAC_ANIMALS[(gregorianYear - 4) % 12];
}

function deriveLunarZodiacInfo(dateUtc) {
  try {
    const lunarText = new Intl.DateTimeFormat("en-u-ca-chinese", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    }).format(dateUtc);
    const match = lunarText.match(/(\d{3,4})\(([^)]+)\)/);
    if (!match) {
      throw new Error("Unable to parse lunar calendar output.");
    }

    const lunarYear = Number(match[1]);
    const cycle = match[2].toLowerCase();
    const branch = (cycle.split("-")[1] || "").trim();
    const zodiacIndex = BRANCH_TO_INDEX[branch];

    if (Number.isNaN(lunarYear) || zodiacIndex === undefined) {
      throw new Error("Lunar parse produced invalid values.");
    }

    return {
      lunarYear,
      zodiacIndex,
      method: "lunar-year"
    };
  } catch (error) {
    const fallbackYear = dateUtc.getUTCFullYear();
    return {
      lunarYear: fallbackYear,
      zodiacIndex: (fallbackYear - 4) % 12,
      method: "gregorian-fallback"
    };
  }
}

function getSameZodiacYearsByIndex(zodiacIndex, startYear = 1900, endYear = 2040, excludeYear = null) {
  const years = [];

  for (let year = startYear; year <= endYear; year += 1) {
    if ((year - 4) % 12 === zodiacIndex && year !== excludeYear) {
      years.push(year);
    }
  }

  return years;
}

function getNearbySameZodiacYears(centerYear, zodiacIndex, rangeYears = 48) {
  const full = getSameZodiacYearsByIndex(zodiacIndex, centerYear - rangeYears, centerYear + rangeYears, centerYear);
  return full.filter((year) => year > 1900).sort((a, b) => a - b);
}

function deriveHexagramKey(dobIso) {
  const raw = Number(dobIso.replaceAll("-", "")) + 2026;
  const upper = (raw % 8) + 1;
  const lower = ((Math.floor(raw / 8) % 8) + 1);
  const changing = (raw % 6) + 1;
  return { upper, lower, changing, seed: raw };
}

function deriveConfidence({ birthTime, timezone, country, gender }) {
  let score = 0.55;
  const assumptions = [];
  const assumptionsZh = [];

  if (birthTime) {
    score += 0.25;
  } else {
    assumptions.push("Birth time not provided -> Zi Wei-level precision is reduced.");
    assumptionsZh.push("未提供出生时间 -> 紫微层级精度会下降。");
  }

  if (timezone) {
    score += 0.12;
  } else {
    assumptions.push(`Timezone not provided -> using country-level context from \"${country}\".`);
    assumptionsZh.push(`未提供时区 -> 使用国家层级（${country}）进行推断。`);
  }

  if (gender) {
    score += 0.03;
  } else {
    assumptions.push("Gender not provided -> calculations use non-gendered rule set.");
    assumptionsZh.push("未提供性别 -> 使用非性别化规则集。");
  }

  if (score >= 0.85) {
    return { label: "High", labelZh: "高", score, assumptions, assumptionsZh };
  }

  if (score >= 0.7) {
    return { label: "Medium", labelZh: "中", score, assumptions, assumptionsZh };
  }

  return { label: "Low", labelZh: "低", score, assumptions, assumptionsZh };
}

function deriveSectionRatings(seed, birthElement) {
  const ratings = {};
  const shift = ELEMENT_SHIFT[birthElement];

  SECTION_KEYS.forEach((key, index) => {
    ratings[key] = ((seed + shift + index * 3) % 5) + 1;
  });

  return ratings;
}

function buildOverallSummary({ ratings, birthElement, confidenceLabel }) {
  const avg = Math.round(
    (ratings.career + ratings.relationships + ratings.money + ratings.healthEnergy + ratings.keyMonths) / 5
  );

  const tone = avg >= 4
    ? "Overall momentum looks favorable if you stay consistent."
    : avg >= 3
      ? "Overall momentum is balanced with both openings and caution points."
      : "Overall momentum is more cautious and benefits from steady pacing.";

  return `${tone} Your profile leans ${birthElement}, so use disciplined planning for career and money, keep relationship communication soft, and protect your energy rhythm. Confidence is ${confidenceLabel}.`;
}

function buildOverallSummaryZh({ ratings, birthElement, confidenceLabelZh }) {
  const avg = Math.round(
    (ratings.career + ratings.relationships + ratings.money + ratings.healthEnergy + ratings.keyMonths) / 5
  );

  const tone = avg >= 4
    ? "整体动能偏正向，保持稳定执行更容易放大成果。"
    : avg >= 3
      ? "整体动能中性偏平衡，机会与提醒并存。"
      : "整体动能偏谨慎，适合放慢节奏稳步推进。";

  return `${tone} 你的底层属性偏${birthElement}，事业与财务建议以纪律和规划为主，关系上保持柔和沟通，并优先照顾能量节律。当前置信度为${confidenceLabelZh}。`;
}

function deriveProfileScore({ confidenceScore, sectionRatings }) {
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
    return acc + (sectionRatings[item.key] || 3) * item.weight;
  }, 0);

  const base = (weightedStars / 5) * 100;
  const confidenceAdjustment = (confidenceScore - 0.55) * 18;
  const finalScore = base + confidenceAdjustment;

  return Math.max(0, Math.min(100, Math.round(finalScore)));
}

function buildForecast({ name, dob, country, timezone, birthTime, gender }) {
  const dateUtc = parseISODate(dob);
  const birthYear = dateUtc.getUTCFullYear();
  const zodiacInfo = deriveLunarZodiacInfo(dateUtc);
  const birthElement = deriveBirthElement(dateUtc);
  const yearPillarBirth = deriveYearPillar(birthYear);
  const zodiac = ZODIAC_ANIMALS[zodiacInfo.zodiacIndex];
  const zodiacCn = ZODIAC_CN[zodiac];
  const nobleZodiacEn = NOBLE_ZODIAC_MAP[zodiac] || [];
  const nobleZodiacZh = nobleZodiacEn.map((item) => ZODIAC_CN[item]);
  const sameZodiacYears = getNearbySameZodiacYears(zodiacInfo.lunarYear, zodiacInfo.zodiacIndex);
  const confidence = deriveConfidence({ birthTime, timezone, country, gender });
  const hex = deriveHexagramKey(dob);
  const traits = ELEMENT_TRAITS[birthElement];
  const traitsZh = ELEMENT_TRAITS_ZH[birthElement];
  const sectionRatings = deriveSectionRatings(hex.seed, birthElement);
  const overallSummary = buildOverallSummary({
    ratings: sectionRatings,
    birthElement,
    confidenceLabel: confidence.label
  });
  const overallSummaryZh = buildOverallSummaryZh({
    ratings: sectionRatings,
    birthElement,
    confidenceLabelZh: confidence.labelZh
  });
  const profileScore = deriveProfileScore({
    confidenceScore: confidence.score,
    sectionRatings
  });

  return {
    title: `${name}'s 2026 Fire Horse Forecast`,
    titleZh: `${name} 的 2026 丙午流年预测`,
    yearNote: HORSE_YEAR_NOTE,
    yearNoteZh: HORSE_YEAR_NOTE_ZH,
    profileSummary: `Profile anchor: ${birthElement} (derived from DOB day-of-year). Birth-year pillar: ${yearPillarBirth}. 2026 pillar: Bing Wu (Fire Horse).`,
    profileSummaryZh: `命盘锚点：${birthElement}（由出生日期在年内序数推导）。出生年柱：${yearPillarBirth}。2026 年固定为丙午（火马）。`,
    overallSummary,
    overallSummaryZh,
    profileScore,
    zodiac: {
      english: zodiac,
      chinese: zodiacCn,
      sameYears: sameZodiacYears,
      baseYear: zodiacInfo.lunarYear,
      method: zodiacInfo.method,
      noble: {
        english: nobleZodiacEn,
        chinese: nobleZodiacZh
      }
    },
    sections: {
      birthZodiac: `Your zodiac is ${zodiac}. Other years with the same zodiac: ${sameZodiacYears.join(", ")}. Zodiac base year used: ${zodiacInfo.lunarYear} (${zodiacInfo.method}).`,
      nobleZodiac: `Your noble zodiac allies are ${nobleZodiacEn.join(" and ")}. These signs are traditionally considered supportive for cooperation, mentorship, and timing.`,
      career: traits.career,
      relationships: traits.relationship,
      money: traits.money,
      healthEnergy: traits.health,
      keyMonths: `${MONTHS_BY_ELEMENT[birthElement].join(", ")} are your strongest activation windows in the 2026 Horse year cycle.`,
      doActions: traits.doList,
      avoidActions: traits.avoidList,
      ichingLens: `Main hexagram key from DOB+2026 seed ${hex.seed}: upper trigram ${hex.upper}, lower trigram ${hex.lower}, changing line ${hex.changing}. Read this as timing guidance, not fixed fate.`
    },
    sectionsZh: {
      birthZodiac: `你的生肖是${zodiacCn}（${zodiac}）。同生肖年份有：${sameZodiacYears.join("、")}。生肖基准年：${zodiacInfo.lunarYear}（${zodiacInfo.method}）。`,
      nobleZodiac: `你的贵人生肖为${nobleZodiacZh.join("、")}（${nobleZodiacEn.join(" / ")}）。传统上这些生肖更容易在合作、人脉与关键节点上带来助力。`,
      career: traitsZh.career,
      relationships: traitsZh.relationship,
      money: traitsZh.money,
      healthEnergy: traitsZh.health,
      keyMonths: `${MONTHS_BY_ELEMENT_ZH[birthElement].join("、")}为你在 2026 马年周期中的重点月份。`,
      doActions: traitsZh.doList,
      avoidActions: traitsZh.avoidList,
      ichingLens: `由 DOB+2026 种子 ${hex.seed} 推导的卦象键：上卦 ${hex.upper}、下卦 ${hex.lower}、动爻 ${hex.changing}。建议将其视为节奏参考，而非绝对命定。`
    },
    sectionRatings,
    confidence,
    assumptions: confidence.assumptions,
    assumptionsZh: confidence.assumptionsZh,
    input: {
      name,
      dob,
      country,
      timezone: timezone || null,
      birthTime: birthTime || null,
      gender: gender || null
    },
    generatedAtIso: new Date().toISOString()
  };
}

window.ForecastEngine = {
  buildForecast
};
