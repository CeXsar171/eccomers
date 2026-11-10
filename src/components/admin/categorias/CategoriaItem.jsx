import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";

import "../../../styles/admin/categorias/CategoriaList.css";

function CategoriaItem({
  categoria,
  onEditar,
  onEliminar,
  onCambiarEstado
}) {

  return (
    <div className="categoria-row">

      <div className="categoria-nombre">
        <strong>{categoria.nombre}</strong>
      </div>

      <div className="categoria-descripcion">
        {categoria.descripcion || "Sin descripción"}
      </div>

      <div className="categoria-estado">

        <button
          className={
            categoria.estado
              ? "estado activo"
              : "estado inactivo"
          }
          onClick={() =>
            onCambiarEstado(
              categoria.id,
              !categoria.estado
            )
          }
          title={
            categoria.estado
              ? "Desactivar categoría"
              : "Activar categoría"
          }
        >

          {categoria.estado ? (
            <>
              <FaToggleOn />
              Activa
            </>
          ) : (
            <>
              <FaToggleOff />
              Inactiva
            </>
          )}

        </button>

      </div>

      <div className="categoria-acciones">

        <button
          className="btn-editar"
          onClick={() => onEditar(categoria)}
          title="Editar categoría"
        >
          <FaEdit />
        </button>

        <button
          className="btn-eliminar"
          onClick={() => onEliminar(categoria)}
          title="Eliminar categoría"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default CategoriaItem;