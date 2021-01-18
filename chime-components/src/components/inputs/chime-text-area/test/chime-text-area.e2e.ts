import { newE2EPage } from '@stencil/core/testing';

describe('chime-text-area', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-text-area></chime-text-area>');

    const element = await page.find('chime-text-area');
    expect(element).toHaveClass('hydrated');
  });
});
