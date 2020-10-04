import { Injectable } from '@angular/core';
import { Mask } from '../models/mask.model';

let masks: Mask[] = [
  new Mask('H0001', 'H', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask('H0002', 'H', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask('C0002', 'C', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask('H0002', 'H', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask('N0003', 'N', 8, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask('H0002', 'H', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask('H0001', 'H', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask('H0002', 'H', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask('C0002', 'C', 12, 10, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
  new Mask('H0002', 'H', 13, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel-3_540x.png?v=1601688665"),
  new Mask('N0003', 'N', 8, 5, "https://cdn.shopify.com/s/files/1/0246/5837/8849/products/hacienda-striped-face-mask-with-filter-pocket-guatemala-apparel_540x.png?v=1601688665"),
];

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  constructor() { }

  getMasks() {
    return masks;
  }
}
