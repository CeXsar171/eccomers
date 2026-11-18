import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaImage,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

import {
  obtenerProductoPorId,
  normalizarImagenes
} from "../services/productoService";

import { formatearPrecio } from "../utils/catalogo";
import { parsearEspecificaciones } from "../utils/especificaciones";
import { enlaceWhatsApp } from "../utils/whatsapp";

import "../styles/products/ProductoDetalle.css";


// Página completa de un producto: galería con miniaturas, precio, disponibilidad
// y tabla de datos. No hay carrito: la compra se consulta por WhatsApp.
function Detalle({ producto }) {

  const imagenes = normalizarImagenes(producto);

  const total = imagenes.length;

  const [indice, setIndice] = useState(0);

  const mover = (paso) => setIndice((actual) => (actual + paso + total) % total);

  const agotado = Number(producto.stock) === 0;

  const filas = [
    { clave: "Categoría", valor: producto.categoriaNombre || "Sin categoría" },
    ...(producto.marca ? [{ clave: "Marca", valor: producto.marca }] : []),
    { clave: "Disponibilidad", valor: agotado ? "Agotado" : "Disponible" },
    ...(producto.promocion ? [{ clave: "Promoción", valor: "Sí" }] : []),
    ...parsearEspecificaciones(producto.especificaciones),
  ];

  return (

    <div className="container detalle">

      <nav className="detalle-migas" aria-label="Ruta">

        <Link to="/">Inicio</Link>

        <span>›</span>

        <Link to="/">Catálogo</Link>

        <span>›</span>

        <span>{producto.categoriaNombre || "Producto"}</span>

      </nav>

      <div className="detalle-grid">

        {/* GALERÍA */}

        <div className="detalle-galeria">

          {total > 1 && (

            <div className="detalle-miniaturas">

              {imagenes.map((url, posicion) => (

                <button
                  type="button"
                  key={url}
                  className={posicion === indice ? "miniatura-d activa" : "miniatura-d"}
                  onClick={() => setIndice(posicion)}
                  aria-label={`Ver foto ${posicion + 1}`}
                >

                  <img src={url} alt="" loading="lazy" />

                </button>

              ))}

            </div>

          )}

          <div className="detalle-principal">

            {total > 0 ? (

              <img src={imagenes[indice]} alt={`${producto.nombre} - foto ${indice + 1}`} />

            ) : (

              <div className="detalle-sin-foto">

                <FaImage />

                <span>Sin imagen</span>

              </div>

            )}

            {producto.promocion && <span className="promotion-badge">PROMOCIÓN</span>}

            {total > 1 && (

              <>

                <button type="button" className="detalle-flecha izq" onClick={() => mover(-1)} aria-label="Foto anterior">
                  <FaChevronLeft />
                </button>

                <button type="button" className="detalle-flecha der" onClick={() => mover(1)} aria-label="Foto siguiente">
                  <FaChevronRight />
                </button>

              </>

            )}

          </div>

        </div>

        {/* INFORMACIÓN */}

        <div className="detalle-info">

          {producto.marca && <span className="detalle-marca">{producto.marca}</span>}

          <h1>{producto.nombre}</h1>

          <div className="detalle-precio">

            <span className="etiqueta">PRECIO</span>

            <strong>{formatearPrecio(producto.precio)}</strong>

          </div>

          <div className={agotado ? "detalle-stock agotado" : "detalle-stock"}>

            {agotado ? <FaTimesCircle /> : <FaCheckCircle />}

            {agotado ? "Agotado" : "En stock"}

          </div>

          <a
            className="btn-consultar detalle-whatsapp"
            href={enlaceWhatsApp(producto)}
            target="_blank"
            rel="noreferrer"
          >

            <FaWhatsapp />

            Consultar por WhatsApp

          </a>

          <div className="detalle-datos">

            <h2><FaInfoCircle /> DATOS DEL PRODUCTO</h2>

            <dl>

              {filas.map(({ clave, valor }) => (

                <div key={clave + valor}>

                  <dt>{clave}</dt>

                  <dd>{valor}</dd>

                </div>

              ))}

            </dl>

          </div>

        </div>

      </div>

      <section className="detalle-descripcion">

        <h2>Descripción</h2>

        <p>{producto.descripcion || "Este producto no tiene una descripción todavía."}</p>

      </section>

    </div>

  );

}


export default function ProductoDetalle() {

  const { id } = useParams();

  // El resultado se guarda junto al id que lo pidió; si no coincide, aún está cargando.
  const [resultado, setResultado] = useState({ id: null, producto: null, error: false });

  useEffect(() => {

    window.scrollTo(0, 0);

    obtenerProductoPorId(id)
      .then((producto) => setResultado({ id, producto, error: false }))
      .catch((err) => {
        console.error(err);
        setResultado({ id, producto: null, error: true });
      });

  }, [id]);

  const cargando = resultado.id !== id;

  return (

    <MainLayout>

      {cargando ? (

        <p className="detalle-aviso">Cargando producto...</p>

      ) : resultado.producto ? (

        // key: al cambiar de producto la galería vuelve a la primera foto.
        <Detalle key={id} producto={resultado.producto} />

      ) : (

        <div className="detalle-aviso">

          <p>{resultado.error ? "No se pudo cargar el producto." : "Este producto no existe o fue retirado."}</p>

          <Link to="/" className="btn-ver-mas">Volver al catálogo</Link>

        </div>

      )}

    </MainLayout>

  );

}
