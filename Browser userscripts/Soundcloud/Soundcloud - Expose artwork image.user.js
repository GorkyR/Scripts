// ==UserScript==
// @name         Expose artwork image
// @version      0.5
// @author       GorkyR
// @match        https://soundcloud.com/*
// ==/UserScript==

var curUrl = "";

function checkUrlChange(){
    if (curUrl != window.location.href){
        curUrl = window.location.href;
        console.log('Location changed!');
        exposeArtwork();
    }
}

function exposeArtwork() {
    var a = document.getElementsByClassName('listenArtworkWrapper__artwork')[0];
    var b = a.getElementsByClassName('image__full')[0];
    var c = b.style.backgroundImage.substring(5, b.style.backgroundImage.length - 2);
    var d = document.createElement("img");
    d.src = c;
    d.style = 'width: 100%';
    a.appendChild(d);
    b.parentElement.remove();
}

(function(){
    'use strict';
    setInterval(checkUrlChange, 1000);
})();
