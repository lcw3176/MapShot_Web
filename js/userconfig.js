var zoomLevel = 1;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
var overlay = null;

function setZoomLevel(userZoomLevel){
    zoomLevel = userZoomLevel;
}

function setOverlayMap(userOverlay){

    if(overlay != null){
        exStaticMap.removeOverlayMapTypeId(overlay);
    } 

    if(userOverlay == 0){
        overlay = null;
    } else if(userOverlay == 1){
        overlay = kakao.maps.MapTypeId.OVERLAY;
    } else if(userOverlay == 1){
        overlay = kakao.maps.MapTypeId.TERRAIN;
    } else if(userOverlay == 1){
        overlay = kakao.maps.MapTypeId.USE_DISTRICT;
    }
  
    changeExample();
}

function setBaseMap(userBaseMap){

    if(userBaseMap == 1){
        baseMap = kakao.maps.MapTypeId.ROADMAP;
    } else if(userBaseMap == 2){
        baseMap = kakao.maps.MapTypeId.SKYVIEW;
    } else if(userBaseMap == 3){
        baseMap = kakao.maps.MapTypeId.HYBRID;
    } 

    changeExample();
}

function changeExample(){

    exStaticMap.setMapTypeId(baseMap);

    if(overlay != null){
        exStaticMap.addOverlayMapTypeId(overlay);
    } 
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