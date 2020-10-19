import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guate-masks';
  numberOfCartItems = 0;
  subscription: Subscription;

  constructor(private cartService: CartService) {
    this.subscription = cartService.numberOfItems$.subscribe( numberOfCartItems => {
      this.numberOfCartItems = numberOfCartItems;
    })
    // this.cartService.checkForCookies();
  }
}
