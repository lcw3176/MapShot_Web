# MapShot_Web
MapShot WebVersion

## __개요__
도시 계획 관련 각종 분석도에 활용되는 위성 사진을 고화질로 넓은 범위를 캡쳐하는 사이트입니다.
지도를 한 칸씩 확대해서 캡쳐한 다음 포토샵을 이용해 사진을 붙이는 기존 업무 프로세스를 간편하게 진행할 수 있습니다.  

## __API & Platform__
- API
    * Kakao Map (동적 지도 표시, 위치 검색, 좌표 탐색, 사진 호출)
    * Naver Static Map (정적 사진 호출)
    * ~~Vworld OpenAPI (레이어 호출)~~
    * Google Analytics
- Platform
    * Netlify
    * ~~Freenom~~ (국내 환경에서의 .tk, .ga 등의 도메인 접속 문제로 사용 중단)
    * ~~Oracle Cloud~~ (API 호출 아이피 문제로 사용 중단, [MapshotProxyServer-Public](https://github.com/lcw3176/MapshotProxyServer-Public) 참고)
    * ~~Naver Cloud Server~~ (비용 문제로 사용 중단)
    * ~~Naver Cloud Function~~ (Cloud Log Analytics 비용 문제로 사용 중단) 
    * Heroku


## __Language & FrameWorks & Library__
* 운영 사이트
    - html, css, Javasciprt
    - Bulma
    - canvas-to-blob.js
    - Emailjs
* ~~Layer 서버~~
    - ~~Java, Spring Boot~~
    - ~~Node.js~~
* Kakao 서버
    - Java, Spring Boot
    - Selenium
    - Thymeleaf, Javasciprt


## __Browser Validation__
|브라우저|동작|테스트 환경|비고|
|----|----|----|---|
|Google Chrome|O|Desktop, Mobile||
|Microsoft Edge|O|Desktop||
|Internet Explorer|△|Desktop|ie 10 버전만 테스트|
|FireFox|O|Desktop||
|Brave Browser|O|Desktop||
|Safari|△|Desktop, Mobile|모바일 동작 안함|


## __Site & Package Project__
* Site: https://mapshot.netlify.app/
* TestSite : https://testservermapshot.netlify.app/
* MapshotProxyServer-Public: https://github.com/lcw3176/MapshotProxyServer-Public
* MapshotKakaoServer: https://github.com/lcw3176/Mapshot-Kakao-Server
* Mapshot-Library: https://github.com/lcw3176/mapshot-lib

## __작동 방식__
1. 중심 위도, 경도 설정
2. 배율 설정
    -   배율은 총 4가지(1km, 2km, 5km, 10km)
    -   4개의 배율이 각각의 너비값을 가짐
    -   이 너비 만큼의 이미지 타일들을 불러와서 조립함
    -   Ex) 1km가 5의 너비값을 갖는다고 가정한다면 아래와 같이 이미지 생성
        -   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        -   | (0, 0) (0, 1) (0, 2) (0, 3) (0, 4) | 
        -   | (1, 0) (1, 1) (1, 2) (1, 3) (1, 4) |
        -   | (2, 0) (2, 1) (2, 2) (2, 3) (2, 4) |
        -   | (3, 0) (3, 1) (3, 2) (3, 3) (3, 4) | 
        -   | (4, 0) (4, 1) (4, 2) (4, 3) (4, 4) |
        -   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
3. 사진 조립
    -   (0, 0)에 해당하는 좌표를 찾은 후 차례대로 사진을 얻어옴   
    -   가져온 사진은 Canvas에 조립

## __사용법__
- https://mapshot.netlify.app/manual/1/

## __패치 로그__
- https://mapshot.netlify.app/log/index.html