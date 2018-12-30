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
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Maksim Drahun
 */
@Getter
@Setter
@AllArgsConstructor(staticName = "of")
public class AmountPerDate {
  
  private LocalDate date;
  
  private BigDecimal amount;

}
