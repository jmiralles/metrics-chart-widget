export interface Metric {
  name: string;
  amount: number;
  color?: string;
  historic?: any[];
  ratio?: number;
  length?: number;
  type?: string;
  categories?: Metric[];
}
