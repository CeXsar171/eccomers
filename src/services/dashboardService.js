import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";

import db from "../firebase/firestore";

export async function getDashboardData() {

  // Productos
  const productosSnap = await getDocs(collection(db, "products"));

  // Categorías
  const categoriasSnap = await getDocs(collection(db, "categories"));

  // Promociones
  const promociones = productosSnap.docs.filter(
    (doc) => doc.data().promotion === true
  );

  // Últimos productos
  const q = query(
    collection(db, "products"),
    orderBy("createdAt", "desc"),
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