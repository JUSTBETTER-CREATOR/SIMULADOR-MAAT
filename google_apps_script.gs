/**
 * SIMULADOR MAAT -> GOOGLE SHEETS
 *
 * PASOS:
 * 1) Crea una hoja de cálculo nueva.
 * 2) Extensiones > Apps Script.
 * 3) Borra el código de ejemplo y pega TODO este archivo.
 * 4) Guarda.
 * 5) Ejecuta una vez la función prepararHoja y autoriza.
 * 6) Implementar > Nueva implementación > Aplicación web.
 * 7) Ejecutar como: Yo.
 * 8) Quién tiene acceso: Cualquier persona.
 * 9) Implementa y copia la URL que termina en /exec.
 * 10) Pégala en app.js en GOOGLE_SCRIPT_URL.
 */

const NOMBRE_HOJA = 'RESULTADOS_MAAT';

function prepararHoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(NOMBRE_HOJA);

  if (!sh) sh = ss.insertSheet(NOMBRE_HOJA);

  const headers = [
    'ID',
    'FECHA Y HORA',
    'NOMBRE',
    'PANDAPE',
    'REGION',
    'CALIFICACION',
    'CORRECTAS',
    'INCORRECTAS',
    'ESTATUS',
    'TEMAS A REFORZAR',
    'DETALLE DE RESPUESTAS'
  ];

  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, headers.length);
  return 'Hoja preparada';
}

function doGet() {
  return ContentService
    .createTextOutput('SIMULADOR MAAT - receptor activo')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(NOMBRE_HOJA);
    if (!sh) {
      prepararHoja();
      sh = ss.getSheetByName(NOMBRE_HOJA);
    }

    const p = e.parameter || {};

    sh.appendRow([
      Utilities.getUuid(),
      new Date(),
      limpiar(p.nombre),
      limpiar(p.pandape),
      limpiar(p.region),
      numero(p.calificacion),
      numero(p.correctas),
      numero(p.incorrectas),
      limpiar(p.estatus),
      limpiar(p.temasReforzar),
      limpiar(p.detalle)
    ]);

    lock.releaseLock();

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function limpiar(v) {
  return String(v == null ? '' : v).trim();
}

function numero(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : '';
}
