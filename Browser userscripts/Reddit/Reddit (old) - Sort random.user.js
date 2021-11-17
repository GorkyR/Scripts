// ==UserScript==
// @name         Sort random
// @version      0.3
// @description  Forces random sorting of comments
// @author       GorkyR
// @match        *://*.reddit.com/*/comments/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    URL = window.location.href;
    var pos = URL.indexOf('sort=');
    if (pos === -1)
        window.location.href += (URL.indexOf('/?') == -1? '?' : '&') + 'sort=random';
    else if (URL.substring(pos + 5, pos + 11) != 'random')
        window.location.href = URL.substring(0, pos + 5) + 'random&' + URL.substring(pos + 12);
})();