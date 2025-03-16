export interface ICoinRateObject {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export type TCoinRates = Partial<Record<string, ICoinRateObject>>;

export type IGetRatesResponse = Partial<Record<string, TCoinRates | undefined>>;
