import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { Mask } from '../../models/mask.model';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Mask[];
  location: 'canada' | 'usa' | 'world';
  locations = ['canada', 'usa', 'world'];

  totalCost = 0;
  displayedColumns = ['image', 'price', 'action'];
  availability = true;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.items = [];
    console.log(this.items);
    this.populateCart();
  }

  populateCart(): void {
    this.items = this.cartService.getItems();
    this.totalCost = this.cartService.calcTotal();
  }

  onRemoveItem(item: Mask): void {
    this.cartService.removeItem(item);
    this.populateCart();
  }

  async onCheckout(): Promise<void> {
    this.availability = await this.cartService.checkAvailability();
    if (!this.availability) {
      this.populateCart();
      return;
    }
    this.checkoutService.onCheckout(this.items, this.location);
  }

  locationToString(location: string): string {

    switch(location) {
      case('canada'):
        return 'Canada';
      case('usa'):
        return 'USA';
      case('world'):
        return 'International';
    }
  }

}
