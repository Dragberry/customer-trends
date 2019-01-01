import { AccountService } from 'src/app/services/account.service';
import { PaymentsAnalysisStatus } from '../../model/payments-analysis-status';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { PaymentsAnalysis } from 'src/app/model/payments-analysis';
import { AbstractPaymentsStatistics } from 'src/app/model/abstract-payments-statistics';

export abstract class ForecastCommonComponent<S extends AbstractPaymentsStatistics> {

  @BlockUI('statistics') statisticsBlockUI: NgBlockUI;

  @BlockUI('forecast') forecastBlockUI: NgBlockUI;

  statistics: S;
  analysis: PaymentsAnalysis;

  customerKey: string;

  currencies: string[];
  currency: string;

  constructor(
    protected accountService: AccountService,
    protected messageService: MessagesService,
    protected paymentsService: PaymentsService) { }

  onCustomerKeyChanged(customerKey: string): void {
    this.resetAll();
    this.customerKey = customerKey;
    if (customerKey) {
      this.fetchCurrencies();
    }
  }

  resetAll(): void {
    this.resetStatisticsBlock();
    this.resetAnalysisBlock();
  }

  resetStatisticsBlock(): void {
    this.statistics = null;
    this.currencies = [];
    this.currency = null;
  }

  resetAnalysisBlock(): void {
    this.analysis = null;
  }

  fetchCurrencies(): void {
    this.accountService.getCustomerCurrencies(this.customerKey)
    .then(result => {
      this.currencies = result;
    })
    .catch(error => {
      this.messageService.showError(error);
    });
  }

  onCurrencyChanged(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.statisticsBlockUI.start();
    this.callStatisticsService({customerKey: this.customerKey, currency: this.currency})
    .then(statistics => {
      this.statistics = statistics;
      this.statisticsBlockUI.stop();
    })
    .catch(error => {
      this.messageService.showError(error);
      this.resetStatisticsBlock();
      this.statisticsBlockUI.stop();
    });
  }

  analyze(criteria: {customerKey: string, accountNumber: string}): void {
    this.forecastBlockUI.start();
    this.callService(criteria)
      .then(result => {
        if (PaymentsAnalysisStatus.ERROR === result.status) {
          this.resetAnalysisBlock();
          this.messageService.show('The given user has unpredictable payments statistics!');
        } else {
          this.analysis = result;
          this.processAnalysis(result);
        }
        this.forecastBlockUI.stop();
      }).catch(error => {
        this.messageService.showError(error);
        this.resetAnalysisBlock();
        this.forecastBlockUI.stop();
      });
    }

  abstract callService(criteria: {customerKey: string, accountNumber: string}): Promise<PaymentsAnalysis>;

  abstract callStatisticsService(criteria: {customerKey: string, currency: string}): Promise<S>;

  abstract processAnalysis(analysis: PaymentsAnalysis): void;

  calculateAmount(forecast: {date: string, amount: string}[], days: number): number {
    let sum = 0;
    for (let i = 0; i < days; i++) {
      sum += parseFloat(forecast[i].amount);
    }
    return sum;
  }

}
