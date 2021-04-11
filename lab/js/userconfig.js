const zoomLevel = new ZoomController();
const mapController = new MapTypeController();
const fixValueController = new FixValueController();

function FixValueController(){

    var xPosition;
    var yPosition;
    var viewLevel;
    var viewString;

    this.initValues = function(centerLat){

        // if(viewString == 'high'){
        //     var fixYvalue = 37.5668;
        //     var correctFix = 0.00002833;
        //     var fixValue = (fixYvalue - centerLat) * correctFix;
            
        //     xPosition = 0.00268;
        //     yPosition = 0.002125 + fixValue;
        // }

        if(viewString == 'normal'){
            var fixYvalue = 37.5668;
            var correctFix = 0.00011633;
            var fixValue = (fixYvalue - centerLat) * correctFix;
            
            xPosition = 0.01072 
            yPosition = 0.0085 + fixValue;
        }

        if(viewString == 'low'){
            var fixYvalue = 37.5668;
            var correctFix = 0.00011633;
            var fixValue = (fixYvalue - centerLat) * correctFix;
            
            xPosition = 0.01072 
            yPosition = 0.0085 + fixValue;
        }

    }
    
    this.setMode = function(mode){
        // 고화질
        // if(mode == '1'){
        //     viewLevel = 18
        //     viewString = 'high'
        // }

        // 일반화질
        if(mode == '2'){
            viewLevel = 16
            viewString = 'normal'
        }

        if(mode == '3'){
            viewLevel = 15
            viewString = 'low'
        }
    }

    this.getViewLevel = function(){
        return viewLevel;
    }

    this.getXPosition = function(){
        return xPosition;
    }

    this.getYPosition = function(){
        return yPosition;
    }

}

function MapTypeController() {
    var mapTypeNaver;

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

    var zoomLevel;

    this.set = function (level) {
        if(level == 5 || level == 2){
            zoomLevel = level;
        }
    };
  

    this.get = function () {
      return zoomLevel;
    };
}



function setZoomLevel(userZoomLevel, mode) {
    zoomLevel.set(userZoomLevel);
    fixValueController.setMode(mode);
}

function setBaseMap(userBaseMap) {
    mapController.setNaver(userBaseMap);
}


function checkValue() {
    if (!(zoomLevel.get() == 5 || zoomLevel.get() == 2)) {
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

        // 흔적 남기기 옵션 켰을 경우
        if(document.getElementById("traceMode").checked){
            var traceRec = new kakao.maps.Rectangle({
                bounds: rectangle.getBounds(), // 그려질 사각형의 영역정보입니다
                strokeWeight: 4, // 선의 두께입니다
                strokeColor: '#000000', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'shortdot', // 선의 스타일입니다
                fillColor: '#ecf4f3', // 채우기 색깔입니다
                fillOpacity: 0.8 // 채우기 불투명도 입니다
            });
    
            traceRec.setMap(map);
        }

        
        var centerLat = document.getElementById("lat").value;
        var centerLng = document.getElementById("lng").value;

        fixValueController.initValues(centerLat);

        var blockWidth = (zoomLevel.get() * 2) + 1;
        var blockArea = blockWidth * blockWidth;
        var canvasBlockSize = 1000;

        var canvas = document.getElementById("canvas");
        canvas.width = Number(blockWidth) * canvasBlockSize;
        canvas.height = Number(blockWidth) * canvasBlockSize;
        var ctx = canvas.getContext("2d");

        // var fixYvalue = 37.5668;
        // var correctFix = 0.00002833;
        // var fixValue = (fixYvalue - centerLat) * correctFix;

        var moveXPosition = fixValueController.getXPosition();
        var moveYPostion = fixValueController.getYPosition();
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
                    + "&level=" + fixValueController.getViewLevel()
                    + "&X-NCP-APIGW-API-KEY-ID=ny5d4sdo0e"
                    + "&maptype=" + mapController.getNaver();
                var tag = new Image();
                tag.crossOrigin = "*";
                tag.src = tempSrc;
                

                (function (order) {
                    var _order = order;
                    tag.onload = function () {
                        var xPos = (_order % blockWidth) * canvasBlockSize;
                        var yPos = parseInt(_order / blockWidth) * canvasBlockSize;  
                        ctx.drawImage(this, xPos, yPos, canvasBlockSize, canvasBlockSize);                  
                        // ctx.drawImage(this, 0, 0, this.width, this.height, xPos, yPos, canvasBlockSize, canvasBlockSize);
                        
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

                if(canvas.msToBlob){
                    canvas.toBlob(function(blob){
                        navigator.msSaveBlob(blob, "mapshot_result.jpg");
                        var status = document.getElementById("resultStatus");
                        status.innerText = "완료되었습니다.";
                    
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        canvas.width = 0;
                        canvas.height = 0;
                    
                        progress.style.width = "100%";
                        progress.innerText = "100%";

                    }, 'image/jpeg');

                } else{
                    canvas.toBlob(function (blob) {

                        // var newImg = document.getElementById("resultImage");
                        url = URL.createObjectURL(blob);
                        var status = document.getElementById("resultStatus");
                        status.innerText = "완료되었습니다. 아래에 생성된 링크를 확인하세요";
                    
                        var tag = document.getElementById("resultTag");
                        tag.href = url;
                        tag.innerHTML = "mapshot_result.jpg";
    
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        canvas.width = 0;
                        canvas.height = 0;
                    
                        progress.style.width = "100%";
                        progress.innerText = "100%";
                        // newImg.onload = function () {
                            
                        // };
                    
                        // newImg.src = url;
                    
                    }, 'image/jpeg');
                }


                clearInterval(func);
            }
        }, 1000)

    }
}

