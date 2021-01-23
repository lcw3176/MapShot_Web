var zoomLevel = 5;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
var baseMapForNaver = "basic";


var staticMapContainer  = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
staticMapOption = { 
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
    level: 3 // 이미지 지도의 확대 레벨
};

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var exStaticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

function setZoomLevel(userZoomLevel){
    if((zoomLevel >= 5 && zoomLevel <= 7)){
        zoomLevel = userZoomLevel;
    }
    
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
    } else{
        return;
    }

    exStaticMap.setMapTypeId(baseMap);
}

function checkValue(){
    if(!(zoomLevel >= 5 && zoomLevel <= 7)){
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


var url;

function startCapture(){
    if(isMobile){zoomLevel = 5;}

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
        var moveYPostion = 0.002125;
        var Lat = Number(centerLat) + (Number(moveYPostion) * Number(zoomLevel));  
        var Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel));
        var imgArray = new Array();
        var order = 0;
        var imageLoadCount = 0;

        document.getElementById("resultStatus").innerText = "사진 수집중입니다. 화면이 잠시 멈출 수 있습니다. 완료 문구를 기다려주세요";

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
                        imageLoadCount++;
                    }
                })(order);

                Lng += Number(moveXPosition);
                order++;   
            }
        
            Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel));
            Lat -= moveYPostion;
        
        }
            
        

        var func = setInterval(function(){
            if(imageLoadCount == blockArea){

                for(var i = 0; i < blockArea; i++){

                    if(i % blockWidth == 0 && i != 0) {
                        xPosition = 0;
                        yPosition += 1000;
                    }

                    var img =  imgArray[i];

                    ctx.drawImage(img, xPosition, yPosition); 
                    xPosition += 1000;
                    
                }

                if(url != ""){
                    URL.revokeObjectURL(url);
                }
                var tempurl = canvas.toDataURL('image/jpeg');
                var blob = dataURLtoBlob(tempurl);
                URL.revokeObjectURL(tempurl);

                var newImg = document.getElementById("resultImage");                    
                url = URL.createObjectURL(blob);
                  
                newImg.onload = function() {
                    var status = document.getElementById("resultStatus");
                    status.innerText = "완료되었습니다. 아래에 생성된 링크를 확인하세요";

                    var tag = document.getElementById("resultTag");
                    tag.href = url;
                    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = 0;
                    canvas.height = 0;
                };

                newImg.src = url;
                clearInterval(func);
                // canvas.toBlob(function(blob) {
                //     console.log(blob);

                //     if(blob == ""){
                //         document.getElementById("resultStatus").innerText = "";
                //         alert("결과 도출에 실패했습니다.");
                //         return;
                //     }

                //     var newImg = document.getElementById("resultImage");                    
                //     url = URL.createObjectURL(blob);
                  
                //     newImg.onload = function() {
                //         var status = document.getElementById("resultStatus");
                //         status.innerText = "완료되었습니다. 아래에 생성된 링크를 확인하세요";

                //         var tag = document.getElementById("resultTag");
                //         tag.href = url;
                        
                //         ctx.clearRect(0, 0, canvas.width, canvas.height);
                //         canvas.width = 0;
                //         canvas.height = 0;
                //     };

                //     newImg.src = url;
                    
                // }, 'image/webp');

                // clearInterval(func);
            }
        }, 1000);

    }
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}


