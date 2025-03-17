import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { useEffect, useState } from 'react';
import { CoinsList } from '@/features/coins-list';

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
      <CoinsList rates={rates} />
    </>
  );
}
