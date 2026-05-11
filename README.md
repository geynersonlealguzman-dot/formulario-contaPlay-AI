# ContaPlay AI — Formulario de Validación

Formulario interactivo diseñado para recopilar feedback de estudiantes de Contaduría Pública sobre la plataforma ContaPlay AI.

## 📁 Estructura de archivos

```
.
├── index.html          # Estructura HTML del formulario
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript con integración a Google Apps Script
├── package.json        # Configuración del proyecto
├── vercel.json         # Configuración para Vercel
├── .gitignore          # Archivos a ignorar en Git
└── README.md           # Este archivo
```

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue automático desde Git (Recomendado)

1. **Sube el proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ContaPlay AI form"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/contaplay-formulario.git
   git push -u origin main
   ```

2. **Conecta a Vercel:**
   - Ve a https://vercel.com
   - Haz clic en "New Project"
   - Selecciona el repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático
   - Haz clic en "Deploy"

### Opción 2: Despliegue manual con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Autenticate con Vercel:**
   ```bash
   vercel login
   ```

3. **Despliega el proyecto:**
   ```bash
   vercel
   ```

4. **Verifica los ajustes y confirma el despliegue.**

## 🔗 Integración con Google Apps Script

El formulario está configurado para enviar datos directamente a tu Google Apps Script.

### URL del Apps Script:
```
https://script.google.com/macros/s/AKfycbz4Ul8Qg4W78honKbEa4MXCjEEI-gvjZpKoVOKcyUVeuIAK38RgOcj6EEnUiwgsUrLqgg/exec
```

### Si necesitas cambiar la URL:

1. Abre `script.js`
2. Busca la línea:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
3. Reemplaza la URL con la de tu Apps Script

### Requisitos en Google Apps Script:

Tu Google Apps Script debe tener una función como esta:

```javascript
function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    
    // Guarda los datos en Google Sheets o donde necesites
    // Ejemplo: GoogleSheet, bases de datos, etc.
    
    return ContentService.createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 🛠️ Desarrollo local

Para probar el sitio localmente:

```bash
# Con Python 3
python -m http.server 8000

# O con Node.js
npx http-server -p 8000

# O con npm
npm run dev
```

Luego accede a `http://localhost:8000`

## 📝 Personalización

### Cambiar colores:
- Edita las variables CSS en `styles.css` dentro de `:root`

### Agregar/modificar preguntas:
- Edita el HTML en `index.html`
- Asegúrate de actualizar la validación en `script.js` si cambias las preguntas requeridas

### Cambiar textos:
- Todos los textos están en `index.html` - edita directamente

## 🔐 Consideraciones de seguridad

- ⚠️ El endpoint de Google Apps Script debe estar configurado con CORS habilitado
- ⚠️ Usa `no-cors` mode en las requests para evitar problemas de CORS
- ⚠️ No guardes información sensible en el cliente - validación de seguridad debe estar en el servidor

## 📊 Campos del formulario enviados

```javascript
{
  semestre: string,                    // Semestre actual
  herramientas: array,                 // Herramientas digitales usadas
  dificultad: string,                  // Mayor dificultad en aprendizaje
  scale4: string,                      // Rating Motor de Asientos (1-5)
  scale5: string,                      // Rating Simulación Empresarial (1-5)
  scale6: string,                      // Rating Tutor IA (1-5)
  innovadora: string,                  // Función más innovadora
  scale8: string,                      // Rating Gamificación (1-5)
  tiempo: string,                      // Tiempo semanal estimado
  pago: string,                        // Disposición a pagar
  scale11: string,                     // NPS - Recomendación (1-10)
  dispositivo: string,                 // Dispositivo principal
  faltante: string,                    // Función faltante
  mejora: string,                      // Sugerencia de mejora
  temas: array,                        // Temas contables urgentes
  scale16: string,                     // Importancia integración institucional (1-5)
  adicional: string,                   // Comentarios adicionales
  email: string,                       // Correo (opcional)
  timestamp: string                    // Fecha y hora del envío
}
```

## 📱 Responsive Design

- ✅ Optimizado para mobile, tablet y desktop
- ✅ Progress bar sticky en la parte superior
- ✅ Formulario adaptativo con grid responsivo

## 🐛 Troubleshooting

### Los datos no se envían
1. Verifica que el URL de Google Apps Script sea correcto
2. Asegúrate que el Apps Script tiene permiso de acceso público
3. Abre la consola del navegador (F12) para ver errores

### El formulario se ve mal en mobile
- Verifica que los estilos en `styles.css` estén cargando correctamente
- Comprueba que la meta tag viewport está en el HTML

### CORS errors
- Google Apps Script requiere que la respuesta tenga headers CORS
- Usa `mode: 'no-cors'` en el fetch (ya está configurado)

## 📄 Licencia

MIT

## ✉️ Contacto

Para preguntas o soporte, contacta al equipo de ContaPlay AI.
