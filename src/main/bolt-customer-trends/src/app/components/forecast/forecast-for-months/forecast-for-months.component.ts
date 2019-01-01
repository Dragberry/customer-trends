import { PaymentsStatisticsLongTerm } from './../../../model/payments-statistics-long-term';
import { AccountService } from 'src/app/services/account.service';
import { Component } from '@angular/core';
import { ForecastCommonComponent } from '../forecast-common.component';
import { PaymentsService } from 'src/app/services/payments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsAnalysis } from 'src/app/model/payments-analysis';

@Component({
  selector: 'app-forecast-for-months',
  templateUrl: './forecast-for-months.component.html',
  styleUrls: ['./forecast-for-months.component.css']
})
export class ForecastForMonthsComponent extends ForecastCommonComponent<PaymentsStatisticsLongTerm> {

  isDetailsShown = false;

  constructor(
    protected accountService: AccountService,
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) {
    super(accountService, messageService, paymentsService);
  }

  callStatisticsService(criteria: {customerKey: string, currency: string}): Promise<PaymentsStatisticsLongTerm> {
    return this.paymentsService.statisticsLongTerm(criteria.customerKey, criteria.currency);
  }

  callService(criteria: {customerKey: string, accountNumber: string}): Promise<PaymentsAnalysis> {
    return this.paymentsService.analyzeLongTerm(criteria.customerKey, criteria.accountNumber);
  }

  processAnalysis(analysis: PaymentsAnalysis): void {}

}
