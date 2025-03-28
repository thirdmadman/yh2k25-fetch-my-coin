import { IMarketStatsBySymbol } from '@/types/IGetMarketStatsBySymbolResponse';

interface IMarketStatsProps {
  marketStatsData: IMarketStatsBySymbol;
}

export function MarketStats({ marketStatsData }: IMarketStatsProps) {
  const { priceRange, historicalPrice, marketStats } = marketStatsData;

  return (
    <div className="max-w-sm bg-white rounded shadow-md p-4">
      <h2 className="text-lg font-bold mb-2">Market Stats</h2>
      <ul>
        <li>
          <span className="font-bold">Slug:</span> {marketStats.slug}
        </li>
        <li>
          <span className="font-bold">Symbol:</span> {marketStats.symbol}
        </li>
        <li>
          <span className="font-bold">CMC Rank:</span> {marketStats.cmcRank}
        </li>
        <li>
          <span className="font-bold">Market Cap:</span> ${marketStats.marketCap}
        </li>
        <li>
          <span className="font-bold">24h Volume:</span> ${marketStats.volume24h}
        </li>
        <li>
          <span className="font-bold">Total Supply:</span> {marketStats.totalSupply}
        </li>
      </ul>

      <div className="mt-4">
        <h3>Historical Price</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Period</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {historicalPrice.map((price, index) => (
              <tr key={index}>
                <td>{price.period}</td>
                <td>${price.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3>Price Range</h3>
        <ul>
          <li>
            <span className="font-bold">Low:</span> ${priceRange[0].low}
          </li>
          <li>
            <span className="font-bold">High:</span> ${priceRange[0].high}
          </li>
        </ul>
      </div>
    </div>
  );
}
