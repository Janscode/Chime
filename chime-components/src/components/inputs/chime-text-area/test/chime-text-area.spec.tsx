import { newSpecPage } from '@stencil/core/testing';
import { ChimeTextArea } from '../chime-text-area';

describe('chime-text-area', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeTextArea],
      html: `<chime-text-area></chime-text-area>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-text-area>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-text-area>
    `);
  });
});
