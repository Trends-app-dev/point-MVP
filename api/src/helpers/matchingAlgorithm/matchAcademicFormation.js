const matchAcademicFormation = (user, targetUser) => {
  // Diccionario para matchear los tipos académicos
  const academicFormations = {
    "Secundaria": "Sin Experiencia",
    "Universitario Junior": "Junior",
    "Universitario Intermedio": "Middle",
    "Universitario Avanzado": "Senior",
  };

  // Desestructuración de los tipos académicos de los perfiles
  const { academic_formation: formation1 } = user;
  const { academic_formation: formation2 } = targetUser;

  // Se usa el diccionario para matchear el tipo académico
  if (
    academicFormations[formation2] === formation1 ||
    academicFormations[formation1] === formation2
  ) {
    return 5;
  }
  // Retorna 0 si no hay match
  return 0;
};

module.exports = { matchAcademicFormation };
