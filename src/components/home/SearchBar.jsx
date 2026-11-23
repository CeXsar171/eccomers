import { FaSearch, FaTimes } from "react-icons/fa";

import "../../styles/home/SearchBar.css";

function SearchBar({
  valor,
  onChange,
  onBuscar,
  total,
  hayBusqueda
}) {

  const pantallaAngosta =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 600px)").matches;

  const enviar = (e) => {

    e.preventDefault();

    onBuscar();

  };

  return (

    <section className="search-section">

      <div className="container">

        <form
          className="search-card"
          onSubmit={enviar}
          role="search"
        >

          <label
            htmlFor="buscador-productos"
            className="search-label"
          >
            Buscar productos
          </label>

          <div className="search-field">

            <FaSearch className="search-icon" />

            <input
              id="buscador-productos"
              type="search"
              value={valor}
              onChange={(e) => onChange(e.target.value)}
              placeholder={
                pantallaAngosta
                  ? "Nombre o categoría..."
                  : "Busca por nombre o categoría: martillo, pinturas, tubería..."
              }
              autoComplete="off"
            />

            {valor && (

              <button
                type="button"
                className="search-clear"
                onClick={() => onChange("")}
                aria-label="Borrar búsqueda"
              >
                <FaTimes />
              </button>

            )}

            <button
              type="submit"
              className="search-submit"
            >
              Buscar
            </button>

          </div>

          {hayBusqueda && (

            <p className="search-hint">

              {total === 0
                ? "No encontramos productos con esa búsqueda."
                : `${total} ${total === 1 ? "producto encontrado" : "productos encontrados"}`}

            </p>

          )}

        </form>

      </div>

    </section>

  );

}

export default SearchBar;
