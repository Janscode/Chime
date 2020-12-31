import { newSpecPage } from '@stencil/core/testing';
import { ChimeButtonGroup } from '../chime-button-group';

describe('chime-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChimeButtonGroup],
      html: `<chime-button-group></chime-button-group>`,
    });
    expect(page.root).toEqualHtml(`
      <chime-button-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chime-button-group>
    `);
  });
});
