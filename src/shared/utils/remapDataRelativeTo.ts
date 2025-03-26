import { getDiff24hPercentage, getTickerIcon, getTickerName } from '@/shared/utils';
import { getRatesRelativeTo } from '@/shared/utils/getRatesRelativeTo';
import { ICoinRateObject, IGetRatesResponse } from '@/types/IGetRatesResponse';

export interface IRemappedCoinRateObject extends ICoinRateObject {
  coin: string;
  icon: string;
  name: string;
  diff24hPercent: number;
}

export const remapDataRelativeTo = (data: IGetRatesResponse | null, coinRelativeTo = 'usd') => {
  if (!data) {
    return null;
  }

  return [
    ...Object.entries(data).map(([coin, ratesObject]) => {
      const ratesRelativeTo = getRatesRelativeTo(ratesObject ?? {}, coinRelativeTo);
      const diff24hPercent = getDiff24hPercentage(ratesRelativeTo.rate, ratesRelativeTo.diff24h);

      return {
        coin,
        icon: getTickerIcon(coin),
        name: getTickerName(coin),
        ...ratesRelativeTo,
        diff24hPercent,
      } as IRemappedCoinRateObject;
    }),
  ];
};
