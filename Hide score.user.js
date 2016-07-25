// ==UserScript==
// @name         Hide score
// @version      0.4
// @description  Hides scores >.>
// @author       GorkyR
// @match        *://*.reddit.com/*
// ==/UserScript==

function soulsByName(match, from=document){
    var matches = [];
    var all = from.getElementsByTagName('*');
    for (i = 0; i < all.length; i++){
        if (all[i].classList.contains(match)) matches.push(all[i]);
    }
    return matches;
}
function banishAll(list){
    if (list.length){
        console.log('Removed elements', list);
        for (i = 0; i < list.length; i++) list[i].parentNode.removeChild(list[i]);
    }
}

var theEye = new MutationObserver( witnessing );
var eyeSight = {childList: true, subtree: true};
function witnessing(happenings){
    var purged = [];
    happenings.forEach(function(realm){
        for (i = 0; i < realm.addedNodes.length; i++){
            var soul = realm.addedNodes[i];
            if (soul.nodeType == 1){
                if (soul.classList.contains('score')){ soul.remove(); purged.push(soul); }
                else if (soul.tagName == 'DIV') banishAll(soulsByName('score', from=realm.addedNodes[i]));
            }
        }
    });
    if (purged.length) console.log('Removed elements', purged);
}

theEye.observe(document, eyeSight);