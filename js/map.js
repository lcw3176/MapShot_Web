var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    staticMapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
        mapTypeId: kakao.maps.MapTypeId.SKYVIEW,
        level: 0 // 이미지 지도의 확대 레벨
    };

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

var canvas = document.createElement('canvas');
            canvas.width = 1000; 
            canvas.height = 1000; 
var context = canvas.getContext("2d");
context.globalCompositeOperation = "source-over";

var imgUrl = 'https://spi.maps.daum.net/map2/map/skyviewimageservice?IW=1024&IH=1024&MX=400206&MY=-11702&SCALE=0.3125&service=open';
var byteNumbers = new Array(imgUrl.length);

for (var i = 0; i < imgUrl.length; i++)
{
    byteNumbers[i] = imgUrl.charCodeAt(i);
}


var img = new File(byteNumbers, "imgFromUrl.jpg", { type: "image/jpeg" }); 

$file.onchange = function () { 
    var fileList = img.files;

    // 읽기
    var reader = new FileReader();
    reader.readAsDataURL(fileList [0]);

    //로드 한 후
    reader.onload = function  () {
        //썸네일 이미지 생성
        var tempImage = new Image(); //drawImage 메서드에 넣기 위해 이미지 객체화
        tempImage.src = reader.result; //data-uri를 이미지 객체에 주입
        tempImage.onload = function () {
            //이미지를 캔버스에 그리기
            context.drawImage(this, 0, 0, 500, 500);

            //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
            var dataURI = canvas.toDataURL("image/jpeg");

            //썸네일 이미지 보여주기
            document.querySelector('#preview').src = dataURI;

            //썸네일 이미지를 다운로드할 수 있도록 링크 설정
            document.querySelector('#download').href = dataURI;
        };
    };
};
// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = { 
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };

// // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
// var map = new kakao.maps.Map(mapContainer, mapOption); 