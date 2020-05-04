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

//SHOP
function openShopNav(){
    shopNav = document.getElementById("shop-nav");
    shopButton = document.getElementById("shop-button-id");
    if (shopButton.classList.contains("active-shop-button")){
        shopButton.classList.remove("active-shop-button");
        shopNav.style.height = "0";
        shopNav.style.opacity = "0";  
    } else{ 
        shopNav.style.height = "30%";
        shopNav.style.opacity = "1";
        shopButton.classList.add("active-shop-button");
    }
    
    
    //document.getElementById("shop-button-id").src = "https://img.icons8.com/android/48/000000/collapse-arrow.png";
}

/*might use, might not use
function pushUpAndFade(){
    title = document.getElementById("mobile-title-id");
    //title.style.height = "0";
    title.style.opacity = "0";
    title.style.overflow = "hidden";
    title.style.height = "0";
    //title.classList.add("title-transition");
}*/