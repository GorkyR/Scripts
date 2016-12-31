// ==UserScript==
// @name         Youtube | Single tab play
// @version      0.3
// @description  Only one Youtube tab will play at a time.
// @author       GorkyR
// @match        *://www.youtube.com/watch?v=*
// ==/UserScript==

var videos = document.getElementsByTagName('video');

function StorageHandler(evt){
    var key = evt.key;
    if (key == 'playing' && localStorage.getItem('playing') !== document.title)
        for (var i = 0; i < videos.length; i++)
            videos[i].pause();
}

function PlayingHandler(event){
    localStorage.setItem('playing', document.title);
}

for (var i = 0; i < videos.length; i++)
    videos[i].addEventListener('playing', PlayingHandler, true);
window.addEventListener('storage', StorageHandler, true);
