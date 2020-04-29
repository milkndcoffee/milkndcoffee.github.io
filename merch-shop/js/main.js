//NAVBAR
function openBar() {
    navBar = document.getElementById("nav-id");
    if (screen.width <= 769){
        navBar.style.width = "80%";
    } else {
        //to allow reclicking on the navbar button to open and close
        if (navBar.classList.contains("active-bar")){
            navBar.classList.remove("active-bar");
            closeBar();
        } else {
            navBar.classList.add("active-bar");
            navBar.style.width = "15%";
        }
    }
    
}

function closeBar() {
  document.getElementById("nav-id").style.width = "0";
}