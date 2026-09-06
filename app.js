// ============================================================
// GOOGLE SHEETS
// Pega aquí la URL que termina en /exec después de desplegar
// google_apps_script.gs como "Aplicación web".
// Ejemplo:
// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXX/exec";
// ============================================================
const GOOGLE_SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";

const questions = [
  {
    topic:"Acceso", title:"Registro de asistencia", slide:"assets/slides/slide-05.jpg",
    scenario:"Ya realizaste la prueba de vida del ejecutivo y MAAT solicita permisos para continuar con el registro de asistencia.",
    question:"¿Qué debes hacer?",
    options:["Rechazar los permisos de geolocalización","Aceptar geolocalización y seleccionar el punto de venta correspondiente","Cerrar la aplicación y volver a ingresar"],
    correct:1,
    feedback:"En el registro de asistencia deben aceptarse los permisos de geolocalización y seleccionarse los puntos de venta correspondientes."
  },
  {
    topic:"Identificación", title:"Método de identificación", slide:"assets/slides/slide-09.jpg",
    scenario:"El cliente desea realizar el trámite y presenta una licencia de conducir.",
    question:"¿Cuál es la acción correcta según el flujo mostrado?",
    options:["Continuar con la licencia","Solicitar INE o pasaporte","Tomar fotografía de la licencia y continuar"],
    correct:1,
    feedback:"El material indica que actualmente se acepta INE o pasaporte como método de identificación."
  },
  {
    topic:"INE", title:"Vista previa de identificación", slide:"assets/slides/slide-14.jpg",
    scenario:"La fotografía de la INE quedó girada y el rostro del cliente no aparece en la orientación esperada.",
    question:"¿Qué debes hacer antes de continuar?",
    options:["Continuar; MAAT la corregirá después","Usar los controles para girar la imagen y dejarla en posición correcta","Tomar una captura de pantalla"],
    correct:1,
    feedback:"La miniatura debe quedar horizontal y correctamente orientada antes de continuar."
  },
  {
    topic:"Solicitud", title:"Confirmación de datos", slide:"assets/slides/slide-18.jpg",
    scenario:"MAAT precargó información obtenida de la identificación del prospecto.",
    question:"¿Cómo debe tratarse la información precargada?",
    options:["Se acepta automáticamente porque proviene de la INE","Debe confirmarse con el cliente y/o contra la identificación, según el dato","Solo se revisa el nombre"],
    correct:1,
    feedback:"El procedimiento indica que la información precargada debe confirmarse con el cliente y los datos correspondientes."
  },
  {
    topic:"Validación", title:"Confirmación preventiva", slide:"assets/slides/slide-22.jpg",
    scenario:"Terminaste la captura de datos y MAAT muestra una pantalla antes de enviar el trámite a aprobación.",
    question:"¿Para qué sirve esta pantalla?",
    options:["Para que el cliente valide la captura o se realicen modificaciones","Para activar la tarjeta","Para registrar el NIP"],
    correct:0,
    feedback:"La confirmación preventiva se muestra justo antes de enviar el trámite al proceso de aprobación para validar la captura."
  },
  {
    topic:"Domicilio", title:"Comprobante de domicilio", slide:"assets/slides/slide-28.jpg",
    scenario:"La INE del cliente tiene domicilio oculto y el flujo habilita la carga de documentos.",
    question:"¿Qué corresponde hacer?",
    options:["Continuar sin comprobante","Solicitar al cliente cargar el comprobante mediante QR o SMS desde su celular","Tomar una foto del comprobante desde la tableta del ejecutivo"],
    correct:1,
    feedback:"Cuando aplica, el cliente debe realizar la carga del comprobante mediante el proceso habilitado por MAAT, usando QR o SMS."
  },
  {
    topic:"Prueba de vida", title:"Prueba de vida del cliente", slide:"assets/slides/slide-26.jpg",
    scenario:"La prueba de vida del cliente no fue exitosa en el primer intento.",
    question:"¿Qué indica el material del proceso?",
    options:["Cancelar automáticamente el trámite","Puede intentarse nuevamente; sin una prueba exitosa no se puede concluir","Continuar aunque falle"],
    correct:1,
    feedback:"Puede intentarse nuevamente, pero sin una prueba de vida exitosa no se puede concluir el trámite."
  },
  {
    topic:"Video", title:"Condición económica", slide:"assets/slides/slide-33.jpg",
    scenario:"Durante el video de confirmación de condición económica, el cliente responde verbalmente “Sí”.",
    question:"¿Qué acción adicional debe realizar?",
    options:["Nada; con la respuesta verbal basta","Dar clic en “Aceptar”","Cerrar el video"],
    correct:1,
    feedback:"El flujo indica confirmación verbal con “Sí” o “Acepto” y además dar clic en “Aceptar”."
  },
  {
    topic:"Activación", title:"Tipo de activación", slide:"assets/slides/slide-35.jpg",
    scenario:"La tarjeta no fue activada mediante la app INVEX Control.",
    question:"¿Qué sigue en el flujo mostrado?",
    options:["Registrar el tipo de activación y continuar con el flujo de activación en MAAT","Dar por terminado el trámite","Entregar la tarjeta sin activar"],
    correct:0,
    feedback:"Si no se activó mediante INVEX Control, el flujo continúa con el proceso de activación en MAAT."
  },
  {
    topic:"NIP", title:"Asignación de NIP", slide:"assets/slides/slide-37.jpg",
    scenario:"El cliente fue activado mediante el flujo de MAAT y ya se registró el token correspondiente.",
    question:"¿Qué paso sigue de acuerdo con el material?",
    options:["Asignación de NIP","Nueva consulta de Buró","Nueva captura de INE"],
    correct:0,
    feedback:"Después de la activación mediante MAAT, el procedimiento mostrado continúa con la asignación de NIP."
  }
];

