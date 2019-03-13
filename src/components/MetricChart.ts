import { LitElement, html, property, customElement } from "lit-element";
import { Metric } from "../models/Metric";
import * as d3 from "d3";

@customElement("metric-chart")
export class MetricChart extends LitElement {

  @property()
  metric: Metric;

  @property()
  formatter: any;

  updated() {
    if (!this.metric) return;

    const categories: any = this.metric.categories;
    const total = this.metric.amount;
    const ratio = categories[1].amount / <any>total;
    const tau = 2 * Math.PI;
    const svgElement = this.shadowRoot.getElementById("chart");
    const name = this.metric.name.toUpperCase();
    const amount = this.formatter(this.metric.amount);
    const data: any = this.metric.historic;
    var m = [80, 80, 80, 80]; // margins
		var w = 1000 - m[1] - m[3]; // width
		var h = 400 - m[0] - m[2]; // height

    var x_scale = d3.scaleLinear().domain([0, data.length]).range([0, w]);
    var y_scale = d3.scaleLinear().domain([0, 10]).range([h, 0]);

    var line = d3.line()
			.x((d,i) => { 
				return x_scale(i); 
			})
			.y((d: any) => { 
				return y_scale(d); 
			})
    
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
  
  
    const graph = g.append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


    graph.append("svg:path")
      .attr("dy", "0.5em")
      .style("text-anchor", "middle")
      .attr("d", line(data));
  }

  render() {
    return html`
      <svg id="chart" width="320" height="200"></svg>
    `;
  }
}
