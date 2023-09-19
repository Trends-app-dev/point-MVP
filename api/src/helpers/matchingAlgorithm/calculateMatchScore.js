const { matchAcademicFormation } = require("./matchAcademicFormation.js");
const { crossMatchData } = require("./crossMatchData.js");

const calculateMatchScore = (user, target) => {
  // El "puntaje" de matcheo
  let score = 0;
  
  if ((user.type || target.type).includes("company") || target.jobName) {
    score += crossMatchData(user, target);
    return score;
  }

  // Se definen los handlers
  // o el "peso" para cada campo del perfil
  // 5 = Alto, 3 = Medio, 1 = Bajo
  const fieldHandlers = {
    profile_support: 5,
    academic_area: 5,
    academic_formation: () => matchAcademicFormation(user, target),
    info_career: 5,
    info_interests: 5,
    profile_city: 3,
    profile_country: 3,
    academic_level: 3,
    info_skills: 3,
    info_languages: 3,
    info_availability: 3,
    academic_institution: 1,
    academic_graduation: 1,
  };

  // Se recorren las propiedades de fieldHandlers
  for (const key in fieldHandlers) {
    const currentKey = fieldHandlers[key];

    // Si el valor es una función, se la llama
    // y se suma su valor de retorno al score
    if (typeof currentKey === "function") {
      score += currentKey();
    } else {
      // info y academic tienen propiedades que son arrays
      if (
        [
          "info_career",
          "info_skills",
          "info_goals",
          "info_interests",
          "info_problematic",
          "info_languages",
          "academic_area",
        ].includes(currentKey) &&
        [user, target].every((user) => Array.isArray(user[currentKey]))
      ) {
        // Se convierte cada array en un set
        // por eficiencia y operaciones de conjunto
        const set1 = new Set(user[currentKey]);
        const set2 = new Set(target[currentKey]);

        // Operaciones de conjunto para evaluar la diversidad/complementariedad
        const commonData = new Set([...set1].filter((data) => set2.has(data)));
        const exclusiveData1 = new Set(
          [...set1].filter((data) => !set2.has(data))
        );
        const exclusiveData2 = new Set(
          [...set2].filter((data) => !set1.has(data))
        );
        const totalExclusiveData = exclusiveData1.size + exclusiveData2.size;

        // Se suman puntos según los datos en común
        score += currentKey * commonData.size;

        // Se suman puntos extra en base a mayor afinidad:
        // Mientras la resta entre commonData y el total de exclusiveData
        // esté más alejada de cero, siendo positiva, significa que
        // los perfiles tienen menos datos que los diferencian.
        if (commonData.size > 0 && totalExclusiveData < commonData.size) {
          score += currentKey * (commonData.size - totalExclusiveData);
        }

        // Las demás propiedades van a ser un solo value (una vez elegido)
      } else if (
        user[currentKey] &&
        target[currentKey] &&
        user[currentKey] === target[currentKey]
      ) {
        // Si hay coincidencia se suma al score
        score += currentKey;
      }
    }
  }

  // Para matcheos cruzados se llama a crossMatchData
  score += crossMatchData(user, target);

  return score;
};

module.exports = { calculateMatchScore };
