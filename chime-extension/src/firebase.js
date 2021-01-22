/* global chrome */
//^ so that ESLint doesn't get upset
const app = chrome.extension.getBackgroundPage().app;
//use chrome.extension.getViews({type: "popup"}) for reverse access to elements
//TODO: evaluate message passing as other option

const db = chrome.extension.getBackgroundPage().db;
export { db };
export const auth = app.auth();
export default app;
