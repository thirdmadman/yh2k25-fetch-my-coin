import { APP_NAME } from '@/constants';
import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { Logo } from '@/shared/components/Logo';
import { IGetRatesResponse, TCoinRates } from '@/types/IGetRatesResponse';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';

const getRate = (coinRates: TCoinRates) => {
  const { usd } = coinRates;

  if (!usd) {
    return 0;
  }

  return usd.rate;
};

export function MainPage() {
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
      <Logo text={APP_NAME} />
      <Button color="primary">Button</Button>
      {rates &&
        Object.entries(rates).map(([coin, ratesObject]) => (
          <div key={coin}>
            Coin: {coin} Rate: {ratesObject && getRate(ratesObject)}
          </div>
        ))}
    </>
  );
}
