// ==UserScript==
// @name         Fix comments
// @version      0.0.11
// @description  Blocks or rewrites annoying comments
// @author       GorkyR
// @match        *://*.reddit.com/*/comments/*
// ==/UserScript==

// Case-insensitive RegExp
const pattern = (regExp) => new RegExp(`([\\s\\S]*)(${regExp.source})([\\s\\S]*)`, 'i')

const forbiddenComments = [
    pattern(/^This(\.|$)/),
];

const blackout = (string) => string.replace(/\w/g, "█")
const processComment = function(commentNode) {
    let markdownElement = commentNode.getElementsByClassName('md')[0]
    let paragraphs = markdownElement.getElementsByTagName('p')
    for (let paragraph of paragraphs) {
        for (let regEx of forbiddenComments) {
            let text = paragraph.innerText
            if (regEx.test(text)) {
                let groups = regEx.exec(text)
                paragraph.innerText = groups[1] + blackout(groups[2]) + groups[groups.length - 1]
            }
        }
    }
}

const observerConfig = { subtree: true, childList: true }
const mutationCallback = function(mutations) {
    for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === 1 && node.classList.contains('comment')) {
                    processComment(node)
                }
            }
        }
    }
}
const observer = new MutationObserver(mutationCallback)
observer.observe(document.body, observerConfig)