// ==UserScript==
// @name         * | Enable interaction
// @version      0.3
// @description  Re-enables context menu and text selection
// @author       GorkyR
// @match        *://*/*
// @grant        none
// ==/UserScript==

function allowTextSelection() {
	// from https://alanhogan.com/code/text-selection-bookmarklet
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
	document.head.appendChild(style);
	var elArray = document.body.getElementsByTagName('*');
	for (var i = 0; i < elArray.length; i++) {
		var el = elArray[i];
		el.onselectstart = el.ondragstart = el.ondrag = el.oncontextmenu = el.onmousedown = el.onmouseup = function () { return true; };
		if (el instanceof HTMLInputElement && ['text', 'password', 'email', 'number', 'tel', 'url'].indexOf(el.type.toLowerCase()) > -1) {
			el.removeAttribute('disabled');
			el.onkeydown = el.onkeyup = function () { return true; };
		}
	}

}

(function () {
	'use strict';
	console.log('Allow context menu');
	document.onmousedown = document.onclick = document.oncontextmenu = null;
	console.log('Allow text selection');
	allowTextSelection();
})();