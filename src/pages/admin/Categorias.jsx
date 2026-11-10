import { useEffect, useState } from "react";

import {
  FaPlus,
  FaTags
} from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";

import CategoriaList from "../../components/admin/categorias/CategoriaList";

import CategoriaModal from "../../components/admin/categorias/CategoriaModal";

import {
  crearCategoria,
  obtenerCategorias,
  editarCategoria,
  eliminarCategoria,
  cambiarEstadoCategoria
} from "../../services/categoriaService";

import "../../styles/admin/categorias/Categorias.css";

function Categorias() {

  const [categorias, setCategorias] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [categoriaEditar, setCategoriaEditar] =
    useState(null);

  const [cargando, setCargando] =
    useState(true);

  const [guardando, setGuardando] =
    useState(false);

  const [error, setError] =
    useState("");


  useEffect(() => {

    cargarCategorias();

  }, []);


  const cargarCategorias = async () => {

    try {

      setCargando(true);

      setError("");

      const resultado =
        await obtenerCategorias();

      setCategorias(resultado);

    } catch (error) {

      console.error(error);

      setError(
        "No se pudieron cargar las categorías."
      );

    } finally {

      setCargando(false);

    }

  };


  const abrirNuevaCategoria = () => {

    setCategoriaEditar(null);

    setModalAbierto(true);

  };


  const abrirEditarCategoria = (
    categoria
  ) => {

    setCategoriaEditar(categoria);

    setModalAbierto(true);

  };


  const cerrarModal = () => {

    if (guardando) {
      return;
    }

    setModalAbierto(false);

    setCategoriaEditar(null);

  };


  const guardarCategoria = async (
    datos
  ) => {

    try {

      setGuardando(true);

      setError("");

      if (categoriaEditar) {

        await editarCategoria(
          categoriaEditar.id,
          datos
        );

      } else {

        await crearCategoria(datos);

      }

      await cargarCategorias();

      cerrarModal();

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo guardar la categoría."
      );

    } finally {

      setGuardando(false);

    }

  };


  const eliminar = async (
    categoria
  ) => {

    const confirmar = window.confirm(

      `¿Deseas eliminar la categoría "${categoria.nombre}"?`

    );

    if (!confirmar) {
      return;
    }

    try {

      setError("");

      await eliminarCategoria(
        categoria.id
      );

      await cargarCategorias();

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo eliminar la categoría."
      );

    }

  };


  const cambiarEstado = async (
    id,
    estado
  ) => {

    try {

      setError("");

      await cambiarEstadoCategoria(
        id,
        estado
      );

      setCategorias((actuales) =>
        actuales.map((categoria) =>
          categoria.id === id
            ? {
                ...categoria,
                estado
              }
            : categoria
        )
      );

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo cambiar el estado."
      );

    }

  };


  return (

    <AdminLayout>

      <div className="categorias-page">

        <div className="categorias-page-header">

          <div className="categorias-title">

            <div className="categorias-title-icon">

              <FaTags />

            </div>

            <div>

              <h1>
                Categorías
              </h1>

              <p>
                Administra las categorías
                de tus productos.
              </p>

            </div>

          </div>


          <button
            className="btn-nueva-categoria"
            onClick={abrirNuevaCategoria}
          >

            <FaPlus />

            Nueva categoría

          </button>

        </div>


        {error && (

          <div className="categorias-error">

            {error}

          </div>

        )}


        {cargando ? (

          <div className="categorias-loading">

            <div className="loading-spinner"></div>

            <p>
              Cargando categorías...
            </p>

          </div>

        ) : (

          <CategoriaList
            categorias={categorias}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            onEditar={abrirEditarCategoria}
            onEliminar={eliminar}
            onCambiarEstado={
              cambiarEstado
            }
          />

        )}


        <CategoriaModal
          abierto={modalAbierto}
          categoriaEditar={categoriaEditar}
          onGuardar={guardarCategoria}
          onCerrar={cerrarModal}
        />

      </div>

    </AdminLayout>

  );
}

export default Categorias;