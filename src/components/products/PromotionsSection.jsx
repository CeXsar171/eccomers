import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { obtenerProductos } from "../../services/productoService";

import "../../styles/products/Promotions.css";

function PromotionsSection() {

    const [promociones, setPromociones] = useState([]);

    useEffect(() => {

        cargarPromociones();

    }, []);

    const cargarPromociones = async () => {

        try {

            const productos = await obtenerProductos();

            const productosPromocion =
                productos.filter(
                    producto =>
                        producto.promocion === true &&
                        producto.estado !== false
                );

            setPromociones(productosPromocion);

        } catch (error) {

            console.error(
                "Error al cargar promociones:",
                error
            );

        }

    };

    return (

        <section className="promotions-section">

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