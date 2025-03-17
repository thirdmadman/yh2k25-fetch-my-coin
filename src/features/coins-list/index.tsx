import { getTickerIcon } from '@/shared/utils/getTickerIcon';
import { getTickerName } from '@/shared/utils/getTickerName';
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
        <TableColumn>Icon</TableColumn>
        <TableColumn>Coin</TableColumn>
        <TableColumn>Rate in USD</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.entries(rates).map(([coin, ratesObject]) => (
          <TableRow key={coin}>
            <TableCell>
              <img width={32} height={32} src={getTickerIcon(coin)} alt={coin} />
            </TableCell>
            <TableCell>{coin}</TableCell>
            <TableCell>{ratesObject && getRate(ratesObject)}</TableCell>
            <TableCell>{ratesObject && getTickerName(coin)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
