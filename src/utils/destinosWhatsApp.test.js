import test from "node:test";
import assert from "node:assert/strict";

import { destinosWhatsApp } from "./destinosWhatsApp.js";

test("convierte un enlace wa.me en destino para la app y para WhatsApp Web", () => {
  const d = destinosWhatsApp("https://wa.me/593999999999?text=Hola%20%C3%B1and%C3%BA");
  assert.equal(d.app, "whatsapp://send?phone=593999999999&text=Hola%20%C3%B1and%C3%BA");
  assert.equal(d.web, "https://web.whatsapp.com/send?phone=593999999999&text=Hola%20%C3%B1and%C3%BA");
});

test("sin texto o con un enlace que no es de WhatsApp", () => {
  assert.equal(destinosWhatsApp("https://wa.me/593999999999").web,
    "https://web.whatsapp.com/send?phone=593999999999&text=");
  assert.equal(destinosWhatsApp("https://ejemplo.com/x"), null);
});
