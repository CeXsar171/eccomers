import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar
} from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  obtenerProductos,
  eliminarProducto,
  cambiarEstadoProducto,
  cambiarPromocionProducto
} from "../../services/productoService";

import "../../styles/admin/productos/Productos.css";

function Productos() {

  const [productos, setProductos] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");


  // ==========================
  // CARGAR PRODUCTOS
  // ==========================

  useEffect(() => {

    cargarProductos();

  }, []);


  const cargarProductos = async () => {

    try {

      setCargando(true);

      setError("");

      const resultado =
        await obtenerProductos();

      setProductos(resultado);

    } catch (error) {

      console.error(error);

      setError(
        "No se pudieron cargar los productos."
      );

    } finally {

      setCargando(false);

    }

  };


  // ==========================
  // ELIMINAR
  // ==========================

  const eliminar = async (producto) => {

    const confirmar = window.confirm(

      `¿Deseas eliminar el producto "${producto.nombre}"?`

    );

    if (!confirmar) {
      return;
    }


    try {

      await eliminarProducto(
        producto.id
      );

      setProductos((actuales) =>
        actuales.filter(
          (item) =>
            item.id !== producto.id
        )
      );

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo eliminar el producto."
      );

    }

  };


  // ==========================
  // CAMBIAR ESTADO
  // ==========================

  const cambiarEstado = async (
    producto
  ) => {

    try {

      const nuevoEstado =
        !producto.estado;

      await cambiarEstadoProducto(
        producto.id,
        nuevoEstado
      );

      setProductos((actuales) =>
        actuales.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                estado: nuevoEstado
              }
            : item
        )
      );

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo cambiar el estado."
      );

    }

  };


  // ==========================
  // CAMBIAR PROMOCIÓN
  // ==========================

  const cambiarPromocion = async (
    producto
  ) => {

    try {

      const nuevaPromocion =
        !producto.promocion;

      await cambiarPromocionProducto(
        producto.id,
        nuevaPromocion
      );

      setProductos((actuales) =>
        actuales.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                promocion: nuevaPromocion
              }
            : item
        )
      );

    } catch (error) {

      console.error(error);

      setError(
        "No se pudo cambiar la promoción."
      );

    }

  };


  // ==========================
  // FILTRAR
  // ==========================

  const productosFiltrados =
    productos.filter((producto) => {

      const texto =
        busqueda.toLowerCase();

      return (

        producto.nombre
          ?.toLowerCase()
          .includes(texto)

        ||

        producto.categoriaNombre
          ?.toLowerCase()
          .includes(texto)

      );

    });


  return (

    <AdminLayout>

      <div className="productos-page">


        {/* HEADER */}

        <div className="productos-header">

          <div className="productos-title">

            <div className="productos-title-icon">

              <FaBoxOpen />

            </div>

            <div>

              <h1>
                Productos
              </h1>

              <p>
                Administra los productos
                de tu ferretería.
              </p>

            </div>

          </div>


          <button
            className="btn-nuevo-producto"
            onClick={() =>
              window.location.href =
                "/admin/nuevo-producto"
            }
          >

            <FaPlus />

            Nuevo producto

          </button>

        </div>


        {/* ERROR */}

        {error && (

          <div className="productos-error">

            {error}

          </div>

        )}


        {/* BUSCADOR */}

        <div className="productos-toolbar">

          <div className="productos-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
            />

          </div>

        </div>


        {/* CONTENIDO */}

        {cargando ? (

          <div className="productos-loading">

            <div className="loading-spinner"></div>

            <p>
              Cargando productos...
            </p>

          </div>

        ) : productosFiltrados.length === 0 ? (

          <div className="productos-empty">

            <FaBoxOpen />

            <h2>
              No existen productos
            </h2>

            <p>
              Todavía no has registrado
              ningún producto.
            </p>

            <button
              className="btn-nuevo-producto"
              onClick={() =>
                window.location.href =
                  "/admin/nuevo-producto"
              }
            >

              <FaPlus />

              Crear primer producto

            </button>

          </div>

        ) : (

          <div className="productos-table-container">

            <table className="productos-table">

              <thead>

                <tr>

                  <th>Producto</th>

                  <th>Categoría</th>

                  <th>Precio</th>

                  <th>Stock</th>

                  <th>Estado</th>

                  <th>Promoción</th>

                  <th>Acciones</th>

                </tr>

              </thead>


              <tbody>

                {productosFiltrados.map(
                  (producto) => (

                    <tr key={producto.id}>


                      {/* PRODUCTO */}

                      <td>

                        <div className="producto-info">

                          {producto.imagen ? (

                            <img
                              src={
                                producto.imagen
                              }
                              alt={
                                producto.nombre
                              }
                            />

                          ) : (

                            <div className="producto-sin-imagen">

                              <FaBoxOpen />

                            </div>

                          )}


                          <div>

                            <strong>
                              {producto.nombre}
                            </strong>

                            <small>
                              {producto.descripcion}
                            </small>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORÍA */}

                      <td>

                        {producto.categoriaNombre ||
                          "Sin categoría"}

                      </td>


                      {/* PRECIO */}

                      <td>

                        <strong>
                          $
                          {Number(
                            producto.precio || 0
                          ).toFixed(2)}
                        </strong>

                      </td>


                      {/* STOCK */}

                      <td>

                        {producto.stock || 0}

                      </td>


                      {/* ESTADO */}

                      <td>

                        <button
                          className={
                            producto.estado
                              ? "estado activo"
                              : "estado inactivo"
                          }
                          onClick={() =>
                            cambiarEstado(
                              producto
                            )
                          }
                        >

                          {producto.estado
                            ? "Activo"
                            : "Inactivo"}

                        </button>

                      </td>


                      {/* PROMOCIÓN */}

                      <td>

                        <button
                          className={
                            producto.promocion
                              ? "promocion activa"
                              : "promocion"
                          }
                          onClick={() =>
                            cambiarPromocion(
                              producto
                            )
                          }
                        >

                          <FaStar />

                          {producto.promocion
                            ? "Sí"
                            : "No"}

                        </button>

                      </td>


                      {/* ACCIONES */}

                      <td>

                        <div className="producto-actions">

                          <button
                            className="btn-editar"
                            title="Editar"
                            onClick={() =>
                              window.location.href =
                                `/admin/editar/${producto.id}`
                            }
                          >

                            <FaEdit />

                          </button>


                          <button
                            className="btn-eliminar"
                            title="Eliminar"
                            onClick={() =>
                              eliminar(
                                producto
                              )
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

export default Productos;