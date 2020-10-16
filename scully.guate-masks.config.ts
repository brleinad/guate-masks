import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "guate-masks",
  outDir: './dist/static',
  routes: {
    '/mask/:id': {
      type: 'json',
      id: {
        url: 'http://cdn.contentful.com/spaces/lvdm1g7qic0r/entries?access_token=DV6VF78OeykSp79IIlQCJyROy-Ah_lLrtZlOhGMJ9Ic',
        property: 'id',
        headers: {
        },
      },
    },
  }
};