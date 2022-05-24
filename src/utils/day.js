//today date
const todayDate = new Date();

//yesterday date
const yesterdayDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

//tomorrow date
const tommorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

//today date format acc. to API
const today = `${todayDate.getFullYear()}-0${
  todayDate.getMonth() + 1
}-${todayDate.getDate()}`;

//yesterday date format acc. to API
const yesterday = `${yesterdayDate.getFullYear()}-0${
  yesterdayDate.getMonth() + 1
}-${yesterdayDate.getDate()}`;

//tomorrow date format acc. to API
const tommorrow = `${tommorrowDate.getFullYear()}-0${
  tommorrowDate.getMonth() + 1
}-${tommorrowDate.getDate()}`;

export const days = [
  {
    value: today,
    content: "today",
  },
  {
    value: yesterday,
    content: "yesterday",
  },
  {
    value: tommorrow,
    content: "tommorrow",
  },
];
