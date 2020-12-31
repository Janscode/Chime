import { newSpecPage } from '@stencil/core/testing';
import { ChimeSubmitButton } from '../chime-submit-button';

describe('chime-submit-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeSubmitButton],
      html: `<chime-submit-button></chime-submit-button>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-submit-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-submit-button>
    `);
  });
});
