const generateNumber = () => {
  const range = 10;
  const min = 1;
  return Math.floor((Math.random() * range) + min);
};

module.exports = generateNumber;

