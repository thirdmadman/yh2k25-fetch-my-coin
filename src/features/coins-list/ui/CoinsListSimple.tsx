import { getRatesRelativeTo } from '@/shared/utils/getRatesRelativeTo';
import { getTickerIcon } from '@/shared/utils/getTickerIcon';
import { getTickerName } from '@/shared/utils/getTickerName';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { Link } from 'react-router';



interface ICoinsListSimpleProps {
  rates: IGetRatesResponse | null | undefined;
}

export function CoinsList({ rates }: ICoinsListSimpleProps) {
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
      {rates ? (
        <TableBody>
          {Object.entries(rates).map(([coin, ratesObject]) => (
            <TableRow key={coin}>
              <TableCell>
                <Link to={`/rates/${coin}`}>
                  <img width={32} height={32} src={getTickerIcon(coin)} alt={coin} />
                </Link>
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
      ) : (
        <TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
      )}
    </Table>
  );
}
