import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";
import { MetricTile } from "./MetricTile";
import { MetricChart } from "./MetricChart";

@customElement("metric-widget")
export class MetricWidget extends LitElement {
  @property()
  metric: Metric;

  get categories(): any {
    let categories = Array.from(this.metric.categories);
    return categories.map((m: Metric) => {
      m.ratio = <number>m.amount / <any>this.metric.amount;
      return m;
    });
  }
  set categories(categories) {
    this.metric.categories = categories;
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
      <metric-chart .metric="${this.metric}"></metric-chart>
      <div class="tile-wrapper">
        <metric-tile class="tile" .metric="${this.categories[0]}"></metric-tile>
        <metric-tile
          class="tile tile-left"
          .metric="${this.categories[1]}"
        ></metric-tile>
      </div>
    `;
  }
}

console.log(MetricTile);
console.log(MetricChart);
