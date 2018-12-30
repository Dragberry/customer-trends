export class PaymentsAnalysis {
  customerKey: string;
  accountNumber: string;
  currency: string;
  yearStats: { date: string, amount: string }[];
  lastMonthStats: { date: string, amount: string }[];
  previousMonthStats: { date: string, amount: string }[];
  forecast: { date: string, amount: string }[];
}
