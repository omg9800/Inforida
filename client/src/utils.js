export const validate = (obj) => {
  for (let key in obj) {
    if (obj[key] == "") return `${key} is required!`;
  }
  return "success";
};
