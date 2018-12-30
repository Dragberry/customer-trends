import { Component } from '@angular/core';
import { ForecastCommonComponent } from '../forecast-common.component';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { PaymentsAnalysis } from 'src/app/model/payments-analysis';

@Component({
  selector: 'app-forecast-for-month',
  templateUrl: './forecast-for-month.component.html',
  styleUrls: ['./forecast-for-month.component.css']
})
export class ForecastForMonthComponent extends ForecastCommonComponent<PaymentsAnalysis> {

  constructor(
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) {
    super(messageService, paymentsService);
  }

  callService(criteria: {customerKey: string, accountNumber: string}): Promise<PaymentsAnalysis> {
    return this.paymentsService.analyze(criteria.customerKey, criteria.accountNumber);
  }

  processAnalysis(analysis: PaymentsAnalysis): void {
    this.expenseIn3Days = this.calculateAmount(analysis.forecast, 3).toFixed(2);
    this.expenseIn7Days = this.calculateAmount(analysis.forecast, 7).toFixed(2);
    this.expenseIn14Days = this.calculateAmount(analysis.forecast, 14).toFixed(2);
  }

}
