//getting unique city values
export const gettingCities = (array) => {
  const uniqueCity = [];

  array.map((item) => {
    uniqueCity.push(item.stylist.area.city);
  });
  const unique = [...new Set(uniqueCity)];

  return unique.sort();
};
