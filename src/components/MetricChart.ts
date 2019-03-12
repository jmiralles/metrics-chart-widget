import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";
import * as d3 from "d3";
import { MetricAmount } from "../models/MetricAmount";

@customElement("metric-chart")
export class MetricChart extends LitElement {
  constructor() {
    super();
  }
  @property()
  metric: Metric;

  updated() {
    if (!this.metric) return;

    const categories: any = this.metric.categories;
    const total = this.metric.amount;
    const ratio = categories[1].amount / <any>total;
    const tau = 2 * Math.PI;
    const svgElement = this.shadowRoot.getElementById("chart");
    const name = this.metric.name.toUpperCase();
    const amount = this.metric.amount.toString();
    const arc = d3
      .arc()
      .innerRadius(90)
      .outerRadius(100)
      .startAngle(0);

    const svg = d3.select(svgElement),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.append("path")
      .datum({ endAngle: tau })
      .style("fill", categories[0].color)
      .attr("d", arc);

    g.append("path")
      .datum({ endAngle: ratio * tau })
      .style("fill", categories[1].color)
      .attr("d", arc);

    g.append("text")
      .attr("dy", "0.5em")
      .attr("y", "-20")
      .style("text-anchor", "middle")
      .attr("fill", "#36454f")
      .attr("font-size", "20px")
      .html(name);

    g.append("text")
      .attr("dy", "0.5em")
      .style("text-anchor", "middle")
      .attr("fill", "#36454f")
      .attr("font-size", "30px")
      .html(amount);
  }

  render() {
    return html`
      <svg id="chart" width="250" height="200"></svg>
    `;
  }
}
