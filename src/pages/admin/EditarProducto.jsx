import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";

import ProductoForm from "../../components/admin/productos/ProductoForm";

import {
  obtenerProductoPorId,
  editarProducto,
  normalizarImagenes
} from "../../services/productoService";

import {
  obtenerCategorias
} from "../../services/categoriaService";

import {
  eliminarImagenesPorUrl
} from "../../services/storageService";

import "../../styles/admin/productos/NuevoProducto.css";


function EditarProducto() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);

  const [categorias, setCategorias] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const cargar = async () => {

      try {

        setCargando(true);

        setError("");

        const [productoEncontrado, listaCategorias] =
          await Promise.all([
            obtenerProductoPorId(id),
            obtenerCategorias()
          ]);

        if (!productoEncontrado) {
          setError("El producto no existe.");
          return;
        }

        setProducto(productoEncontrado);

        setCategorias(listaCategorias);

      } catch (err) {

        console.error(err);

        setError(
          "No se pudo cargar el producto."
        );

      } finally {

        setCargando(false);

      }

    };

    cargar();

  }, [id]);


  const guardarCambios = async (datos) => {

    try {

      setError("");

      await editarProducto(id, datos);

      // Se borran de Storage solo las fotos que el administrador quitó,
      // para no dejar archivos huérfanos.
      const anteriores = normalizarImagenes(producto || {});

      const quitadas = anteriores.filter(
        (url) => !datos.imagenes.includes(url)
      );

      await eliminarImagenesPorUrl(quitadas);

      navigate("/admin/productos");

    } catch (err) {

      console.error(
        "Error al editar producto:",
        err
      );

      setError(
        "No se pudieron guardar los cambios."
      );

      throw err;

    }

  };


  const cancelar = () => {

    navigate("/admin/productos");

  };


  return (

    <AdminLayout>

      <div className="nuevo-producto-page">

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
                Editar producto
              </h1>

              <p>
                Modifica los datos o la
                fotografía del producto.
              </p>

            </div>

          </div>

        </div>

        {error && (

          <div className="nuevo-producto-error">

            {error}

          </div>

        )}

        {cargando ? (

          <div className="nuevo-producto-loading">

            <div className="loading-spinner"></div>

            <p>
              Cargando producto...
            </p>

          </div>

        ) : producto && (

          <div className="nuevo-producto-container">

            <ProductoForm

              productoEditar={producto}

              categorias={categorias}

              onGuardar={guardarCambios}

              onCancelar={cancelar}

            />

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

export default EditarProducto;
