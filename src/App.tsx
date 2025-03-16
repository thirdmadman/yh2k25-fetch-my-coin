import { useEffect, useState } from 'react';
import { Logo } from './components/Logo';
import { APP_NAME } from './constants';
import { YouHodlerApiClient } from './services/YouHodlerApiClient';
import { IGetRatesResponse, TCoinRates } from './types/IGetRatesResponse';

const getRate = (coinRates: TCoinRates) => {
  const { usd } = coinRates;

  if (!usd) {
    return 0;
  }

  return usd.rate;
};

function App() {
  const [rates, setRates] = useState<IGetRatesResponse | null>();

  useEffect(() => {
    const getRates = async () => {
      const youHodlerApiClient = new YouHodlerApiClient();

      const rates = await youHodlerApiClient.getRates();

      setRates(rates);
    };

    getRates().catch((e: unknown) => {
      console.error(e);
    });
  }, []);

  return (
    <>
      <Logo text={APP_NAME} />
      {rates &&
        Object.entries(rates).map(([coin, ratesObject]) => (
          <div key={coin}>
            Coin: {coin} Rate: {ratesObject && getRate(ratesObject)}
          </div>
        ))}
    </>
  );
}

export default App;
