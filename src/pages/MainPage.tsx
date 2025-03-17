import { YouHodlerApiClient } from '@/services/YouHodlerApiClient';
import { IGetRatesResponse, TCoinRates } from '@/types/IGetRatesResponse';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

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
      {rates && (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Coin</TableColumn>
            <TableColumn>Rate in USD</TableColumn>
          </TableHeader>
          <TableBody>
            {Object.entries(rates).map(([coin, ratesObject]) => (
              <TableRow key="1">
                <TableCell>{coin}</TableCell>
                <TableCell>{ratesObject && getRate(ratesObject)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
