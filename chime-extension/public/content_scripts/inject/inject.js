(() => {

    const getChildElement = (type, choices) => {
        switch(type) {
            case 'Text Input':
                return document.createElement('chime-text-area');
            case 'Radio Buttons':
            case 'Checkboxes':
                const retElem = document.createElement('chime-multi');
                retElem.setAttribute('type', type);
                retElem.setAttribute('choices', JSON.stringify(choices));
                return retElem;
        }
    }

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
            const { author, choices, type, text: question } = message.question;
            let s = document.createElement("script");
            // TODO: Change in prod
            s.src = "http://localhost:5000/integrations/chime-components.esm.js";
            s.type = "module";
            document.body.append(s);
            elem = document.createElement(message.integration);
            elem.setAttribute('questioner', author.toString());
            elem.setAttribute('question', question.toString());
            let child = getChildElement(type, choices);
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