import { newE2EPage } from '@stencil/core/testing';

describe('chime-universal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chime-universal></chime-universal>');

    const element = await page.find('chime-universal');
    expect(element).toHaveClass('hydrated');
  });
});
