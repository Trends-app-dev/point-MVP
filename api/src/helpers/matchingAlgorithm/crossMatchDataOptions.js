const { crossMatchDataScore } = require("./crossMatchDataScore.js");

const crossMatchDataOptions = (
  data,
  crossmatchData,
  careerCount,
  academicAreaCount,
  goalsCount,
  skillsCount,
  interestsCount,
  supportCondition
) => {
  // Por escalabilidad se define un objeto dataOptions
  // en donde se puedan ir añadiendo más opciones
  const dataOptions = {
    "Conocer más sobre el mercado laboral de mi profesión": {
      career: 2 * careerCount,
      area: 2 * academicAreaCount,
      support: 5 * supportCondition,
    },
    "Conocer nuevos colegas y oportunidades": {
      career: 2 * careerCount,
      area: 2 * academicAreaCount,
      goals: 2 * goalsCount,
      skills: 2 * skillsCount,
      interests: 2 * interestsCount,
    },
    "Falta de guía profesional": {
      support: 5 * supportCondition,
      crossmatch: {
        "Conocer nuevos colegas y oportunidades": 10,
      },
    },
  };

  return crossMatchDataScore(data, crossmatchData, dataOptions);
};

module.exports = { crossMatchDataOptions };
