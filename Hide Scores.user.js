// ==UserScript==
// @name         Hide Scores
// @version      0.1
// @description  Hides scores
// @author       GorkyR
// @match        https://*.reddit.com/*
// ==/UserScript==

/*function getElements(nodeList)
{
    els = [];
    for (var i = 0; i < nodeList.length; i++)
        if (nodeList[i].nodeType == 1)
            els.push(nodeList[i]);
    return els;
}

function removeElementsByClass(from, className)
{
    removed = from.getElementsByClassName(className);
    for (var x = removed.length - 1; x >= 0; x--)
        removed[x].parentNode.removeChild(removed[x]);
}

function mutationHandler(mutations)
{
    mutations.forEach(function(mutation){
        elements = getElements(mutation.addedNodes);
        for (var i = 0; i < elements.length; i++)
                removeElementsByClass(elements[i], 'score');
    });
}

var observerConfig = {childList: true, subtree: true};
var observer = new MutationObserver(mutationHandler);
observer.observe(document.body, observerConfig);
removeElementsByClass(document, 'score');/**/

document.styleSheets[0].insertRule('.score { display: none !important; }', 0);