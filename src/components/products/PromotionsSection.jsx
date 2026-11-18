import ProductCard from "./ProductCard";

import "../../styles/products/Promotions.css";

function PromotionsSection({
  productos,
  cargando
}) {

    const promociones =
        productos.filter(
            producto => producto.promocion === true
        );

    if (cargando) {
        return null;
    }

    return (

        <section
            className="promotions-section"
            id="promociones"
        >

            <div className="container">

                <h2 className="section-title">
                    🔥 Productos en Promoción
                </h2>

                <p className="section-subtitle">
                    Aprovecha nuestras mejores ofertas disponibles por tiempo limitado.
                </p>

                {promociones.length === 0 ? (

                    <p className="no-promotions">
                        No hay productos en promoción actualmente.
                    </p>

                ) : (

                    <div className="promotions-grid">

                        {promociones.map(producto => (

                            <ProductCard
                                key={producto.id}
                                product={producto}
                            />

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

}

export default PromotionsSection;
