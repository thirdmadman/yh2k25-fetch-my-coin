import { action, makeAutoObservable, observable } from 'mobx';
import { IGetRatesResponse } from '@/types/IGetRatesResponse';
import { SharedSelection, SortDescriptor } from '@heroui/react';

export class RootStore {
  coinRatesStore: CoinsRatesStore;
  coinsListStore: CoinsListStore;

  constructor() {
    this.coinRatesStore = new CoinsRatesStore(this);
    this.coinsListStore = new CoinsListStore(this);
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

const INITIAL_VISIBLE_COLUMNS = ['icon', 'name', 'rate', 'ask', 'bid', 'diff24h', 'diff24hPercent'];

export class CoinsListStore {
  rootStore: RootStore;

  filterValue = '';
  visibleColumns: SharedSelection = new Set(INITIAL_VISIBLE_COLUMNS);
  sortDescriptor: SortDescriptor = {
    column: 'name',
    direction: 'ascending',
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      filterValue: observable,
      visibleColumns: observable,
      sortDescriptor: observable,
      setFilterValue: action,
      setVisibleColumns: action,
      setSortDescriptor: action,
      rootStore: false,
    });
    this.rootStore = rootStore;
  }

  setFilterValue(filterValue: string) {
    this.filterValue = filterValue;
  }

  setVisibleColumns(visibleColumns: SharedSelection) {
    console.log(visibleColumns);
    console.log(this.visibleColumns);
    this.visibleColumns = visibleColumns;
  }

  setSortDescriptor(sortDescriptor: SortDescriptor) {
    this.sortDescriptor = sortDescriptor;
  }
}

export const store = new RootStore();
