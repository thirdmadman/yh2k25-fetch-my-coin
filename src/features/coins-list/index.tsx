import { getTickerIcon } from '@/shared/utils/getTickerIcon';
import { getTickerName } from '@/shared/utils/getTickerName';
import { IGetRatesResponse, TCoinRates } from '@/types/IGetRatesResponse';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const getRatesRelativeTo = (coinRates: TCoinRates, coinRelativeTo = 'usd') => {
  const relativeRates = coinRates[coinRelativeTo];

  if (!relativeRates) {
    return {
      rate: 0,
      ask: 0,
      bid: 0,
      diff24h: 0,
    };
  }

  return relativeRates;
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
        <TableColumn>Name</TableColumn>
        <TableColumn>Rate in USD</TableColumn>
        <TableColumn>Ask in USD</TableColumn>
        <TableColumn>Bid in USD</TableColumn>
        <TableColumn>Difference in 24H</TableColumn>

      </TableHeader>
      <TableBody>
        {Object.entries(rates).map(([coin, ratesObject]) => (
          <TableRow key={coin}>
            <TableCell>
              <img width={32} height={32} src={getTickerIcon(coin)} alt={coin} />
            </TableCell>
            <TableCell>{coin}</TableCell>
            <TableCell>{ratesObject && getTickerName(coin)}</TableCell>
            <TableCell>{ratesObject && getRatesRelativeTo(ratesObject).rate}</TableCell>
            <TableCell>{ratesObject && getRatesRelativeTo(ratesObject).ask}</TableCell>
            <TableCell>{ratesObject && getRatesRelativeTo(ratesObject).bid}</TableCell>
            <TableCell>{ratesObject && getRatesRelativeTo(ratesObject).diff24h}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