let current=0, score=0, answersLog=[], participant={};

const startScreen=document.getElementById("startScreen");
const quizScreen=document.getElementById("quizScreen");
const resultScreen=document.getElementById("resultScreen");
const progressWrap=document.getElementById("progressWrap");
const progressText=document.getElementById("progressText");
const progressBar=document.getElementById("progressBar");
const liveScore=document.getElementById("liveScore");
const topicList=document.getElementById("topicList");
const feedback=document.getElementById("feedback");
const nextBtn=document.getElementById("nextBtn");
const pptScreen=document.getElementById("pptScreen");

function showScreen(screen){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  screen.classList.add("active");
}

function buildTopicList(){
  const topics=[...new Set(questions.map(q=>q.topic))];
  topicList.innerHTML=topics.map(t=>`<div class="topic-chip" data-topic="${t}">${t}</div>`).join("");
}

function renderQuestion(){
  const q=questions[current];
  progressText.textContent=`Caso ${current+1} de ${questions.length}`;
  progressBar.style.width=`${((current+1)/questions.length)*100}%`;
  document.getElementById("stepBadge").textContent=q.topic.toUpperCase();
  document.getElementById("questionTitle").textContent=q.title;
  document.getElementById("questionScenario").textContent=q.scenario;
  document.getElementById("questionText").textContent=q.question;
  pptScreen.src=q.slide;
  pptScreen.alt=`Pantalla MAAT: ${q.title}`;

  document.querySelectorAll(".topic-chip").forEach(el=>{
    el.classList.toggle("active",el.dataset.topic===q.topic);
  });

  const answers=document.getElementById("answers");
  answers.innerHTML="";
  q.options.forEach((option,i)=>{
    const btn=document.createElement("button");
    btn.className="answer-btn";
    btn.textContent=option;
    btn.addEventListener("click",()=>answerQuestion(i));
    answers.appendChild(btn);
  });

  feedback.className="feedback hidden";
  feedback.innerHTML="";
  nextBtn.classList.add("hidden");
}

function answerQuestion(selected){
  const q=questions[current];
  const isCorrect=selected===q.correct;

  document.querySelectorAll(".answer-btn").forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.correct) btn.classList.add("correct");
    if(i===selected&&!isCorrect) btn.classList.add("incorrect");
  });

  if(isCorrect) score+=10;
  liveScore.textContent=score;

  answersLog.push({
    topic:q.topic,title:q.title,selected:q.options[selected],
    correctAnswer:q.options[q.correct],isCorrect
  });

  feedback.className=`feedback ${isCorrect?"good":"bad"}`;
  feedback.innerHTML=isCorrect
    ? `<strong>✅ Correcto</strong><br>${q.feedback}`
    : `<strong>❌ Incorrecto</strong><br>${q.feedback}`;
  nextBtn.classList.remove("hidden");
}

function getResultMeta(){
  const correct=answersLog.filter(a=>a.isCorrect).length;
  const incorrect=questions.length-correct;
  let status="";
  if(score>=90) status="EXPERTO MAAT";
  else if(score>=80) status="APROBADO";
  else if(score>=70) status="REQUIERE REFUERZO";
  else status="NO APROBADO";

  const weak=[...new Set(answersLog.filter(a=>!a.isCorrect).map(a=>a.topic))];
  return {correct,incorrect,status,weak};
}

async function saveResultToGoogleSheets(){
  const el=document.getElementById("saveStatus");
  const {correct,incorrect,status,weak}=getResultMeta();

  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PEGA_AQUI")){
    el.className="save-status warn";
    el.textContent="⚠️ Google Sheets todavía no está conectado. Configura GOOGLE_SCRIPT_URL en app.js.";
    return;
  }

  el.className="save-status";
  el.textContent="Guardando resultado en Google Sheets...";

  const detail=answersLog.map((a,i)=>({
    numero:i+1,tema:a.topic,pregunta:a.title,
    resultado:a.isCorrect?"CORRECTO":"INCORRECTO",
    respuesta:a.selected,respuestaCorrecta:a.correctAnswer
  }));

  const body=new URLSearchParams({
    nombre:participant.name,
    pandape:participant.pandape,
    region:participant.region,
    calificacion:String(score),
    correctas:String(correct),
    incorrectas:String(incorrect),
    estatus:status,
    temasReforzar:weak.join(", "),
    detalle:JSON.stringify(detail)
  });

  try{
    await fetch(GOOGLE_SCRIPT_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
      body:body.toString()
    });
    el.className="save-status ok";
    el.textContent="✅ Resultado enviado a Google Sheets.";
  }catch(err){
    el.className="save-status warn";
    el.textContent="⚠️ No se pudo enviar el resultado. Revisa la URL del Apps Script.";
  }
}

