export const convertDate = (date) => {
  let newDate = new Date(date).toDateString();
  newDate = newDate.split(" ");
  newDate = newDate[1] + " " + newDate[2] + ", " + newDate[3];
  return newDate;
};
