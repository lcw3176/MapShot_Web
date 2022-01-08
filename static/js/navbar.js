window.addEventListener("load", function(){
    
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){

        if(this.status == 200 && this.readyState == this.DONE) {
            document.getElementById("navbar").innerHTML = xml.responseText;            
        }
    }

    xml.open("GET", "../static/template/navbar.html", true);
    xml.setRequestHeader("Access-Control-Allow-Origin", "*");
    xml.send();

    navbarBurgerClick = function(id){
        if(id.getAttribute("class") === "navbar-burger"){
            id.setAttribute("class", "navbar-burger is-active");
            document.getElementById("navbar-menu").setAttribute("class", "navbar-menu is-active");
        } else{
            id.setAttribute("class", "navbar-burger");
            document.getElementById("navbar-menu").setAttribute("class", "navbar-menu");
        }
    }
    
})

