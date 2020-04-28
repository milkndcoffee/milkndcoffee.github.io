//NAVBAR
function openBar() {
    navBar = document.getElementById("nav-id");
    if (screen.width <= 769){
        navBar.style.width = "80%";
    } else {
        navBar.style.width = "25%";
    }
}
function closeBar() {
  document.getElementById("nav-id").style.width = "0";
}