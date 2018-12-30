import { PaymentsAnalysisStatus } from '../../model/payments-analysis-status';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { AbstractPaymentsAnalysis } from 'src/app/model/abstract-payments-analysis';

export abstract class ForecastCommonComponent<T extends AbstractPaymentsAnalysis> {

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
        if (PaymentsAnalysisStatus.ERROR === result.status) {
          this.analysis = null;
          this.messageService.show('The given user has unpredictable payments statistics!');
        } else {
          this.analysis = result;
          this.processAnalysis(result);
        }
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
