import { LitElement, html, customElement, property } from "lit-element";
import { MetricService } from "./services/MetricService";
import { Metric } from "./models/Metric";
import { MetricWidget } from "./components/MetricWidget";

@customElement("metrics-app")
class App extends LitElement {
  @property()
  metrics: Metric[] = [];

  metricsService = new MetricService();

  constructor() {
    super();
    this.metricsService.getMetrics().then(metrics => {
      this.metrics = metrics;
      this.render();
      console.log("METRICS=>", this.metrics);
    });
  }
  render() {
    return html`
      <style>
        .wrapper {
          display: flex;
          font-family: Arial;
        }
      </style>
      <div class="wrapper">
        ${this.metrics.map(
          (m, i) => html`
            ${this.metrics[i]
              ? html`
                  <metric-widget .metric="${this.metrics[i]}"></metric-widget>
                `
              : "loading"}
          `
        )}
      </div>
    `;
  }
}

console.log(App);

console.log(MetricWidget);
