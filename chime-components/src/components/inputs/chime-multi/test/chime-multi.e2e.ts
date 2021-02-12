import { newE2EPage } from '@stencil/core/testing';

describe('chime-multi', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-multi></chime-multi>');

    const element = await page.find('chime-multi');
    expect(element).toHaveClass('hydrated');
  });
});
