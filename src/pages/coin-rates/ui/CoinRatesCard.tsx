import { getTickerIcon } from '@/shared/utils/getTickerIcon';
import { getTickerName } from '@/shared/utils/getTickerName';
import { getTickerType } from '@/shared/utils/getTickerType';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { Card, CardBody, CardHeader, Chip, Divider, Image } from '@heroui/react';

const getCoinRatesRelativeTo = (rates: IGetRatesResponse | null, coin: string, coinRelativeTo = 'usd') => {
  const defaultRate = {
    rate: 0,
    ask: 0,
    bid: 0,
    diff24h: 0,
  };

  if (!rates) {
    return defaultRate;
  }

  const coinRates = rates[coinRelativeTo];

  if (!coinRates) {
    return defaultRate;
  }

  const coinRate = coinRates[coin];

  if (!coinRate) {
    return defaultRate;
  }

  return coinRate;
};

interface ICoinRatesCardProps {
  ticker?: string;
  rates: IGetRatesResponse | null;
}

export function CoinRatesCard({ ticker, rates }: ICoinRatesCardProps) {
  const iconData = getTickerIcon(ticker ?? '');
  const tickerName = getTickerName(ticker ?? '');
  const relativeData = getCoinRatesRelativeTo(rates ?? null, ticker ?? '');
  const tickerType = getTickerType(ticker ?? '');

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <Image alt="heroui logo" height={40} radius="sm" src={iconData} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{ticker?.toUpperCase()}</p>
          <p className="text-small text-default-500">{tickerName}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        <p>Rate: {relativeData.rate}</p>
        <p>Bid: {relativeData.bid}</p>
        <p>Ask: {relativeData.ask}</p>
        <div className="flex gap-4">
          Difference in 24H:{' '}
          <p className={relativeData.diff24h > 0 ? 'text-green-500' : relativeData.diff24h === 0 ? '' : 'text-red-500'}>
            {relativeData.diff24h}
          </p>
        </div>
        <div className="flex gap-4">
          Types: <div className="flex gap-2">{tickerType?.tags?.map((el) => <Chip>{el}</Chip>)}</div>
        </div>
        <div className="flex gap-4">
          Versions: <div className="flex gap-2">{tickerType?.versions?.map((ver) => <Chip>{ver.name}</Chip>)}</div>
        </div>
      </CardBody>
    </Card>
  );
}
