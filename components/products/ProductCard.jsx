import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaImage,
  FaImages,
  FaWhatsapp,
  FaEye
} from "react-icons/fa";

import { normalizarImagenes } from "../../services/productoService";
import { formatearPrecio } from "../../utils/catalogo";
import { enlaceWhatsApp } from "../../utils/whatsapp";

import "../../styles/products/ProductCard.css";


function ProductCard({ product }) {

  const navigate = useNavigate();

  const imagenes =
    normalizarImagenes(product);

  const imagen =
    product.imagen || imagenes[0] || "";

  const nombre =
    product.nombre || "Producto sin nombre";

  const categoria =
    product.categoriaNombre || "Sin categoría";

  const descripcion =
    product.descripcion || "Sin descripción disponible.";

  const abrir = () => navigate(`/producto/${product.id}`);

  const teclado = (e) => {

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      abrir();
    }

  };


  return (

    <motion.article

      className="product-card"

      whileHover={{ y: -6 }}

      transition={{ duration: 0.25 }}

      onClick={abrir}

      onKeyDown={teclado}

      role="button"

      tabIndex={0}

      aria-label={`Ver detalles de ${nombre}`}

    >

      {product.promocion && (

        <span className="promotion-badge">

          PROMOCIÓN

        </span>

      )}


      <div className="product-image">

        {imagen ? (

          <img
            src={imagen}
            alt={nombre}
            loading="lazy"
          />

        ) : (

          <div className="product-no-image">

            <FaImage />

            <span>
              Sin imagen
            </span>

          </div>

        )}

        {imagenes.length > 1 && (

          <span className="product-fotos">

            <FaImages />

            {imagenes.length}

          </span>

        )}

      </div>


      <div className="product-body">

        <span className="product-category">

          {categoria}

          {product.marca && ` · ${product.marca}`}

        </span>

        <h3>

          {nombre}

        </h3>

        <p>

          {descripcion}

        </p>

        <div className="price-row">

          <span className="price">

            {formatearPrecio(product.precio)}

          </span>

          <div className="product-actions">

            <button
              type="button"
              className="btn-detalles"
              onClick={(e) => {
                e.stopPropagation();
                abrir();
              }}
            >

              <FaEye />

              Ver detalles

            </button>

            <a
              className="btn-whatsapp-mini"
              href={enlaceWhatsApp(product)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Consultar por WhatsApp"
              aria-label={`Consultar ${nombre} por WhatsApp`}
            >

              <FaWhatsapp />

            </a>

          </div>

        </div>

      </div>

    </motion.article>

  );

}


export default ProductCard;
