
export default function (date) {
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  let month = dateObj.getMonth();
  let minutes = dateObj.getMinutes();
  let hours = dateObj.getHours();

  year = year < 10 ? "0" + year : year;
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${year}-${month}-${day}`;
}
