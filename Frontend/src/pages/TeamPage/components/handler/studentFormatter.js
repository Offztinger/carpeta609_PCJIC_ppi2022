export function studentFormatter(estudiante, numero_equipo, docente_encargado) {
  return {
    nombre_completo: estudiante.nombre_completo,
    modulo_sol: estudiante.modulo_sol,
    docente_encargado: docente_encargado,
    numero_equipo: numero_equipo,
    documento: estudiante.documento,
  };
}
