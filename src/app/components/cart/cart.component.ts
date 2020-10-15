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
  items: Mask[] = [];
  totalCost = 0;
  displayedColumns = ['image', 'price', 'action'];

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.items = [];
    console.log(this.items);
    this.populateCart();
  }

  populateCart() {
    this.items = this.cartService.getItems();
    this.totalCost = this.cartService.calcTotal();
  }

  onRemoveItem(item: Mask) {
    this.cartService.removeItem(item);
    this.populateCart();
  }

  onCheckout() {
    // this.checkoutService.onCheckout(this.items);
    this.checkoutService.onCheckout(this.items).subscribe(
      (response) => {
        console.log(response);
        this.checkoutService.onRedirect2Checkout(response.sessionId);
      }
    )
  }


}
