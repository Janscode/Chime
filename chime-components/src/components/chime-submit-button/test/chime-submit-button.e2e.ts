import { newE2EPage } from '@stencil/core/testing';

describe('chime-submit-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-submit-button></chime-submit-button>');

    const element = await page.find('chime-submit-button');
    expect(element).toHaveClass('hydrated');
  });
});
