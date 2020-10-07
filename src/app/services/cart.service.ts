import { Injectable } from '@angular/core';
import { Mask } from '../models/mask.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Mask[] = [];
  total = 0;

  constructor() { }

  getItems(): Mask[] {
    return this.items;
  }

  addItem(item: Mask): void {
    this.items.push(item);
  }

  removeItem(item: Mask): void {
    this.items = this.items.filter(cartItem => cartItem.id == item.id);
  }

  calcTotal(): number {
    this.total = 0;
    this.items.forEach( item => { this.total += item.price })
    return this.total;
  }

}
