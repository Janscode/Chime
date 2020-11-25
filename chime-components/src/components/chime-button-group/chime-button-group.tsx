import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'chime-button-group',
  styleUrl: 'chime-button-group.scss',
  shadow: true,
})
export class ChimeButtonGroup {

  /**
   * @prop boxes: Control the number of buttons within the group.
   * Using an odd number is highly recommended.
   * @default 5
   */
  @Prop() boxes: number = 5;

  /**
   * @prop lowLabel: An optional label that will be placed near 
   * the lower button.
   */
  @Prop() lowLabel: string = '';
  /**
   * @prop midLabel: An optional label that will be placed near
   * the middle button. Only works for odd numbers of buttons.
   */
  @Prop() midLabel: string = '';
  /**
   * @prop highLabel: An optional label that will be placed near 
   * the upper button.
   */
  @Prop() highLabel: string = '';


  render() {
    const buttons = [];

    for (let i = 0; i < this.boxes; i++) {
      buttons.push(<button type="button" class="chime-button">{i+1}</button>);
    }

    if (this.lowLabel != '') {
      buttons[0] = (
        <span>
          {buttons[0]}
          <div class="chime-button-label">
            {this.lowLabel}
          </div>
        </span>
      );
    }

    if (this.highLabel != '') {
      buttons[buttons.length - 1] = (
        <span>
          {buttons[buttons.length - 1]}
          <div class="chime-button-label">
            {this.highLabel}
          </div>
        </span>
      );
    }
    
    if (this.midLabel != '' && this.boxes % 2 == 1) {
      let index = Math.floor(buttons.length / 2);
      buttons[index] = (
        <span>
          {buttons[index]}
          <div style={{textAlign: "center", padding: "0"}} class="chime-button-label">
            {this.midLabel}
          </div>
        </span>
      );
    }

    return (
      <Host>
        <div class="chime-button-group">
          {buttons}
        </div>
      </Host>
    );
  }

}
