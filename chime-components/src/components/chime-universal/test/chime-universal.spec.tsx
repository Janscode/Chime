import { newSpecPage } from '@stencil/core/testing';
import { ChimeUniversal } from '../chime-universal';

describe('chime-universal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeUniversal],
      html: `<chime-universal></chime-universal>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-universal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-universal>
    `);
  });
});
