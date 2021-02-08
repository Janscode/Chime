import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  State
} from '@stencil/core';

@Component({
  tag: 'chime-text-area',
  styleUrl: 'chime-text-area.scss',
  shadow: true,
})
export class ChimeTextArea {

  @State() value: String;

  @Event() valueChange: EventEmitter<String>

  valueChangeHandler(value: String) {
    this.valueChange.emit(value);
  }

  handleKeyDown(e) {
    this.value = e.target.innerText;
    this.valueChangeHandler(this.value);
  }

  
  render() {
    return (
      <Host>
        <div
          class="chime-text-area"
          contentEditable
          spellcheck
          role="textarea"
          onKeyDown={(e) => this.handleKeyDown(e)}
        >

        </div>
      </Host>
    );
  }

}
