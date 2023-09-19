// helper para contar elementos en común

// Se usa para contar los elementos que no se cuentan
// directamente en calculateMatchScore o para
// sumar puntos extra en combinación con otro match
const countCommonElements = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  let count = 0;
  
  set1.forEach((item) => {
    if (set2.has(item)) {
      count++;
    }
  });
  return count;
};

module.exports = { countCommonElements };
