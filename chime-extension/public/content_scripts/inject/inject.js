(function() {
    
    let s = document.createElement("script");
    // TODO: Change in prod
    s.src = "http://localhost:5000/integrations/chime-components.esm.js";
    s.type = "module";
    document.body.append(s);

})();