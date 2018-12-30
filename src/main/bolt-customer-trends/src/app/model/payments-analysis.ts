import { AbstractPaymentsAnalysis } from './abstract-payments-analysis';

export class PaymentsAnalysis extends AbstractPaymentsAnalysis {
  yearStats: { date: string, amount: string }[];
  lastMonthStats: { date: string, amount: string }[];
  previousMonthStats: { date: string, amount: string }[];
  forecast: { date: string, amount: string }[];
}
