import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartData } from 'src/app/model/chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {

  @ViewChild('chart')
  private chartRef: any;

  data: any;
  chart = [];

  constructor() { }

  @Input()
  set chartData(data: ChartData) {
    this.data = data;
    if (data && this.chartRef) {
      this.buildChart(data);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const chartData = changes['chartData'];
    console.log(chartData);
  }

  buildChart(data: ChartData): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: data.title
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: data.xLabel
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: data.yLabel
            }
          }]
        }
      }
    });
  }

}
