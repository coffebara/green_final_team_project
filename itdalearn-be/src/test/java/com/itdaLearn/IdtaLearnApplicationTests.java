package com.itdaLearn;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;


@SpringBootTest
// 테스트용 application 적용
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
class IdtaLearnApplicationTests {

	@Test	
	@DisplayName("야호")
	void contextLoads() {
	}
}
