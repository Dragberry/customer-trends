import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaymentsAnalysis } from '../model/payments-analysis';
import { PaymentsAnalysisLongTerm } from '../model/payments-analysis-long-term';

const PAYMENTS_ANALYZE_URL = 'payments/analyze';
const PAYMENTS_ANALYZE_LONG_TERM_URL = 'payments/analyze-long-term';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  analyze(customerKey: string, accountNumber: string): Promise<PaymentsAnalysis> {
    return this.http.get<PaymentsAnalysis>(PAYMENTS_ANALYZE_URL,
      {
        params: new HttpParams()
          .append('customerKey', customerKey)
          .append('accountNumber', accountNumber)
      }).toPromise();
  }

  analyzeLongTerm(customerKey: string, accountNumber: string): Promise<PaymentsAnalysisLongTerm> {
    return this.http.get<PaymentsAnalysisLongTerm>(PAYMENTS_ANALYZE_LONG_TERM_URL, {
      params: new HttpParams()
        .append('customerKey', customerKey)
        .append('accountNumber', accountNumber)
    }).toPromise();
  }
}
