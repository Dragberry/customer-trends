import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaymentsAnalysis } from '../model/payments-analysis';
import { PaymentsStatisticsLongTerm } from '../model/payments-statistics-long-term';
import { PaymentsStatistics } from '../model/payments-statistics';

const PAYMENTS_STATISTICS_URL = 'payments/statistics';
const PAYMENTS_ANALYZE_URL = 'payments/analyze';
const PAYMENTS_STATISTICS_LONG_TERM_URL = 'payments/statistics-long-term';
const PAYMENTS_ANALYZE_LONG_TERM_URL = 'payments/analyze-long-term';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  statistics(customerKey: string, currency: string): Promise<PaymentsStatistics> {
    return this.http.get<PaymentsStatistics>(PAYMENTS_STATISTICS_URL,
      {
        params: new HttpParams()
          .append('customerKey', customerKey)
          .append('currency', currency)
      }).toPromise();
  }

  analyze(customerKey: string, accountNumber: string): Promise<PaymentsAnalysis> {
    return this.http.get<PaymentsAnalysis>(PAYMENTS_ANALYZE_URL,
      {
        params: new HttpParams()
          .append('customerKey', customerKey)
          .append('accountNumber', accountNumber)
      }).toPromise();
  }

  statisticsLongTerm(customerKey: string, currency: string): Promise<PaymentsStatisticsLongTerm> {
    return this.http.get<PaymentsStatisticsLongTerm>(PAYMENTS_STATISTICS_LONG_TERM_URL,
      {
        params: new HttpParams()
          .append('customerKey', customerKey)
          .append('currency', currency)
      }).toPromise();
  }

  analyzeLongTerm(customerKey: string, accountNumber: string): Promise<PaymentsAnalysis> {
    return this.http.get<PaymentsAnalysis>(PAYMENTS_ANALYZE_LONG_TERM_URL, {
      params: new HttpParams()
        .append('customerKey', customerKey)
        .append('accountNumber', accountNumber)
    }).toPromise();
  }
}
