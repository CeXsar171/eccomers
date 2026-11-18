import { motion } from "framer-motion";

import { FaShoppingCart } from "react-icons/fa";

import "../../styles/products/ProductCard.css";

function ProductCard({ product }) {

    const nombre =
        product.nombre || "Producto sin nombre";

    const categoria =
        product.categoriaNombre || "Sin categoría";

    const descripcion =
        product.descripcion ||
        "Sin descripción disponible.";

    const precio =
        Number(product.precio || 0).toFixed(2);

    const imagen =
        product.imagen || "";

    const esPromocion =
        product.promocion === true;

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

            {esPromocion && (

                <span className="promotion-badge">

                    PROMOCIÓN

                </span>

            )}

            <div className="product-image">

                {imagen ? (

                    <img
                        src={imagen}
                        alt={nombre}
                    />

                ) : (

                    <div className="no-image">

                        Sin imagen

                    </div>

                )}

            </div>

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

                <div className="price-row">

                    <span className="price">

                        ${precio}

                    </span>

                    <button>

                        <FaShoppingCart />

                        Comprar

                    </button>

                </div>

            </div>

        </motion.div>

    );

}

export default ProductCard;