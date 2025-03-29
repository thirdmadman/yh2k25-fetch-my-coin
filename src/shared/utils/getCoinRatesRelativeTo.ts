import { IGetRatesResponse } from '@/types/IGetRatesResponse';

export const getCoinRatesRelativeTo = (rates: IGetRatesResponse | null, coin: string, coinRelativeTo = 'usd') => {
  const defaultRate = {
    rate: 0,
    ask: 0,
    bid: 0,
    diff24h: 0,
  };

  if (!rates) {
    return defaultRate;
  }

  const coinRates = rates[coin];

  if (!coinRates) {
    return defaultRate;
  }

  const coinRate = coinRates[coinRelativeTo];

  if (!coinRate) {
    return defaultRate;
  }

  return coinRate;
};
