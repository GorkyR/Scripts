// ==UserScript==
// @name         More context
// @version      0.1
// @description  Changes the context of the page to 8
// @author       GorkyR
// @match        *://*.reddit.com/*/comments/*
// ==/UserScript==

(function() {
    'use strict';
    URL = window.location.href;
    var pos = URL.indexOf('context');
    if (pos !== -1 & URL.substring(pos+8) != '8'){
        window.location.href = URL.substring(0, pos+8) + '8';
    }
})();