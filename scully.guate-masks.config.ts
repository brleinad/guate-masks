import { ScullyConfig } from '@scullyio/scully';


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "guate-masks",
  outDir: './dist/static',
  routes: {
    '/mask/:id': {
      type: 'json',
      id: {
        url: 'http://localhost:8888/.netlify/functions/get-masks',
        property: 'id',
      },
    },
  }
};
