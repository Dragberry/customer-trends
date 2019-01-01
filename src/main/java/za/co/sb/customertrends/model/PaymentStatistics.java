package za.co.sb.customertrends.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentStatistics extends AbstractPaymentsStatistics {

  private List<AmountPerDate> yearStats;
	  
  private List<AmountPerDate> previousMonthStats;
	  
  private List<AmountPerDate> lastMonthStats;
}
