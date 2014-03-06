
//Send selected text to Rapid Reader extension
chrome.runtime.sendMessage({selectedText:window.getSelection().toString()});