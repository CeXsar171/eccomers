import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/config";

const categoriasRef = collection(db, "categorias");

// ==========================================
// CREAR CATEGORÍA
// ==========================================

export const crearCategoria = async (categoria) => {
  try {
    console.log("📤 Datos recibidos:", categoria);

    const nombre = categoria?.nombre?.trim() || "";
    const descripcion = categoria?.descripcion?.trim() || "";

    if (!nombre) {
      throw new Error("El nombre de la categoría está vacío.");
    }

    const nuevaCategoria = {
      nombre: nombre,
      descripcion: descripcion,
      estado: true,
      fechaCreacion: serverTimestamp()
    };

    console.log("📦 Guardando en Firebase:", nuevaCategoria);

    const documento = await addDoc(
      categoriasRef,
      nuevaCategoria
    );

    console.log(
      "✅ Categoría creada correctamente:",
      documento.id
    );

    return {
      id: documento.id,
      ...nuevaCategoria
    };

  } catch (error) {

    console.error(
      "❌ ERROR AL CREAR CATEGORÍA:",
      error
    );

    throw error;
  }
};


// ==========================================
// OBTENER CATEGORÍAS
// ==========================================

export const obtenerCategorias = async () => {

  try {

    console.log("📥 Buscando categorías en Firebase...");

    const resultado = await getDocs(
      categoriasRef
    );

    const categorias = resultado.docs.map(
      (documento) => ({
        id: documento.id,
        ...documento.data()
      })
    );

    console.log(
      "✅ Categorías encontradas:",
      categorias
    );

    return categorias;

  } catch (error) {

    console.error(
      "❌ ERROR AL OBTENER CATEGORÍAS:",
      error
    );

    throw error;
  }
};


// ==========================================
// EDITAR CATEGORÍA
// ==========================================

export const editarCategoria = async (
  id,
  datos
) => {

  try {

    const categoriaRef = doc(
      db,
      "categorias",
      id
    );

    await updateDoc(
      categoriaRef,
      {
        nombre: datos.nombre.trim(),
        descripcion:
          datos.descripcion?.trim() || ""
      }
    );

    console.log(
      "✅ Categoría actualizada"
    );

  } catch (error) {

    console.error(
      "❌ ERROR AL EDITAR CATEGORÍA:",
      error
    );

    throw error;
  }
};


// ==========================================
// ELIMINAR CATEGORÍA
// ==========================================

export const eliminarCategoria = async (id) => {

  try {

    const categoriaRef = doc(
      db,
      "categorias",
      id
    );

    await deleteDoc(categoriaRef);

    console.log(
      "✅ Categoría eliminada"
    );

  } catch (error) {

    console.error(
      "❌ ERROR AL ELIMINAR CATEGORÍA:",
      error
    );

    throw error;
  }
};


// ==========================================
// CAMBIAR ESTADO
// ==========================================

export const cambiarEstadoCategoria = async (
  id,
  estado
) => {

  try {

    const categoriaRef = doc(
      db,
      "categorias",
      id
    );

    await updateDoc(
      categoriaRef,
      {
        estado: estado
      }
    );

    console.log(
      "✅ Estado actualizado"
    );

  } catch (error) {

    console.error(
      "❌ ERROR AL CAMBIAR ESTADO:",
      error
    );

    throw error;
  }
};