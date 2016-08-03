// ==UserScript==
// @name         Single playing
// @version      0.2
// @description  Only one Youtube tab will play at a time.
// @author       GorkyR
// @match        *://www.youtube.com/watch?v=*
// ==/UserScript==

var video = document.getElementsByTagName('video');
video = video[video.length-1];

var StorageHandler = function(evt){
    var key = evt.key;
    if (key == 'playing' && localStorage.getItem('playing') !== document.title){
        video.pause();
    }
};

video.onplaying = function(){ localStorage.setItem('playing', document.title); };
window.addEventListener('storage', StorageHandler, true);
