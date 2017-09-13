import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-nnchart',
  templateUrl: './nnchart.component.html',
  styleUrls: ['./nnchart.component.css']
})
export class NnchartComponent implements OnInit {
  @ViewChild('neuralnetchart') private chartContainer: ElementRef;

  private nodes: Array<any>;
  private netsize: any;

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private colors: any;
  private nodeSize: number;

  constructor() { }

  ngOnInit() {
    this.nodes = [
      {'label': 'i0', 'layer': 1},
      {'label': 'i1', 'layer': 1},
      {'label': 'i2', 'layer': 1},
      {'label': 'h0', 'layer': 2},
      {'label': 'h1', 'layer': 2},
      {'label': 'h2', 'layer': 2},
      {'label': 'h3', 'layer': 2},
      {'label': 'o0', 'layer': 3},
      {'label': 'o1', 'layer': 3}
    ];

    this.netsize = {};
    this.nodes.forEach(d => {
      if (d.layer in this.netsize) {
          this.netsize[d.layer] += 1;
      } else {
          this.netsize[d.layer] = 1;
      }
      d['lidx'] = this.netsize[d.layer];
    });

    this.createChart();
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.nodeSize = this.width > 450 ? 30 : 20;
    this.colors = d3.scaleOrdinal(d3.schemeCategory20);

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // calc distances between nodes
    const largestLayerSize = Math.max.apply(null, Object.keys(this.netsize).map(i => this.netsize[i]));

    const xdist = this.width / Object.keys(this.netsize).length;
    const ydist = this.height / largestLayerSize;

    // create node locations
    this.nodes.map( d => {
      d['x'] = (d.layer - 0.5) * xdist;
      d['y'] = (d.lidx - 0.5) * ydist;
    });

    // Generate links based on nodes
    const links: Array<any> = [];
    for (const i in this.nodes) {
      const nodei = this.nodes[i];
      for (const j in this.nodes) {
        const nodej = this.nodes[j];
        if (nodei.layer + 1 === nodej.layer) {
          links.push({'source': i, 'target': j, 'value': 1});
        }
      }
    }

    // draw links
    const link = svg.selectAll('.link')
                    .data(links)
                    .enter().append('line')
                    .attr('class', 'link')
                    .attr('x1', d => this.nodes[d.source].x)
                    .attr('y1', d => this.nodes[d.source].y)
                    .attr('x2', d => this.nodes[d.target].x)
                    .attr('y2', d => this.nodes[d.target].y)
                    .attr('fill', 'none')
                    .attr('stroke', 'steelblue')
                    .attr('stroke-linejoin', 'round')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-width', 2.0);

    // draw nodes
    const node = svg.selectAll('.node')
                    .data(this.nodes)
                    .enter().append('g')
                    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

    const circle = node.append('circle')
                       .attr('class', 'node')
                       .attr('r', this.nodeSize)
                       .style('fill', d => { return this.colors(d.layer); });

    node.append('text')
        .attr('dx', '-.35em')
        .attr('dy', '.35em')
        .text(d => { return d.label; });


  }

}
