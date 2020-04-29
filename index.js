function switchPortfolio() {
    var webDev = document.getElementById("main-portfolio");
    var artStuff = document.getElementById("side-portfolio");
    if (webDev.classList.contains("fade-out")) {
        artStuff.classList.remove("fade-in");
        artStuff.classList.add("fade-out");
        webDev.classList.remove("fade-out");
        webDev.classList.add("fade-in");
    } else  {
        if (webDev.classList.contains("fade-in")){
            webDev.classList.remove("fade-in");
        }
        webDev.classList.add("fade-out");
        if (artStuff.classList.contains("fade-out")){
            artStuff.classList.remove("fade-out");
        }
        artStuff.classList.add("fade-in");
    }
}