function finishQuiz(){
  progressWrap.classList.add("hidden");
  showScreen(resultScreen);

  const {correct,incorrect,status,weak}=getResultMeta();

  document.getElementById("resultName").textContent=participant.name;
  document.getElementById("finalScore").textContent=score;
  document.getElementById("correctCount").textContent=correct;
  document.getElementById("incorrectCount").textContent=incorrect;
  document.getElementById("resultRegion").textContent=participant.region||"—";

  let prettyStatus="",message="";
  if(score>=90){prettyStatus="🏆 EXPERTO MAAT";message="Excelente dominio del proceso."}
  else if(score>=80){prettyStatus="✅ APROBADO";message="Buen dominio general. Revisa los temas marcados para reforzar."}
  else if(score>=70){prettyStatus="⚠️ REQUIERE REFUERZO";message="Hay conocimiento del flujo, pero conviene reforzar los pasos donde hubo errores."}
  else{prettyStatus="❌ NO APROBADO";message="Es necesario repasar el proceso antes de repetir la evaluación."}

  document.getElementById("resultStatus").textContent=prettyStatus;
  document.getElementById("resultMessage").textContent=message;

  const byTopic={};
  questions.forEach(q=>{
    if(!byTopic[q.topic]) byTopic[q.topic]={total:0,ok:0};
    byTopic[q.topic].total++;
  });
  answersLog.forEach(a=>{if(a.isCorrect) byTopic[a.topic].ok++});

  document.getElementById("breakdown").innerHTML=Object.entries(byTopic).map(([topic,data])=>{
    const pct=Math.round((data.ok/data.total)*100);
    return `<div class="break-row"><span>${topic}</span><div class="break-track"><div class="break-fill" style="width:${pct}%"></div></div><strong>${pct}%</strong></div>`;
  }).join("");

  document.getElementById("reinforce").innerHTML=weak.length
    ? weak.map(t=>`<span>${t}</span>`).join("")
    : `<span>Sin temas pendientes 🎉</span>`;

  saveResultToGoogleSheets();
}

document.getElementById("startBtn").addEventListener("click",()=>{
  const name=document.getElementById("nameInput").value.trim();
  const pandape=document.getElementById("pandapeInput").value.trim();
  const region=document.getElementById("regionInput").value.trim();

  if(!name||!pandape||!region){
    document.getElementById("startError").textContent="Completa nombre, Pandape y región para iniciar.";
    return;
  }

  participant={name,pandape,region};
  document.getElementById("sideName").textContent=name;
  document.getElementById("sideRegion").textContent=`Región ${region}`;
  document.getElementById("startError").textContent="";
  current=0;score=0;answersLog=[];liveScore.textContent="0";
  buildTopicList();
  progressWrap.classList.remove("hidden");
  showScreen(quizScreen);
  renderQuestion();
});

nextBtn.addEventListener("click",()=>{
  current++;
  if(current<questions.length) renderQuestion();
  else finishQuiz();
});

document.getElementById("restartBtn").addEventListener("click",()=>location.reload());

document.getElementById("downloadBtn").addEventListener("click",()=>{
  const date=new Date().toLocaleString("es-MX");
  const {correct,incorrect,status,weak}=getResultMeta();
  const lines=[
    "SIMULADOR MAAT - RESULTADO","==========================",
    `Nombre: ${participant.name}`,`Pandape: ${participant.pandape}`,
    `Región: ${participant.region}`,`Fecha: ${date}`,
    `Calificación: ${score}/100`,`Estatus: ${status}`,
    `Temas a reforzar: ${weak.join(", ")||"Ninguno"}`,"","DETALLE:",
    ...answersLog.map((a,i)=>`${i+1}. ${a.title} | ${a.isCorrect?"CORRECTO":"INCORRECTO"} | Respuesta: ${a.selected}`)
  ];
  const blob=new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=`resultado_maat_${participant.pandape}.txt`;a.click();
  URL.revokeObjectURL(url);
});

// Zoom de las pantallas del PowerPoint
const imageModal=document.getElementById("imageModal");
const modalImage=document.getElementById("modalImage");
pptScreen.addEventListener("click",()=>{
  modalImage.src=pptScreen.src;
  imageModal.classList.remove("hidden");
});
document.getElementById("closeModal").addEventListener("click",()=>imageModal.classList.add("hidden"));
imageModal.addEventListener("click",(e)=>{
  if(e.target===imageModal) imageModal.classList.add("hidden");
});
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") imageModal.classList.add("hidden");
});
