import { useRootStore } from '@/app/useStores';
import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { CoinRatesCard } from './CoinRatesCard';



export const CoinRatesPage = observer(() => {
  const { ticker } = useParams();

  const store = useRootStore();
  const { rates } = store.coinRatesStore;

  const fetchData = useCallback(async () => {
    const youHodlerApiClient = new YouHodlerApiClient();

    const rates = await youHodlerApiClient.getRates();

    store.coinRatesStore.setRates(rates);
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
