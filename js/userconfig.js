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

function setOverlayMap(userOverlay){
    var changeMaptype;

    if(userOverlay == 1){
        changeMaptype = kakao.maps.MapTypeId.OVERLAY;  
    } else if(userOverlay == 2){
        changeMaptype = kakao.maps.MapTypeId.TERRAIN;
    } else if(userOverlay == 3){
        changeMaptype = kakao.maps.MapTypeId.USE_DISTRICT;
    } else if(userOverlay == 0){
        exStaticMap.removeOverlayMapTypeId(currentTypeId);    
        return;
    } 

  
    // 이미 등록된 지도 타입이 있으면 제거합니다
    if (currentTypeId) {
        exStaticMap.removeOverlayMapTypeId(currentTypeId);    
    }
    
    // maptype에 해당하는 지도타입을 지도에 추가합니다
    exStaticMap.addOverlayMapTypeId(changeMaptype);

    // 지도에 추가된 타입정보를 갱신합니다
    currentTypeId = changeMaptype;  
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

function startCapture(){
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");

    if(checkValue()){
        
        
    }
}