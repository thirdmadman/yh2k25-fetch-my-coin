import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CoinsList } from '@/features/coins-list/';
import { remapDataRelativeTo } from '@/shared/utils';
import { Button, Select, SelectItem } from '@heroui/react';

export function MainPage() {
  const [rates, setRates] = useState<IGetRatesResponse | null>();
  const [coinRelativeTo, setCoinRelativeTo] = useState<string>('usd');

  const fetchData = useCallback(async () => {
    const youHodlerApiClient = new YouHodlerApiClient();

    const rates = await youHodlerApiClient.getRates();

    setRates(rates);
  }, []);

  useEffect(() => {
    fetchData().catch((e: unknown) => {
      console.error(e);
    });
  }, []);

  const data = useMemo(() => {
    return remapDataRelativeTo(rates ?? null, coinRelativeTo);
  }, [rates, coinRelativeTo]);

  return (
    <>
      <div className="flex flex-col gap-3 justify-between mb-4">
        <div className="">
          <p>All calculations made with assumption that you are using some coin as base. By default it is USD.</p>
          <p>You can change it in the dropdown below.</p>
        </div>
        <div className="flex justify-between gap-3 items-space mb-4">
          <Select
            className="max-w-xs"
            label="Coin as base for rates"
            placeholder="Select a coin"
            defaultSelectedKeys={['usd']}
            onChange={(res) => setCoinRelativeTo(res.target.value)}
          >
            {data && data.map((animal) => <SelectItem key={animal.coin}>{animal.coin}</SelectItem>)}
          </Select>
          <Button onPress={() => fetchData()}>ReFetch rates</Button>
        </div>
      </div>
      <CoinsList rates={data} />
    </>
  );
}
