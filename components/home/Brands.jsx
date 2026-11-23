import { normalizarTexto } from "../../utils/catalogo";

import "../../styles/home/Brands.css";

// Barra de marcas: tocar una busca por esa marca; tocarla otra vez quita la búsqueda.
function Brands({ marcas, busqueda, onSeleccionar }) {

  if (marcas.length === 0) {
    return null;
  }

  return (

    <section className="brands" aria-label="Marcas">

      <div className="container brands-lista">

        <span className="brands-titulo">Marcas</span>

        {marcas.map((marca) => {

          const activa = normalizarTexto(busqueda) === normalizarTexto(marca);

          return (

            <button
              type="button"
              key={marca}
              className={activa ? "brand-chip activa" : "brand-chip"}
              aria-pressed={activa}
              onClick={() => onSeleccionar(activa ? "" : marca)}
            >
              {marca}
            </button>

          );

        })}

      </div>

    </section>

  );

}

export default Brands;
