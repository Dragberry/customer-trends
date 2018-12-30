/*
 * Copyright (c) Standard Bank. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Standard Bank ("Confidential Information").
 * It may not be copied or reproduced in any manner without the express 
 * written permission of Standard Bank.
 *
 */
package za.co.sb.customertrends.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.sb.customertrends.model.AccountInfo;

/**
 * @author Maksim Drahun
 */
@RestController
public class AccountController {

  @GetMapping("/accounts")
  public List<String> getAccounts(@RequestParam String customerKey) {
    return Arrays.asList("1000", "2000", "3000");
  }
  
  @GetMapping("/accounts/info")
  public List<AccountInfo> getAccountsInfo(@RequestParam String customerKey) {
    return Arrays.asList(
        AccountInfo.of("123456789", "ZAR", BigDecimal.valueOf(4563.45), BigDecimal.valueOf(43.45), BigDecimal.valueOf(651.4)),
        AccountInfo.of("000245584", "UGX", BigDecimal.valueOf(3534.7), BigDecimal.valueOf(9967.7), BigDecimal.valueOf(3246.88)),
        AccountInfo.of("589423589", "USD", BigDecimal.valueOf(3254), BigDecimal.valueOf(43653), BigDecimal.valueOf(34523)));
  }
  
}
