import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { storage } from "../firebase/config";

const TIPOS_PERMITIDOS = [
  "image/png",
  "image/jpeg",
  "image/webp"
];

const TAMANO_MAXIMO = 5 * 1024 * 1024;


// Valida una imagen y devuelve el mensaje de error, o "" si es válida.
export const validarImagen = (archivo) => {

  if (!archivo) {
    return "No se seleccionó ninguna imagen.";
  }

  if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
    return "Solo se permiten imágenes JPG, PNG o WEBP.";
  }

  if (archivo.size > TAMANO_MAXIMO) {
    return "Cada imagen no puede superar los 5 MB.";
  }

  return "";
};


// Borra una imagen de Storage a partir de su URL de descarga.
// Es "mejor esfuerzo": si falla (ya no existe, URL externa, sin permiso)
// no interrumpe la operación principal.
export const eliminarImagenPorUrl = async (url) => {

  if (!url || !url.includes("firebasestorage")) {
    return;
  }

  try {

    await deleteObject(ref(storage, url));

  } catch (error) {

    console.warn(
      "No se pudo borrar la imagen:",
      error
    );

  }

};


export const eliminarImagenesPorUrl = async (urls = []) => {

  await Promise.all(
    urls.map((url) => eliminarImagenPorUrl(url))
  );

};


// Sube una imagen a la carpeta indicada ("productos", "categorias", ...)
// y devuelve su URL de descarga.
export const subirImagen = async (archivo, carpeta) => {

  const mensaje = validarImagen(archivo);

  if (mensaje) {
    throw new Error(mensaje);
  }

  const nombreSeguro =
    archivo.name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_");

  const nombreArchivo =
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${nombreSeguro}`;

  const imagenRef = ref(
    storage,
    `${carpeta}/${nombreArchivo}`
  );

  try {

    await uploadBytes(
      imagenRef,
      archivo,
      { contentType: archivo.type }
    );

    return await getDownloadURL(imagenRef);

  } catch (error) {

    console.error(
      "Error de Firebase Storage:",
      error
    );

    // Errores típicos: bucket no activado, reglas que niegan, sesión vencida.
    if (error.code === "storage/unauthorized") {
      throw new Error(
        "Sin permiso para subir imágenes. Revisa las reglas de Storage y que tu cuenta sea administrador."
      );
    }

    throw new Error(
      "No se pudo subir la imagen. Verifica que Firebase Storage esté activado en tu proyecto y que sus reglas permitan la subida."
    );

  }

};


export const subirImagenProducto = (archivo) =>
  subirImagen(archivo, "productos");

export const subirImagenCategoria = (archivo) =>
  subirImagen(archivo, "categorias");
