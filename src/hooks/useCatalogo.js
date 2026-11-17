import { useEffect, useState } from "react";

import { obtenerProductos } from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";

// Carga una sola vez los productos y categorías activos de la tienda pública.
function useCatalogo() {

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    let activo = true;

    const cargar = async () => {

      // Si una de las dos consultas falla, la otra se muestra igual.
      const [resProductos, resCategorias] =
        await Promise.allSettled([
          obtenerProductos(),
          obtenerCategorias()
        ]);

      if (!activo) {
        return;
      }

      if (resProductos.status === "fulfilled") {

        setProductos(
          resProductos.value.filter(
            (producto) => producto.estado !== false
          )
        );

      } else {

        setError(
          "No se pudieron cargar los productos. Intenta de nuevo en unos minutos."
        );

      }

      if (resCategorias.status === "fulfilled") {

        setCategorias(
          resCategorias.value
            .filter((categoria) => categoria.estado !== false)
            .sort((a, b) =>
              (a.nombre || "").localeCompare(b.nombre || "", "es")
            )
        );

      }

      setCargando(false);

    };

    cargar();

    return () => {
      activo = false;
    };

  }, []);

  return { productos, categorias, cargando, error };

}

export default useCatalogo;
