import { useState } from "react";

import { FaSearch, FaTimes } from "react-icons/fa";

import ProductCard from "./ProductCard";

import { agruparPorCategoria } from "../../utils/catalogo";

import "../../styles/products/ProductsSection.css";

const POR_PAGINA = 9;


function ProductsSection({
  productos,
  categorias = [],
  cargando,
  error,
  busqueda,
  categoriaActiva,
  onLimpiarBusqueda,
  onLimpiarCategoria,
  onLimpiarTodo,
  onSelectProducto,
  onVerMasCategoria
}) {

  // Cantidad visible; vuelve a 9 cada vez que cambian los filtros.
  const clave = `${busqueda}|${categoriaActiva?.id || ""}`;

  const [limite, setLimite] = useState({
    clave,
    cantidad: POR_PAGINA
  });

  const cantidad =
    limite.clave === clave
      ? limite.cantidad
      : POR_PAGINA;

  const visibles = productos.slice(0, cantidad);

  const hayFiltros =
    Boolean(busqueda.trim()) || Boolean(categoriaActiva);


  return (

    <section
      className="products-section"
      id="productos"
    >

      <div className="container">

        <h2 className="section-title">
          {hayFiltros ? "Resultados" : "Nuestros productos"}
        </h2>

        <p className="section-subtitle">
          Toca un producto para ver sus fotos y consultar por WhatsApp.
        </p>


        {hayFiltros && (

          <div className="filtros-activos">

            {busqueda.trim() && (

              <span className="filtro-chip">

                Búsqueda: “{busqueda.trim()}”

                <button
                  type="button"
                  onClick={onLimpiarBusqueda}
                  aria-label="Quitar búsqueda"
                >
                  <FaTimes />
                </button>

              </span>

            )}

            {categoriaActiva && (

              <span className="filtro-chip">

                Categoría: {categoriaActiva.nombre}

                <button
                  type="button"
                  onClick={onLimpiarCategoria}
                  aria-label="Quitar categoría"
                >
                  <FaTimes />
                </button>

              </span>

            )}

            <span className="filtros-conteo">
              {productos.length}{" "}
              {productos.length === 1 ? "producto" : "productos"}
            </span>

          </div>

        )}


        {error ? (

          <div className="sin-resultados">

            <h3>Ocurrió un problema</h3>

            <p>{error}</p>

          </div>

        ) : cargando ? (

          <div className="products-grid">

            {[0, 1, 2].map((numero) => (
              <div className="producto-skeleton" key={numero} />
            ))}

          </div>

        ) : productos.length === 0 ? (

          <div className="sin-resultados">

            <FaSearch />

            <h3>
              {hayFiltros
                ? "No encontramos productos"
                : "Aún no hay productos disponibles"}
            </h3>

            <p>
              {hayFiltros
                ? "Prueba con otra palabra o quita los filtros."
                : "Vuelve pronto, estamos preparando el catálogo."}
            </p>

            {hayFiltros && (

              <button
                type="button"
                className="btn-ver-mas"
                onClick={onLimpiarTodo}
              >
                Ver todos los productos
              </button>

            )}

          </div>

        ) : !hayFiltros ? (

          // Sin filtros: máximo 6 por categoría y "Ver más" para abrir la categoría.
          agruparPorCategoria(productos, categorias).map(
            ({ categoria, productos: grupo, total }) => (

              <div className="categoria-grupo" key={categoria?.id || "otros"}>

                <h3 className="categoria-grupo-titulo">
                  {categoria?.nombre || "Otros productos"}
                </h3>

                <div className="products-grid">

                  {grupo.map((producto) => (

                    <ProductCard
                      key={producto.id}
                      product={producto}
                      onSelect={onSelectProducto}
                    />

                  ))}

                </div>

                {categoria && total > grupo.length && (

                  <div className="ver-mas-contenedor">

                    <button
                      type="button"
                      className="btn-ver-mas"
                      onClick={() => onVerMasCategoria(categoria)}
                    >
                      Ver más de {categoria.nombre} ({total})
                    </button>

                  </div>

                )}

              </div>

            )
          )

        ) : (

          <>

            <div className="products-grid">

              {visibles.map((producto) => (

                <ProductCard
                  key={producto.id}
                  product={producto}
                  onSelect={onSelectProducto}
                />

              ))}

            </div>

            {productos.length > cantidad && (

              <div className="ver-mas-contenedor">

                <button
                  type="button"
                  className="btn-ver-mas"
                  onClick={() =>
                    setLimite({
                      clave,
                      cantidad: cantidad + POR_PAGINA
                    })
                  }
                >
                  Ver más productos
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </section>

  );

}

export default ProductsSection;
