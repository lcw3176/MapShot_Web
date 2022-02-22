window.addEventListener("load", function () {
  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == this.DONE) {
      document.getElementById("navbar").innerHTML = xml.responseText;
    }

    if(this.readyState == this.DONE){
      loadGoogleAds();
    }
  };

  xml.open("GET", "../static/template/navbar.html", true);
  xml.setRequestHeader("Access-Control-Allow-Origin", "*");
  xml.send();

  navbarBurgerClick = function navbarBurgerClick(id) {
    if (id.getAttribute("class") === "navbar-burger") {
      id.setAttribute("class", "navbar-burger is-active");
      document.getElementById("navbar-menu").setAttribute("class", "navbar-menu is-active");
    } else {
      id.setAttribute("class", "navbar-burger");
      document.getElementById("navbar-menu").setAttribute("class", "navbar-menu");
    }
  };

  function loadGoogleAds() {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("data-ad-client", "ca-pub-7390022674285155");
    scriptTag.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.setAttribute('async', 'async');
    document.body.appendChild(scriptTag);
  }
});