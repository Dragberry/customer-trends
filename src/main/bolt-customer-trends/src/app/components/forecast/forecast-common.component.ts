import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsService } from 'src/app/services/payments.service';

export abstract class ForecastCommonComponent<T> {

  @BlockUI('charts') blockUI: NgBlockUI;

  analysis: T;

  expenseIn3Days: string;
  expenseIn7Days: string;
  expenseIn14Days: string;

  constructor(
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) { }

  analyze(criteria: {customerKey: string, accountNumber: string}): void {
    this.blockUI.start();
    this.callService(criteria)
      .then(result => {
        this.analysis = result;
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

}
