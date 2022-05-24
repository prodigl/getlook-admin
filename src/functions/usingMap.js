const Multimap = require("multimap");

export const usingMap = (appointments) => {
  const uniqueStylistId = [
    ...new Set(appointments.map((item) => item.stylist.id)),
  ];
  // console.log("uniqueStylistId", uniqueStylistId);

  //THIS IS FOR SINGLE VALUE PER KEY
  // const data = new Map();

  // for (let i = 0; i <= appointments.length - 1; i++) {
  //   for (let j = 0; j <= uniqueStylistId.length - 1; j++) {
  //     if (uniqueStylistId[j] === appointments[i].stylist.id) {
  //       data.set(uniqueStylistId[j], appointments[i]);
  //     }
  //   }
  // }

  //THIS IS FOR MULTI VALUES PER KEY
  const data = new Multimap();

  for (let i = 0; i <= appointments.length - 1; i++) {
    for (let j = 0; j <= uniqueStylistId.length - 1; j++) {
      if (uniqueStylistId[j] === appointments[i].stylist.id) {
        data.set(uniqueStylistId[j], appointments[i]);
      }
    }
  }

  //object
  // function mapToObj(data) {
  //   let obj = {};

  //   data.forEach(function (value, key) {
  //     obj[key] = value;
  //   });

  //   return obj;
  // }

  //array
  // const array1 = Array.from(data._);

  //array of an object
  const array = Array.from(data._, ([key, value]) => {
    return { [key]: value };
  });

  return array;
};
