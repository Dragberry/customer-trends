import { AbstractPaymentsStatistics } from './abstract-payments-statistics';

export class PaymentsStatisticsLongTerm extends AbstractPaymentsStatistics {
  monthlyStats: { date: string, amount: string }[];
  dailyStats: { date: string, amount: string }[][];
}
