import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaImage
} from "react-icons/fa";

import { normalizarImagenes } from "../../services/productoService";
import { formatearPrecio } from "../../utils/catalogo";
import { parsearEspecificaciones } from "../../utils/especificaciones";
import { enlaceWhatsApp } from "../../utils/whatsapp";

import "../../styles/products/ProductModal.css";


// Ventana emergente con la galería y los datos del producto.
// Se monta con key={producto.id} para empezar siempre en la primera foto.
function ProductModal({ producto, onCerrar }) {

  const imagenes =
    normalizarImagenes(producto);

  const [indice, setIndice] = useState(0);

  const [pestana, setPestana] = useState("descripcion");

  const total = imagenes.length;

  const anterior = () =>
    setIndice((actual) =>
      (actual - 1 + total) % total
    );

  const siguiente = () =>
    setIndice((actual) =>
      (actual + 1) % total
    );


  // Esc cierra y las flechas cambian de foto
  useEffect(() => {

    const manejarTecla = (e) => {

      if (e.key === "Escape") {
        onCerrar();
      }

      if (total > 1 && e.key === "ArrowLeft") {
        setIndice((actual) => (actual - 1 + total) % total);
      }

      if (total > 1 && e.key === "ArrowRight") {
        setIndice((actual) => (actual + 1) % total);
      }

    };

    window.addEventListener("keydown", manejarTecla);

    return () =>
      window.removeEventListener("keydown", manejarTecla);

  }, [onCerrar, total]);


  // Evita que la página de fondo se desplace mientras la ventana está abierta
  useEffect(() => {

    const anterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = anterior;
    };

  }, []);


  const agotado =
    Number(producto.stock) === 0;

  // Filas automáticas con los datos que ya existen + las escritas en el panel.
  const filas = [
    { clave: "Categoría", valor: producto.categoriaNombre || "Sin categoría" },
    { clave: "Disponibilidad", valor: agotado ? "Agotado" : "Disponible" },
    ...(producto.promocion ? [{ clave: "Promoción", valor: "Sí" }] : []),
    ...parsearEspecificaciones(producto.especificaciones),
  ];


  return createPortal(

    <div
      className="modal-producto-overlay"
      onMouseDown={onCerrar}
    >

      <div
        className="modal-producto"
        role="dialog"
        aria-modal="true"
        aria-label={producto.nombre}
        onMouseDown={(e) => e.stopPropagation()}
      >

        <button
          type="button"
          className="modal-producto-cerrar"
          onClick={onCerrar}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>


        {/* GALERÍA */}

        <div className="modal-producto-galeria">

          <div className="galeria-principal">

            {total > 0 ? (

              <img
                src={imagenes[indice]}
                alt={`${producto.nombre} - foto ${indice + 1}`}
              />

            ) : (

              <div className="galeria-vacia">

                <FaImage />

                <span>Sin imagen</span>

              </div>

            )}

            {producto.promocion && (
              <span className="promotion-badge">
                PROMOCIÓN
              </span>
            )}

            {total > 1 && (

              <>

                <button
                  type="button"
                  className="galeria-flecha izquierda"
                  onClick={anterior}
                  aria-label="Foto anterior"
                >
                  <FaChevronLeft />
                </button>

                <button
                  type="button"
                  className="galeria-flecha derecha"
                  onClick={siguiente}
                  aria-label="Foto siguiente"
                >
                  <FaChevronRight />
                </button>

                <span className="galeria-contador">
                  {indice + 1} / {total}
                </span>

              </>

            )}

          </div>

          {total > 1 && (

            <div className="galeria-miniaturas">

              {imagenes.map((url, posicion) => (

                <button
                  type="button"
                  key={url}
                  className={
                    posicion === indice
                      ? "miniatura activa"
                      : "miniatura"
                  }
                  onClick={() => setIndice(posicion)}
                  aria-label={`Ver foto ${posicion + 1}`}
                >

                  <img src={url} alt="" loading="lazy" />

                </button>

              ))}

            </div>

          )}

        </div>


        {/* INFORMACIÓN */}

        <div className="modal-producto-info">

          <span className="product-category">
            {producto.categoriaNombre || "Sin categoría"}
          </span>

          <h2>{producto.nombre}</h2>

          <div className="modal-producto-precio">

            <strong>
              {formatearPrecio(producto.precio)}
            </strong>

            <span
              className={
                agotado
                  ? "stock-etiqueta agotado"
                  : "stock-etiqueta"
              }
            >
              {agotado ? "Agotado" : "Disponible"}
            </span>

          </div>

          <div className="modal-pestanas" role="tablist">

            {[["descripcion", "Descripción"], ["especificaciones", "Especificaciones"]].map(
              ([id, texto]) => (

                <button
                  type="button"
                  role="tab"
                  key={id}
                  aria-selected={pestana === id}
                  className={pestana === id ? "pestana activa" : "pestana"}
                  onClick={() => setPestana(id)}
                >
                  {texto}
                </button>

              )
            )}

          </div>

          {pestana === "descripcion" ? (

            <p className="modal-producto-descripcion">

              {producto.descripcion ||
                "Este producto no tiene una descripción todavía."}

            </p>

          ) : (

            <div className="modal-especificaciones">

              <h3>Especificaciones</h3>

              <dl>

                {filas.map(({ clave, valor }) => (

                  <div key={clave + valor}>

                    <dt>{clave}</dt>

                    <dd>{valor}</dd>

                  </div>

                ))}

              </dl>

            </div>

          )}

          <div className="modal-producto-acciones">

            <a
              className="btn-consultar"
              href={enlaceWhatsApp(producto)}
              target="_blank"
              rel="noreferrer"
            >

              <FaWhatsapp />

              Consultar por WhatsApp

            </a>

            <button
              type="button"
              className="btn-cerrar-modal"
              onClick={onCerrar}
            >
              Seguir viendo
            </button>

          </div>

        </div>

      </div>

    </div>,

    document.body

  );

}


export default ProductModal;
