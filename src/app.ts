import { LitElement, html, customElement, property } from "lit-element";
import { MetricService } from './services/MetricService';
import { Metric } from './models/Metric';
import { MetricTile } from './components/MetricTile';
import { MetricChart } from './components/MetricChart';


@customElement('metrics-app')
class App extends LitElement {
  @property()
  metrics: Metric[] = [];

  metricsService = new MetricService();

  constructor() {
    super();
   this.metricsService.getMetrics().then(metrics => {
      this.metrics = metrics;
      this.render();
      console.log("METRICS=>", this.metrics)
    });
  }
  render() {
    return html`
    <metric-chart></metric-chart>
    ${this.metrics.map((m, i) => html`
     <metric-tile
     .metric="${m}">
      </metric-tile>
    `)}
    `;
  }
}

console.log(App)
console.log(MetricTile)
console.log(MetricChart)