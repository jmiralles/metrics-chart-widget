import { LitElement, html, property, customElement } from 'lit-element';
import { Metric } from '../models/Metric';


@customElement('metric-tile')
export class MetricTile extends LitElement {

  @property()
  metric: Metric;

  render() {
     return html`
     <div>
      <p>${this.metric.name}</p>
      <p>${this.metric.amount}</p>
      </div>
    `
  }
}
