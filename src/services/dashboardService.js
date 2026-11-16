import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function getDashboardData() {

  // Productos
  const productosSnap = await getDocs(collection(db, "productos"));

  // Categorías
  const categoriasSnap = await getDocs(collection(db, "categorias"));

  // Promociones
  const promociones = productosSnap.docs.filter(
    (doc) => doc.data().promocion === true
  );

  // Últimos productos
  const q = query(
    collection(db, "productos"),
    orderBy("fechaCreacion", "desc"),
    limit(5)
  );

  const ultimosSnap = await getDocs(q);

  const ultimosProductos = ultimosSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    productos: productosSnap.size,
    categorias: categoriasSnap.size,
    promociones: promociones.length,
    ultimosProductos,
  };
}
