export class PaymentsAnalysisLongTerm {
  customerKey: string;
  accountNumber: string;
  currency: string;
  monthlyStats: { date: string, amount: string }[];
  dailyStats: { date: string, amount: string }[][];
  forecast: { date: string, amount: string }[];
}
