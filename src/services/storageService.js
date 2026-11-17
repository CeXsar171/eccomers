// Las fotos NO se suben a Firebase Storage (requiere plan de pago).
// Se reducen en el navegador y se guardan como texto (data URL) dentro del
// propio documento de Firestore, que sí es gratuito.
//
// Límite de Firestore: 1 MiB por documento. Por eso cada foto se comprime
// a un tamaño pequeño y el formulario de producto admite hasta 5.

const TIPOS_PERMITIDOS = [
  "image/png",
  "image/jpeg",
  "image/webp"
];

// Tamaño máximo del archivo original (se reduce después).
const TAMANO_MAXIMO = 10 * 1024 * 1024;

// Presupuesto de cada foto una vez comprimida, en caracteres (≈ bytes).
const PRESUPUESTO_PRODUCTO = 150000;
const PRESUPUESTO_CATEGORIA = 90000;


// Valida una imagen y devuelve el mensaje de error, o "" si es válida.
export const validarImagen = (archivo) => {

  if (!archivo) {
    return "No se seleccionó ninguna imagen.";
  }

  if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
    return "Solo se permiten imágenes JPG, PNG o WEBP.";
  }

  if (archivo.size > TAMANO_MAXIMO) {
    return "Cada imagen no puede superar los 10 MB.";
  }

  return "";
};


const cargarImagen = async (origen) => {

  // createImageBitmap respeta la orientación de las fotos de celular.
  if (origen instanceof Blob && "createImageBitmap" in window) {

    try {

      return await createImageBitmap(
        origen,
        { imageOrientation: "from-image" }
      );

    } catch {
      // Si falla, se intenta con un elemento <img>
    }

  }

  const url =
    origen instanceof Blob
      ? URL.createObjectURL(origen)
      : origen;

  try {

    return await new Promise((resolve, reject) => {

      const imagen = new Image();

      imagen.onload = () => resolve(imagen);

      imagen.onerror = () =>
        reject(new Error("No se pudo abrir la imagen."));

      imagen.src = url;

    });

  } finally {

    if (origen instanceof Blob) {
      URL.revokeObjectURL(url);
    }

  }

};


const dibujar = (imagen, ladoMaximo, calidad) => {

  const ancho = imagen.width;
  const alto = imagen.height;

  const escala = Math.min(1, ladoMaximo / Math.max(ancho, alto));

  const lienzo = document.createElement("canvas");

  lienzo.width = Math.max(1, Math.round(ancho * escala));
  lienzo.height = Math.max(1, Math.round(alto * escala));

  const contexto = lienzo.getContext("2d");

  // Fondo blanco: los PNG con transparencia no quedan negros.
  contexto.fillStyle = "#ffffff";
  contexto.fillRect(0, 0, lienzo.width, lienzo.height);

  contexto.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);

  return lienzo.toDataURL("image/webp", calidad);

};


// Reduce la imagen (lado y calidad) hasta que quepa en el presupuesto.
const comprimir = async (origen, ladoInicial, presupuesto) => {

  const imagen = await cargarImagen(origen);

  let lado = ladoInicial;

  let resultado = "";

  for (let intento = 0; intento < 6; intento++) {

    for (const calidad of [0.8, 0.7, 0.6, 0.5, 0.4]) {

      resultado = dibujar(imagen, lado, calidad);

      if (resultado.length <= presupuesto) {
        return resultado;
      }

    }

    lado = Math.round(lado * 0.8);

  }

  throw new Error(
    "No se pudo reducir la imagen lo suficiente. Prueba con otra foto."
  );

};


// Devuelve la foto comprimida como data URL lista para guardar.
export const subirImagenProducto = async (archivo) => {

  const mensaje = validarImagen(archivo);

  if (mensaje) {
    throw new Error(mensaje);
  }

  return comprimir(archivo, 900, PRESUPUESTO_PRODUCTO);

};


export const subirImagenCategoria = async (archivo) => {

  const mensaje = validarImagen(archivo);

  if (mensaje) {
    throw new Error(mensaje);
  }

  return comprimir(archivo, 640, PRESUPUESTO_CATEGORIA);

};


// Miniatura (≈480 px) de una foto ya guardada, para tablas y tarjetas.
// Si la foto es un enlace externo, se devuelve tal cual.
export const crearMiniatura = async (url) => {

  if (!url || !url.startsWith("data:")) {
    return url || "";
  }

  try {

    return await comprimir(url, 480, 40000);

  } catch {

    return url;

  }

};


// Las fotos viven dentro del documento: al borrar o editar el documento
// desaparecen con él, así que ya no hay archivos que limpiar.
// Se mantienen estas funciones para no cambiar el resto del código.
export const eliminarImagenPorUrl = async () => {};

export const eliminarImagenesPorUrl = async () => {};
