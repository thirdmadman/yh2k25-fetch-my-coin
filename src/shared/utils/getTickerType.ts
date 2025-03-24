import tickersTypes from '@/shared/assets/tickersTypes.json';

interface TickerVersions {
  version: string;
  name: string;
}
interface TickerType {
  ticker: string;
  tags: Array<string>;
  versions: Array<TickerVersions>;
  isVisible: boolean;
}

const tickersTypesArray: Array<Partial<TickerType> | null> = tickersTypes.data;

export const getTickerType = (ticker: string) => {
  const tickerType = tickersTypesArray.find((t) => t?.ticker === ticker);
  return tickerType ?? null;
};
