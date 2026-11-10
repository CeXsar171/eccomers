import { FaTimes } from "react-icons/fa";

import ProductoForm from "./ProductoForm";

import "../../../styles/admin/productos/ProductoModal.css";

function ProductoModal({
  abierto,
  productoEditar,
  categorias,
  onGuardar,
  onCerrar
}) {

  if (!abierto) {
    return null;
  }

  return (

    <div
      className="producto-modal-overlay"
      onMouseDown={onCerrar}
    >

      <div
        className="producto-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        <button
          type="button"
          className="producto-modal-close"
          onClick={onCerrar}
          title="Cerrar"
        >

          <FaTimes />

        </button>


        <ProductoForm

          productoEditar={
            productoEditar
          }

          categorias={
            categorias
          }

          onGuardar={
            onGuardar
          }

          onCancelar={
            onCerrar
          }

        />

      </div>

    </div>

  );

}

export default ProductoModal;