import { useEffect, useState } from "react";

import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";

import ProductoForm from "../../components/admin/productos/ProductoForm";

import {
  crearProducto
} from "../../services/productoService";

import {
  obtenerCategorias
} from "../../services/categoriaService";

import "../../styles/admin/productos/NuevoProducto.css";


function NuevoProducto() {

  const navigate = useNavigate();


  const [categorias, setCategorias] =
    useState([]);

  const [cargandoCategorias, setCargandoCategorias] =
    useState(true);

  const [error, setError] =
    useState("");


  // =====================================
  // CARGAR CATEGORÍAS
  // =====================================

  useEffect(() => {

    cargarCategorias();

  }, []);


  const cargarCategorias = async () => {

    try {

      setCargandoCategorias(true);

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

      setCargandoCategorias(false);

    }

  };


  // =====================================
  // GUARDAR PRODUCTO
  // =====================================

  const guardarProducto = async (datos) => {

    try {

      setError("");

      console.log(
        "📦 Guardando producto:",
        datos
      );


      await crearProducto(datos);


      console.log(
        "✅ Producto creado correctamente"
      );


      // Volver al listado

      navigate("/admin/productos");


    } catch (error) {

      console.error(
        "❌ Error al guardar producto:",
        error
      );

      setError(
        "No se pudo guardar el producto. Revisa la consola."
      );

      throw error;

    }

  };


  // =====================================
  // CANCELAR
  // =====================================

  const cancelar = () => {

    navigate("/admin/productos");

  };


  return (

    <AdminLayout>

      <div className="nuevo-producto-page">


        {/* ==============================
            CABECERA
        ============================== */}

        <div className="nuevo-producto-header">


          <button
            type="button"
            className="btn-volver-productos"
            onClick={cancelar}
          >

            <FaArrowLeft />

            Volver a productos

          </button>


          <div className="nuevo-producto-title">

            <div className="nuevo-producto-icon">

              <FaBoxOpen />

            </div>


            <div>

              <h1>
                Nuevo producto
              </h1>

              <p>
                Registra un producto en
                tu catálogo.
              </p>

            </div>

          </div>

        </div>


        {/* ==============================
            ERROR GENERAL
        ============================== */}

        {error && (

          <div className="nuevo-producto-error">

            {error}

          </div>

        )}


        {/* ==============================
            CARGANDO CATEGORÍAS
        ============================== */}

        {cargandoCategorias ? (

          <div className="nuevo-producto-loading">

            <div className="loading-spinner"></div>

            <p>
              Cargando categorías...
            </p>

          </div>

        ) : (

          <div className="nuevo-producto-container">

            <ProductoForm

              categorias={
                categorias
              }

              onGuardar={
                guardarProducto
              }

              onCancelar={
                cancelar
              }

            />

          </div>

        )}

      </div>

    </AdminLayout>

  );

}


export default NuevoProducto;