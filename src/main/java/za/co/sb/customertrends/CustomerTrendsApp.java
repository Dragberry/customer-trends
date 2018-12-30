/*
 * Copyright (c) Standard Bank. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Standard Bank ("Confidential Information").
 * It may not be copied or reproduced in any manner without the express 
 * written permission of Standard Bank.
 *
 */
package za.co.sb.customertrends;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author Maksim Drahun
 */
@SpringBootApplication
public class CustomerTrendsApp {

  /**
   * @param args
   */
  public static void main(String[] args) {
    SpringApplication.run(CustomerTrendsApp.class, args);
  }

}
