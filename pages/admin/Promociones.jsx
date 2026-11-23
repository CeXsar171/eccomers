import { useEffect, useState } from "react";

import { FaStar, FaSearch, FaPlus, FaTimes } from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  obtenerProductos,
  cambiarPromocionProducto
} from "../../services/productoService";

import { formatearPrecio, normalizarTexto } from "../../utils/catalogo";

import "../../styles/admin/productos/Productos.css";
import "../../styles/admin/productos/Promociones.css";


function Fila({ producto, accion, onClick, ocupado }) {

  return (

    <li className="promo-fila">

      {producto.imagen ? (
        <img src={producto.imagen} alt="" />
      ) : (
        <span className="promo-sin-foto" />
      )}

      <div className="promo-datos">

        <strong>{producto.nombre}</strong>

        <small>
          {producto.categoriaNombre || "Sin categoría"} · {formatearPrecio(producto.precio)}
        </small>

      </div>

      <button
        type="button"
        className={accion === "quitar" ? "promo-btn quitar" : "promo-btn agregar"}
        onClick={() => onClick(producto)}
        disabled={ocupado}
      >

        {accion === "quitar" ? <FaTimes /> : <FaPlus />}

        {accion === "quitar" ? "Quitar" : "Agregar"}

      </button>

    </li>

  );

}


function Promociones() {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    obtenerProductos()
      .then(setProductos)
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => setCargando(false));

  }, []);

  const cambiar = async (producto) => {

    const nueva = !producto.promocion;

    try {

      setOcupado(true);
      setError("");

      await cambiarPromocionProducto(producto.id, nueva);

      setProductos((actuales) =>
        actuales.map((p) =>
          p.id === producto.id ? { ...p, promocion: nueva } : p
        )
      );

    } catch (err) {

      console.error(err);
      setError("No se pudo cambiar la promoción.");

    } finally {

      setOcupado(false);

    }

  };

  const enPromocion = productos.filter((p) => p.promocion);

  const texto = normalizarTexto(busqueda);

  const disponibles = productos.filter(
    (p) =>
      !p.promocion &&
      normalizarTexto(`${p.nombre} ${p.categoriaNombre || ""}`).includes(texto)
  );

  return (

    <AdminLayout>

      <div className="productos-page">

        <div className="productos-header">

          <div className="productos-title">

            <div className="productos-title-icon">
              <FaStar />
            </div>

            <div>

              <h1>Promociones</h1>

              <p>Elige qué productos aparecen en la sección de promociones de tu página.</p>

            </div>

          </div>

          <span className="promo-contador">
            {enPromocion.length} en promoción
          </span>

        </div>

        {error && <div className="productos-error">{error}</div>}

        {cargando ? (

          <div className="productos-loading">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>

        ) : (

          <div className="promo-columnas">

            <section className="promo-panel">

              <h2>En promoción ahora</h2>

              {enPromocion.length === 0 ? (

                <p className="promo-vacio">
                  Aún no hay productos en promoción. Agrega alguno de la lista.
                </p>

              ) : (

                <ul>
                  {enPromocion.map((p) => (
                    <Fila key={p.id} producto={p} accion="quitar" onClick={cambiar} ocupado={ocupado} />
                  ))}
                </ul>

              )}

            </section>

            <section className="promo-panel">

              <h2>Agregar a promoción</h2>

              <div className="productos-search">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />

              </div>

              {disponibles.length === 0 ? (

                <p className="promo-vacio">
                  {productos.length === 0
                    ? "Primero crea productos en la sección Productos."
                    : "No hay productos para agregar."}
                </p>

              ) : (

                <ul>
                  {disponibles.map((p) => (
                    <Fila key={p.id} producto={p} accion="agregar" onClick={cambiar} ocupado={ocupado} />
                  ))}
                </ul>

              )}

            </section>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

export default Promociones;
