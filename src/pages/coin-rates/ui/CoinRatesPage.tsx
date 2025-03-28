import { useRootStore } from '@/app/useStores';
import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CoinRatesCard } from './CoinRatesCard';
import { addToast } from '@heroui/react';
import { MarketStats } from './MarketStats';
import { IMarketStatsBySymbol } from '@/types/IGetMarketStatsBySymbolResponse';

export const CoinRatesPage = observer(() => {
  const { ticker } = useParams();
  const [marketStatsData, setMarketStatsData] = useState<IMarketStatsBySymbol | null>(null);

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

  const fetchMarketStats = useCallback(async () => {
    if (!ticker) {
      return;
    }
    const youHodlerApiClient = new YouHodlerApiClient();

    const marketStats = await youHodlerApiClient.getMarketStatsBySymbol(ticker, 'usdt');

    const { isError, error, errorDescription, data } = marketStats;

    if (isError === true && error) {
      addToast({
        title: error,
        description: errorDescription,
      });
      return;
    }

    setMarketStatsData(data ?? null);

    console.log(data);
  }, [ticker, setMarketStatsData]);

  useEffect(() => {
    if (!store.coinRatesStore.rates) {
      fetchData().catch((e: unknown) => {
        console.error(e);
      });
    }

    fetchMarketStats().catch((e: unknown) => {
      console.error(e);
    });
  }, [ticker, fetchMarketStats]);

  return (
    <>
      <h1 className="text-4xl mb-5">{ticker?.toUpperCase()} rates</h1>
      <CoinRatesCard ticker={ticker} rates={rates} />
      {marketStatsData && <MarketStats marketStatsData={marketStatsData} />}
    </>
  );
});
