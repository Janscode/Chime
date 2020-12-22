'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-fa03eabd.js');

const chimeButtonGroupCss = ":host{display:flex}.chime-button-group{width:100%;height:100%;display:flex;flex-wrap:wrap;justify-content:center;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif}.chime-button{width:40px;height:40px;border:#c2c2c2 solid 1px;background-color:#eaeaea;border-radius:5px;color:#474747;font-size:18px;margin:0 4px}.chime-button:hover{background-color:white;border-color:#333}.chime-button-label{width:40px;color:black;font-size:12px;padding-left:5px}.chime-button-group :last-child .chime-button-label{direction:rtl}";

const ChimeButtonGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * @prop boxes: Control the number of buttons within the group.
     * Using an odd number is highly recommended.
     * @default 5
     */
    this.boxes = 5;
    /**
     * @prop lowLabel: An optional label that will be placed near
     * the lower button.
     */
    this.lowLabel = '';
    /**
     * @prop midLabel: An optional label that will be placed near
     * the middle button. Only works for odd numbers of buttons.
     */
    this.midLabel = '';
    /**
     * @prop highLabel: An optional label that will be placed near
     * the upper button.
     */
    this.highLabel = '';
  }
  render() {
    const buttons = [];
    for (let i = 0; i < this.boxes; i++) {
      buttons.push(index.h("button", { type: "button", class: "chime-button" }, i + 1));
    }
    if (this.lowLabel != '') {
      buttons[0] = (index.h("span", null, buttons[0], index.h("div", { class: "chime-button-label" }, this.lowLabel)));
    }
    if (this.highLabel != '') {
      buttons[buttons.length - 1] = (index.h("span", null, buttons[buttons.length - 1], index.h("div", { class: "chime-button-label" }, this.highLabel)));
    }
    if (this.midLabel != '' && this.boxes % 2 == 1) {
      let index$1 = Math.floor(buttons.length / 2);
      buttons[index$1] = (index.h("span", null, buttons[index$1], index.h("div", { style: { textAlign: "center", padding: "0" }, class: "chime-button-label" }, this.midLabel)));
    }
    return (index.h(index.Host, null, index.h("div", { class: "chime-button-group" }, buttons)));
  }
};
ChimeButtonGroup.style = chimeButtonGroupCss;

const chimeGmailTooltipCss = ":host{display:block}.gmail-tooltip{display:block;position:fixed;width:260px;height:240px;margin-top:-25px;margin-right:10px;background-color:white;border-radius:8px;font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;filter:drop-shadow(0 0 3px #000a)}.tooltip-header{display:flex;background-color:#404040;width:100%;height:40px;border-top-left-radius:inherit;border-top-right-radius:inherit;color:white;font-size:14px;justify-content:space-between}.tooltip-header p{margin:0;line-height:40px;padding-left:15px}.tooltip-header img{height:30px;margin:5px 0;margin-right:20px}.gmail-tooltip-question{color:#474747;font-size:14px;margin:5px 10px;border-bottom:#e5e5e5 solid 1px;padding-bottom:3px}.tooltip-footer{display:flex;justify-content:space-between;padding:0 10px;margin-top:40px}.tooltip-footer a{font-size:15px;border-bottom:#333 solid 1px;font-weight:200;line-height:30px}.tooltip-footer a:hover{font-weight:400}.tooltip-footer button{width:65px;height:30px;background-color:#1A73E8;color:white;border-radius:5px}.tooltip-footer button:hover{filter:drop-shadow(0 0 3px #1A73E8aa)}.tooltip-arrow{position:absolute;top:15px;left:260px;width:0;height:0;border:solid 10px;border-color:transparent transparent transparent #404040}";

const ChimeGmailTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * @prop companyImage - path to the company's logo
     */
    this.companyImage = null;
    /**
     * @prop questionOriginator - entity who asked the question
     */
    this.questionOriginator = null;
    /**
     * @prop position - object that takes a top and right value that
     * will position the tooltip based on the tip being (0, 0)
     */
    this.position = { top: "50%", right: "50%" };
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { style: this.position, class: "gmail-tooltip" }, index.h("div", { class: "tooltip-header" }, this.questionOriginator && index.h("p", null, "Question from ", index.h("i", null, this.questionOriginator), ":"), this.companyImage && index.h("img", { src: this.companyImage })), index.h("div", { class: "tooltip-body" }, index.h("p", { class: "gmail-tooltip-question" }, index.h("slot", { name: "question" })), index.h("slot", { name: "question-type" })), index.h("div", { class: "tooltip-footer" }, index.h("a", { class: "tooltip-dismiss" }, "Dismiss"), index.h("button", { type: "button" }, "Submit")), index.h("div", { class: "tooltip-arrow" }))));
  }
};
ChimeGmailTooltip.style = chimeGmailTooltipCss;

exports.chime_button_group = ChimeButtonGroup;
exports.chime_gmail_tooltip = ChimeGmailTooltip;
