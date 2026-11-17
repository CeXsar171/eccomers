import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaSave,
  FaTimes,
  FaStar,
  FaImages,
  FaUpload
} from "react-icons/fa";

import "../../../styles/admin/productos/ProductoForm.css";
import "../../../styles/admin/ImagePicker.css";

import {
  subirImagenProducto,
  crearMiniatura,
  validarImagen
} from "../../../services/storageService";

const MAXIMO_IMAGENES = 5;

// Una "foto" ocupa espacio dentro del documento de Firestore (límite 1 MiB).
// Se deja margen para el resto de los datos del producto.
const PESO_MAXIMO_FOTOS = 900000;


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

  // Imágenes ya guardadas (URLs) e imágenes nuevas por subir ({ archivo, vista })
  const [imagenesGuardadas, setImagenesGuardadas] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);

  const [promocion, setPromocion] = useState(false);

  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);


  // =====================================
  // CARGAR PRODUCTO PARA EDITAR
  // =====================================

  useEffect(() => {

    if (productoEditar) {

      setNombre(productoEditar.nombre || "");
      setDescripcion(productoEditar.descripcion || "");
      setPrecio(productoEditar.precio ?? "");
      setStock(productoEditar.stock ?? "");
      setCategoriaId(productoEditar.categoriaId || "");
      setCategoriaNombre(productoEditar.categoriaNombre || "");
      setPromocion(productoEditar.promocion || false);

      const existentes =
        Array.isArray(productoEditar.imagenes) &&
        productoEditar.imagenes.length > 0
          ? productoEditar.imagenes
          : productoEditar.imagen
            ? [productoEditar.imagen]
            : [];

      setImagenesGuardadas(existentes);
      setImagenesNuevas([]);

    } else {

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setCategoriaId("");
      setCategoriaNombre("");
      setPromocion(false);
      setImagenesGuardadas([]);
      setImagenesNuevas([]);

    }

    setError("");

  }, [productoEditar]);


  // Libera las vistas previas temporales al salir
  useEffect(() => {

    return () => {

      imagenesNuevas.forEach((imagen) =>
        URL.revokeObjectURL(imagen.vista)
      );

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const totalImagenes =
    imagenesGuardadas.length +
    imagenesNuevas.length;


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
  // SELECCIONAR IMÁGENES (varias)
  // =====================================

  const manejarImagenes = (e) => {

    const archivos =
      Array.from(e.target.files || []);

    e.target.value = "";

    if (archivos.length === 0) {
      return;
    }

    const disponibles =
      MAXIMO_IMAGENES - totalImagenes;

    if (disponibles <= 0) {

      setError(
        `Solo puedes tener hasta ${MAXIMO_IMAGENES} imágenes por producto.`
      );

      return;
    }

    const aceptadas = [];

    for (const archivo of archivos.slice(0, disponibles)) {

      const mensaje = validarImagen(archivo);

      if (mensaje) {
        setError(`${archivo.name}: ${mensaje}`);
        return;
      }

      aceptadas.push({
        archivo,
        vista: URL.createObjectURL(archivo)
      });

    }

    if (archivos.length > disponibles) {

      setError(
        `Solo se añadieron ${disponibles} imagen(es): el máximo es ${MAXIMO_IMAGENES}.`
      );

    } else {

      setError("");

    }

    setImagenesNuevas((actuales) => [
      ...actuales,
      ...aceptadas
    ]);

  };


  const quitarGuardada = (url) => {

    setImagenesGuardadas((actuales) =>
      actuales.filter((item) => item !== url)
    );

  };


  const quitarNueva = (vista) => {

    URL.revokeObjectURL(vista);

    setImagenesNuevas((actuales) =>
      actuales.filter((item) => item.vista !== vista)
    );

  };


  // =====================================
  // GUARDAR
  // =====================================

  const manejarSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const nombreLimpio = nombre.trim();
    const descripcionLimpia = descripcion.trim();
    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (!nombreLimpio) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    if (nombreLimpio.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (
      precio === "" ||
      Number.isNaN(precioNumero) ||
      precioNumero < 0
    ) {
      setError("Ingresa un precio válido.");
      return;
    }

    if (
      stock === "" ||
      Number.isNaN(stockNumero) ||
      stockNumero < 0
    ) {
      setError("Ingresa un stock válido.");
      return;
    }

    if (!categoriaId) {
      setError("Selecciona una categoría.");
      return;
    }

    try {

      setGuardando(true);

      // Subir imágenes nuevas, una por una
      const urlsNuevas = [];

      for (const imagen of imagenesNuevas) {

        const url =
          await subirImagenProducto(
            imagen.archivo
          );

        urlsNuevas.push(url);

      }

      const imagenes = [
        ...imagenesGuardadas,
        ...urlsNuevas
      ];

      const pesoTotal = imagenes.reduce(
        (suma, url) => suma + url.length,
        0
      );

      if (pesoTotal > PESO_MAXIMO_FOTOS) {

        throw new Error(
          "Las fotos pesan demasiado en conjunto. Quita alguna o usa fotos más simples."
        );

      }

      // La primera foto se guarda además como miniatura liviana,
      // que usan la tabla del panel y las tarjetas.
      const miniatura =
        await crearMiniatura(imagenes[0]);

      await onGuardar({

        nombre: nombreLimpio,

        descripcion: descripcionLimpia,

        precio: precioNumero,

        stock: stockNumero,

        categoriaId,

        categoriaNombre,

        imagenes,

        imagen: miniatura,

        promocion

      });

    } catch (error) {

      console.error("Error:", error);

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


      {error && (
        <div className="producto-form-error">
          {error}
        </div>
      )}


      <div className="form-group">

        <label htmlFor="producto-nombre">
          Nombre del producto *
        </label>

        <input
          id="producto-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Taladro eléctrico"
          maxLength={100}
          disabled={guardando}
        />

      </div>


      <div className="form-group">

        <label htmlFor="producto-descripcion">
          Descripción
        </label>

        <textarea
          id="producto-descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe las características del producto..."
          rows="4"
          maxLength={500}
          disabled={guardando}
        />

      </div>


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
              onChange={(e) => setPrecio(e.target.value)}
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
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            disabled={guardando}
          />

        </div>

      </div>


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

          {categorias
            .filter(
              (categoria) =>
                categoria.estado !== false ||
                categoria.id === categoriaId
            )
            .map((categoria) => (

              <option
                key={categoria.id}
                value={categoria.id}
              >
                {categoria.nombre}
              </option>

            ))}

        </select>

        {categorias.length === 0 && (
          <small className="form-help">
            No hay categorías disponibles.
            Crea una categoría primero.
          </small>
        )}

      </div>


      {/* IMÁGENES */}

      <div className="form-group">

        <label htmlFor="producto-imagenes">

          <FaImages />

          Fotografías del producto
          ({totalImagenes}/{MAXIMO_IMAGENES})

        </label>

        <div className="imagen-upload">

          <input
            id="producto-imagenes"
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            onChange={manejarImagenes}
            disabled={guardando || totalImagenes >= MAXIMO_IMAGENES}
          />

          <label
            htmlFor="producto-imagenes"
            className="btn-seleccionar-imagen"
          >

            <FaUpload />

            Seleccionar imágenes

          </label>

        </div>

        <small className="form-help">
          JPG, PNG o WEBP. Se reducen automáticamente al guardar. Máximo 5 fotos.
          La primera será la imagen principal.
        </small>

        {totalImagenes > 0 && (

          <div className="imagenes-grid">

            {imagenesGuardadas.map((url, indice) => (

              <div className="imagen-item" key={url}>

                <img src={url} alt={`Imagen ${indice + 1}`} />

                {indice === 0 && (
                  <span className="imagen-principal">
                    Principal
                  </span>
                )}

                <button
                  type="button"
                  className="imagen-quitar"
                  title="Quitar imagen"
                  onClick={() => quitarGuardada(url)}
                  disabled={guardando}
                >
                  <FaTimes />
                </button>

              </div>

            ))}

            {imagenesNuevas.map((imagen, indice) => (

              <div className="imagen-item" key={imagen.vista}>

                <img
                  src={imagen.vista}
                  alt={`Nueva imagen ${indice + 1}`}
                />

                {imagenesGuardadas.length === 0 && indice === 0 && (
                  <span className="imagen-principal">
                    Principal
                  </span>
                )}

                <span className="imagen-nueva">Nueva</span>

                <button
                  type="button"
                  className="imagen-quitar"
                  title="Quitar imagen"
                  onClick={() => quitarNueva(imagen.vista)}
                  disabled={guardando}
                >
                  <FaTimes />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>


      <div
        className={
          promocion
            ? "promocion-option activa"
            : "promocion-option"
        }
        onClick={() => setPromocion(!promocion)}
      >

        <div className="promocion-icon">
          <FaStar />
        </div>

        <div className="promocion-texto">

          <strong>
            Producto en promoción
          </strong>

          <p>
            Mostrar este producto como destacado.
          </p>

        </div>

        <input
          type="checkbox"
          checked={promocion}
          onChange={(e) => setPromocion(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          disabled={guardando}
        />

      </div>


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
