import { useEffect, useState } from "react";

import "../../../styles/admin/categorias/CategoriaForm.css";

function CategoriaForm({
  categoriaEditar,
  onGuardar,
  onCancelar
}) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {

    if (categoriaEditar) {

      setNombre(
        categoriaEditar.nombre || ""
      );

      setDescripcion(
        categoriaEditar.descripcion || ""
      );

    } else {

      setNombre("");
      setDescripcion("");

    }

    setError("");

  }, [categoriaEditar]);


  const manejarSubmit = async (e) => {

    e.preventDefault();

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {

      setError(
        "El nombre de la categoría es obligatorio."
      );

      return;
    }

    if (nombreLimpio.length < 2) {

      setError(
        "El nombre debe tener al menos 2 caracteres."
      );

      return;
    }

    setError("");

    await onGuardar({
      nombre: nombreLimpio,
      descripcion: descripcion.trim()
    });

  };


  return (

    <form
      className="categoria-form"
      onSubmit={manejarSubmit}
    >

      <div className="form-header">

        <div>

          <h2>
            {categoriaEditar
              ? "Editar categoría"
              : "Nueva categoría"}
          </h2>

          <p>
            {categoriaEditar
              ? "Modifica la información de la categoría."
              : "Registra una nueva categoría para tus productos."}
          </p>

        </div>

      </div>


      {error && (

        <div className="form-error">

          {error}

        </div>

      )}


      <div className="form-group">

        <label htmlFor="nombre">

          Nombre *

        </label>

        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          placeholder="Ej: Herramientas"
          maxLength={80}
        />

      </div>


      <div className="form-group">

        <label htmlFor="descripcion">

          Descripción

        </label>

        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
          placeholder="Describe brevemente la categoría..."
          rows="4"
          maxLength={250}
        />

      </div>


      <div className="form-actions">

        {categoriaEditar && (

          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
          >

            Cancelar

          </button>

        )}

        <button
          type="submit"
          className="btn-guardar"
        >

          {categoriaEditar
            ? "Guardar cambios"
            : "Crear categoría"}

        </button>

      </div>

    </form>

  );

}

export default CategoriaForm;