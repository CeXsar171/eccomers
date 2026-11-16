// Quita mayúsculas y tildes para que "plomeria" encuentre "Plomería".
export const normalizarTexto = (texto = "") =>
  String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();


// Filtra por categoría activa y por texto (nombre o categoría).
// Cada palabra escrita debe aparecer en el nombre o la categoría,
// en cualquier orden: "taladro electrico" encuentra "Taladro eléctrico".
export const filtrarProductos = (
  productos,
  busqueda = "",
  categoria = null
) => {

  const palabras =
    normalizarTexto(busqueda)
      .split(/\s+/)
      .filter(Boolean);

  const categoriaNormalizada =
    categoria
      ? normalizarTexto(categoria.nombre)
      : "";

  return productos.filter((producto) => {

    if (categoria) {

      const coincide =
        producto.categoriaId === categoria.id ||
        normalizarTexto(producto.categoriaNombre) ===
          categoriaNormalizada;

      if (!coincide) {
        return false;
      }

    }

    if (palabras.length === 0) {
      return true;
    }

    const campo = normalizarTexto(
      `${producto.nombre || ""} ${producto.categoriaNombre || ""}`
    );

    return palabras.every(
      (palabra) => campo.includes(palabra)
    );

  });

};


export const formatearPrecio = (valor) =>
  `$${Number(valor || 0).toFixed(2)}`;
