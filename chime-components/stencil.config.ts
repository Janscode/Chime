import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'chime-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    }
  ],
  plugins: [
    sass()
  ]
};
