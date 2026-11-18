import { FaTimes } from "react-icons/fa";

import CategoriaForm from "./CategoriaForm";

import "../../../styles/admin/categorias/CategoriaModal.css";

function CategoriaModal({
  abierto,
  categoriaEditar,
  onGuardar,
  onCerrar
}) {

  if (!abierto) {
    return null;
  }

  return (

    <div
      className="categoria-modal-overlay"
      onMouseDown={onCerrar}
    >

      <div
        className="categoria-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <button
          className="modal-close"
          onClick={onCerrar}
          title="Cerrar"
        >

          <FaTimes />

        </button>

        <CategoriaForm
          categoriaEditar={categoriaEditar}
          onGuardar={onGuardar}
          onCancelar={onCerrar}
        />

      </div>

    </div>

  );
}

export default CategoriaModal;