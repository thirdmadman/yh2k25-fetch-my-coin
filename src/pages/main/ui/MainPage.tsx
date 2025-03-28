import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { useCallback, useEffect, useMemo } from 'react';
import { CoinsList } from '@/features/coins-list/';
import { remapDataRelativeTo } from '@/shared/utils';
import { Button, Select, SelectItem, addToast } from '@heroui/react';
import { useRootStore } from '@/app/useStores';
import { observer } from 'mobx-react-lite';

export const MainPage = observer(() => {
  const store = useRootStore();
  const { rates, coinRelativeTo } = store.coinRatesStore;

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

  const data = useMemo(() => {
    return remapDataRelativeTo(rates ?? null, coinRelativeTo);
  }, [rates, coinRelativeTo]);

  return (
    <>
      <div className="flex flex-col gap-6 justify-between mb-8">
        <div className="">
          <p>All calculations made with assumption that you are using some coin as base. By default it is USD.</p>
          <p>You can change it in the dropdown below.</p>
        </div>
        <div className="flex justify-between gap-3 items-space mb-4">
          <Select
            className="max-w-xs"
            label="Coin as base for rates"
            placeholder="Select a coin"
            defaultSelectedKeys={[coinRelativeTo]}
            onChange={(res) => {
              store.coinRatesStore.setCoinRelativeTo(res.target.value);
            }}
          >
            {data?.map((item) => <SelectItem key={item.coin}>{item.coin}</SelectItem>) ?? null}
          </Select>
          <Button
            color="primary"
            className="h-auto"
            onPress={() => {
              fetchData().catch((e: unknown) => {
                console.error(e);
              });
            }}
          >
            ReFetch
          </Button>
        </div>
      </div>
      <CoinsList rates={data} />
    </>
  );
});
