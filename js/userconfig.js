var zoomLevel = 1;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
// 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
var currentTypeId;
var quality = 1;


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

function setQuality(userQuality){
    quality = userQuality;
}

function checkValue(){
    if(!(zoomLevel >= 1 && zoomLevel <= 3)){
        alert("잘못된 배율값입니다. 지속된다면 새로고침을 해주세요");
        return false;
    }

    if(!(quality >= 0 && quality <= 1)){
        alert("잘못된 화질 설정입니다. 지속된다면 새로고침을 해주세요");
        return false;
    }

    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;


    if(lat == "" || lng == ""){
        alert("좌표값을 설정해주세요");
        return false;
    }

    return true;
}


function startCapture(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var imageWidth = 1000;
    var imageHeight = 1000;

    var xPosition = 0;
    var yPosition = 0;

    if(checkValue()){
        
        var centerLat = document.getElementById("lat").value;
        var centerLng = document.getElementById("lng").value;

        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){

                var tempMapContainer = document.getElementById('hideStaticMap');
                var tempOption = { 
                    center: new kakao.maps.LatLng(centerLat, centerLng), // 이미지 지도의 중심좌표
                    level: quality,
                    mapTypeId: baseMap
                };
        
                // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
                new kakao.maps.StaticMap(tempMapContainer, tempOption);
                var img = new Image();
                img.src = tempMapContainer.lastElementChild.lastElementChild.src;
                ctx.drawImage(img, xPosition, yPosition, imageWidth, imageHeight);
    
                xPosition += 1000;
            }

            xPosition = 0;
            yPosition += 1000;
           
        }

        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/jpeg", "100%");
        
        var aTag = document.getElementById('downloadLink');
        aTag.href = img.src;
        aTag.innerHTML = "사진 다운로드";
    }
}