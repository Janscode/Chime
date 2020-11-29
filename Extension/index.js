function sendMessagePayload(tabs) {
}

function dispatch() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs) {
            let elem = document.createElement("chime-gmail-tooltip");
            console.log(elem);
            let q = document.createElement("span");
            q.innerText = "How is it going?";
            q.slot = "question";
            elem.innerHTML = q;
            let input = document.createElement("chime-button-group");
            input.slot = "question-type";
            input.lowLabel = "Extremely Dissatisfied";
            input.highLabel = "Extremely Satisfied";
            input.boxes = 5;
            elem.innerHTML += input;
            document.body.append(elem);
            chrome.tabs.sendMessage(tabs[0].id, {
                integration: elem
            }, (response) => {
                console.log(response)
            });
        } else {
            console.log("ERROR: tabs not defined");
        }
    });
}

document.body.querySelector('#btn').addEventListener("click", dispatch);