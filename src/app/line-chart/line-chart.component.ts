import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnChanges, OnInit {
  @Input() public data!: { value: number, date: string }[];

  private width = 500;
  private height = 400;
  private margin = 50;

  public svg: any;
  public svgInner: any;
  public yScale: any;
  public xScale: any;
  public xAxis: any;
  public yAxis: any;
  public lineGroup: any;
  public div: any;


  constructor(public chartElem: ElementRef) {
  }

  public ngOnInit() {
    if (this.data) {

      this.svg = d3
        .select(this.chartElem.nativeElement)
        .select('.linechart')
        .append('svg')
        .attr('height', this.height);
      this.svgInner = this.svg
        .append('g')
        .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

      this.div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      this.initializeChart();
      this.drawChart();
      window.addEventListener('resize', () => this.drawChart());
    }
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      console.log(this.data)
      this.reInitChart();
    }
  }

  reInitChart() {
    if (this.svg && this.svgInner) {
      this.initializeChart();
      this.drawChart();
    }
  }

  private initializeChart(): void {

    this.yScale = d3
      .scaleLinear()
      .domain([d3.max(this.data, d => d.value) + 1, d3.min(this.data, d => d.value) - 1])
      .range([0, this.height - 2 * this.margin]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.date)));

    this.xAxis = this.svgInner
      .append('g')
      .attr('id', 'x-axis')
      .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', '2px');

    this.div.selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.xScale(d.date))
      .attr('cy', (d) => this.yScale(d.prediction))
      .attr('r', 2)
      .on('mouseover', (event, d) => {
        this.div.transition()
          .duration(200)
          .style('opacity', .9);
        this.div.html('a tooltip <br/>' + d.date + '<br/>' + d.prediction)
          .style('left', (event.x) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', (d) => {
        this.div.transition()
          .duration(500)
          .style('opacity', 0);
      });

  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.svg.attr('width', this.width);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);

    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(10)
      .tickFormat(d3.timeFormat('%m / %Y'));

    this.xAxis.call(xAxis);

    const yAxis = d3
      .axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line = d3
      .line()
      .x(d => d[0])
      .y(d => d[1]);
    // .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data.map(d => [
      this.xScale(new Date(d.date)),
      this.yScale(d.value),
    ]);

    this.lineGroup.attr('d', line(points));


  }
}