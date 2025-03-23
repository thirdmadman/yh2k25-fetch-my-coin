import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { getTickerIcon } from '@/shared/utils/getTickerIcon';
import { getTickerName } from '@/shared/utils/getTickerName';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { Card, CardBody, CardHeader, Divider, Image } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

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

export function CoinRatesPage() {
  const { ticker } = useParams();

  const [rates, setRates] = useState<IGetRatesResponse | null>();

  useEffect(() => {
    const getRates = async () => {
      const youHodlerApiClient = new YouHodlerApiClient();

      const rates = await youHodlerApiClient.getRates();

      setRates(rates);
    };

    getRates().catch((e: unknown) => {
      console.error(e);
    });
  }, []);

  return (
    <>
      <h1 className="text-4xl mb-5">{ticker?.toUpperCase()} rates</h1>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image alt="heroui logo" height={40} radius="sm" src={getTickerIcon(ticker ?? '')} width={40} />
          <div className="flex flex-col">
            <p className="text-md">{ticker?.toUpperCase()}</p>
            <p className="text-small text-default-500">{getTickerName(ticker ?? '')}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Rate: {getCoinRatesRelativeTo(rates ?? null, ticker ?? '').rate}</p>
          <p>Bid: {getCoinRatesRelativeTo(rates ?? null, ticker ?? '').bid}</p>
          <p>Ask: {getCoinRatesRelativeTo(rates ?? null, ticker ?? '').ask}</p>
          <p>Difference in 24H: {getCoinRatesRelativeTo(rates ?? null, ticker ?? '').diff24h}</p>
        </CardBody>
      </Card>
    </>
  );
}
