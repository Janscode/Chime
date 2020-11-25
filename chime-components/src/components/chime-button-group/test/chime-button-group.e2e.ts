import { newE2EPage } from '@stencil/core/testing';

describe('chime-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-button-group></chime-button-group>');

    const element = await page.find('chime-button-group');
    expect(element).toHaveClass('hydrated');
  });
});
