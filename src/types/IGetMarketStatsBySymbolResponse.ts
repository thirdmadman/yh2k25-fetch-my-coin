import { z } from 'zod';

export interface IMarketStatsData {
  slug: string;
  symbol: string;
  cmcRank: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  volumeChange24h: number;
  circulatingSupply: number;
  marketCapDominance: number;
}

export interface IHistoricalPriceData {
  period: string;
  price: number;
}

export interface IPriceRangeData {
  period: string;
  low: number;
  high: number;
}

export interface IIServerError {
  _error: string;
}

export interface IMarketStatsBySymbol {
  priceRange: Array<IPriceRangeData>;
  historicalPrice: Array<IHistoricalPriceData>;
  id: string;
  createdAt: string;
  marketStats: IMarketStatsData;
  baseTicker: string;
  quoteTicker: string;
}

export interface IGetMarketStatsBySymbolResponse {
  result: 'Ok';
  data: IMarketStatsBySymbol;
}

const MarketStatsDataSchema = z.object({
  slug: z.string(),
  symbol: z.string(),
  cmcRank: z.string(),
  marketCap: z.number(),
  volume24h: z.number(),
  totalSupply: z.number(),
  volumeChange24h: z.number(),
  circulatingSupply: z.number(),
  marketCapDominance: z.number(),
});

const historicalPriceDataSchema = z.object({
  period: z.string().nonempty('period must be non-empty'),
  price: z.number(),
});

const PriceRangeDataSchema = z.array(
  z.object({
    period: z.string().nonempty('period must be non-empty'),
    low: z.number(),
    high: z.number(),
  })
);

export const GetMarketStatsBySymbolSchema = z.object({
  result: z.literal('Ok'),
  data: z.object({
    priceRange: PriceRangeDataSchema,
    historicalPrice: z.array(historicalPriceDataSchema),
    id: z.string(),
    createdAt: z.string(),
    marketStats: MarketStatsDataSchema,
    baseTicker: z.string().nonempty('baseTicker must be non-empty'),
    quoteTicker: z.string().nonempty('quoteTicker must be non-empty'),
  }),
});
