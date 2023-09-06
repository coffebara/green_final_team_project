package com.itdaLearn.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.*;

@Getter
@Setter
public class AddMemberRequest {

    @NotNull
    @Size(min = 3, max = 8)
    private String memberNo;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    @Size(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
    private String memberPwd;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String memberName; //유저이름

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String memberEmail; //이메일 로그인할 때 입력값

    private String role;

    @NotNull(message = "전화번호 형식에 맞지 않습니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
    private String memberTel;
}