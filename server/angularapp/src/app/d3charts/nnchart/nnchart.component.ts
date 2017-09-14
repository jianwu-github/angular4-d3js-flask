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
      {'label': 'h10', 'layer': 2},
      {'label': 'h11', 'layer': 2},
      {'label': 'h12', 'layer': 2},
      {'label': 'h13', 'layer': 2},
      {'label': 'h14', 'layer': 2},
      {'label': 'h15', 'layer': 2},
      {'label': 'h20', 'layer': 3},
      {'label': 'h21', 'layer': 3},
      {'label': 'h22', 'layer': 3},
      {'label': 'h23', 'layer': 3},
      {'label': 'o0', 'layer': 4},
      {'label': 'o1', 'layer': 4}
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
    this.nodeSize = this.width > 450 ? 24 : 12;
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

    const numOfLayers = Object.keys(this.netsize).length;
    const xdist = this.width / numOfLayers;
    const ydist = this.height / largestLayerSize;

    // create node locations
    this.nodes.map( d => {
      d['x'] = (d.layer - 0.5) * xdist;
      d['y'] = (d.lidx - 0.5) * ydist;
    });

    console.log(this.nodes);

    // Generate links and layer boxes based on nodes
    const layerboxes: Array<any> = [];
    let k: number;
    for (k = 1; k <= numOfLayers; k++) {
      layerboxes.push({'layer': k, 'top': null, 'bottom': null});
    }

    // console.log(layerboxes);

    const links: Array<any> = [];
    for (const i in this.nodes) {
      const nodei = this.nodes[i];

      if (nodei.lidx === 1) {
        layerboxes[nodei.layer - 1]['top'] = nodei;
      } else if (nodei.lidx === this.netsize[nodei.layer]) {
        layerboxes[nodei.layer - 1]['bottom'] = nodei;
      }

      for (const j in this.nodes) {
        const nodej = this.nodes[j];
        if (nodei.layer + 1 === nodej.layer) {
          links.push({'source': i, 'target': j, 'value': 1});
        }
      }
    }

    // console.log(layerboxes);
    // draw layer boxes
    const layerBoxWidth = this.nodeSize * 3;
    const layerBoxHeight = (ydist - 1) * largestLayerSize + this.nodeSize * 0.6;
    let layerBoxX: number;
    let layerBoxY: number;


    for (k = 0; k < numOfLayers; k++) {
        layerBoxX = layerboxes[k]['top'].x - (this.nodeSize * 1.5);
        layerBoxY = layerboxes[k]['top'].y - (ydist * 0.5) - 1;

        this.chart.append('rect')                         // attach a rectangle
                  .attr('x', layerBoxX)                   // position the left of the rectangle
                  .attr('y', layerBoxY)             // position the top of the rectangle
                  .attr('height', layerBoxHeight)   // set the height
                  .attr('width', layerBoxWidth)     // set the width
                  .attr('rx', 5)              // set the x corner curve radius
                  .attr('ry', 5)              // set the y corner curve radius
                  .style('stroke-width', 3)                             // set the stroke width
                  .style('stroke', this.colors(layerboxes[k]['layer']))      // set the line colour
                  .style('fill', 'none');                              // set the fill colour
    }

    // draw links
    const link = this.chart.selectAll('.link')
                           .data(links)
                           .enter().append('line')
                           .attr('class', 'link')
                           .attr('fill', 'none')
                           .attr('stroke', 'steelblue')
                           .attr('stroke-linejoin', 'round')
                           .attr('stroke-linecap', 'round')
                           .attr('stroke-width', 2.0)
                           .attr('x1', d => this.nodes[d.source].x)
                           .attr('y1', d => this.nodes[d.source].y)
                           .attr('x2', d => this.nodes[d.target].x)
                           .attr('y2', d => this.nodes[d.target].y);

    // draw nodes
    const node = this.chart.selectAll('.node')
                           .data(this.nodes)
                           .enter().append('g')
                           .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

    const circle = node.append('circle')
                       .attr('class', 'node')
                       .attr('r', this.nodeSize)
                       .style('fill', d => this.colors(d.layer));

    node.append('text')
        .attr('dx', '-.35em')
        .attr('dy', '.35em')
        .text(d => d.label);


  }

}
