import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'chime-multi',
  styleUrl: 'chime-multi.scss',
  shadow: true,
})
export class ChimeMulti {
  @State() value: string[];

  @Element() el;

  @Prop({ mutable: true }) choices: string[] | string = [];
  @Watch('choices')
  parseChoices() {
    if (typeof this.choices ===  "string" || this.choices instanceof String) {
      try {
        this.choices = JSON.parse(this.choices as string);
      }
      catch {
        this.choices = [];
      }
      if (!Array.isArray(this.choices)) {
        this.choices = [];
      }
    }
  }

  componentWillLoad() {
    this.parseChoices();
  }

  @Prop() type: string;

  @Event() valueChange: EventEmitter<string[]>;

  getSelected() {
    this.value = Array.from<HTMLInputElement>(
      this.el.shadowRoot.querySelectorAll(`input[name="chime-multi"]:checked`)
    ).map(elem => {
      return elem.value;
    });

    this.valueChangeHandler();
  }

  valueChangeHandler() {
    this.valueChange.emit(this.value);
  }

  render() {
    return (
      <Host>
          {this.choices && (this.choices as []).map((choice, idx) => {
            return (
              <label class="multi-item">
                <input
                  class="multi-item__input"
                  key={idx}
                  name="chime-multi"
                  type={
                    this.type === 'Radio Buttons' ?
                      'radio' :
                      'checkbox'
                  }
                  onClick={() => this.getSelected()}
                  value={choice}
                />
                <span>
                  {choice}
                </span>
                </label>
            );
          })}
      </Host>
    );
  }
}
