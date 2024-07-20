const numberChanging = (num) => {
  const number=Number(num)
  if (number) {
    if (number - Math.floor(number) == 0) {
      return number;
    } else {
      return parseFloat(number.toFixed(2));
    }
  }
};
export default numberChanging;
