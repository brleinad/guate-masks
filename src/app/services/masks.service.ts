import { Injectable } from '@angular/core';
import { Mask } from '../models/mask.model';
import { ContentfulService } from './contentful.service';
import { Entry } from 'contentful';

/*
let masks: Mask[] = [
  new Mask(1, 'huipil', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask(2, 'huipil', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask(3, 'corte', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask(4, 'kids', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask(5, 'corte', 8, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask(6, 'corte', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask(7, 'corte', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask(8, 'huipil', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
];
*/

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  masks: Mask[] = [];
  constructor(private contentfulService: ContentfulService) { }

  getMasks(): Mask[] {
    this.contentfulService.getMaskEntries()
    .then(entries => {
      for (let entry of entries) {
        this.masks.push(this.entry2mask(entry));
      }
    });
    return this.masks;
  }

  entry2mask(entry: Entry<any>): Mask {
    console.log(entry.fields);
    return new Mask(
        entry.fields.id,
        entry.fields.type,
        entry.fields.length,
        entry.fields.height,
        entry.fields.image.fields.file.url
         );
  }
}
