import { Currency } from "./Currency";
import { MetricAmount } from "./MetricAmount";

export interface Metric {
  name: string;
  amount: number;
  color?: string;
  historic?: number[];
  ratio?: number;
  length?: number;
  categories?: Metric[];
}
