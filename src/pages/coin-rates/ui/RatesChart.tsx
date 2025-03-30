import { Card, CardBody, CardHeader } from '@heroui/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import colors from 'tailwindcss/colors';

interface IRatesChartProps {
  chartData: Array<{ date: string; rate: number }>;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length) {
    return (
      <div className="rounded bg-default-100 p-2 shadow-lg">
        <p className="text-default-500">{label}</p>
        <p className="font-bold text-default-700">{payload[0].value ?? ''}</p>
      </div>
    );
  }
  return null;
};

export function RatesChart({ chartData }: IRatesChartProps) {
  const isDescending = chartData[0].rate - chartData[chartData.length - 1].rate > 0;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg">Rates Chart</h2>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer minHeight="400px" width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <YAxis hide={true} domain={['auto', 'auto']} />
            <XAxis
              hide={true}
              dataKey="date"
              tickFormatter={(date: string) => new Date(date).toLocaleDateString('en-UB')}
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dot={false}
              dataKey="rate"
              stroke={isDescending ? colors.red[500] : colors.green[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
