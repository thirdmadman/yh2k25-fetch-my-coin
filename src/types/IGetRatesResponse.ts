export interface ICoinRateObject {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export type TCoinRates = Record<string, ICoinRateObject>;

export type IGetRatesResponse = Record<string, TCoinRates>;
