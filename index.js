function switchPortfolio() {
    var webDev = document.getElementById("main-portfolio");
    var artStuff = document.getElementById("side-portfolio");
    if (webDev.style.display === "none") {
        artStuff.style.display = "none";
        webDev.style.display = "block";
    } else  {
        artStuff.style.display = "block";
        webDev.style.display = "none";
    }
} 