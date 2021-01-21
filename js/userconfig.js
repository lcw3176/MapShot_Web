var zoomLevel;
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

    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;


    if(lat == "" || lng == ""){
        alert("좌표값을 설정해주세요");
        return false;
    }

    return true;
}

var imageLoadCount;

function startCapture(){


    if(checkValue()){
        imageLoadCount = 0;
        
        var centerLat = document.getElementById("lat").value;
        var centerLng = document.getElementById("lng").value;
        
        var blockWidth = (zoomLevel * 2) + 1;
        var blockArea = blockWidth * blockWidth;
        
        var canvas = document.getElementById("canvas");
        canvas.width = Number(blockWidth) * 1000;
        canvas.height = Number(blockWidth) * 1000;
        var ctx = canvas.getContext("2d");

        var xPosition = 0;
        var yPosition = 0;
            
        var moveXPosition = 0.00283;
        var moveYPostion = 0.00225;
        var Lat = Number(centerLat) + Number(moveYPostion);  
        var Lng = Number(centerLng) - Number(moveXPosition);
        var tempMapContainer = document.getElementById('hideStaticMap');


        if(tempMapContainer.childElementCount < blockArea){

            for(var i = 0; i < blockWidth; i++){
            
                for(var j = 0; j < blockWidth; j++){
                    
                    
                    var tempOption = { 
                        center: new kakao.maps.LatLng(Lat, Lng), // 이미지 지도의 중심좌표
                        level: 1,
                        mapTypeId: baseMap
                    };
            
            
                    // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
                    new kakao.maps.StaticMap(tempMapContainer, tempOption);
                    
                    Lng += Number(moveXPosition);
            
                }
            
                Lng = centerLng - moveXPosition; 
                Lat -= moveYPostion;
            
            }
            
        }

        var func = setInterval(function(){
            if(waitimage(blockArea)){
                for(var i = 0; i < blockArea; i++){

                    if(i % blockWidth == 0 && i != 0) {
                        xPosition = 0;
                        yPosition += 1000;
                    }

                    var img =  tempMapContainer.children[i].children[0];

                    ctx.drawImage(img, xPosition, yPosition); 
                    xPosition += 1000;
                    
                }

                clearInterval(func);
            }
        }, 1000);

    }
}


function waitimage(blockArea){
    
    if(imageLoadCount == 0){
        var tempMapContainer = document.getElementById('hideStaticMap');

        for(var i = 0; i < blockArea; i++){
            var img =  tempMapContainer.children[i].children[0];
    
            img.onload = function(){
                imageLoadCount++;
            }
        }

        return false;
    }
    
    else {

        if(imageLoadCount >= blockArea){
            return true;
        }    
     
        else{
            return false;
        }
    }
    
}