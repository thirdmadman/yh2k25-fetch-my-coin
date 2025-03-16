import { YH_API_URL } from '@/constants';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';

export const YH_API_ROUTES = {
  getRates: 'v3/rates/extended',
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
    const response = await this.createRequest('getRates', 'GET');

    const json = (await response.json()) as IGetRatesResponse;

    return json;
  }
}
