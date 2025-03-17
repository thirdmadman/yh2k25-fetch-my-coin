import { IGetRatesResponse, TCoinRates } from '@/types/IGetRatesResponse';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const getRate = (coinRates: TCoinRates) => {
  const { usd } = coinRates;

  if (!usd) {
    return 0;
  }

  return usd.rate;
};

interface ICoinsListProps {
  rates: IGetRatesResponse | null | undefined;
}

export function CoinsList({ rates }: ICoinsListProps) {
  if (!rates) {
    return null;
  }

  return (
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
  );
}
