// A partir de un enlace wa.me devuelve el destino para la app instalada y para
// WhatsApp Web (o null si el enlace no es de wa.me).
export const destinosWhatsApp = (href) => {

  const url = new URL(href, "https://ejemplo.invalid");

  if (url.hostname !== "wa.me") {
    return null;
  }

  const telefono = url.pathname.slice(1);
  const texto = encodeURIComponent(url.searchParams.get("text") || "");
  const consulta = `phone=${telefono}&text=${texto}`;

  return {
    app: `whatsapp://send?${consulta}`,
    web: `https://web.whatsapp.com/send?${consulta}`
  };

};
