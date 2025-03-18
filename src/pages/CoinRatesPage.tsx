import { APP_NAME } from '@/constants';
import { Logo } from '@/shared/components/Logo';
import { useParams } from 'react-router';

export function CoinRatesPage() {
  const { ticker } = useParams();

  return (
    <>
      <Logo text={APP_NAME} />
      <h1>{ticker} rates here</h1>
    </>
  );
}
