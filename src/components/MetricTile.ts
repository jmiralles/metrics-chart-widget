import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";

@customElement("metric-tile")
export class MetricTile extends LitElement {
  @property()
  metric: Metric;

  @property()
  formatter: any;

  render() {
    return html`
      <style>
        .tile-wrapper {
          display: flex;
          margin: 0 20px;
        }
        .amount {
          color: #aaa;
        }
        .percentage {
          color: #333;
          padding-right: 10px;
        }
        h3 {
          color: ${this.metric.color};
          margin: 0;
          font-size: 16px;
        }
        p {
          margin: 0;
          font-size: 16px;
        }
      </style>
      <div>
        <h3>${this.metric.name}</h3>
        <p>
          <span class="percentage">${this.metric.ratio * 100}%</span>
          <span class="amount">${this.formatter(this.metric.amount)}</span>
        </p>
      </div>
    `;
  }
}
