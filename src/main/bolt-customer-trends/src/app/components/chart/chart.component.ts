import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
  chartData: ChartData;

  ngOnChanges(changes: SimpleChanges) {
    const chartDataChange: SimpleChange = changes['chartData'];
    if (chartDataChange.currentValue) {
      if (this.chartRef) {
        this.buildChart(chartDataChange.currentValue);
      }
    }
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
