(() => {
    let mounted = false;
    let elem = undefined;

    if (!mounted) {
        mounted = true;
        chrome.runtime.sendMessage({
            mounted: mounted,
            location: location.href,
            type: 'mount',
        });
    }
    
    chrome.runtime.onMessage.addListener((message) => {
        if (!elem) {
            let s = document.createElement("script");
            // TODO: Change in prod
            s.src = "http://localhost:5000/integrations/chime-components.esm.js";
            s.type = "module";
            document.body.append(s);
            elem = document.createElement(message.integration);
            console.log(elem, message.author, message.question);
            elem.setAttribute('questioner', message.author.toString());
            elem.setAttribute('question', message.question.toString());
            let child = document.createElement(message.type === 'Text Input' ?
                'chime-text-area' :
                'chime-button-group'
            );
            elem.appendChild(child);
            document.body.append(elem);
            elem.addEventListener('submitQuestion', (e) => {
                submit(e.detail);
            })
            elem.addEventListener('dismissQuestion', dismiss)
        }
    })

    function submit(data) {
        chrome.runtime.sendMessage({
            data: data,
            type: 'submit',
        }, (response) => {
            if (response.received) {
                document.body.removeChild(elem);
            }
        });
    }

    function dismiss() {
        chrome.runtime.sendMessage({
            type: 'dismiss',
        }, (response) => {
            if (response.received) {
                document.body.removeChild(elem);
            }
        });
    }

})();