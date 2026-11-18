import test from "node:test";
import assert from "node:assert/strict";

import { agruparPorCategoria, filtrarProductos, listarMarcas } from "./catalogo.js";

const categorias = [
  { id: "c1", nombre: "Herramientas" },
  { id: "c2", nombre: "Pinturas" },
  { id: "c3", nombre: "Vacía" },
];

const prod = (id, categoriaId, categoriaNombre) => ({ id, categoriaId, categoriaNombre });

test("limita a 6 por categoría y conserva el total", () => {
  const productos = Array.from({ length: 8 }, (_, i) => prod("h" + i, "c1", "Herramientas"));
  const [grupo] = agruparPorCategoria(productos, categorias);
  assert.equal(grupo.productos.length, 6);
  assert.equal(grupo.total, 8);
});

test("omite categorías sin productos y respeta el orden de categorías", () => {
  const productos = [prod("p", "c2", "Pinturas"), prod("h", "c1", "Herramientas")];
  const grupos = agruparPorCategoria(productos, categorias);
  assert.deepEqual(grupos.map((g) => g.categoria.id), ["c1", "c2"]);
});

test("productos sin categoría conocida van a 'Otros' sin límite", () => {
  const productos = Array.from({ length: 7 }, (_, i) => prod("x" + i, "borrada", "Vieja"));
  const grupos = agruparPorCategoria(productos, categorias);
  assert.equal(grupos.length, 1);
  assert.equal(grupos[0].categoria, null);
  assert.equal(grupos[0].productos.length, 7);
});

test("la búsqueda también encuentra por marca, sin tildes ni mayúsculas", () => {
  const productos = [
    { id: "1", nombre: "Taladro", marca: "Truper" },
    { id: "2", nombre: "Martillo", marca: "Stanley" },
  ];
  assert.deepEqual(filtrarProductos(productos, "TRUPER").map((p) => p.id), ["1"]);
});

test("listarMarcas: únicas, sin vacías, ordenadas, sin duplicar por mayúsculas", () => {
  const productos = [
    { marca: "Truper" }, { marca: "truper " }, { marca: "" }, {}, { marca: "Bosch" },
  ];
  assert.deepEqual(listarMarcas(productos), ["Bosch", "Truper"]);
});
