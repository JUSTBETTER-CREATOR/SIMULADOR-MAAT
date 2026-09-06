const questions = [
  {
    topic: "Acceso",
    title: "Registro de asistencia",
    scenario: "Ya realizaste la prueba de vida del ejecutivo y MAAT solicita permisos para continuar con el registro de asistencia.",
    question: "¿Qué debes hacer?",
    options: [
      "Rechazar los permisos de geolocalización",
      "Aceptar geolocalización y seleccionar el punto de venta correspondiente",
      "Cerrar la aplicación y volver a ingresar"
    ],
    correct: 1,
    feedback: "En el registro de asistencia deben aceptarse los permisos de geolocalización y seleccionarse los puntos de venta correspondientes.",
    mock: `<div class="mock-box"><strong>📍 Registro de asistencia</strong>MAAT solicita acceso a tu ubicación para registrar el punto de venta.</div>`
  },
  {
    topic: "Identificación",
    title: "Método de identificación",
    scenario: "El cliente desea realizar el trámite y presenta una licencia de conducir.",
    question: "¿Cuál es la acción correcta según el flujo mostrado?",
    options: [
      "Continuar con la licencia",
      "Solicitar INE o pasaporte",
      "Tomar fotografía de la licencia y continuar"
    ],
    correct: 1,
    feedback: "El material indica que actualmente se acepta INE o pasaporte como método de identificación.",
    mock: `<div class="mock-box"><strong>🪪 Selección de ID</strong>Documento presentado: Licencia de conducir</div>`
  },
  {
    topic: "INE",
    title: "Vista previa de identificación",
    scenario: "La fotografía de la INE quedó girada y el rostro del cliente no aparece en la orientación esperada.",
    question: "¿Qué debes hacer antes de continuar?",
    options: [
      "Continuar; MAAT la corregirá después",
      "Usar los controles para girar la imagen y dejarla en posición correcta",
      "Tomar una captura de pantalla"
    ],
    correct: 1,
    feedback: "La miniatura debe quedar horizontal y correctamente orientada antes de continuar.",
    mock: `<div class="ine-card"><div class="ine-face">👤</div><div class="ine-lines"><strong>INE · Vista previa</strong><div></div><div></div><div></div><div></div></div></div>`
  },
  {
    topic: "Solicitud",
    title: "Confirmación de datos",
    scenario: "MAAT precargó información obtenida de la identificación del prospecto.",
    question: "¿Cómo debe tratarse la información precargada?",
    options: [
      "Se acepta automáticamente porque proviene de la INE",
      "Debe confirmarse con el cliente y/o contra la identificación, según el dato",
      "Solo se revisa el nombre"
    ],
    correct: 1,
    feedback: "El procedimiento indica que la información precargada debe ser confirmada con el cliente y los datos de INE contra la identificación.",
    mock: `<div class="mock-box"><strong>🧾 Captura de solicitud</strong>Nombre, domicilio y datos de identificación precargados.</div>`
  },
  {
    topic: "Validación",
    title: "Confirmación preventiva",
    scenario: "Terminaste la captura de datos y MAAT muestra una pantalla antes de enviar el trámite a aprobación.",
    question: "¿Para qué sirve esta pantalla?",
    options: [
      "Para que el cliente valide la captura o se realicen modificaciones",
      "Para activar la tarjeta",
      "Para registrar el NIP"
    ],
    correct: 0,
    feedback: "La confirmación preventiva se muestra justo antes de enviar el trámite al proceso de aprobación para validar la captura.",
    mock: `<div class="mock-box"><strong>⚠️ Confirmación preventiva</strong>Revise que la información capturada sea correcta antes de continuar.</div>`
  },
  {
    topic: "Domicilio",
    title: "Comprobante de domicilio",
    scenario: "La INE del cliente tiene domicilio oculto y el flujo habilita la carga de documentos.",
    question: "¿Qué corresponde hacer?",
    options: [
      "Continuar sin comprobante",
      "Solicitar al cliente cargar el comprobante mediante QR o SMS desde su celular",
      "Tomar una foto del comprobante desde la tableta del ejecutivo"
    ],
    correct: 1,
    feedback: "Cuando aplica, el cliente debe realizar la carga del comprobante mediante el proceso habilitado por MAAT, usando QR o SMS.",
    mock: `<div class="mock-box"><strong>🏠 Domicilio</strong>Domicilio de INE: OCULTO<br><br>Se habilitó carga de comprobante.</div>`
  },
  {
    topic: "Prueba de vida",
    title: "Prueba de vida del cliente",
    scenario: "La prueba de vida del cliente no fue exitosa en el primer intento.",
    question: "¿Qué indica el material del proceso?",
    options: [
      "Cancelar automáticamente el trámite",
      "Puede intentarse nuevamente; sin una prueba exitosa no se puede concluir",
      "Continuar aunque falle"
    ],
    correct: 1,
    feedback: "El material señala que puede intentarse nuevamente, pero sin una prueba de vida exitosa no se puede concluir el trámite.",
    mock: `<div class="mock-box"><strong>🙂 Prueba de vida</strong>Resultado: No exitosa<br>Acción requerida para continuar.</div>`
  },
  {
    topic: "Video",
    title: "Condición económica",
    scenario: "Durante el video de confirmación de condición económica, el cliente responde verbalmente “Sí”.",
    question: "¿Qué acción adicional debe realizar?",
    options: [
      "Nada; con la respuesta verbal basta",
      "Dar clic en “Aceptar”",
      "Cerrar el video"
    ],
    correct: 1,
    feedback: "El flujo indica confirmación verbal con “Sí” o “Acepto” y además dar clic en “Aceptar”.",
    mock: `<div class="mock-box"><strong>🎥 Confirmación de condición económica</strong>Cliente: “Sí”<br><br><button disabled>ACEPTAR</button></div>`
  },
  {
    topic: "Activación",
    title: "Tipo de activación",
    scenario: "La tarjeta no fue activada mediante la app INVEX Control.",
    question: "¿Qué sigue en el flujo mostrado?",
    options: [
      "Registrar el tipo de activación y continuar con el flujo de activación en MAAT",
      "Dar por terminado el trámite",
      "Entregar la tarjeta sin activar"
    ],
    correct: 0,
    feedback: "Si no se activó mediante INVEX Control, el flujo continúa con el proceso de activación en MAAT.",
    mock: `<div class="mock-box"><strong>💳 Tipo de activación</strong>INVEX Control: NO<br>Continuar con activación en MAAT.</div>`
  },
  {
    topic: "NIP",
    title: "Asignación de NIP",
    scenario: "El cliente fue activado mediante el flujo de MAAT y ya se registró el token correspondiente.",
    question: "¿Qué paso sigue de acuerdo con el material?",
    options: [
      "Asignación de NIP",
      "Nueva consulta de Buró",
      "Nueva captura de INE"
    ],
    correct: 0,
    feedback: "Después de la activación mediante MAAT, el procedimiento mostrado continúa con la asignación de NIP.",
    mock: `<div class="mock-box"><strong>🔐 Activación completada</strong>Token registrado correctamente.<br>Seleccione el siguiente paso.</div>`
  }
];

