import { formatDiffPercentage, formatRateNumber } from '@/shared/utils';
import { IHistoricalPriceData } from '@/types/IGetMarketStatsBySymbolResponse';
import { ICoinRateObject } from '@/types/IGetRatesResponse';
import { Card, CardBody } from '@heroui/react';

const getHistoricalPriceDifferencePercentage = (price: number, previousPrice: number) => {
  return (100 - price / (previousPrice / 100)) * -1;
};

interface IHistoricalPriceCardProps {
  priceData: IHistoricalPriceData;
  currentPriceData: ICoinRateObject | null;
}

export function HistoricalPriceCard({ priceData, currentPriceData }: IHistoricalPriceCardProps) {
  const priceDifferencePercentage = getHistoricalPriceDifferencePercentage(
    currentPriceData?.rate ?? 0,
    priceData.price
  );

  return (
    <Card className={priceDifferencePercentage > 0 ? 'bg-success-100' : 'bg-danger-100'} shadow="none">
      <CardBody>
        <div className="flex gap-2">
          <p className="text-default-500">Time ago</p>
          {priceData.period}
        </div>
        <div className="flex gap-2">
          <p className="text-default-500">Price</p>
          {formatRateNumber(priceData.price)} ({formatDiffPercentage(priceDifferencePercentage)} %)
        </div>
      </CardBody>
    </Card>
  );
}
