import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase/config";


const productosRef = collection(
  db,
  "productos"
);

// Normaliza la lista de imágenes: "imagenes" es la lista completa
// y "imagen" (la principal) se conserva por compatibilidad.
const normalizarImagenes = (datos) => {

  const lista =
    Array.isArray(datos.imagenes)
      ? datos.imagenes.filter(Boolean)
      : [];

  if (lista.length === 0 && datos.imagen) {
    lista.push(datos.imagen);
  }

  return lista;

};



/* ==============================
   CREAR PRODUCTO
================================ */

export const crearProducto = async (producto) => {

  try {

    const nuevoProducto = {

      nombre:
        producto.nombre.trim(),

      descripcion:
        producto.descripcion?.trim() || "",

      precio:
        Number(producto.precio) || 0,

      stock:
        Number(producto.stock) || 0,

      categoriaId:
        producto.categoriaId || "",

      categoriaNombre:
        producto.categoriaNombre || "",

      imagenes:
        normalizarImagenes(producto),

      imagen:
        normalizarImagenes(producto)[0] || "",

      promocion:
        producto.promocion || false,

      estado:
        true,

      fechaCreacion:
        serverTimestamp()

    };


    const documento =
      await addDoc(
        productosRef,
        nuevoProducto
      );


    console.log(
      "Producto creado:",
      documento.id
    );


    return {

      id: documento.id,

      ...nuevoProducto

    };


  } catch (error) {

    console.error(
      "Error al crear producto:",
      error
    );

    throw error;

  }

};


/* ==============================
   OBTENER PRODUCTOS
================================ */

export const obtenerProductos = async () => {

  try {

    const consulta =
      query(
        productosRef,
        orderBy(
          "nombre",
          "asc"
        )
      );


    const resultado =
      await getDocs(
        consulta
      );


    const productos =
      resultado.docs.map(
        (documento) => ({

          id: documento.id,

          ...documento.data()

        })
      );


    console.log(
      "Productos encontrados:",
      productos
    );


    return productos;


  } catch (error) {

    console.error(
      "Error al obtener productos:",
      error
    );

    throw error;

  }

};


/* ==============================
   OBTENER PRODUCTO POR ID
================================ */

export { normalizarImagenes };

export const obtenerProductoPorId = async (id) => {

  const documento =
    await getDoc(
      doc(
        db,
        "productos",
        id
      )
    );

  if (!documento.exists()) {
    return null;
  }

  return {

    id: documento.id,

    ...documento.data()

  };

};


/* ==============================
   EDITAR PRODUCTO
================================ */

export const editarProducto = async (
  id,
  datos
) => {

  try {

    const productoRef =
      doc(
        db,
        "productos",
        id
      );


    await updateDoc(
      productoRef,
      {

        nombre:
          datos.nombre.trim(),

        descripcion:
          datos.descripcion?.trim() || "",

        precio:
          Number(datos.precio) || 0,

        stock:
          Number(datos.stock) || 0,

        categoriaId:
          datos.categoriaId || "",

        categoriaNombre:
          datos.categoriaNombre || "",

        imagenes:
          normalizarImagenes(datos),

        imagen:
          normalizarImagenes(datos)[0] || "",

        promocion:
          datos.promocion || false

      }
    );


    console.log(
      "Producto actualizado:",
      id
    );


  } catch (error) {

    console.error(
      "Error al editar producto:",
      error
    );

    throw error;

  }

};


/* ==============================
   ELIMINAR PRODUCTO
================================ */

export const eliminarProducto = async (
  id
) => {

  try {

    const productoRef =
      doc(
        db,
        "productos",
        id
      );


    await deleteDoc(
      productoRef
    );


    console.log(
      "Producto eliminado:",
      id
    );


  } catch (error) {

    console.error(
      "Error al eliminar producto:",
      error
    );

    throw error;

  }

};


/* ==============================
   CAMBIAR ESTADO
================================ */

export const cambiarEstadoProducto = async (
  id,
  estado
) => {

  try {

    const productoRef =
      doc(
        db,
        "productos",
        id
      );


    await updateDoc(
      productoRef,
      {

        estado:
          estado

      }
    );


    console.log(
      "Estado actualizado:",
      estado
    );


  } catch (error) {

    console.error(
      "Error al cambiar estado:",
      error
    );

    throw error;

  }

};


/* ==============================
   CAMBIAR PROMOCIÓN
================================ */

export const cambiarPromocionProducto = async (
  id,
  promocion
) => {

  try {

    const productoRef =
      doc(
        db,
        "productos",
        id
      );


    await updateDoc(
      productoRef,
      {

        promocion:
          promocion

      }
    );


    console.log(
      "Promoción actualizada:",
      promocion
    );


  } catch (error) {

    console.error(
      "Error al cambiar promoción:",
      error
    );

    throw error;

  }

};