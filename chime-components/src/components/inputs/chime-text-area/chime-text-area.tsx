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

  handleInput(e) {
    this.value = e.target.value;
    this.valueChangeHandler(this.value);
  }

  
  render() {
    return (
      <Host>
        <textarea
          class="chime-text-area"
          cols={27}
          rows={6}
          name="chime-text-area" 
          onInput={(e) => this.handleInput(e)}
        />
      </Host>
    );
  }

}
