import { Component } from '@angular/core';
import { ForecastCommonComponent } from '../forecast-common.component';
import { PaymentsService } from 'src/app/services/payments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsAnalysisLongTerm } from 'src/app/model/payments-analysis-long-term';

@Component({
  selector: 'app-forecast-for-months',
  templateUrl: './forecast-for-months.component.html',
  styleUrls: ['./forecast-for-months.component.css']
})
export class ForecastForMonthsComponent extends ForecastCommonComponent<PaymentsAnalysisLongTerm> {

  customerKey: string;

  constructor(
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) {
    super(messageService, paymentsService);
  }

  onCustomerKeyChanged(customerKey: string): void {
    this.customerKey = customerKey;
  }

  callService(criteria: {customerKey: string, accountNumber: string}): Promise<PaymentsAnalysisLongTerm> {
    return this.paymentsService.analyzeLongTerm(criteria.customerKey, criteria.accountNumber);
  }

  processAnalysis(analysis: PaymentsAnalysisLongTerm): void {}

}
