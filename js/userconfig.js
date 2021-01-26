const zoomLevel = new ZoomController();
const mapController = new MapTypeController();



function MapTypeController() {
    var mapTypeKakao = kakao.maps.MapTypeId.ROADMAP;
    var mapTypeNaver = "basic";

    this.setKakao = function (type) {
        if (type == 1) {
            mapTypeKakao = kakao.maps.MapTypeId.ROADMAP;
        } else if (type == 2) {
            mapTypeKakao = kakao.maps.MapTypeId.SKYVIEW;
        } else if (type == 3) {
            mapTypeKakao = kakao.maps.MapTypeId.HYBRID;
        } else {
            return;
        }
    
        exStaticMap.setMapTypeId(mapTypeKakao);
    }

    this.getKakao = function () {
        return mapTypeKakao;
    }

    this.setNaver = function (type) {
        if (type == 1) {
            mapTypeNaver = "basic";
        } else if (type == 2) {
            mapTypeNaver = "satellite_base";
        } else if (type == 3) {
            mapTypeNaver = "satellite";
        } else {
            return;
        }
    }

    this.getNaver = function () {
        return mapTypeNaver;
    }
}

function ZoomController() {

    var zoomLevel = 5;
  
    this.set = function (level) {
        if(level >= 5 && level <= 10){
            zoomLevel = level;
        }
    };
  

    this.get = function () {
      return zoomLevel;
    };
}



var staticMapContainer = document.getElementById('staticMap');
var staticMapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), 
        level: 3 
    }

var exStaticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);

function setZoomLevel(userZoomLevel) {
    zoomLevel.set(userZoomLevel);

}

function setBaseMap(userBaseMap) {
    mapController.setKakao(userBaseMap);
    mapController.setNaver(userBaseMap);
}

function checkValue() {
    if (!(zoomLevel.get() >= 5 && zoomLevel.get() <= 10)) {
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
        var xPosition = 0;
        var yPosition = 0;
    
        var centerLat = document.getElementById("lat").value;
        var centerLng = document.getElementById("lng").value;

        var blockWidth = (zoomLevel.get() * 2) + 1;
        var blockArea = blockWidth * blockWidth;

        var canvas = document.getElementById("canvas");
        canvas.width = Number(blockWidth) * 500;
        canvas.height = Number(blockWidth) * 500;
        var ctx = canvas.getContext("2d");

        var fixYvalue = 37.5668;
        var correctFix = 0.00002833;
        var fixValue = (fixYvalue - centerLat) * correctFix;

        var moveXPosition = 0.00268;
        var moveYPostion = 0.002125 + fixValue;
        var Lat = Number(centerLat) + (Number(moveYPostion) * Number(zoomLevel.get()));
        var Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel.get()));
    
        var order = 0;
        var imageLoadCount = 0;

        var progressWidth = 100 / blockArea;
        var progressValue = 0;
        var progress = document.getElementById("progressBar");
        progress.style.width = progressValue + "%";

        document.getElementById("resultStatus").innerText = "사진 수집중입니다. 완료 문구를 기다려 주세요.";

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
                    + "&maptype=" + mapController.getNaver();
                var tag = new Image();
                tag.crossOrigin = "*";
                tag.src = tempSrc;
                

                (function (order) {
                    var _order = order;
                    tag.onload = function () {
                        xPosition = (_order % blockWidth) * 500;
                        yPosition = parseInt(_order / blockWidth) * 500;                    

                        ctx.drawImage(this, 0, 0, this.width, this.height, xPosition, yPosition, 500, 500);
                        
                        progressValue += progressWidth;
                        progress.style.width = parseFloat(progressValue).toFixed(2) + "%";
                        progress.innerText = parseFloat(progressValue).toFixed(2) + "%";

                        imageLoadCount++;
                    }
                })(order);

                order++;
                Lng += Number(moveXPosition);


            }

            Lng = Number(centerLng) - (Number(moveXPosition) * Number(zoomLevel.get()));
            Lat -= moveYPostion;

        }

        
        var func = setInterval(function() {

            if(imageLoadCount == blockArea) {

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