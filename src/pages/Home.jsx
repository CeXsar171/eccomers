import { useCallback, useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import HeroBanner from "../components/home/HeroBanner";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import PaymentSection from "../components/home/PaymentSection";

import ProductsSection from "../components/products/ProductsSection";
import PromotionsSection from "../components/products/PromotionsSection";
import ProductModal from "../components/products/ProductModal";

import useCatalogo from "../hooks/useCatalogo";

import { filtrarProductos } from "../utils/catalogo";

export default function Home(){

const { productos, categorias, cargando, error } = useCatalogo();

const [busqueda, setBusqueda] = useState("");

const [categoriaActiva, setCategoriaActiva] = useState(null);

const [productoActivo, setProductoActivo] = useState(null);

const resultados = useMemo(
  () => filtrarProductos(productos, busqueda, categoriaActiva),
  [productos, busqueda, categoriaActiva]
);

const irAProductos = () => {

  document
    .getElementById("productos")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

};

// Elegir la categoría activa otra vez la quita.
const seleccionarCategoria = (categoria) => {

  const yaActiva = categoriaActiva?.id === categoria.id;

  setCategoriaActiva(yaActiva ? null : categoria);

  if (!yaActiva) {
    irAProductos();
  }

};

const limpiarTodo = () => {

  setBusqueda("");

  setCategoriaActiva(null);

};

const cerrarModal = useCallback(
  () => setProductoActivo(null),
  []
);

return(

<MainLayout>

<HeroBanner/>

<SearchBar
  valor={busqueda}
  onChange={setBusqueda}
  onBuscar={irAProductos}
  total={resultados.length}
  hayBusqueda={Boolean(busqueda.trim())}
/>

<Categories
  categorias={categorias}
  cargando={cargando}
  categoriaActiva={categoriaActiva}
  onSeleccionar={seleccionarCategoria}
/>

<ProductsSection
  productos={resultados}
  cargando={cargando}
  error={error}
  busqueda={busqueda}
  categoriaActiva={categoriaActiva}
  onLimpiarBusqueda={() => setBusqueda("")}
  onLimpiarCategoria={() => setCategoriaActiva(null)}
  onLimpiarTodo={limpiarTodo}
  onSelectProducto={setProductoActivo}
/>

<PromotionsSection
  productos={productos}
  cargando={cargando}
  onSelectProducto={setProductoActivo}
/>

<PaymentSection/>

{productoActivo && (

  <ProductModal
    key={productoActivo.id}
    producto={productoActivo}
    onCerrar={cerrarModal}
  />

)}

</MainLayout>

)

}
