export const formatRateNumber = (number: number) => {
  return number != 0
    ? (number <= 0.01 && number > 0) || (number >= -0.01 && number < 0)
      ? number.toFixed(8)
      : number.toFixed(4)
    : 0;
};

const getPreviousPrice = (rate: number, diff24h: number) => {
  return rate - diff24h;
};

export const getDiff24hPercentage = (rate: number, diff24h: number) => {
  const previousPrice = getPreviousPrice(rate, diff24h);

  const diff24hPercentage = previousPrice === 0 ? 0 : (diff24h / previousPrice) * 100;

  return diff24hPercentage;
};

export const getDiff24hPercentageFormatted = (rate: number, diff24h: number) => {
  const diff = getDiff24hPercentage(rate, diff24h);
  return diff !== 0 ? diff.toFixed(2) : 0;
};
