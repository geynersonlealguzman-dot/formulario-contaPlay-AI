// ═════════════════════════════════════════════════════════════════
// GOOGLE APPS SCRIPT - Configuración para recibir respuestas del formulario
// ═════════════════════════════════════════════════════════════════

// 1. Crea una nueva Google Sheet llamada "Respuestas ContaPlay"
//    Agrega headers en la primera fila (A1, B1, C1, etc.):
//    A1: timestamp
//    B1: semestre
//    C1: herramientas
//    D1: dificultad
//    E1: scale4
//    F1: scale5
//    G1: scale6
//    H1: innovadora
//    I1: scale8
//    J1: tiempo
//    K1: pago
//    L1: scale11
//    M1: dispositivo
//    N1: faltante
//    O1: mejora
//    P1: temas
//    Q1: scale16
//    R1: adicional
//    S1: email

// 2. En Google Apps Script, reemplaza el código con esto:

const SHEET_NAME = "Respuestas ContaPlay"; // Nombre de tu hoja
const SHEET_ID = "YOUR_SPREADSHEET_ID"; // Reemplaza con tu ID de Google Sheet

function doPost(e) {
  try {
    // Parsear los datos JSON enviados desde el formulario
    const datos = JSON.parse(e.postData.contents);
    
    // Obtener la hoja
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error("Sheet not found");
    }
    
    // Preparar la fila de datos
    const row = [
      datos.timestamp || new Date().toISOString(),
      datos.semestre || '',
      (Array.isArray(datos.herramientas) ? datos.herramientas.join(', ') : datos.herramientas) || '',
      datos.dificultad || '',
      datos.scale4 || '',
      datos.scale5 || '',
      datos.scale6 || '',
      datos.innovadora || '',
      datos.scale8 || '',
      datos.tiempo || '',
      datos.pago || '',
      datos.scale11 || '',
      datos.dispositivo || '',
      datos.faltante || '',
      datos.mejora || '',
      (Array.isArray(datos.temas) ? datos.temas.join(', ') : datos.temas) || '',
      datos.scale16 || '',
      datos.adicional || '',
      datos.email || ''
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(row);
    
    // Registrar en el log
    Logger.log("Respuesta guardada: " + JSON.stringify(datos));
    
    // Enviar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({ ok: true, message: "Datos guardados correctamente" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ═════════════════════════════════════════════════════════════════
// PASOS DE INSTALACIÓN:
// ═════════════════════════════════════════════════════════════════

// 1. Abre Google Sheets y crea una nueva hoja (o usa una existente)
// 2. Obtén el ID de la hoja (está en la URL):
//    https://docs.google.com/spreadsheets/d/[AQUI_ESTA_EL_ID]/edit
// 3. Ve a Google Apps Script (apps.script.google.com o desde Sheets > Tools > Script editor)
// 4. Reemplaza el contenido del script.gs con el código de arriba
// 5. Reemplaza "YOUR_SPREADSHEET_ID" con tu ID real
// 6. Asegúrate que el nombre de la hoja coincida con SHEET_NAME
// 7. Haz clic en "Deploy" > "New deployment"
// 8. Selecciona "Type: Web app"
// 9. Configura:
//    - Execute as: Tu cuenta Google
//    - Who has access: Anyone
// 10. Haz clic en "Deploy"
// 11. Copia la URL de despliegue: https://script.google.com/macros/s/[ID]/exec
// 12. Pega esa URL en script.js del formulario (línea 1)

// ═════════════════════════════════════════════════════════════════
// ALTERNATIVA: Usar Webhooks con Make.com o Zapier
// ═════════════════════════════════════════════════════════════════

// Si prefieres no usar Google Apps Script, puedes:
// 1. Crear un automático en Make.com o Zapier
// 2. Obtener la URL del webhook
// 3. Reemplazar GOOGLE_APPS_SCRIPT_URL en script.js con la URL del webhook

// ═════════════════════════════════════════════════════════════════
// TESTE LOCAL (opcional):
// ═════════════════════════════════════════════════════════════════

// Para testear sin desplegar, descomenta esto:
/*
function testDoPost() {
  const testData = {
    timestamp: new Date().toISOString(),
    semestre: "5-6",
    herramientas: ["excel", "youtube"],
    dificultad: "teoria",
    scale4: "4",
    scale5: "5",
    scale6: "3",
    innovadora: "motor",
    scale8: "4",
    tiempo: "3-5h",
    pago: "si_quizas",
    scale11: "8",
    dispositivo: "pc",
    faltante: "Módulo de costos",
    mejora: "Mejorar UX del tutor",
    temas: ["retenciones", "nomina"],
    scale16: "4",
    adicional: "Muy buena iniciativa",
    email: "estudiante@ejemplo.com"
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
*/
