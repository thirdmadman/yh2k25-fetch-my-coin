import { TCoinRates } from '@/types/IGetRatesResponse';

export const getRatesRelativeTo = (coinRates: TCoinRates, coinRelativeTo = 'usd') => {
  const relativeRates = coinRates[coinRelativeTo];

  if (!relativeRates) {
    return {
      rate: 0,
      ask: 0,
      bid: 0,
      diff24h: 0,
    };
  }

  return relativeRates;
};
