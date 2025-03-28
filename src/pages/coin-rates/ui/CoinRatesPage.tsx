import { useRootStore } from '@/app/useStores';
import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { CoinRatesCard } from './CoinRatesCard';
import { addToast } from '@heroui/react';

export const CoinRatesPage = observer(() => {
  const { ticker } = useParams();

  const store = useRootStore();
  const { rates } = store.coinRatesStore;

  const fetchData = useCallback(async () => {
    const youHodlerApiClient = new YouHodlerApiClient();

    const rates = await youHodlerApiClient.getRates();

    const { isError, error, errorDescription, data } = rates;

    if (isError === true && error) {
      addToast({
        title: error,
        description: errorDescription,
      });
      return;
    }

    store.coinRatesStore.setRates(data ?? null);
  }, []);

  useEffect(() => {
    if (!store.coinRatesStore.rates) {
      fetchData().catch((e: unknown) => {
        console.error(e);
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl mb-5">{ticker?.toUpperCase()} rates</h1>
      <CoinRatesCard ticker={ticker} rates={rates} />
    </>
  );
});
