import { z } from 'zod';

interface MarketStatsData {
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

interface HistoricalPriceData {
  period: string;
  price: number;
}

interface PriceRangeData {
  period: string;
  low: number;
  high: number;
}

export interface IServerError {
  _error: string;
}

export interface IGetMarketStatsBySymbolResponse {
  result: 'Ok';
  data: {
    priceRange: Array<PriceRangeData>;
    historicalPrice: Array<HistoricalPriceData>;
    id: string;
    createdAt: string;
    marketStats: MarketStatsData;
    baseTicker: string;
    quoteTicker: string;
  };
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
