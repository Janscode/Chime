(function() {
    
console.log("hey")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    console.log(request.integration);
    // console.log(sender.tab ?
    //     "from a content script:" + sender.tab.url :
    //     "from the extension");
    // if (request.message == "hello")
    sendResponse({farewell: "integrated"});
}); 

})();