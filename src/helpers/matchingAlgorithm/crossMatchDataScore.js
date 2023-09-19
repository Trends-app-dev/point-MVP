const crossMatchDataScore = (data, crossMatchData, dataOptions) => {
  let score = 0;

  data.forEach((item) => {
    if (item in dataOptions) {
      const options = dataOptions[item];

      Object.values(options).forEach((val) => {
        if (typeof val !== "object") {
          score += val;
        }
      });

      if (options.crossmatch) {
        crossMatchData.forEach((crossmatchItem) => {
          if (crossmatchItem in options.crossmatch) {
            score += options.crossmatch[crossmatchItem];
          }
        });
      }
    }
  });

  return score;
};

module.exports = { crossMatchDataScore };
