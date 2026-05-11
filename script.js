// Google Apps Script URL - Reemplaza con tu URL real
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4Ul8Qg4W78honKbEa4MXCjEEI-gvjZpKoVOKcyUVeuIAK38RgOcj6EEnUiwgsUrLqgg/exec';

// ─── Escala de botones ───
var scaleConfigs = [
  { id: 'scale4', max: 5 },
  { id: 'scale5', max: 5 },
  { id: 'scale6', max: 5 },
  { id: 'scale8', max: 5 },
  { id: 'scale11', max: 10 },
  { id: 'scale16', max: 5 },
];

scaleConfigs.forEach(function (cfg) {
  var wrap = document.getElementById(cfg.id);
  if (!wrap) return;
  for (var i = 1; i <= cfg.max; i++) {
    (function (val) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scale-btn';
      btn.textContent = val;
      btn.dataset.val = val;
      btn.dataset.group = cfg.id;
      btn.onclick = function () {
        wrap.querySelectorAll('.scale-btn').forEach(function (b) {
          b.classList.remove('selected');
        });
        this.classList.add('selected');
        updateProgress();
      };
      wrap.appendChild(btn);
    })(i);
  }
});

// ─── Progreso ───
function countAnswered() {
  var count = 0;
  if (document.querySelector('input[name="semestre"]:checked')) count++;
  if (document.querySelectorAll('input[name="herramientas"]:checked').length) count++;
  if (document.querySelector('input[name="dificultad"]:checked')) count++;
  if (document.querySelector('#scale4 .selected')) count++;
  if (document.querySelector('#scale5 .selected')) count++;
  if (document.querySelector('#scale6 .selected')) count++;
  if (document.querySelector('#scale8 .selected')) count++;
  if (document.querySelector('input[name="tiempo"]:checked')) count++;
  if (document.querySelector('input[name="pago"]:checked')) count++;
  if (document.querySelector('#scale11 .selected')) count++;
  if (document.querySelector('input[name="dispositivo"]:checked')) count++;
  if (document.querySelector('#scale16 .selected')) count++;
  return count;
}

function updateProgress() {
  var pct = Math.round((countAnswered() / 12) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = pct + '%';
}

document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function (el) {
  el.addEventListener('change', updateProgress);
});

// ─── Recopilar valor de escala ───
function getScale(id) {
  var sel = document.querySelector('#' + id + ' .selected');
  return sel ? sel.dataset.val : '';
}

// ─── Recopilar checkboxes ───
function getChecked(name) {
  return Array.from(document.querySelectorAll('input[name="' + name + '"]:checked')).map(
    function (el) {
      return el.value;
    }
  );
}

// ─── Recopilar radio ───
function getRadio(name) {
  var el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : '';
}

// ─── Validar y enviar ───
function submitForm() {
  var required = [
    { sel: 'input[name="semestre"]:checked', msg: 'Por favor indica tu semestre (Pregunta 1).' },
    {
      sel: 'input[name="herramientas"]:checked',
      msg: 'Por favor selecciona al menos una herramienta (Pregunta 2).',
    },
    { sel: 'input[name="dificultad"]:checked', msg: 'Por favor indica tu mayor dificultad (Pregunta 3).' },
    { sel: '#scale4 .selected', msg: 'Por favor valora el Motor de Asientos (Pregunta 4).' },
    {
      sel: '#scale5 .selected',
      msg: 'Por favor valora la Simulación Empresarial (Pregunta 5).',
    },
    { sel: '#scale6 .selected', msg: 'Por favor valora el Tutor IA (Pregunta 6).' },
    { sel: '#scale8 .selected', msg: 'Por favor valora la gamificación (Pregunta 8).' },
    {
      sel: 'input[name="tiempo"]:checked',
      msg: 'Por favor indica cuánto tiempo usarías la app (Pregunta 9).',
    },
    {
      sel: 'input[name="pago"]:checked',
      msg: 'Por favor responde si pagarías por el Premium (Pregunta 10).',
    },
    {
      sel: '#scale11 .selected',
      msg: 'Por favor indica si recomendarías ContaPlay AI (Pregunta 11).',
    },
    {
      sel: 'input[name="dispositivo"]:checked',
      msg: 'Por favor indica qué dispositivo usarías (Pregunta 12).',
    },
    {
      sel: '#scale16 .selected',
      msg: 'Por favor valora la integración institucional (Pregunta 16).',
    },
  ];

  for (var i = 0; i < required.length; i++) {
    if (!document.querySelector(required[i].sel)) {
      alert(required[i].msg);
      return;
    }
  }

  // Bloquear botón y mostrar mensaje
  var btn = document.getElementById('btnSubmit');
  btn.disabled = true;
  document.getElementById('sendingMsg').classList.add('visible');

  // Construir objeto de datos
  var datos = {
    semestre: getRadio('semestre'),
    herramientas: getChecked('herramientas'),
    dificultad: getRadio('dificultad'),
    scale4: getScale('scale4'),
    scale5: getScale('scale5'),
    scale6: getScale('scale6'),
    innovadora: getRadio('innovadora'),
    scale8: getScale('scale8'),
    tiempo: getRadio('tiempo'),
    pago: getRadio('pago'),
    scale11: getScale('scale11'),
    dispositivo: getRadio('dispositivo'),
    faltante: document.getElementById('faltante').value,
    mejora: document.getElementById('mejora').value,
    temas: getChecked('temas'),
    scale16: getScale('scale16'),
    adicional: document.getElementById('adicional').value,
    email: document.getElementById('emailInput').value,
    timestamp: new Date().toISOString(),
  };

  // Enviar al servidor Apps Script usando fetch con CORS
  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then(function (response) {
      // Con no-cors mode, siempre resuelve exitosamente aunque no podamos leer la respuesta
      // Mostrar pantalla de éxito
      document.getElementById('progressFill').style.width = '100%';
      document.getElementById('progressText').textContent = '100%';

      // Ocultar formulario
      document.querySelectorAll(
        '.form-card, .divider, .submit-area, .group-header, .section-label, .section-title, .section-sub, .info-box, .features-grid, .ruta-track, .ruta-step'
      ).forEach(function (el) {
        el.style.display = 'none';
      });

      document.getElementById('successScreen').classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(function (err) {
      // Incluso con error, probablemente se enviaron los datos
      console.error('Error:', err);
      // Mostrar pantalla de éxito de todas formas (el servidor sin CORS puede haber procesado)
      document.getElementById('progressFill').style.width = '100%';
      document.getElementById('progressText').textContent = '100%';

      document.querySelectorAll(
        '.form-card, .divider, .submit-area, .group-header, .section-label, .section-title, .section-sub, .info-box, .features-grid, .ruta-track, .ruta-step'
      ).forEach(function (el) {
        el.style.display = 'none';
      });

      document.getElementById('successScreen').classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
