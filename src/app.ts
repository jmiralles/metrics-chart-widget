import { LitElement, html, customElement, property } from "lit-element";
import { MetricService } from "./services/MetricService";
import { Metric } from "./models/Metric";
import "./components/MetricWidget";

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
    });
  }
  render() {
    return html`
      <style>
        .wrapper {
          display: flex;
          font-family: "Open Sans", Arial;
        }
        .widget {
          max-width: 320px;
          padding-bottom: 10px;
          margin: 0 10px 30px;
          border-bottom: 2px solid #ccc;
        }
        @media screen and (max-width: 900px) {
          .wrapper {
            flex-direction: column;
          }
        }
      </style>
      <div class="wrapper">
        ${this.metrics.map(
          (m, i) => html`
            ${this.metrics[i]
              ? html`
                  <metric-widget
                    class="widget"
                    .type="${this.metrics[i].type}"
                    .metric="${this.metrics[i]}"
                  >
                  </metric-widget>
                `
              : "loading..."}
          `
        )}
      </div>
    `;
  }
}
