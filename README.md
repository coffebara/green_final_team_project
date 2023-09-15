# ItdaLearn v3.0
![팀로고](https://github.com/coffebara/green_final_team_project/assets/104804458/0b37fce6-784a-476f-a593-9c22aa796f68)   
> **풀스택 웹 개발 KDT3기**  
> **성남 그린 컴퓨터 아카데미**  
> **개발기간: 2023.08.04 ~ 2023.09.13**  


## 팀원소개

| 이름 | 역할| 담당 기능 | 
| --- | --- | --- |
| [김상준][김상준 참조 링크 URL] |  | 관리자 페이지 및 기능 구현  | 
| [권혜연][권혜연 참조 링크 URL] |  | 주문관리 페이지 및 기능 구현 |
| [김현승][김현승 참조 링크 URL] |  | 로그인 페이지 및 기능 구현 |
| [지성현][지성현 참조 링크 URL] |  | 게시판 페이지 및 기능 구현 |


[김상준 참조 링크 URL]: https://github.com/coffebara
[권혜연 참조 링크 URL]: https://github.com/gwonhyeyeon/hyeyeon
[김현승 참조 링크 URL]: https://github.com/snueg
[지성현 참조 링크 URL]: https://github.com/JayJi5204




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
    
**Frontend**  

    $ cd itdalearn-fe   
    $ npm install   
    $ npm start   

 
**Backend**  

1. Oracle Db 계정 생성   
   cmd 실행 -> 'sqlplus' 입력 ->   
   Enter username: system   
   Enter password: 1234   
   -> 'conn/as sysdba' 입력   
   -> 'create user tester2 identified by 1234;' 입력   
   -> 'grant connect, resource, dba to tester2;' 입력   
2. 이클립스 실행   
3. 프로젝트 Import   
   [File] -> [import] -> [Existring Gradle Project] -> 'green_final_team_project/itdalearn-be' 폴더 선택   
4. Querydsl를 위한 QClass생성   
   [Window] -> [Show view] -> [Other] -> [Gradle Task] -> [itdalearn-be] -> [build] -> [build] -> itdalearn-be폴더 refresh   
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

- Backend
  - JAVA 11
  - Spring Boot 2.7 (JPA)
  - gradle
  - Spring Security 5.7.1
  - jwt
    
- Frontend    
  - JavaScript
  - React 18
  - Redux Toolkit
  - Axios

- DB
  - Oracle 11g

- Tools
  - GitHub
  - Postman
 

## 기획

- **요구 사항 정의서**   

![요구사항정의서](https://github.com/coffebara/green_final_team_project/assets/104804458/6fddc8ec-c766-4d00-8ba5-c75c75f74827)   
   

- **아키텍처**   

![아키텍처](https://github.com/coffebara/green_final_team_project/assets/104804458/a084a06b-3b91-48c9-9d6e-edcce704bebd)   

- **ERD**
  
![ERD](https://github.com/coffebara/green_final_team_project/assets/104804458/2ba4470a-7915-458e-a180-14426e1175c0)   


- **API 설계**
  
스프레드시트 : [바로가기](https://docs.google.com/spreadsheets/d/e/2PACX-1vSiKMHz4ZN_IORid8owC6seHaG8i_c2ntzjky92AvdviA2C0-eDI_jybtajNc5GDpJUk5cnK2kLysQp/pubhtml?gid=1938621129&single=true)


## Rule   

**Git Branch rule**   

main

- 모든 테스트를 마치고 배포하는 코드를 관리한다.
- 직접적으로 commit하지 않고, PR을 통해 merge한다.   

develop

- main 브랜치에서 분기하여 만든다.   
- 기능 개발이 완료된 코드를 관리한다.   
- 팀에서 유지하는 가장 최신의 코드이다.   

feature

- develop브랜치에서 분기하여 만든다.
- 기능별로 feature브랜치를 만들며, 브랜치명은 'feature/기능명'으로 한다.
  -  ex) feature/cart
- 개발이 완료된 브랜치는 develop브랜치로 PR을 남긴다.



## 발표 순서

1. 팀원소개 - 김상준
2. 프로젝트 개요 - 김현승
3. 진행 프로세스 - 김현승
4. 프로젝트 기획 - 김상준, 권혜연
5. 프로젝트 상세 - 각 담당자
6. 마치며 - 지성현
