import { AbstractPaymentsAnalysis } from './abstract-payments-analysis';

export class PaymentsAnalysisLongTerm extends AbstractPaymentsAnalysis {
  monthlyStats: { date: string, amount: string }[];
  dailyStats: { date: string, amount: string }[][];
  forecast: { date: string, amount: string }[];
}
