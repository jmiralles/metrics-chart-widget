import { LitElement, html, property, customElement } from "lit-element";
import { formatCurrency, formatUnit } from "../lib/formatters";
import { Metric } from "../models/Metric";
import "./MetricTile";
import "./MetricChart";

@customElement("metric-widget")
export class MetricWidget extends LitElement {
  @property()
  metric: Metric;

  @property()
  type: string;

  get categories(): any {
    const categories = Array.from(this.metric.categories);

    return categories.map((m: Metric) => {
      const total = this.metric.amount > 0 ? this.metric.amount : 1;
      m.ratio = <number>m.amount / total;
      return m;
    });
  }

  set categories(categories) {
    this.metric.categories = categories;
  }

  getFormatter(type: string) {
    const typeMap: any = {
      currency: formatCurrency,
      unit: formatUnit
    };
    return typeMap[type] || formatUnit;
  }

  render() {
    return html`
      <style>
        .tile-wrapper {
          display: flex;
          margin: 0 20px;
        }
        .tile-left {
          margin-left: auto;
          text-align: right;
        }
      </style>
      <metric-chart
        .formatter="${this.getFormatter(this.type)}"
        .metric="${this.metric}"
      >
      </metric-chart>
      <div class="tile-wrapper">
        <metric-tile
          class="tile"
          .formatter="${this.getFormatter(this.type)}"
          .metric="${this.categories[0]}"
        >
        </metric-tile>
        <metric-tile
          class="tile tile-left"
          .formatter="${this.getFormatter(this.type)}"
          .metric="${this.categories[1]}"
        ></metric-tile>
      </div>
    `;
  }
}
