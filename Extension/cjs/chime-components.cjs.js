'use strict';

const index = require('./index-fa03eabd.js');

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('chime-components.cjs.js', document.baseURI).href));
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["chime-button-group_2.cjs",[[1,"chime-button-group",{"boxes":[2],"lowLabel":[1,"low-label"],"midLabel":[1,"mid-label"],"highLabel":[1,"high-label"]}],[1,"chime-gmail-tooltip",{"companyImage":[1,"company-image"],"questionOriginator":[1,"question-originator"],"position":[16]}]]]], options);
});
