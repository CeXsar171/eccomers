import { FaSearch } from "react-icons/fa";

import CategoriaItem from "./CategoriaItem";

import "../../../styles/admin/categorias/CategoriaList.css";

function CategoriaList({
  categorias,
  busqueda,
  setBusqueda,
  onEditar,
  onEliminar,
  onCambiarEstado
}) {

  const categoriasFiltradas = categorias.filter(
    (categoria) => {

      const texto = busqueda
        .toLowerCase()
        .trim();

      return (
        categoria.nombre
          ?.toLowerCase()
          .includes(texto) ||

        categoria.descripcion
          ?.toLowerCase()
          .includes(texto)
      );
    }
  );

  return (

    <div className="categorias-list-container">

      <div className="categorias-search">

        <FaSearch />

        <input
          type="text"
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
          placeholder="Buscar categoría..."
        />

      </div>

      <div className="categorias-table">

        <div className="categoria-header">

          <div>Nombre</div>

          <div>Descripción</div>

          <div>Estado</div>

          <div>Acciones</div>

        </div>

        {categoriasFiltradas.length === 0 ? (

          <div className="categorias-empty">

            <p>
              No se encontraron categorías.
            </p>

          </div>

        ) : (

          categoriasFiltradas.map(
            (categoria) => (

              <CategoriaItem
                key={categoria.id}
                categoria={categoria}
                onEditar={onEditar}
                onEliminar={onEliminar}
                onCambiarEstado={
                  onCambiarEstado
                }
              />

            )
          )

        )}

      </div>

    </div>

  );
}

export default CategoriaList;