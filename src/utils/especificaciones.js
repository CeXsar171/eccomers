// Convierte el texto del formulario ("Material: Acero", una por línea) en filas.
// Se separa en los primeros ":" para que un valor como "08:00" no se corte.
export const parsearEspecificaciones = (texto = "") =>
  texto
    .split("\n")
    .map((linea) => {
      const i = linea.indexOf(":");
      return i < 0
        ? null
        : { clave: linea.slice(0, i).trim(), valor: linea.slice(i + 1).trim() };
    })
    .filter((fila) => fila?.clave && fila.valor);
