var zoomLevel = 1;

function setZoomLevel(userZoomLevel){
    zoomLevel = userZoomLevel;
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