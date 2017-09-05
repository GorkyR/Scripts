// ==UserScript==
// @name         Reddit | Scores hidden
// @version      0.3
// @description  Hides scores
// @author       GorkyR
// @match        https://*.reddit.com/*
// @run-at       document-start
// ==/UserScript==

document.styleSheets[0].insertRule('.score { display: none !important; }', 0);
