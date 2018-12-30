/*
 * Copyright (c) Standard Bank. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Standard Bank ("Confidential Information").
 * It may not be copied or reproduced in any manner without the express 
 * written permission of Standard Bank.
 *
 */
package za.co.sb.customertrends.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Maksim Drahun
 */
@Getter
@Setter
public class PaymentsAnalysisLongTerm {
  
  private Long customerKey;
  
  private String accountNumber;
  
  private String currency;
  
  private List<AmountPerDate> monthlyStats;
  
  private List<List<AmountPerDate>> dailyStats;
  
  private List<AmountPerDate> forecast;

}
