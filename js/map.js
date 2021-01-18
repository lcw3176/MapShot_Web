var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    staticMapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
        mapTypeId: kakao.maps.MapTypeId.SKYVIEW,
        level: 3 // 이미지 지도의 확대 레벨
    };

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
var filename = 'image.png'
var data;

window.onload = function (){
    var sm = document.getElementById('staticMap');
    var img =sm.getElementsByTagName("img");
    data = img[0].src;
}


function downloadImage(){
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(data, fileName);
        return;
      }
      
      const blob = new Blob([data], { type: 'image/png' })
      const path = window.URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = path
      link.download = fileName
      link.click()
      link.remove()
}



// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = { 
//         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };

// // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
// var map = new kakao.maps.Map(mapContainer, mapOption); 