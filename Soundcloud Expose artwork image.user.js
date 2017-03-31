// ==UserScript==
// @name         Soundcloud | Expose artwork image
// @version      0.3
// @author       GorkyR
// @match        https://soundcloud.com/*
// ==/UserScript==

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
    var observer = new MutationObserver(function(mutations){
        exposeArtwork();
    });
    var observerConfig = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();