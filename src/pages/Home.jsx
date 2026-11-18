import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HeroBanner from "../components/home/HeroBanner";
import Categories from "../components/home/Categories";
import Brands from "../components/home/Brands";

import ProductsSection from "../components/products/ProductsSection";
import PromotionsSection from "../components/products/PromotionsSection";
import ProductModal from "../components/products/ProductModal";

import useCatalogo from "../hooks/useCatalogo";

import { filtrarProductos, listarMarcas } from "../utils/catalogo";

export default function Home(){

const { productos, categorias, cargando, error } = useCatalogo();

// El buscador vive en la barra superior y guarda el texto en la URL (?q=).
const [params, setParams] = useSearchParams();

const busqueda = params.get("q") || "";

const setBusqueda = (texto) => setParams(texto ? { q: texto } : {}, { replace: true });

const [categoriaActiva, setCategoriaActiva] = useState(null);

const [productoActivo, setProductoActivo] = useState(null);

const marcas = useMemo(() => listarMarcas(productos), [productos]);

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

<Categories
  categorias={categorias}
  cargando={cargando}
  categoriaActiva={categoriaActiva}
  onSeleccionar={seleccionarCategoria}
/>

<Brands
  marcas={marcas}
  busqueda={busqueda}
  onSeleccionar={(marca) => {
    setBusqueda(marca);
    if (marca) irAProductos();
  }}
/>

<ProductsSection
  productos={resultados}
  categorias={categorias}
  onVerMasCategoria={seleccionarCategoria}
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
