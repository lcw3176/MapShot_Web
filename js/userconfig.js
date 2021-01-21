var zoomLevel = 1;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
// 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
var currentTypeId;

var baseMapForNaver = "basic";


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
        baseMapForNaver = "basic";
    } else if(userBaseMap == 2){
        baseMap = kakao.maps.MapTypeId.SKYVIEW;
        baseMapForNaver = "satellite_base";
    } else if(userBaseMap == 3){
        baseMap = kakao.maps.MapTypeId.HYBRID;
        baseMapForNaver = "satellite";
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


function startCapture(){


    if(checkValue()){
        
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
            
        var moveXPosition = 0.00268;
        var moveYPostion = 0.00211;
        var Lat = Number(centerLat) + Number(moveYPostion);  
        var Lng = Number(centerLng) - Number(moveXPosition);
        var imgArray = new Array();
        var order = 0;

        document.getElementById("resultImage").innerText = "사진 수집중입니다....";

        for(var i = 0; i < blockWidth; i++){
        
            for(var j = 0; j < blockWidth; j++){

                var tempSrc = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
                        + "w=1000&h=1000"
                        + "&center=" + Lng + "," + Lat
                        + "&level=18"
                        + "&X-NCP-APIGW-API-KEY-ID=ny5d4sdo0e"
                        + "&maptype=" + baseMapForNaver;
                var tag = document.createElement("img");
                tag.crossOrigin = "*";
                tag.src = tempSrc;
                (function(order){
                    var _order = order;
                    tag.onload = function(){
                        imgArray[_order] = this;
                    }
                })(order);

                Lng += Number(moveXPosition);
                order++;   
            }
        
            Lng = centerLng - moveXPosition; 
            Lat -= moveYPostion;
        
        }
            
        

        var func = setInterval(function(){

            if(imgArray.length == blockArea){

                for(var i = 0; i < blockArea; i++){

                    if(i % blockWidth == 0 && i != 0) {
                        xPosition = 0;
                        yPosition += 1000;
                    }

                    var img =  imgArray[i];

                    ctx.drawImage(img, xPosition, yPosition); 
                    xPosition += 1000;
                    
                }

                var canvas = document.getElementById("canvas");
                var resultTag = document.getElementById("resultImage");
                resultTag.href = canvas.toDataURL("image/jpeg");
                resultTag.innerText = "결과 파일";

                canvas.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = 0;
                canvas.height = 0;

                clearInterval(func);
            }
        }, 1000);

    }
}