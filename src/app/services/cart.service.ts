import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mask } from '../models/mask.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Mask[] = [];
  private numberOfItemsSource = new Subject<number>();
  total = 0;

  numberOfItems$ = this.numberOfItemsSource.asObservable();

  constructor() { }

  getItems(): Mask[] {
    return this.items;
  }

  addItem(item: Mask): void {
    if (this.items.find( i => i.id === item.id)) {
      // TODO: tell user
      console.log('Item already in cart');
      return;
    }
    this.items.push(item);
    this.updateNumberOfItems();
  }

  removeItem(item: Mask): void {
    this.items = this.items.filter(cartItem => cartItem.id !== item.id);
    this.updateNumberOfItems();
  }

  calcTotal(): number {
    this.total = 0;
    this.items.forEach( item => { this.total += item.price })
    return this.total;
  }

  updateNumberOfItems() {
    this.numberOfItemsSource.next(this.items.length);
  }

}
