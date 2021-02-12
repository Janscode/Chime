import { newSpecPage } from '@stencil/core/testing';
import { ChimeMulti } from '../chime-multi';

describe('chime-multi', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeMulti],
      html: `<chime-multi></chime-multi>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-multi>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-multi>
    `);
  });
});
