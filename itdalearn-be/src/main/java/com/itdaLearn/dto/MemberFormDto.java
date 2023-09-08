package com.itdaLearn.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberFormDto {
	
	@NotNull
	@Size(min = 3, max = 8)
	private String memberNo;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
	@Size(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
	private String memberPwd;
	
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String memberName;

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;
    
    @NotNull(message = "전화번호 형식에 맞지 않습니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
    private String memberTel;


}
