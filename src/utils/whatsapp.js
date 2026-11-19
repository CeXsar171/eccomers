import company from "../data/company";

import { formatearPrecio } from "./catalogo";

// Enlace de WhatsApp con el mensaje ya escrito.
// Con un producto, la consulta incluye su nombre, categoría y precio.
export const enlaceWhatsApp = (producto) => {

  const mensaje = producto
    ? `Hola, quisiera consultar por el producto "${producto.nombre}"` +
      (producto.categoriaNombre
        ? ` (${producto.categoriaNombre})`
        : "") +
      ` con precio de ${formatearPrecio(producto.precio)}. ¿Está disponible?`
    : "Hola, quisiera hacer una consulta.";

  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(mensaje)}`;

};

