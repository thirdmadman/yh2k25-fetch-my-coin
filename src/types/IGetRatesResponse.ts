import { z } from 'zod';

export interface ICoinRateObject {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export type TCoinRates = Record<string, ICoinRateObject>;

export type IGetRatesResponse = Partial<Record<string, TCoinRates | undefined>>;

const CoinRateObjectSchema = z.object({
  rate: z.number(),
  ask: z.number(),
  bid: z.number(),
  diff24h: z.number(),
});

const CoinRatesSchema = z.record(z.string(), CoinRateObjectSchema);

export const GetRatesResponseSchema = z.record(z.string(), CoinRatesSchema.optional());
