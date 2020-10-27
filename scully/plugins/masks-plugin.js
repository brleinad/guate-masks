const {httpGetJson, registerPlugin, routeSplit} = require('@scullyio/scully');
// import { httpGetJson, registerPlugin, routeSplit } from '@scullyio/scully';
// import {Mask} from '../../src/app/models/mask.model';
// const {fetch} = require('fetch')

const Masks = 'masks';

const masksPlugin = async(route, config) => {
    // const masks = await httpGetJson('http://localhost:8888/.netlify/functions/get-masks');
    console.log(config.url);
    const masks = await httpGetJson(config.url);
    // const masks = await fetch(config.url);
    console.log('feched this');
    console.log(masks);
    const {createPath} = routeSplit(route);
    const handledRoutes = [];
    for (let mask of masks) {
      handledRoutes.push({
        route: createPath(mask.id)
      });
    }
    return handledRoutes;
};

// no validation implemented
const masksPluginValidator =  async conf => [];
registerPlugin('router', Masks, masksPlugin);
exports.Masks = Masks;
