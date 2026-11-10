import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaSave,
  FaTimes,
  FaStar,
  FaImage,
  FaUpload
} from "react-icons/fa";

import "../../../styles/admin/productos/ProductoForm.css";

import {
  subirImagenProducto
} from "../../../services/storageService";


function ProductoForm({
  productoEditar,
  categorias = [],
  onGuardar,
  onCancelar
}) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categoriaNombre, setCategoriaNombre] = useState("");

  const [imagen, setImagen] = useState("");
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");

  const [promocion, setPromocion] = useState(false);

  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);


  // =====================================
  // CARGAR PRODUCTO PARA EDITAR
  // =====================================

  useEffect(() => {

    if (productoEditar) {

      setNombre(productoEditar.nombre || "");

      setDescripcion(
        productoEditar.descripcion || ""
      );

      setPrecio(
        productoEditar.precio ?? ""
      );

      setStock(
        productoEditar.stock ?? ""
      );

      setCategoriaId(
        productoEditar.categoriaId || ""
      );

      setCategoriaNombre(
        productoEditar.categoriaNombre || ""
      );

      setImagen(
        productoEditar.imagen || ""
      );

      setVistaPrevia(
        productoEditar.imagen || ""
      );

      setPromocion(
        productoEditar.promocion || false
      );

    } else {

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setCategoriaId("");
      setCategoriaNombre("");
      setImagen("");
      setArchivoImagen(null);
      setVistaPrevia("");
      setPromocion(false);

    }

    setError("");

  }, [productoEditar]);


  // =====================================
  // SELECCIONAR CATEGORÍA
  // =====================================

  const manejarCategoria = (e) => {

    const id = e.target.value;

    setCategoriaId(id);

    const categoriaSeleccionada =
      categorias.find(
        (categoria) =>
          categoria.id === id
      );

    setCategoriaNombre(
      categoriaSeleccionada?.nombre || ""
    );

  };


  // =====================================
  // SELECCIONAR IMAGEN
  // =====================================

  const manejarImagen = (e) => {

    const archivo =
      e.target.files?.[0];

    if (!archivo) {
      return;
    }


    // Validar que sea imagen

    if (!archivo.type.startsWith("image/")) {

      setError(
        "El archivo seleccionado no es una imagen."
      );

      e.target.value = "";

      return;
    }


    // Máximo 5 MB

    const maximo =
      5 * 1024 * 1024;

    if (archivo.size > maximo) {

      setError(
        "La imagen no puede superar los 5 MB."
      );

      e.target.value = "";

      return;
    }


    setError("");

    setArchivoImagen(archivo);


    // Crear vista previa

    const url =
      URL.createObjectURL(archivo);

    setVistaPrevia(url);

  };


  // =====================================
  // GUARDAR
  // =====================================

  const manejarSubmit = async (e) => {

    e.preventDefault();

    setError("");


    const nombreLimpio =
      nombre.trim();

    const descripcionLimpia =
      descripcion.trim();

    const precioNumero =
      Number(precio);

    const stockNumero =
      Number(stock);


    // VALIDAR NOMBRE

    if (!nombreLimpio) {

      setError(
        "El nombre del producto es obligatorio."
      );

      return;
    }


    if (nombreLimpio.length < 2) {

      setError(
        "El nombre debe tener al menos 2 caracteres."
      );

      return;
    }


    // VALIDAR PRECIO

    if (
      !precio ||
      Number.isNaN(precioNumero) ||
      precioNumero < 0
    ) {

      setError(
        "Ingresa un precio válido."
      );

      return;
    }


    // VALIDAR STOCK

    if (
      stock === "" ||
      Number.isNaN(stockNumero) ||
      stockNumero < 0
    ) {

      setError(
        "Ingresa un stock válido."
      );

      return;
    }


    // VALIDAR CATEGORÍA

    if (!categoriaId) {

      setError(
        "Selecciona una categoría."
      );

      return;
    }


    try {

      setGuardando(true);


      // =================================
      // SUBIR IMAGEN
      // =================================

      let imagenFinal = imagen;


      if (archivoImagen) {

        console.log(
          "📷 Subiendo imagen..."
        );

        imagenFinal =
          await subirImagenProducto(
            archivoImagen
          );

        console.log(
          "✅ Imagen subida:",
          imagenFinal
        );

      }


      // =================================
      // GUARDAR PRODUCTO
      // =================================

      await onGuardar({

        nombre:
          nombreLimpio,

        descripcion:
          descripcionLimpia,

        precio:
          precioNumero,

        stock:
          stockNumero,

        categoriaId:
          categoriaId,

        categoriaNombre:
          categoriaNombre,

        imagen:
          imagenFinal,

        promocion:
          promocion

      });


    } catch (error) {

      console.error(
        "Error:",
        error
      );

      setError(
        error.message ||
        "No se pudo guardar el producto."
      );

    } finally {

      setGuardando(false);

    }

  };


  return (

    <form
      className="producto-form"
      onSubmit={manejarSubmit}
    >


      {/* =================================
          CABECERA
      ================================= */}

      <div className="producto-form-header">

        <div className="producto-form-icon">

          <FaBoxOpen />

        </div>

        <div>

          <h2>

            {productoEditar
              ? "Editar producto"
              : "Nuevo producto"}

          </h2>

          <p>

            {productoEditar
              ? "Modifica la información del producto."
              : "Registra un nuevo producto para tu ferretería."}

          </p>

        </div>

      </div>


      {/* =================================
          ERROR
      ================================= */}

      {error && (

        <div className="producto-form-error">

          {error}

        </div>

      )}


      {/* =================================
          NOMBRE
      ================================= */}

      <div className="form-group">

        <label htmlFor="producto-nombre">

          Nombre del producto *

        </label>

        <input
          id="producto-nombre"
          type="text"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          placeholder="Ej: Taladro eléctrico"
          maxLength={100}
          disabled={guardando}
        />

      </div>


      {/* =================================
          DESCRIPCIÓN
      ================================= */}

      <div className="form-group">

        <label htmlFor="producto-descripcion">

          Descripción

        </label>

        <textarea
          id="producto-descripcion"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(
              e.target.value
            )
          }
          placeholder="Describe las características del producto..."
          rows="4"
          maxLength={500}
          disabled={guardando}
        />

      </div>


      {/* =================================
          PRECIO + STOCK
      ================================= */}

      <div className="form-row">

        <div className="form-group">

          <label htmlFor="producto-precio">

            Precio *

          </label>

          <div className="input-money">

            <span>$</span>

            <input
              id="producto-precio"
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={(e) =>
                setPrecio(
                  e.target.value
                )
              }
              placeholder="0.00"
              disabled={guardando}
            />

          </div>

        </div>


        <div className="form-group">

          <label htmlFor="producto-stock">

            Stock *

          </label>

          <input
            id="producto-stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            placeholder="0"
            disabled={guardando}
          />

        </div>

      </div>


      {/* =================================
          CATEGORÍA
      ================================= */}

      <div className="form-group">

        <label htmlFor="producto-categoria">

          Categoría *

        </label>

        <select
          id="producto-categoria"
          value={categoriaId}
          onChange={manejarCategoria}
          disabled={guardando}
        >

          <option value="">

            Selecciona una categoría

          </option>

          {categorias.map(
            (categoria) => (

              <option
                key={categoria.id}
                value={categoria.id}
              >

                {categoria.nombre}

              </option>

            )
          )}

        </select>


        {categorias.length === 0 && (

          <small className="form-help">

            No hay categorías disponibles.
            Crea una categoría primero.

          </small>

        )}

      </div>


      {/* =================================
          IMAGEN
      ================================= */}

      <div className="form-group">

        <label htmlFor="producto-imagen">

          <FaImage />

          Imagen del producto

        </label>


        <div className="imagen-upload">

          <input
            id="producto-imagen"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={manejarImagen}
            disabled={guardando}
          />


          <label
            htmlFor="producto-imagen"
            className="btn-seleccionar-imagen"
          >

            <FaUpload />

            Seleccionar imagen

          </label>

        </div>


        <small className="form-help">

          JPG, PNG o WEBP.
          Tamaño máximo 5 MB.

        </small>


        {/* VISTA PREVIA */}

        {vistaPrevia && (

          <div className="producto-preview">

            <p>
              Vista previa
            </p>

            <img
              src={vistaPrevia}
              alt="Vista previa del producto"
            />

          </div>

        )}

      </div>


      {/* =================================
          PROMOCIÓN
      ================================= */}

      <div
        className={
          promocion
            ? "promocion-option activa"
            : "promocion-option"
        }

        onClick={() =>
          setPromocion(!promocion)
        }
      >

        <div className="promocion-icon">

          <FaStar />

        </div>

        <div>

          <strong>
            Producto en promoción
          </strong>

          <p>

            Mostrar este producto como
            destacado.

          </p>

        </div>


        <input
          type="checkbox"
          checked={promocion}
          onChange={(e) =>
            setPromocion(
              e.target.checked
            )
          }
          onClick={(e) =>
            e.stopPropagation()
          }
          disabled={guardando}
        />

      </div>


      {/* =================================
          BOTONES
      ================================= */}

      <div className="producto-form-actions">

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
            : productoEditar
              ? "Guardar cambios"
              : "Crear producto"}

        </button>

      </div>

    </form>

  );

}

export default ProductoForm;