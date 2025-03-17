import { APP_NAME } from '@/constants';
import { Logo } from '@/shared/components/Logo';

export function CoinRatesPage() {
  return (
    <>
      <Logo text={APP_NAME} />
      <h1>Coin rates here</h1>
    </>
  );
}
