package com.itdaLearn.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.itdaLearn.constant.OrderStatus;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "orders")
@Getter @Setter
public class Order {

    @Id 
    @GeneratedValue  
    @Column(name = "order_no")
    private Long orderNo;
  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    
    @Column(name = "order_date")
    private LocalDateTime orderDate; 
    
    
    @Column(name="order_status")
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; //주문상태
   
    
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL
            , orphanRemoval = true, fetch = FetchType.LAZY)  
    private List<OrderCourse> orderCourses = new ArrayList<>();
     
    public void addOrderCourse(OrderCourse orderCourse) {
    	
    	orderCourses.add(orderCourse);
    	orderCourse.setOrder(this);
    	System.out.println("orderCourses" + orderCourse);
    }
    public static Order createOrder(Member member, List<OrderCourse> orderCourseList) {
    	
    	Order order = new Order();
    	order.setMember(member);
    
    	for(OrderCourse orderCourse : orderCourseList) {
    		order.addOrderCourse(orderCourse);
    	}
    	
    	order.setOrderStatus(OrderStatus.ORDER);
    	order.setOrderDate(LocalDateTime.now());
    	// 현재 주문 시간을 세팅합니다. 
    	return order;
    }
   
   public int getTotalPrice() {
	   int totalPrice = 0;
	   for(OrderCourse orderCourse : orderCourses) {
		   totalPrice += orderCourse.getTotalPrice();
	   }
	   return totalPrice;
   }
   //주문 취소 시 주문 수량을 상품의 재고에 더해주는 로직과 주문 상태를 취소 상태로 바꿔주는 메소드를 구현
   public void cancleOrder() {
	   this.orderStatus = OrderStatus.CANCEL;
	   for(OrderCourse orderCourse : orderCourses) {
		   orderCourse.cancel();
	   }
	  
	  
   }
   

}
