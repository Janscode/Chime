import { newE2EPage } from '@stencil/core/testing';

describe('chime-gmail-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-gmail-tooltip></chime-gmail-tooltip>');

    const element = await page.find('chime-gmail-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
