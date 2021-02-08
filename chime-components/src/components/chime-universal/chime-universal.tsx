import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'chime-universal',
  styleUrl: 'chime-universal.scss',
  shadow: true,
})
export class ChimeUniversal {

  /**
   * @prop companyImage - path to the company's logo
   */
  @Prop() companyImage: string | null = null;

  /**
   * @prop questionOriginator - entity who asked the question
   */
  @Prop() questioner: string | null = null;

  /**
   * @prop question - the question being asked
   */
  @Prop() question: string;

  value: any;

  @Listen('valueChange')
  valueChangeHandler(event: CustomEvent) {
    this.value = event.detail;
  }

  @Event() submitQuestion: EventEmitter;

  @Event() dismissQuestion: EventEmitter<String>;

  submitHandler(e: Event) {
    e.preventDefault()
    if (this.value && this.value !== '') {
      this.submitQuestion.emit(this.value);
    } else {
      console.log('You cannot submit an empty form.');
    }
  }

  dismissHandler(e: Event) {
    e.preventDefault();
    this.dismissQuestion.emit();
  }

  render() {
    return (
      <Host>
        <div class="universal">
          <div class="universal-header">
            {this.questioner && <p>Question from <i>{this.questioner}</i>:</p>}
            {this.companyImage && <img src={this.companyImage} />}
          </div>
          <div class="universal-body">
            <p class="universal-question">
              {this.question}
            </p>
            <slot />
          </div>
          <div class="universal-footer">
            <a
              class="universal-dismiss"
              onClick={(e) => {this.dismissHandler(e)}}
            >
              Dismiss
            </a>
            <chime-submit-button onClick={(e) => this.submitHandler(e)}/>
          </div>
        </div>
      </Host>
    );
  }

}
