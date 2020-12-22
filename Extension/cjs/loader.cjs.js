'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-fa03eabd.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["chime-button-group_2.cjs",[[1,"chime-button-group",{"boxes":[2],"lowLabel":[1,"low-label"],"midLabel":[1,"mid-label"],"highLabel":[1,"high-label"]}],[1,"chime-gmail-tooltip",{"companyImage":[1,"company-image"],"questionOriginator":[1,"question-originator"],"position":[16]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
