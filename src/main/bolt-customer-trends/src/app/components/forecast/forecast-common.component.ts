import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ChartData } from 'src/app/model/chart-data';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsService } from 'src/app/services/payments.service';

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

export abstract class ForecastCommonComponent<T> {

  @BlockUI('charts') blockUI: NgBlockUI;

  yearStats: ChartData;
  lastMonthStats: ChartData;
  previousMonthStats: ChartData;
  forecast: ChartData;

  expenseIn3Days: string;
  expenseIn7Days: string;
  expenseIn14Days: string;

  constructor(
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) { }

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

  analyze(criteria: {customerKey: string, accountNumber: string}): void {
    this.blockUI.start();
    this.callService(criteria)
      .then(result => {
        this.processAnalysis(result);
        this.blockUI.stop();
      }).catch(error => {
        this.messageService.showError(error);
        this.blockUI.stop();
      });
    }

  abstract callService(riteria: {customerKey: string, accountNumber: string}): Promise<T>;

  abstract processAnalysis(analysis: T): void;

  calculateAmount(forecast: {date: string, amount: string}[], days: number): number {
    let sum = 0;
    for (let i = 0; i < days; i++) {
      sum += parseFloat(forecast[i].amount);
    }
    return sum;
  }

  getMonth(date: Date): string {
    return MONTHS.get(date.getMonth());
  }
}
