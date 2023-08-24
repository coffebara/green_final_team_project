package com.itdaLearn.dto;

import java.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;

import com.itdaLearn.constant.OrderStatus;
import com.itdaLearn.entity.Order;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class OrderHistDto {
	
		public OrderHistDto(Order order) {
			
			this.orderNo = order.getOrderNo();
			this.orderDate = order.getOrderDate()
					.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
			this.orderStatus = order.getOrderStatus();
							
		}		
		
		private Long orderNo;
		private String orderDate;
		private OrderStatus orderStatus;
	

		private List<OrderCourseDto> orderCourseDtoList = new ArrayList<>();
		
		public void addOrderItemDto(OrderCourseDto orderCourseDto) {
			
			orderCourseDtoList.add(orderCourseDto);
		}
}
