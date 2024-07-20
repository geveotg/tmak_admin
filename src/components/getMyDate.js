export default function getMyDate(date) {
    const dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let minutes = dateObj.getMinutes();
    let hours = dateObj.getHours();

    year = year < 10 ? "0" + year : year;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
