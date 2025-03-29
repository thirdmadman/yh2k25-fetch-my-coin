import { IMarketStatsBySymbol } from '@/types/IGetMarketStatsBySymbolResponse';
import { ICoinRateObject } from '@/types/IGetRatesResponse';
import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { HistoricalPriceCard } from './HistoricalPriceCard';

interface IMarketStatsCardProps {
  marketStatsData: IMarketStatsBySymbol;
  currentPriceData: ICoinRateObject | null;
}

export function MarketStatsCard({ currentPriceData, marketStatsData }: IMarketStatsCardProps) {
  const { priceRange, historicalPrice, marketStats } = marketStatsData;

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <h3 className="text-xl">Detailed stats</h3>
      </CardHeader>
      <Divider />

      <CardBody className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 py-4">
          <h4 className="text-lg">Market Overview</h4>
          <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
            <Card className="border border-neutral-200" shadow="none">
              <CardBody>
                <h5>Market Cap:</h5>
                <p>{marketStats.marketCap}</p>
              </CardBody>
            </Card>
            <Card className="border border-neutral-200" shadow="none">
              <CardBody>
                <h5>24h Volume:</h5>
                <p>{marketStats.volume24h}</p>
              </CardBody>
            </Card>
            <Card className="border border-neutral-200" shadow="none">
              <CardBody>
                <h5>Total Supply:</h5>
                <p>{marketStats.totalSupply}</p>
              </CardBody>
            </Card>
            <Card className="border border-neutral-200" shadow="none">
              <CardBody>
                <h5>CMC Rank:</h5>
                <p>{marketStats.cmcRank}</p>
              </CardBody>
            </Card>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-4 py-4">
          <h4 className="text-lg">Historical Price</h4>
          <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
            {historicalPrice.map((priceData, index) =>
              priceData.price !== 0 ? (
                <HistoricalPriceCard key={index} priceData={priceData} currentPriceData={currentPriceData} />
              ) : (
                ''
              )
            )}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-4 py-4">
          <h4 className="text-lg">Historical Price Range</h4>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {priceRange.map((priceRangeData, index) =>
              priceRangeData.low !== 0 ? (
                <Card key={index} className="border border-neutral-200" shadow="none">
                  <CardBody>
                    <div className="flex gap-2">
                      <p className="text-default-500">Time ago</p>
                      {priceRangeData.period}
                    </div>
                    <div className="flex gap-2">
                      <p className="text-default-500">low: </p>
                      {priceRangeData.low}
                    </div>
                    <div className="flex gap-2">
                      <p className="text-default-500">high: </p>
                      {priceRangeData.high}
                    </div>
                  </CardBody>
                </Card>
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
