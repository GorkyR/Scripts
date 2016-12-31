// ==UserScript==
// @name         RT max context
// @version      0.2
// @description  Changes the context of the comment to 9 (maximum is 8)
// @author       GorkyR
// @match        *://*.reddit.com/*/comments/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    URL = window.location.href;
    var pos = URL.indexOf('context=');
    if (pos === -1)
        window.location.href += (URL.indexOf('/?') == -1? '?' : '&') + 'context=9';
    else if (URL.substring(pos + 8, pos + 9) != '9')
        window.location.href = URL.substring(0, pos + 8) + '9' + URL.substring(pos + 10);/**/

})();