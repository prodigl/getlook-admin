const date = new Date();

const today = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;

const yesterday = `${date.getFullYear()}-0${date.getMonth() + 1}-${
  date.getDate() - 1
}`;

const tommorrow = `${date.getFullYear()}-0${date.getMonth() + 1}-${
  date.getDate() + 2
}`;

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
