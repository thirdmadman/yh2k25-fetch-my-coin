import { z } from 'zod';

interface IChartPoint {
  date: string;
  rate: number;
}

export type TGetChartResponse = Array<IChartPoint>;

const ChartPointSchema = z.object({
  date: z.string(),
  rate: z.number(),
});

export const GetChartResponse = z.array(ChartPointSchema);
