// ==UserScript==
// @name         Hide 'Thanks' button
// @version      0.1
// @author       GorkyR
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function array(collection) { const array = []; for (let element of collection) array.push(element); return array; }
    function deannoyfy(mutation_list, observer) {
        const non_annoying_buttons = array(document.getElementsByClassName('annoying')).filter(el => el.innerText !== 'THANKS');
        for (let button of non_annoying_buttons) {
            button.classList.remove('annoying');
            button.style.display = null;
        }
        const annoying_buttons = array(document.getElementsByTagName('ytd-button-renderer')).filter(bt => !bt.classList.contains('annoying') && bt.innerText === 'THANKS');
        for (let button of annoying_buttons) {
            button.classList.add('annoying');
            button.style.display = 'none';
        }
    }
    new MutationObserver(deannoyfy).observe(document.body, { childList: true, subtree: true });
})();
