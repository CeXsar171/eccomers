import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import { storage } from "../firebase/config";

export const subirImagenProducto = async (archivo) => {

  if (!archivo) {
    throw new Error("No se seleccionó ninguna imagen.");
  }

  if (!archivo.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado no es una imagen.");
  }

  const maximo = 5 * 1024 * 1024;

  if (archivo.size > maximo) {
    throw new Error("La imagen no puede superar los 5 MB.");
  }

  const nombreArchivo =
    `${Date.now()}-${archivo.name}`;

  const imagenRef = ref(
    storage,
    `productos/${nombreArchivo}`
  );

  await uploadBytes(
    imagenRef,
    archivo
  );

  const url =
    await getDownloadURL(imagenRef);

  return url;
};