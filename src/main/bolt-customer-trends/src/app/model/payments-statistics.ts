import { AbstractPaymentsStatistics } from './abstract-payments-statistics';

export class PaymentsStatistics extends AbstractPaymentsStatistics {
  yearStats: { date: string, amount: string }[];
  lastMonthStats: { date: string, amount: string }[];
  previousMonthStats: { date: string, amount: string }[];
}
