console.log("hey")

chrome.extension.sendRequest({message: "contentScriptMessage"});

chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log(request.message);
});  