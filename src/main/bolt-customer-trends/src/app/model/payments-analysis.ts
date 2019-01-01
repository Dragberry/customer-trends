import { AbstractPaymentsAnalysis } from './abstract-payments-analysis';
import { PaymentsAnalysisStatus } from './payments-analysis-status';

export class PaymentsAnalysis extends AbstractPaymentsAnalysis {
  status: PaymentsAnalysisStatus;
  customerKey: string;
  accountNumber: string;
  currency: string;
  forecast: { date: string, amount: string }[];
}
