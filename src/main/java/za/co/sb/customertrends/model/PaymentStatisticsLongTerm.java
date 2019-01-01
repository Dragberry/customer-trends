package za.co.sb.customertrends.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentStatisticsLongTerm extends AbstractPaymentsStatistics {

  private List<AmountPerDate> monthlyStats;
	  
  private List<List<AmountPerDate>> dailyStats;
}
