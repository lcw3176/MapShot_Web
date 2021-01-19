var zoomLevel = 1;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
// 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
var currentTypeId;


var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
staticMapOption = { 
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
    level: 3 // 이미지 지도의 확대 레벨
};

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var exStaticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

function setZoomLevel(userZoomLevel){
    zoomLevel = userZoomLevel;
}

function setBaseMap(userBaseMap){

    if(userBaseMap == 1){
        baseMap = kakao.maps.MapTypeId.ROADMAP;
    } else if(userBaseMap == 2){
        baseMap = kakao.maps.MapTypeId.SKYVIEW;
    } else if(userBaseMap == 3){
        baseMap = kakao.maps.MapTypeId.HYBRID;
    } 

    exStaticMap.setMapTypeId(baseMap);
}



function checkValue(){
    if(!(zoomLevel >= 1 && zoomLevel <= 3)){
        alert("잘못된 배율값입니다. 지속된다면 새로고침을 해주세요");
        return false;
    }

    return true;
}
var container;

function startCapture(){
    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;

    if(checkValue()){
        
        container  = document.createElement('div'); // 이미지 지도를 표시할 div  
        container.style.width = 100 +"px";
        container.style.height = 100 +"px";

        MapOption = { 
            center: new kakao.maps.LatLng(lat, lng), // 이미지 지도의 중심좌표
            level: 3 // 이미지 지도의 확대 레벨
        };

        // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
        var map = new kakao.maps.StaticMap(container, MapOption);

        var aTag = document.getElementById('downloadLink');
        aTag.src = container.lastElementChild.lastElementChild.src;
        
    }
}