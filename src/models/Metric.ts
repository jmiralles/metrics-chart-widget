
import { Currency } from './Currency';
import { MetricAmount } from './MetricAmount';

export interface Metric {
  name: string;
  amount: MetricAmount | Currency;
  categories?: Metric;
  historic?: Number[]
}