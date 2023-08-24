package com.itdaLearn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cart")
@Getter @Setter
@ToString
public class Cart {
	
	@SequenceGenerator(name = "CART_SEQUENCE_GEN", sequenceName = "seq_cart", 
			initialValue = 1, allocationSize = 1)
	@Id
	@Column(name = "cart_no")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CART_SEQUENCE_GEN")
	private Long cartNo;
	
	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;
	

	public static Cart createCart(Member member) {
		Cart cart = new Cart();
		cart.setMember(member);
		return cart;
	}

}
