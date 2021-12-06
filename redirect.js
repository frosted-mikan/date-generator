if (window.location.href.includes("swipe.html")) {
    if (JSON.parse(sessionStorage.getItem('dates')) == null || JSON.parse(sessionStorage.getItem('dates')).length === 0) {
        window.location.replace("./index.html");
    }
}
