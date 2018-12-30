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

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Maksim Drahun
 */
@Getter
@Setter
@AllArgsConstructor(staticName = "of")
public class AccountInfo {

  private String accountNumber;
  
  private String currency;
  
  private BigDecimal balance;
  
  private BigDecimal totalCreditAmount;
  
  private BigDecimal totalDebitAmount;
}
