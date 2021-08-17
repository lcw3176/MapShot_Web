# MapShot_Web
MapShot WebVersion

#### __개발 기간__
* _21.01.17 ~ 21.01.21_ (개발 후 첫 번째 배포까지)
* 지속적 고도화 중

#### __API__
* Kakao Map (동적 지도 표시, 위치 검색, 좌표 탐색, 사진 호출)
* Naver Static Map (정적 사진 호출)
* ~~Vworld OpenAPI (레이어 호출)~~
* Google Analytics

#### __Platform__
* Netlify
* ~~Freenom~~ (국내 환경에서의 .tk, .ga 등의 도메인 접속 문제로 사용 중단)
* ~~Oracle Cloud~~ (API 호출 아이피 문제로 사용 중단, [MapshotProxyServer-Public](https://github.com/lcw3176/MapshotProxyServer-Public) 참고)
* ~~Naver Cloud Server~~ (비용 문제로 사용 중단)
* ~~Naver Cloud Function~~ (Cloud Log Analytics 비용 문제로 사용 중단) 
* Heroku

#### __Language & FrameWorks & Library__
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


#### __Browser Validation__
|브라우저|동작|테스트 환경|비고|
|----|----|----|---|
|Google Chrome|O|Desktop, Mobile||
|Microsoft Edge|O|Desktop||
|Internet Explorer|△|Desktop|ie 10 버전만 테스트|
|FireFox|O|Desktop||
|Brave Browser|O|Desktop||
|Safari|△|Desktop, Mobile|모바일 동작 안함|


#### __Site & Package Project__
* Site: https://mapshot.netlify.app/
* TestSite : https://testservermapshot.netlify.app/
* MapshotProxyServer-Public: https://github.com/lcw3176/MapshotProxyServer-Public
* MapshotKakaoServer: https://github.com/lcw3176/Mapshot-Kakao-Server

---
### 작동 방식, 사용법
1. 중심 위도, 경도 설정
2. 배율 설정
    -   배율은 총 3가지
    -   1-3단계가 순서대로 5-7의 상수값을 가짐
    -   이 값은 높이, 너비의 중심 좌표가 됨
    -   Ex. 1단계가 2의 상수값을 갖는다고 가정한다면
        -   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        -   | (0, 0) (0, 1) (0, 2) (0, 3) (0, 4) | 
        -   | (1, 0) (1, 1) (1, 2) (1, 3) (1, 4) |
        -   | (2, 0) (2, 1) (2, 2) (2, 3) (2, 4) |
        -   | (3, 0) (3, 1) (3, 2) (3, 3) (3, 4) | 
        -   | (4, 0) (4, 1) (4, 2) (4, 3) (4, 4) |
        -   ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
3. 사진 조립
    -   (0, 0)에 해당하는 좌표를 찾은 후
    -   차례대로 사진을 얻어옴   
    -   가져온 사진은 Canvas에 조립
