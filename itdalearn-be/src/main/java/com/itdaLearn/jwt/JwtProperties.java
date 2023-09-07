package com.itdaLearn.jwt;

public interface JwtProperties {
    String SECRET = "itdaLearn"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 60*60*3*1000; //  (1/1000초)
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String REFRESH_HEADER_STRING = "RefreshToken"; 
}