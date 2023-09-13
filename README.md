# ItdaLearn v2.0
> **KDT풀스택3기**  
> **성남 그린 컴퓨터 아카데미**  
> **개발기간: 2023.08.04 ~ 2023.09.12**  


## 팀원소개

팀장: 김상준  
팀원: 권혜연, 김현승, 지성현   


## 프로젝트소개

개발자들을 위한 온라인 강의 교육 플랫폼


## 설치 가이드

**요구 사항**
- Npm  
- Eclips EE (STS 4)  
- VsCode  
- Oracle 11g  

**초기화**  

    $ git clone https://github.com/coffebara/green_final_team_project.git   
    $ cd green_final_team_project   
    
**Fromtend**  

    $ cd itdalearn-fe   
    $ npm install   
    $ npm start   

 
**Backend**  

1. Oracle Db 계정 생성   
   cmd 실행 -> 'sqlplus' 입력 ->   
   Enter username: system   
   Enter password: 1234   
   -> 'conn/as sysdba' 입력   
   -> 'create user teset2 identified by 1234' 입력   
   -> 'grant connect, resource, dba to tester2' 입력   
2. 이클립스 실행   
3. 프로젝트 Import   
   [File] -> [import] -> [Existring Gradle Project] -> 'green_final_team_project/itdalaern-de' 폴더 선택   
4. Querydsl를 위한 QClass생성   
   [Window] -> [Show view] -> [Other] -> [Gradle Task] -> [itdalearn-be] -> [build] -> [build] -> itdalaern-de폴더 refresh   
5. 로컬 파일 저장 폴더 생성   
   'C:\shop\course'   
6. 실행
   [Run] -> [Run as] -> [Spring Boot App] 


## 주요 기능

- 회원가입
- 관리자 상품관리
- 강의 구매
- 게시판


## 기술 스택

- JAVA 11
- Spring Boot 2.7
- gradle
- Spring Security 5.7.1
- jwt
- Oracle 11g
- JavaScript
- React 18
- Redux Toolkit
- GitHub



## 발표 순서

1. 팀원소개 - 김상준
2. 진행 프로세스 - 김상준
3.  프로젝트 개요 - 김현승
4. 프로젝트 기획 - 권혜연, 김상준, 지성현, 
5. 프로젝트 상세 - 각 담당자
6. 마치며 - 각 담당자
