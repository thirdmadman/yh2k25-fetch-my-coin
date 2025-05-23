import { YH_API_URL } from '@/constants';
import { convertFilterObjectToSearchParams } from '@/shared/utils';
import { GetMarketStatsBySymbolSchema, IGetMarketStatsBySymbolResponse } from '@/types/IGetMarketStatsBySymbolResponse';
import { GetRatesResponseSchema, IGetRatesResponse } from '@/types/IGetRatesResponse';
import { GetChartResponse, TGetChartResponse } from '@/types/TGetChartResponse';

export const YH_API_ROUTES = {
  getRates: 'v3/rates/extended',
  getMarketStatsBySymbol: 'v3/hodl/grpc/getMarketStatsBySymbol',
  getChart: 'v3/rates/chart',
};

export class YouHodlerApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? YH_API_URL;
  }

  private async createRequest(
    route: keyof typeof YH_API_ROUTES,
    method: string,
    options?: {
      initOptions?: RequestInit;
      urlSearch?: string;
      urlParams?: string;
    }
  ) {
    const reqestOptions: RequestInit = {
      ...options?.initOptions,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // eslint-disable-next-line @typescript-eslint/no-misused-spread
        ...options?.initOptions?.headers,
      },
      method,
    };

    // TODO: DEL AFTER DEV STAGE
    console.error(
      'making req',
      `${this.baseUrl}${YH_API_ROUTES[route]}${options?.urlParams ?? ''}${options?.urlSearch ?? ''}`,
      reqestOptions
    );

    return fetch(
      `${this.baseUrl}${YH_API_ROUTES[route]}${options?.urlParams ?? ''}${options?.urlSearch ?? ''}`,
      reqestOptions
    );
  }

  public async getRates() {
    let response = null;

    try {
      response = await this.createRequest('getRates', 'GET');
    } catch (e: unknown) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable make request to the server',
        errorDescription: '',
      };
    }

    let json = null;

    try {
      json = (await response.json()) as IGetRatesResponse;
    } catch (e) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable to read server response',
        errorDescription: 'Incorrect response format',
      };
    }

    const parsedData = GetRatesResponseSchema.safeParse(json);

    if ('success' in parsedData && !parsedData.success) {
      console.error(parsedData);
      return {
        isError: true,
        error: 'Unable to validate server response',
        errorDescription: 'Data schema validation failed, data is not valid',
      };
    }

    return { data: parsedData.data };
  }

  // https://app.youhodler.com/api/v3/hodl/grpc/getMarketStatsBySymbol?baseTicker=trx&quoteTicker=usdt
  public async getMarketStatsBySymbol(baseTicker: string, quoteTicker: string) {
    let response = null;

    try {
      response = await this.createRequest('getMarketStatsBySymbol', 'GET', {
        urlSearch: `?baseTicker=${baseTicker}&quoteTicker=${quoteTicker}`,
      });
    } catch (e: unknown) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable make request to the server',
        errorDescription: '',
      };
    }

    let json = null;
    try {
      json = (await response.json()) as IGetMarketStatsBySymbolResponse;
    } catch (e) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable to read server response',
        errorDescription: 'Incorrect response format',
      };
    }

    const parsedData = GetMarketStatsBySymbolSchema.safeParse(json);

    if ('success' in parsedData && !parsedData.success) {
      console.error(parsedData);
      return {
        isError: true,
        error: 'Unable to validate server response',
        errorDescription: 'Data schema validation failed, data is not valid',
      };
    }

    return { data: json.data };
  }

  // https://app.youhodler.com/api/v3/rates/chart?type=line&product=hodl&fromTicker=trx&toTicker=usdt&points=120&fromDate=2025-03-17T17:41:53.880Z&toDate=2025-03-17T18:41:53.880Z&mode=mid
  public async getChart(filterObject: {
    type: 'line' | 'area' | 'candle';
    product: 'hodl';
    fromTicker: string;
    toTicker: string;
    points: number;
    fromDate: string;
    toDate: string;
    mode?: 'mid' | 'full';
  }) {
    const searchParams = convertFilterObjectToSearchParams(filterObject);

    let response = null;
    try {
      response = await this.createRequest('getChart', 'GET', {
        urlSearch: searchParams,
      });
    } catch (e: unknown) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable make request to the server',
        errorDescription: '',
      };
    }

    let json = null;
    try {
      json = (await response.json()) as TGetChartResponse;
    } catch (e) {
      console.error(e);
      return {
        isError: true,
        error: 'Unable to read server response',
        errorDescription: 'Incorrect response format',
      };
    }

    const parsedData = GetChartResponse.safeParse(json);
    if ('success' in parsedData && !parsedData.success) {
      console.error(parsedData);
      return {
        isError: true,
        error: 'Unable to validate server response',
        errorDescription: 'Data schema validation failed, data is not valid',
      };
    }

    return { data: parsedData.data };
  }
}
