// Quita mayúsculas y tildes para que "plomeria" encuentre "Plomería".
export const normalizarTexto = (texto = "") =>
  String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();


const perteneceA = (producto, categoria) =>
  producto.categoriaId === categoria.id ||
  normalizarTexto(producto.categoriaNombre) ===
    normalizarTexto(categoria.nombre);


// Filtra por categoría activa y por texto (nombre, categoría o marca).
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

  return productos.filter((producto) => {

    if (categoria && !perteneceA(producto, categoria)) {
      return false;
    }

    if (palabras.length === 0) {
      return true;
    }

    const campo = normalizarTexto(
      `${producto.nombre || ""} ${producto.categoriaNombre || ""} ${producto.marca || ""}`
    );

    return palabras.every(
      (palabra) => campo.includes(palabra)
    );

  });

};


export const formatearPrecio = (valor) =>
  `$${Number(valor || 0).toFixed(2)}`;


// Un grupo por categoría con máximo `maximo` productos (total = cuántos hay).
// Los productos sin categoría conocida van a un grupo final (categoria: null)
// sin límite, para que ninguno quede oculto.
export const agruparPorCategoria = (productos, categorias, maximo = 6) => {

  const grupos = categorias
    .map((categoria) => {

      const propios = productos.filter((p) => perteneceA(p, categoria));

      return {
        categoria,
        productos: propios.slice(0, maximo),
        total: propios.length
      };

    })
    .filter((grupo) => grupo.total > 0);

  const sueltos = productos.filter(
    (p) => !categorias.some((c) => perteneceA(p, c))
  );

  if (sueltos.length > 0) {
    grupos.push({ categoria: null, productos: sueltos, total: sueltos.length });
  }

  return grupos;

};


// Marcas distintas de los productos, ordenadas; "Truper" y "truper " cuentan como una.
export const listarMarcas = (productos) => {

  const porClave = new Map();

  for (const { marca } of productos) {

    const limpia = (marca || "").trim();
    const clave = normalizarTexto(limpia);

    if (clave && !porClave.has(clave)) {
      porClave.set(clave, limpia);
    }

  }

  return [...porClave.values()].sort((a, b) => a.localeCompare(b, "es"));

};
