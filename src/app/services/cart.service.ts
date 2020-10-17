import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Mask } from '../models/mask.model';
import { MasksService } from './masks.service';
import { ContentfulService } from './contentful.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Mask[] = [];
  private numberOfItemsSource = new Subject<number>();
  total = 0;

  numberOfItems$ = this.numberOfItemsSource.asObservable();

  constructor(
    private cookieService: CookieService,
    private contentfulService: ContentfulService,
    private masksService: MasksService) { }

  getItems(): Mask[] {
    this.checkForCookies();
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

  checkForCookies() {
    if (this.items.length === 0) {
      if (this.cookieService.get('guatemasks')) {
        this.items = JSON.parse(this.cookieService.get('guatemasks'));
        this.updateNumberOfItems();
      }
    }
  }

  checkAvailability() {
    // Not very performant but will do for now
    console.log('setting availability');
    const availableMasks = this.masksService.getMasks();
    let availability = true;

    this.contentfulService.getMaskEntries()
    .then(entries => {
        this.items = this.items.filter((item) => {
          if (entries.find((entry) => {entry.fields.id !== item.id})) {
            console.log(`Mask ${item.id} is not available anymore`);
            availability = false;
          }
        });
      });
    console.log(`Availability is ${availability}`);
    return availability;
  }

  updateNumberOfItems() {
    this.cookieService.set('guatemasks', JSON.stringify(this.items));
    this.numberOfItemsSource.next(this.items.length);
  }

}
