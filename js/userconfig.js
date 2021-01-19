var zoomLevel = 1;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
var overlay = null;

function setZoomLevel(userZoomLevel){
    zoomLevel = userZoomLevel;
}

function setOverlayMap(userOverlay){
    switch(userOverlay){
        case 0:
            overlay = null;
            break;
        case 1:
            overlay = kakao.maps.MapTypeId.OVERLAY;
            break;
        case 2:
            overlay = kakao.maps.MapTypeId.TERRAIN;
            break;
        case 3:
            overlay = kakao.maps.MapTypeId.USE_DISTRICT;
            break;       
        default:
            break;     
    }    

    changeExample();
}

function setBaseMap(userBaseMap){
    switch(userBaseMap){
        case 1:
            baseMap = kakao.maps.MapTypeId.ROADMAP;
            break;
        case 2:
            baseMap = kakao.maps.MapTypeId.SKYVIEW;
            break;
        case 3:
            baseMap = kakao.maps.MapTypeId.HYBRID;
            break;       
        default:
            break;     
    }    

    changeExample();
}

function changeExample(){

    var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    staticMapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
        level: 3 // 이미지 지도의 확대 레벨
    };

    // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
    var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    staticMap.setMapTypeId(baseMap);

    if(overlay != null){
        staticMap.addOverlayMapTypeId(overlay);
    }

}
function checkValue(){
    if(!(zoomLevel >= 1 && zoomLevel <= 3)){
        alert("잘못된 배율값입니다. 지속된다면 새로고침을 해주세요");
        return false;
    }

    return true;
}

var staticMapContainer;

function startCapture(){
    var lat = document.getElementById("lat");
    var lng = document.getElementById("lng");

    if(checkValue()){
        staticMapContainer  = document.createElement('div'), // 이미지 지도를 표시할 div  
        staticMapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
            level: 3 // 이미지 지도의 확대 레벨
        };
    
        // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
        var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
        staticMap.setMapTypeId(baseMap);

        if(overlay != null){
            staticMap.addOverlayMapTypeId(overlay);
        }
        
    }
}