import { Component, h } from '@stencil/core';

@Component({
  tag: 'chime-submit-button',
  styleUrl: 'chime-submit-button.scss',
  shadow: true,
})
export class ChimeSubmitButton {
  render() {
    return (
      <button class="chime-submit" type="button">Submit</button>
    );
  }

}
