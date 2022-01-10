window.addEventListener("load", function () {
    var xml = new XMLHttpRequest();
    xml.open("GET", "https://mapshot.herokuapp.com", true);
    xml.send();

});