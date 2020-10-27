import { ScullyConfig } from '@scullyio/scully';
import {Masks} from './scully/plugins/masks-plugin';

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "guate-masks",
  outDir: './dist/static',
  routes: {
    '/mask/:id': {
      type: Masks,
      // url: 'https://raw.githubusercontent.com/brleinad/guate-masks/main/db.json',
      url: 'https://www.guatemasques.ca/.netlify/functions/get-masks',
/*       id: {
        property: '',
      }, */
    },
  }
};
