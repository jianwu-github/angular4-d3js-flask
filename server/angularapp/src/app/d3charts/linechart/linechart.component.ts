import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

interface LineChartData {
    date: Date,
    close: number
}

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements OnInit {
  @ViewChild('linechart') private chartContainer: ElementRef;

  private data: Array<any>;

  private margin: any = { top: 20, bottom: 20, left: 40, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.data = [
        {date: '1-May-12',  close: '58.13'},
        {date: '30-Apr-12', close: '53.98'},
        {date: '27-Apr-12', close: '67.00'},
        {date: '26-Apr-12', close: '89.70'},
        {date: '25-Apr-12', close: '99.00'},
        {date: '24-Apr-12', close: '130.28'},
        {date: '23-Apr-12', close: '166.70'},
        {date: '20-Apr-12', close: '234.98'},
        {date: '19-Apr-12', close: '345.44'},
        {date: '18-Apr-12', close: '443.34'},
        {date: '17-Apr-12', close: '543.70'},
        {date: '16-Apr-12', close: '580.13'},
        {date: '13-Apr-12', close: '605.23'},
        {date: '12-Apr-12', close: '622.77'},
        {date: '11-Apr-12', close: '620.20'},
        {date: '10-Apr-12', close: '628.44'},
        {date: '9-Apr-12', close: '636.23'}
    ];

    const parseTime = d3.timeParse('%d-%b-%y');

    this.data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

    this.createChart();
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'lines')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const xDomain = d3.extent(this.data, function(d) { return d.date; });
    const yDomain = [0, d3.max(this.data, function(d) { return d.close; }) + 10];

    // create scales
    this.xScale = d3.scaleTime().domain(xDomain).range([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));

    const valueLine = d3.line<LineChartData>()
      .x((d: LineChartData) => { return this.xScale(d.date); })
      .y((d: LineChartData) => { return this.yScale(d.close); });

    this.chart.append('path')
      .data([this.data])
      .attr('class', 'line')
      .attr('d', valueLine);
  }

}
