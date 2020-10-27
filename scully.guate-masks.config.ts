import { ScullyConfig } from '@scullyio/scully';
import {Masks} from './scully/plugins/masks-plugin';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'guate-masks',
  outDir: './dist/static',
  routes: {
    'mask/:id': {
      type: 'json',
      id: {
        url: '',
        property: 'id'
      }
    }
  }
/*   routes: {
    '/mask/:id': {
      type: Masks,
      url: 'https://www.guatemasques.ca/.netlify/functions/get-masks',
      },
    }, */
};
