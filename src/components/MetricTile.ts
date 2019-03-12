import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";

@customElement("metric-tile")
export class MetricTile extends LitElement {
  @property()
  metric: Metric;

  render() {
    return html`
      <div>
        <h3>${this.metric.name}</h3>
        <p>${this.metric.ratio * 100}% ${this.metric.amount}</p>
      </div>
    `;
  }
}
