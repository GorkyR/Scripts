// ==UserScript==
// @name         Youtube | Single tab play
// @version      0.4
// @description  Only one Youtube tab will play at a time.
// @author       Gorky Rojas
// @match        *://www.youtube.com/*
// ==/UserScript==

function s4() { return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1); }
var GUID = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

var video;
var onPlaying = function() {
	localStorage.setItem('playing', GUID);
};
function defineVideoElement(){
	var vids = document.getElementsByTagName('video');
	if (v.length){
		video = vids[vids.length - 1];
		video.onplaying = onPlaying;
	}
}

var onStorage = function(event){
	key = event.key;
	if (key == 'playing' && localStorage.playing !== GUID){
		defineVideoElement();
		video.pause();
	}
};

var videoChangeObserver = new MutationObserver(function (mutations) { defineVideoElement(); });
var observerConfig = { characterData: true, subtree: true };

//////////////////////////////////////////////////////////////////////////////////////

defineVideoElement();
window.addEventListener('storage', onStorage, true);
videoChangeObserver.observe(document.body, observerConfig);