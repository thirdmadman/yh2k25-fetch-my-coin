import { getTickerIcon, getTickerName } from '@/shared/utils';
import { getRatesRelativeTo } from '@/shared/utils/getRatesRelativeTo';
import { ICoinRateObject, IGetRatesResponse } from '@/types/IGetRatesResponse';

export interface IRemappedCoinRateObject extends ICoinRateObject {
  coin: string;
  icon: string;
  name: string;
}

export const remapData = (data: IGetRatesResponse | null) => {
  if (!data) {
    return null;
  }

  return [
    ...Object.entries(data).map(
      ([coin, ratesObject]) =>
        ({
          coin,
          icon: getTickerIcon(coin),
          name: getTickerName(coin),
          ...getRatesRelativeTo(ratesObject ? ratesObject : {}),
        }) as IRemappedCoinRateObject
    ),
  ];
};
