import { motion } from "framer-motion";

import {
  FaShoppingCart,
  FaImage
} from "react-icons/fa";

import "../../styles/products/ProductCard.css";


function ProductCard({ product }) {

  const imagen =
    product.imagen || "";

  const nombre =
    product.nombre || "Producto sin nombre";

  const categoria =
    product.categoriaNombre || "Sin categoría";

  const descripcion =
    product.descripcion || "Sin descripción disponible.";

  const precio =
    Number(product.precio || 0);


  return (

    <motion.div

      className="product-card"

      whileHover={{
        y: -10
      }}

      transition={{
        duration: 0.3
      }}

    >

      {/* =========================
          PROMOCIÓN
      ========================= */}

      {product.promocion && (

        <span className="promotion-badge">

          PROMOCIÓN

        </span>

      )}


      {/* =========================
          IMAGEN
      ========================= */}

      <div className="product-image">

        {imagen ? (

          <img
            src={imagen}
            alt={nombre}
          />

        ) : (

          <div className="product-no-image">

            <FaImage />

            <span>
              Sin imagen
            </span>

          </div>

        )}

      </div>


      {/* =========================
          INFORMACIÓN
      ========================= */}

      <div className="product-body">


        <span className="product-category">

          {categoria}

        </span>


        <h3>

          {nombre}

        </h3>


        <p>

          {descripcion}

        </p>


        {/* =========================
            PRECIO
        ========================= */}

        <div className="price-row">

          <span className="price">

            ${precio.toFixed(2)}

          </span>


          <button
            type="button"
            className="buy-button"
          >

            <FaShoppingCart />

            Comprar

          </button>

        </div>


      </div>

    </motion.div>

  );

}


export default ProductCard;