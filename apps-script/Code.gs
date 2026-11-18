// Alerta por correo cuando alguien inicia sesión en el panel.
// Uso: script.google.com > Nuevo proyecto > pegar esto > Implementar > Aplicación web
// (Ejecutar como: yo / Acceso: cualquier persona) y copiar la URL en VITE_ALERTA_URL.

const CORREO_DESTINO = "tu-correo@gmail.com";   // Gmail u Hotmail donde quieres recibir la alerta
const ADMINS = ["tu-correo-admin@ejemplo.com"]; // los mismos de VITE_ADMIN_EMAILS
const API_KEY = "AIzaSyAF2E3sGdeBJQ4xuWLunzfJ0waGCfNwsI0"; // apiKey de firebase/config.js (es pública)

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    const usuario = verificarUsuario(datos.idToken);
    const cache = CacheService.getScriptCache();

    // Token falso, o la misma cuenta ya avisó hace menos de 30 s (anti-spam).
    if (usuario && !cache.get(usuario.localId)) {
      cache.put(usuario.localId, "1", 30);
      enviarAlerta(usuario, datos);
    }
  } catch (err) {
    console.error(err);
  }
  return ContentService.createTextOutput("ok");
}

// Firebase confirma que el token es real; el correo sale de su respuesta, no del navegador.
function verificarUsuario(idToken) {
  const r = UrlFetchApp.fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + API_KEY, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ idToken }),
    muteHttpExceptions: true,
  });
  return r.getResponseCode() === 200 ? JSON.parse(r.getContentText()).users[0] : null;
}

function enviarAlerta(usuario, datos) {
  const autorizado = ADMINS.map((a) => a.toLowerCase()).includes(String(usuario.email).toLowerCase());
  const esc = (s) => String(s || "-").replace(/[&<>"]/g, (c) => "&#" + c.charCodeAt(0) + ";");
  const cuando = Utilities.formatDate(new Date(), "America/Guayaquil", "dd/MM/yyyy HH:mm:ss");

  MailApp.sendEmail({
    to: CORREO_DESTINO,
    subject: autorizado
      ? "🔐 Alerta de seguridad: ingreso al panel de administración"
      : "🚨 ALERTA: intento de acceso NO autorizado al panel",
    htmlBody:
      "<h2>" + (autorizado ? "Alguien ingresó al panel de administración" : "Una cuenta NO autorizada intentó entrar al panel") + "</h2>" +
      "<p><b>Cuenta:</b> " + esc(usuario.email) + "<br><b>Fecha y hora (Ecuador):</b> " + cuando +
      "<br><b>IP:</b> " + esc(datos.ip) + "<br><b>Navegador:</b> " + esc(datos.navegador) + "</p>" +
      "<p><b>¿No fuiste tú?</b> En la consola de Firebase > Authentication > Usuarios, deshabilita la cuenta o restablece su contraseña.</p>",
  });
}

// Ejecútala una vez desde el editor: pide los permisos y envía un correo de prueba.
function probarCorreo() {
  enviarAlerta({ email: ADMINS[0] }, { ip: "prueba", navegador: "prueba" });
}