let current = 0;
let score = 0;
let answersLog = [];
let participant = {};

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const progressWrap = document.getElementById("progressWrap");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const liveScore = document.getElementById("liveScore");
const topicList = document.getElementById("topicList");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function buildTopicList() {
  const topics = [...new Set(questions.map(q => q.topic))];
  topicList.innerHTML = topics.map(t => `<div class="topic-chip" data-topic="${t}">${t}</div>`).join("");
}

function renderQuestion() {
  const q = questions[current];

  progressText.textContent = `Caso ${current + 1} de ${questions.length}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  document.getElementById("stepBadge").textContent = q.topic.toUpperCase();
  document.getElementById("questionTitle").textContent = q.title;
  document.getElementById("questionScenario").textContent = q.scenario;
  document.getElementById("questionText").textContent = q.question;
  document.getElementById("mockArea").innerHTML = q.mock;

  document.querySelectorAll(".topic-chip").forEach(el => {
    el.classList.toggle("active", el.dataset.topic === q.topic);
  });

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => answerQuestion(i, btn));
    answers.appendChild(btn);
  });

  feedback.className = "feedback hidden";
  feedback.innerHTML = "";
  nextBtn.classList.add("hidden");
}

function answerQuestion(selected, selectedBtn) {
  const q = questions[current];
  const isCorrect = selected === q.correct;

  document.querySelectorAll(".answer-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    if (i === selected && !isCorrect) btn.classList.add("incorrect");
  });

  if (isCorrect) score += 10;
  liveScore.textContent = score;

  answersLog.push({
    topic: q.topic,
    title: q.title,
    selected: q.options[selected],
    correctAnswer: q.options[q.correct],
    isCorrect
  });

  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  feedback.innerHTML = isCorrect
    ? `<strong>✅ Correcto</strong><br>${q.feedback}`
    : `<strong>❌ Incorrecto</strong><br>${q.feedback}`;

  nextBtn.classList.remove("hidden");
}

function finishQuiz() {
  progressWrap.classList.add("hidden");
  showScreen(resultScreen);

  const correct = answersLog.filter(a => a.isCorrect).length;
  const incorrect = questions.length - correct;

  document.getElementById("resultName").textContent = participant.name;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("incorrectCount").textContent = incorrect;
  document.getElementById("resultRegion").textContent = participant.region || "—";

  let status = "";
  let message = "";

  if (score >= 90) {
    status = "🏆 EXPERTO MAAT";
    message = "Excelente dominio del proceso. Mantén el enfoque en la ejecución correcta de cada paso.";
  } else if (score >= 80) {
    status = "✅ APROBADO";
    message = "Buen dominio general del proceso. Revisa los temas marcados para reforzar.";
  } else if (score >= 70) {
    status = "⚠️ REQUIERE REFUERZO";
    message = "Hay conocimiento del flujo, pero conviene reforzar los pasos donde hubo errores.";
  } else {
    status = "❌ NO APROBADO";
    message = "Es necesario repasar el proceso antes de repetir la evaluación.";
  }

  document.getElementById("resultStatus").textContent = status;
  document.getElementById("resultMessage").textContent = message;

  const byTopic = {};
  questions.forEach(q => {
    if (!byTopic[q.topic]) byTopic[q.topic] = {total: 0, ok: 0};
    byTopic[q.topic].total++;
  });
  answersLog.forEach(a => {
    if (a.isCorrect) byTopic[a.topic].ok++;
  });

  const breakdown = document.getElementById("breakdown");
  breakdown.innerHTML = Object.entries(byTopic).map(([topic, data]) => {
    const pct = Math.round((data.ok / data.total) * 100);
    return `
      <div class="break-row">
        <span>${topic}</span>
        <div class="break-track"><div class="break-fill" style="width:${pct}%"></div></div>
        <strong>${pct}%</strong>
      </div>`;
  }).join("");

  const weak = Object.entries(byTopic)
    .filter(([_, data]) => data.ok < data.total)
    .map(([topic]) => topic);

  document.getElementById("reinforce").innerHTML = weak.length
    ? weak.map(t => `<span>${t}</span>`).join("")
    : `<span>Sin temas pendientes 🎉</span>`;
}

document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const pandape = document.getElementById("pandapeInput").value.trim();
  const region = document.getElementById("regionInput").value.trim();

  if (!name || !pandape || !region) {
    document.getElementById("startError").textContent = "Completa nombre, Pandape y región para iniciar.";
    return;
  }

  participant = {name, pandape, region};
  document.getElementById("sideName").textContent = name;
  document.getElementById("sideRegion").textContent = `Región ${region}`;
  document.getElementById("startError").textContent = "";

  current = 0;
  score = 0;
  answersLog = [];
  liveScore.textContent = "0";

  buildTopicList();
  progressWrap.classList.remove("hidden");
  showScreen(quizScreen);
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
});

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const date = new Date().toLocaleString("es-MX");
  const lines = [
    "SIMULADOR MAAT - RESULTADO",
    "==========================",
    `Nombre: ${participant.name}`,
    `Pandape: ${participant.pandape}`,
    `Región: ${participant.region}`,
    `Fecha: ${date}`,
    `Calificación: ${score}/100`,
    "",
    "DETALLE:",
    ...answersLog.map((a, i) =>
      `${i+1}. ${a.title} | ${a.isCorrect ? "CORRECTO" : "INCORRECTO"} | Respuesta: ${a.selected}`
    )
  ];

  const blob = new Blob([lines.join("\n")], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resultado_maat_${participant.pandape}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});
