import tickersNames from '@/shared/assets/tickersNames.json';

const tickersNamesArray: Array<Partial<{ ticker: string; name: string }> | null> = tickersNames.data;

const nameNotFound = 'No info';

export const getTickerName = (ticker: string) => {
  const tickerName = tickersNamesArray.find((t) => t?.ticker === ticker);
  return tickerName?.name ?? nameNotFound;
};
