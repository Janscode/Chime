import { newSpecPage } from '@stencil/core/testing';
import { ChimeGmailTooltip } from '../chime-gmail-tooltip';

describe('chime-gmail-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeGmailTooltip],
      html: `<chime-gmail-tooltip></chime-gmail-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-gmail-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-gmail-tooltip>
    `);
  });
});
