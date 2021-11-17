// ==UserScript==
// @name         Add 'share' download button
// @version      0.1
// @author       GorkyR
// @match        *://www.tiktok.com/*
// @icon         https://www.google.com/s2/favicons?domain=tiktok.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const share_image_url = 'https://www.shareicon.net/data/512x512/2015/10/18/657809_arrows_512x512.png';
    function share_button() {
        const image = document.createElement('img');
        image.src = share_image_url;
        image.width = image.height = 16;
        const button = document.createElement('button');
        button.classList.add('personal-share-button');
        button.setAttribute('style', 'border: none; border-radius: 50%; height: initial; width: 40px; cursor: pointer;');
        button.onmouseenter = function(event) {
            button.style.background = '#AAA';
        }
        button.onmouseleave = function(event) {
            button.style.background = null;
        }
        button.appendChild(image);
        button.onclick = function(event) {
            const videos = document.getElementsByTagName('video');
            const video_url = videos[videos.length - 1].src;
            window.open(video_url);
        };
        return button;
    }
    function add_share_button() {
        if (!document.getElementsByClassName('personal-share-button').length && document.getElementsByClassName('action-left').length) {
            const container = document.getElementsByClassName('action-left')[0];
            container.appendChild(share_button());
        }
    }
    new MutationObserver(add_share_button).observe(document.body, { childList: true, subtree: true });
    add_share_button();
})();