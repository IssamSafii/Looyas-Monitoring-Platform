package com.safistage.monitoring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SafiStageMonitoringApplication {

    public static void main(String[] args) {
        SpringApplication.run(SafiStageMonitoringApplication.class, args);
    }
}
