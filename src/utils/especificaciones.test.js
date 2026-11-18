import test from "node:test";
import assert from "node:assert/strict";

import { parsearEspecificaciones } from "./especificaciones.js";

test("convierte cada línea 'Nombre: valor' en una fila", () => {
  assert.deepEqual(
    parsearEspecificaciones("Material: Acero\nColor: Azul"),
    [
      { clave: "Material", valor: "Acero" },
      { clave: "Color", valor: "Azul" },
    ]
  );
});

test("recorta espacios y usa solo los primeros dos puntos", () => {
  assert.deepEqual(
    parsearEspecificaciones("  Horario :  08:00 a 17:00  "),
    [{ clave: "Horario", valor: "08:00 a 17:00" }]
  );
});

test("ignora líneas vacías, sin dos puntos o sin nombre/valor", () => {
  assert.deepEqual(
    parsearEspecificaciones("\nsolo texto\n: sin nombre\nSin valor:\nPeso: 2 kg\n"),
    [{ clave: "Peso", valor: "2 kg" }]
  );
});

test("texto vacío o ausente no genera filas", () => {
  assert.deepEqual(parsearEspecificaciones(""), []);
  assert.deepEqual(parsearEspecificaciones(undefined), []);
});
