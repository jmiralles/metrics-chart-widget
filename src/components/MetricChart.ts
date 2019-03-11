import { LitElement, html, property, customElement } from 'lit-element';
import { Metric } from '../models/Metric';
import * as d3 from 'd3';

@customElement('metric-chart')
export class MetricChart extends LitElement {
  constructor() {
    super();
  }
  @property()
  metric: Metric;

  firstUpdated() {
    const svgElement = this.shadowRoot.querySelector("svg");

    var data = [
      {name: "USA", value: 40},
      {name: "UK", value: 20},
      {name: "Canada", value: 30},
      {name: "Maxico", value: 10},
    ];
    var text = "";
    
    var width = 260;
    var height = 260;
    var thickness = 40;
    
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    var svg = d3.select(svgElement)
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);
    
    var g = svg.append('g')
    .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
    
    var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);
    
    let pie = d3.layout.pie();
    .value((d: any) => d.value)
    .sort(null);
    
    var path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
          let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");
     
          g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');
      
          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d,i) => color(i))
      .on("mouseover", function(d) {
          d3.select(this)     
            .style("cursor", "pointer")
            .style("fill", "black");
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current));
        })
      .each(function(d, i) { this._current = i; });
    
    
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);
  }

  render() {
     return html`
     <svg width='360' height='200></svg>
    `
  }
}
