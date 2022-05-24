//getting unique user id values
export const gettingUserId = (array) => {
  const uniqueId = [];

  array.map((item) => {
    uniqueId.push(item.stylist.user.id);
  });
  const unique = [...new Set(uniqueId)];

  return unique;
};
