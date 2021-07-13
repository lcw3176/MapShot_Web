# MapShot_Web
### MapShot WebVersion

#### __개발 기간__
* _21.01.17 ~ 21.01.21_
* 지속적 고도화 중

#### __API__
* Kakao Map (동적 지도 표시, 위치 검색, 좌표 탐색)
* Naver Static Map (정적 사진 호출)
* Vworld OpenAPI (레이어 호출)
* Google Analytics

#### __Platform__
* Netlify
* ~~Freenom~~
* ~~Oracle Cloud~~
* ~~Naver Cloud~~
* Naver Cloud Function

#### __Language & FrameWorks__
* HTML, CSS, JavaScript (난독화 적용 후 배포)
* ~~Java, Spring Boot~~
* Node.js

#### __Link__
* [Site] https://mapshot.netlify.app/
* [Package] https://github.com/lcw3176/MapshotProxyServer-Public

#### __호환 브라우저__
- 데스크탑, 랩탑
    * IE 10 이상
    * Chrome, Microsoft Edge, FireFox, etc...
- 모바일
    * 안드로이드는 거의 다 호환됨

#### __작동 불가 브라우저__
- Safari Mobile
    - 맥 기기가 전혀 없어서 디버깅 불가
    - 맥북에선 잘됨, 모바일은 작동 X

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
