var zoomLevel = 5;
var baseMap = kakao.maps.MapTypeId.ROADMAP;
var baseMapForNaver = "basic";


var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
    staticMapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
        level: 3 // 이미지 지도의 확대 레벨
    };

// 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
var exStaticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

function setZoomLevel(userZoomLevel) {
    if ((zoomLevel >= 5 && zoomLevel <= 8)) {
        zoomLevel = userZoomLevel;
    }

}

function setBaseMap(userBaseMap) {

    if (userBaseMap == 1) {
        baseMap = kakao.maps.MapTypeId.ROADMAP;
        baseMapForNaver = "basic";
    } else if (userBaseMap == 2) {
        baseMap = kakao.maps.MapTypeId.SKYVIEW;
        baseMapForNaver = "satellite_base";
    } else if (userBaseMap == 3) {
        baseMap = kakao.maps.MapTypeId.HYBRID;
        baseMapForNaver = "satellite";
    } else {
        return;
    }

    exStaticMap.setMapTypeId(baseMap);
}

function checkValue() {
    if (!(zoomLevel >= 5 && zoomLevel <= 8)) {
        alert("잘못된 배율값입니다. 지속된다면 새로고침을 해주세요");
        return false;
    }

    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;


    if (lat == "" || lng == "") {
        alert("좌표값을 설정해주세요");
        return false;
    }

    return true;
}


var url;

function startCapture() {

    if (checkValue()) {
        var canvas = document.getElementById("canvas");
        canvas.width = Number(blockWidth) * 500;
        canvas.height = Number(blockWidth) * 500;

    
        var centerLat = document.getElementById("lat").value;
        var centerLng = document.getElementById("lng").value;

        var blockWidth = (zoomLevel * 2) + 1;
        var blockArea = blockWidth * blockWidth;

        var moveXPosition = 0.00268;
        var moveYPostion = 0.002125;
        var Lat = Number(centerLat) + (Number(moveYPostion) * Number(zoomLevel));
        var Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel));
    
        var order = 0;
        var imageLoadCount = 0;
        var imgArray = new Array();

        var progressWidth = 100 / (blockArea * 2);
        var progressValue = 0;
        var progress = document.getElementById("progressBar");
        progress.style.width = progressValue + "%";

        document.getElementById("resultStatus").innerText = "사진 수집중입니다.";

        if (url != "") {
            URL.revokeObjectURL(url);
        }

        
        for (var i = 0; i < blockWidth; i++) {

            for (var j = 0; j < blockWidth; j++) {

                var tempSrc = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?"
                    + "w=1000&h=1000"
                    + "&center=" + Lng + "," + Lat
                    + "&level=18"
                    + "&X-NCP-APIGW-API-KEY-ID=ny5d4sdo0e"
                    + "&maptype=" + baseMapForNaver;
                var tag = new Image();
                tag.crossOrigin = "*";
                tag.src = tempSrc;
                (function (order) {
                    var _order = order;
                    tag.onload = function () {
                        imgArray[_order] = this;
                        imageLoadCount++;

                        progressValue += progressWidth;
                        progress.style.width = parseFloat(progressValue).toFixed(2) + "%";
                        progress.innerText = parseFloat(progressValue).toFixed(2) + "%";
                    }
                })(order);

                Lng += Number(moveXPosition);
                order++;

            }

            Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel));
            Lat -= moveYPostion;

        }


        var func = setInterval(function() {
            if(imageLoadCount == blockArea){
                for(var i = 0 ;i < blockArea; i++){
                    if (index % blockWidth == 0 && index != 0) {
                        xPosition = 0;
                        yPosition += 500;
                    }
                        
                    var img = imgArray[index];  
                    
                    xPosition += 500;   
                    progressValue += progressWidth;
                    progress.style.width = parseFloat(progressValue).toFixed(2) + "%";
                    progress.innerText = parseFloat(progressValue).toFixed(2) + "%";    
        
                    ctx.drawImage(img, 0, 0, img.width, img.height, xPosition, yPosition, 500, 500);
        
                }
            

                canvas.toBlob(function (blob) {
                    
                    var newImg = document.getElementById("resultImage");
                    url = URL.createObjectURL(blob);
                
                    newImg.onload = function () {
                        var status = document.getElementById("resultStatus");
                        status.innerText = "완료되었습니다. 아래에 생성된 링크를 확인하세요";
                    
                        var tag = document.getElementById("resultTag");
                        tag.href = url;
                    
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        canvas.width = 0;
                        canvas.height = 0;
                    
                        progress.style.width = "100%";
                        progress.innerText = "100%";
                    };
                
                    newImg.src = url;
                
                }, 'image/jpeg');

                clearInterval(func);
            }
        }, 1000)
    }
}

