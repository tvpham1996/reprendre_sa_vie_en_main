// script.js

const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");

// Profils
const PROFILES = {
  perdue: "La perdue silencieuse",
  conformiste: "La conformiste involontaire",
  ambitieuse: "L’ambitieuse paralysée",
  epuisee: "L’infatigable épuisée",
};

// Scores init
let scores = {
  perdue: 0,
  conformiste: 0,
  ambitieuse: 0,
  epuisee: 0,
};

let currentStep = "intro"; // "intro" ou index de question
let currentQuestionIndex = 0;

// --- Contenu intro ---

const introParagraphs = [
  "Si tu es là, c’est qu’au fond… tu veux que quelque chose change.",
  "Peut-être que tu sais ce que c’est. Peut-être pas encore.",
  "Dans tous les cas, je vais t’aider à y voir plus clair.",
  "Mais soyons honnête : si tu veux que ta vie évolue, tu vas devoir t’impliquer.",
  "Et crois-moi… si tu as cliqué, c’est que tu es prête à prendre ta vie au sérieux, j'en suis convaincue !",
  "Alors on y va. 😉",
  "On va commencer par échanger un peu toutes les deux, afin que je cerne un peu plus pourquoi tu es là. 🙂",
];

// --- Questions ---

const questions = [
  {
    id: "Q1",
    text: "Si tu devais résumer comment tu te sens dans ta vie :",
    answers: [
      {
        key: "A",
        label: "Je me sens perdue, je ne sais plus trop où je vais.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "Je suis sur des rails… mais pas les miens.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "J’ai envie de changer des trucs, mais j’hésite.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "Je fonce… mais je suis à bout.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "Un peu de tout ça.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Je ne sais même pas comment répondre à ça.",
        score: { perdue: 1 },
      },
    ],
  },
  {
    id: "Q2",
    text: "Ce qui te pèse le plus là, c’est…",
    answers: [
      {
        key: "A",
        label: "De ne pas savoir quoi faire de ma vie.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "De vivre un truc qui ne me ressemble pas.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "De vouloir bouger, mais ne pas réussir à y aller.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "De me sentir fatiguée juste à exister.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "C’est un mélange de plein de choses.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Honnêtement, je ne sais pas.",
        score: { perdue: 1 },
      },
    ],
  },
  {
    id: "Q3",
    text: "En ce moment, ton énergie mentale…",
    answers: [
      {
        key: "A",
        label: "Elle est en mode : néant total.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "Elle sert surtout à tenir la façade.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "Elle part dans des idées… mais rien ne se passe.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "Elle est cramée. Clairement.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "Ça dépend des jours.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Je ne sais pas trop.",
        score: { perdue: 1 },
      },
    ],
  },
  {
    id: "Q4",
    text: "Ce qui t’empêche vraiment d’avancer…",
    answers: [
      {
        key: "A",
        label: "Je n’ai aucune idée par où commencer.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "J’ai peur de décevoir / déranger.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "Je n’ose pas.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "Je n’ai juste plus d’énergie.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "Un peu tout ça.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Je ne veux pas me poser la question.",
        score: { perdue: 1 },
      },
    ],
  },
  {
    id: "Q5",
    text: "Quand tu penses à ton futur…",
    answers: [
      {
        key: "A",
        label: "Ça me stresse.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "Je croise les doigts que ça se passe bien.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "Je vois des trucs cool… mais je ne m’y vois pas.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "Je n’ai pas envie d’y penser.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "Ça change toutes les 5 minutes.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Pas d’idée du tout.",
        score: { perdue: 1 },
      },
    ],
  },
  {
    id: "Q6",
    text: "Au fond, tu voudrais surtout…",
    answers: [
      {
        key: "A",
        label: "Trouver un sens à tout ça.",
        score: { perdue: 2 },
      },
      {
        key: "B",
        label: "Faire un truc qui me ressemble vraiment.",
        score: { conformiste: 2 },
      },
      {
        key: "C",
        label: "Passer à l’action pour de bon.",
        score: { ambitieuse: 2 },
      },
      {
        key: "D",
        label: "Souffler. Juste souffler.",
        score: { epuisee: 2 },
      },
      {
        key: "E",
        label: "J’en veux plusieurs.",
        score: { perdue: 1, conformiste: 1, ambitieuse: 1, epuisee: 1 },
      },
      {
        key: "F",
        label: "Je ne sais pas encore.",
        score: { perdue: 1 },
      },
    ],
  },
];

// --- Rendering ---

function renderIntro() {
  progressEl.textContent = "";

  textEl.innerHTML = "";
  introParagraphs.forEach((para) => {
    const p = document.createElement("p");
    p.textContent = para;
    textEl.appendChild(p);
  });

  choicesEl.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Commencer";
  btn.addEventListener("click", () => {
    currentStep = "questions";
    currentQuestionIndex = 0;
    renderQuestion();
  });
  choicesEl.appendChild(btn);
}

function renderQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) {
    renderResult();
    return;
  }

  progressEl.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  textEl.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = q.text;
  textEl.appendChild(p);

  choicesEl.innerHTML = "";
  q.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = `${ans.key} — ${ans.label}`;
    btn.addEventListener("click", () => {
      applyScore(ans.score);
      currentQuestionIndex += 1;
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });
    choicesEl.appendChild(btn);
  });
}

function applyScore(scoreObj) {
  Object.entries(scoreObj).forEach(([key, value]) => {
    scores[key] += value;
  });
}

function renderResult() {
  progressEl.textContent = "Résultat (prototype)";

  textEl.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "Voilà ce qui ressort de tes réponses pour l’instant. Ce n’est qu’une estimation, mais ça nous donne déjà une tendance :";
  textEl.appendChild(p);

  const total =
    scores.perdue + scores.conformiste + scores.ambitieuse + scores.epuisee;

  const container = document.createElement("div");
  container.className = "result-profiles";

  if (total === 0) {
    const p0 = document.createElement("p");
    p0.textContent =
      "Pour l’instant, je n’arrive pas encore à déterminer un profil clair. Ce n’est pas grave : ça veut surtout dire qu’on devra affiner plus tard. 🙂";
    container.appendChild(p0);
  } else {
    Object.entries(scores).forEach(([key, value]) => {
      const percent = Math.round((value / total) * 100);
      const line = document.createElement("p");
      line.textContent = `${PROFILES[key]} : ${percent}%`;
      container.appendChild(line);
    });
  }

  textEl.appendChild(container);

  choicesEl.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Recommencer le test";
  btn.addEventListener("click", () => {
    // reset
    scores = { perdue: 0, conformiste: 0, ambitieuse: 0, epuisee: 0 };
    currentStep = "intro";
    currentQuestionIndex = 0;
    renderIntro();
  });
  choicesEl.appendChild(btn);
}

// Lancer
renderIntro();
