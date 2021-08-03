// ==UserScript==
// @name         Prevent multiple tabs playing
// @version      0.6
// @author       GorkyR
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// ==/UserScript==

(function() {
    'use strict';
    const uid = Math.floor(Math.random() * 10000);
    function array(collection) { const array = []; for (let element of collection) array.push(element); return array; }
    window.onstorage = (event) => {
        if (event.key === 'video-playing' && localStorage.playing !== uid) {
            array(document.getElementsByTagName('video')).forEach(video => video.pause());
        }
    };
    new MutationObserver(() => {
        array(document.getElementsByTagName('video')).forEach(video => {
            video.onplaying = () => localStorage.setItem('video-playing', uid);
        });
    }).observe(document.body, { childList: true, subtree: true });
})();
