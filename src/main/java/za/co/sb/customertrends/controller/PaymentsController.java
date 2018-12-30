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
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.sb.customertrends.model.AmountPerDate;
import za.co.sb.customertrends.model.PaymentsAnalysis;
import za.co.sb.customertrends.model.PaymentsAnalysisLongTerm;
import za.co.sb.customertrends.model.PaymentsAnalysisStatus;

/**
 * @author Maksim Drahun
 */
@RestController
public class PaymentsController {

  @GetMapping("/payments/analyze")
  public PaymentsAnalysis analyze(@RequestParam Long customerKey, @RequestParam String accountNumber) {
    PaymentsAnalysis result = new PaymentsAnalysis();
    result.setStatus(PaymentsAnalysisStatus.SUCCESS);
    result.setCustomerKey(customerKey);
    result.setAccountNumber(accountNumber);
    result.setCurrency("USD");
    result.setYearStats(getMonthlyStats(12));
    result.setPreviousMonthStats(getDailyStats(Month.OCTOBER, 31));
    result.setLastMonthStats(getDailyStats(Month.NOVEMBER, 30));
    result.setForecast(getDailyStats(Month.DECEMBER, 31));
    return result;
  }
  
  @GetMapping("/payments/analyze-long-term")
  public PaymentsAnalysisLongTerm analyzeLongTerm(@RequestParam Long customerKey, @RequestParam String accountNumber) {
    PaymentsAnalysisLongTerm result = new PaymentsAnalysisLongTerm();
    result.setStatus(PaymentsAnalysisStatus.SUCCESS);
    result.setCustomerKey(customerKey);
    result.setAccountNumber(accountNumber);
    result.setCurrency("USD");
    result.setMonthlyStats(getMonthlyStats(6, LocalDate.now().minusMonths(6)));
    List<List<AmountPerDate>> dailyStats = new ArrayList<>();
    dailyStats.add(getDailyStats(Month.JUNE, 30));
    dailyStats.add(getDailyStats(Month.JULY, 31));
    dailyStats.add(getDailyStats(Month.AUGUST, 31));
    dailyStats.add(getDailyStats(Month.SEPTEMBER, 30));
    dailyStats.add(getDailyStats(Month.OCTOBER, 31));
    dailyStats.add(getDailyStats(Month.NOVEMBER, 30));
    result.setDailyStats(dailyStats);
    result.setForecast(getMonthlyStats(6));
    return result;
  }
  
  private List<AmountPerDate> getDailyStats(Month month, int days) {
    return IntStream.range(1, days + 1)
        .mapToObj(day -> AmountPerDate.of(LocalDate.of(2018, month, day), BigDecimal.valueOf(Math.random() * 50)))
        .collect(Collectors.toList());
  }
  
  private List<AmountPerDate> getMonthlyStats(int months) {
    return getMonthlyStats(months, LocalDate.now());
  }
  
  private List<AmountPerDate> getMonthlyStats(int months, LocalDate startDate) {
    List<AmountPerDate> values = new ArrayList<>();
    LocalDate date = startDate;
    for (int i = 0; i < months; i++) {
      values.add(AmountPerDate.of(date, BigDecimal.valueOf(1000 + (Math.random() * 500))));
      date = date.plusMonths(1);
    }
    return values;
  }
}
