import { PaymentsAnalysisStatus } from './payments-analysis-status';

export abstract class AbstractPaymentsAnalysis {
  status: PaymentsAnalysisStatus;
  customerKey: string;
  accountNumber: string;
  currency: string;
}
