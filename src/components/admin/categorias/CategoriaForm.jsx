import { useEffect, useState } from "react";

import {
  FaImage,
  FaTimes,
  FaSave
} from "react-icons/fa";

import {
  subirImagenCategoria,
  validarImagen
} from "../../../services/storageService";

import "../../../styles/admin/categorias/CategoriaForm.css";
import "../../../styles/admin/ImagePicker.css";

function CategoriaForm({
  categoriaEditar,
  onGuardar,
  onCancelar
}) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Imagen ya guardada (URL) e imagen nueva por subir ({ archivo, vista })
  const [imagenActual, setImagenActual] = useState("");
  const [imagenNueva, setImagenNueva] = useState(null);

  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {

    if (categoriaEditar) {

      setNombre(
        categoriaEditar.nombre || ""
      );

      setDescripcion(
        categoriaEditar.descripcion || ""
      );

      setImagenActual(
        categoriaEditar.imagen || ""
      );

    } else {

      setNombre("");
      setDescripcion("");
      setImagenActual("");

    }

    setImagenNueva(null);

    setError("");

  }, [categoriaEditar]);


  // Libera la vista previa temporal cuando cambia o al salir
  useEffect(() => {

    return () => {

      if (imagenNueva?.vista) {
        URL.revokeObjectURL(imagenNueva.vista);
      }

    };

  }, [imagenNueva]);


  const manejarImagen = (e) => {

    const archivo = e.target.files?.[0];

    e.target.value = "";

    if (!archivo) {
      return;
    }

    const mensaje = validarImagen(archivo);

    if (mensaje) {
      setError(mensaje);
      return;
    }

    setError("");

    setImagenNueva({
      archivo,
      vista: URL.createObjectURL(archivo)
    });

  };


  const quitarImagen = () => {

    setImagenNueva(null);

    setImagenActual("");

  };


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

    try {

      setGuardando(true);

      let imagen = imagenActual;

      if (imagenNueva) {

        imagen =
          await subirImagenCategoria(
            imagenNueva.archivo
          );

      }

      await onGuardar({
        nombre: nombreLimpio,
        descripcion: descripcion.trim(),
        imagen
      });

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "No se pudo guardar la categoría."
      );

    } finally {

      setGuardando(false);

    }

  };


  const vistaPrevia =
    imagenNueva?.vista || imagenActual;


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
          disabled={guardando}
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
          disabled={guardando}
        />

      </div>


      {/* IMAGEN */}

      <div className="form-group">

        <label htmlFor="categoria-imagen">

          Imagen de la categoría

        </label>

        <div className="imagen-upload">

          <input
            id="categoria-imagen"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={manejarImagen}
            disabled={guardando}
          />

          <label
            htmlFor="categoria-imagen"
            className="btn-seleccionar-imagen"
          >

            <FaImage />

            {vistaPrevia
              ? "Cambiar imagen"
              : "Seleccionar imagen"}

          </label>

        </div>

        <small className="form-help">
          JPG, PNG o WEBP. Máximo 5 MB.
          Se muestra en el carrusel de la página principal.
        </small>

        {vistaPrevia && (

          <div className="imagenes-grid una-imagen">

            <div className="imagen-item">

              <img
                src={vistaPrevia}
                alt="Vista previa de la categoría"
              />

              {imagenNueva && (
                <span className="imagen-nueva">
                  Nueva
                </span>
              )}

              <button
                type="button"
                className="imagen-quitar"
                title="Quitar imagen"
                onClick={quitarImagen}
                disabled={guardando}
              >
                <FaTimes />
              </button>

            </div>

          </div>

        )}

      </div>


      <div className="form-actions">

        <button
          type="button"
          className="btn-cancelar"
          onClick={onCancelar}
          disabled={guardando}
        >

          <FaTimes />

          Cancelar

        </button>

        <button
          type="submit"
          className="btn-guardar"
          disabled={guardando}
        >

          <FaSave />

          {guardando
            ? "Guardando..."
            : categoriaEditar
              ? "Guardar cambios"
              : "Crear categoría"}

        </button>

      </div>

    </form>

  );

}

export default CategoriaForm;
