import { ChartData } from 'src/app/model/chart-data';
import { ChartType } from 'src/app/model/chart-type';
import { Component, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Chart } from 'chart.js';

const MONTHS = new Map<number, string>();
MONTHS.set(0, 'Jan');
MONTHS.set(1, 'Feb');
MONTHS.set(2, 'Mar');
MONTHS.set(3, 'Apr');
MONTHS.set(4, 'May');
MONTHS.set(5, 'Jun');
MONTHS.set(6, 'Jul');
MONTHS.set(7, 'Aug');
MONTHS.set(8, 'Sep');
MONTHS.set(9, 'Oct');
MONTHS.set(10, 'Nov');
MONTHS.set(11, 'Dec');

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {

  @ViewChild('chart')
  private chartRef: any;

  @Input()
  data: { date: string, amount: string }[];

  @Input()
  currency: String;

  chart = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange: SimpleChange = changes['data'];
    const data = dataChange && dataChange.currentValue || this.data;
    const currencyChange: SimpleChange = changes['currency'];
    const currency = currencyChange && currencyChange.currentValue || this.currency;
    if (this.chartRef && data && currency) {
      const type = this.determineType(data);
      let chartData: ChartData;
      if (ChartType.MONTHLY === type) {
        chartData = this.buildMonthlyChartData(data, currency);
      } else if (ChartType.DAILY === type) {
        chartData = this.buildDailyChartData(data, currency);
      }
      this.buildChart(chartData);
    }
  }

  determineType(data: { date: string, amount: string }[]): ChartType {
    let previousDate: Date = null;
    for (const item of data) {
      const date = new Date(item.date);
      if (previousDate != null) {
        if (previousDate.getMonth() !== date.getMonth()) {
          return ChartType.MONTHLY;
        }
      }
      previousDate = date;
    }
    return ChartType.DAILY;
  }

  buildChartData(inputData: {
    title: string,
    xLabel: string,
    yLabel: string,
    data: {
      date: string,
      amount: string
    }[]
  },
  xLabelConverter: (date: Date) => any): ChartData {
    const labels: string[] = [];
    const values: string[] = [];
    inputData.data.forEach(item => {
      labels.push(xLabelConverter(new Date(item.date)));
      values.push(item.amount);
    });
    return {
      title: inputData.title,
      xLabel: inputData.xLabel,
      yLabel: inputData.yLabel,
      labels: labels,
      values: values
    };
  }

  buildDailyChartData(data: { date: string, amount: string }[], currency: string): ChartData {
    return this.buildChartData(
      {
        title: `${this.getMonth(new Date(data[0].date))}`,
        xLabel: 'Days',
        yLabel: `Currency, ${currency}`,
        data: data
      },
      (date: Date) => date.getDate()
    );
  }

  buildMonthlyChartData(data: { date: string, amount: string }[], currency: string): ChartData {
    const fisrtMonth = new Date(data[0].date);
    const lastMonth = new Date(data[data.length - 1].date);
    return this.buildChartData(
      {
        title: fisrtMonth.getFullYear() !== lastMonth.getFullYear() ?
          `${this.getMonth(fisrtMonth)}, ${fisrtMonth.getFullYear()} - ${this.getMonth(lastMonth)}, ${lastMonth.getFullYear()}` :
          `${this.getMonth(fisrtMonth)} - ${this.getMonth(lastMonth)}, ${fisrtMonth.getFullYear()}`,
        xLabel: 'Months',
        yLabel: `Currency, ${currency}`,
        data: data
      },
      (date: Date) => this.getMonth(date));
  }

  getMonth(date: Date): string {
    return MONTHS.get(date.getMonth());
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
