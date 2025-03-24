import { action, makeAutoObservable, observable } from 'mobx';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';

export class RootStore {
  coinRatesStore: CoinsRatesStore;

  constructor() {
    this.coinRatesStore = new CoinsRatesStore(this);
  }
}

export class CoinsRatesStore {
  rootStore: RootStore;

  rates: IGetRatesResponse | null = null;
  coinRelativeTo = 'usd';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      rates: observable,
      coinRelativeTo: observable,
      setRates: action,
      setCoinRelativeTo: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
  }

  setRates(rates: IGetRatesResponse | null) {
    this.rates = rates;
  }

  setCoinRelativeTo(coinRatesStore: string) {
    this.coinRelativeTo = coinRatesStore;
  }

}

export const store = new RootStore();
