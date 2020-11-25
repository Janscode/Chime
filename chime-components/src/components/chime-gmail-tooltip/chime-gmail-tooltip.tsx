import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'chime-gmail-tooltip',
  styleUrl: 'chime-gmail-tooltip.scss',
  shadow: true,
})
export class ChimeGmailTooltip {

  /**
   * @prop companyImage - path to the company's logo
   */
  @Prop() companyImage: string | null = null;

  /**
   * @prop questionOriginator - entity who asked the question
   */
  @Prop() questionOriginator: string | null = null;

  /**
   * @prop position - object that takes a top and right value that
   * will position the tooltip based on the tip being (0, 0)
   */
  @Prop() position: {top: string, right: string} = {top: "50%", right: "50%"};

  render() {
    return (
      <Host>
        <div style={this.position} class="gmail-tooltip">
          <div class="tooltip-header">
              {this.questionOriginator && <p>Question from <i>{this.questionOriginator}</i>:</p>}
              {this.companyImage && <img src={this.companyImage}/>}
          </div>
          <div class="tooltip-body">
            <p class="gmail-tooltip-question">
              <slot name="question"></slot>
            </p>
            <slot name="question-type"></slot>
          </div>
          <div class="tooltip-footer">
            <a class="tooltip-dismiss">Dismiss</a>
            <button type="button">Submit</button>
          </div>
        <div class="tooltip-arrow"></div>
        </div>
      </Host>
    );
  }

}
