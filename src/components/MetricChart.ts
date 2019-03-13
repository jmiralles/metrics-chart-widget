import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";
import * as d3 from "d3";

@customElement("metric-chart")
export class MetricChart extends LitElement {
  @property()
  metric: Metric;

  @property()
  formatter: any;

  drawDonut(svgElement: any) {
    const tau = 2 * Math.PI;
    const categories: any = this.metric.categories;
    const total = this.metric.amount;
    const ratio = categories[1].amount / <any>total;
    const amount = this.formatter(this.metric.amount);
    const name = this.metric.name.toUpperCase();
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
      .attr("y", "-27")
      .style("text-anchor", "middle")
      .style("fill", "#888")
      .attr("font-size", "20px")
      .html(name);

    g.append("text")
      .attr("dy", "0.5em")
      .style("text-anchor", "middle")
      .style("fill", "#333")
      .attr("font-size", "30px")
      .html(amount);
  }

  appendCircle(selection: any) {
    const radius = 85;

    selection
      .append("circle")
      .attr("cx", 83)
      .attr("cy", -21)
      .attr("r", radius);
  }

  drawLineChart(svgElement: any) {
    const data: any[] = this.metric.historic;
    const margin = { top: 30, right: 20, bottom: 30, left: 77 },
      width = 265 - margin.left - margin.right,
      height = 170 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const svg = d3
      .select(svgElement)
      .append("svg")
      .attr("y", "90")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const valueline = d3
      .line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.close));

    const area = d3
      .area()
      .x((d: any) => x(d.date))
      .y0(height)
      .y1((d: any) => y(d.close));

    data.forEach((d: any) => {
      const key = Object.keys(d)[0];
      const value = Object.values(d)[0];

      d.date = new Date(key);
      d.close = +value;
      delete d[key];
    });

    x.domain(d3.extent(data, (d: any) => d.date));
    y.domain([0, d3.max(data, (d: any) => d.close)]);

    svg
      .append("clipPath")
      .attr("id", "circle-clip")
      .call(this.appendCircle);

    svg
      .append("path")
      .attr("class", "line")
      .attr("d", valueline(data))
      .attr("clip-path", "url(#circle-clip)");

    svg
      .append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area)
      .attr("clip-path", "url(#circle-clip)");
  }

  updated() {
    if (!this.metric) return;

    const svgElement = this.shadowRoot.getElementById("chart");
    this.drawLineChart(svgElement);
    this.drawDonut(svgElement);
  }

  render() {
    return html`
      <style>
        .line {
          stroke: ${this.metric.color};
          stroke-width: 2;
          fill: none;
          stroke-linejoin: round;
          stroke-miterlimit: 2;
          stroke-linecap: round;
        }
        .area {
          fill: ${this.metric.color};
          opacity: 0.1;
        }
      </style>
      <svg id="chart" width="320" height="200"></svg>
    `;
  }
}
