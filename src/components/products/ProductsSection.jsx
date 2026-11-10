import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { obtenerProductos } from "../../services/productoService";

import "../../styles/admin/productos/Productos.css";

function ProductsSection() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async () => {

        try {

            const resultado = await obtenerProductos();

            const activos = resultado.filter(
                producto => producto.estado !== false
            );

            setProductos(activos);

        } catch (error) {

            console.error(
                "Error al cargar productos:",
                error
            );

        }

    };

    return (

        <section
            className="products-section"
            id="productos"
        >

            <div className="container">

                <h2 className="section-title">
                    Productos Destacados
                </h2>

                <div className="products-grid">

                    {productos.map(producto => (

                        <ProductCard
                            key={producto.id}
                            product={producto}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default ProductsSection;