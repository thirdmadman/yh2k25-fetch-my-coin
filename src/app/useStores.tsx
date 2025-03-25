import { useContext } from 'react';
import { StoreContext } from './store';

export function useRootStore() {
  const context = useContext(StoreContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
}
