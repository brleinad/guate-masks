import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Mask } from '../models/mask.model';
import { MasksService } from './masks.service';
import { ContentfulService } from './contentful.service';

const MAX_CART_ITEMS = 20;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Mask[] = [];
  private numberOfItemsSource = new Subject<number>();
  total = 0;
  COOKIE = 'guatemasks'

  numberOfItems$ = this.numberOfItemsSource.asObservable();

  constructor(
    private cookieService: CookieService,
    private contentfulService: ContentfulService,
    private _snackBar: MatSnackBar,
    private masksService: MasksService) { }

  getItems(): Mask[] {
    this.checkForCookies();
    return this.items;
  }

  addItem(item: Mask): void {
    if (this.items.find( i => i.id === item.id)) {
      this.openSnackBar('Le masque est déjà dans le panier', '');
      console.log('Item already in cart');
      return;
    }
    if (this.items.length >= MAX_CART_ITEMS) {

      this.openSnackBar('Le panier est plein', '');
      return;
    }
    this.items.push(item);
    this.openSnackBar('Masque ajouté au panier', '');
    this.updateNumberOfItems();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
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
      if (this.cookieService.get(this.COOKIE)) {
        this.items = JSON.parse(this.cookieService.get(this.COOKIE));
        this.updateNumberOfItems();
      }
    }
  }

  async checkAvailability() {
    // Not very performant but will do for now
    console.log('setting availability');
    let availability = true;
    const availableMasks = await this.masksService.getMasks();
    // const entries = await this.contentfulService.getMaskEntries();

    this.items.forEach((item) => {
      if (availableMasks.filter(mask =>  mask.id === item.id ).length === 0) {
        console.log(`Mask ${item.id} is not available anymore`);
        this.removeItem(item);
        this.deleteItemFromCookies(item);
        availability = false;
      }
    });
    console.log(`Availability is ${availability}`);
    return availability;
  }

  deleteItemFromCookies(item: Mask) {
    console.log('Deleting this item from cookies');
    console.log(item);
    let cookieItems = JSON.parse(this.cookieService.get(this.COOKIE));
    console.log('cookies are');
    console.log(cookieItems);
    cookieItems = cookieItems.filter(cookieItem => cookieItem.id !== item.id);
    this.cookieService.set(this.COOKIE, JSON.stringify(cookieItems));
    this.updateNumberOfItems();
  }

  updateNumberOfItems() {
    this.setCookies();
    this.numberOfItemsSource.next(this.items.length);
  }

  setCookies() {
    this.cookieService.set(this.COOKIE, JSON.stringify(this.items));
  }

  clearAll() {
    this.clearItems();
    this.clearCookies();
  }

  clearItems() {
    this.items = [];
  }

  clearCookies() {
    this.cookieService.set(this.COOKIE, JSON.stringify([]));
  }

}
