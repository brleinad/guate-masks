import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Mask } from '../models/mask.model';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  stripe: Stripe;

  constructor() { 
  }


  async onCheckout(items: Mask[]) {
    this.stripe = await loadStripe(environment.STRIPE_KEY);

    const {error} = await this.stripe.redirectToCheckout({
      lineItems: this.masks2lineItems(items),
      mode: 'payment',
      successUrl: 'http://localhost:4200/',
      cancelUrl: 'http://localhost:4200/cart',
    })
    console.error(error.message);
  }

  masks2lineItems(masks: Mask[]) {
    let huipilQuantity = 0;
    let corteQuantity = 0;
    let kidsQuantity = 0;
    let lineItems: {price: string, quantity: number}[] = [];

    masks.forEach( mask => {
      switch (mask.type) {
        case 'huipil':
          huipilQuantity++;
          break;
        case 'corte':
          corteQuantity++;
          break;
        case 'kids':
          kidsQuantity++;
          break;
        default:
          break
      }
    })

    if (huipilQuantity >= 1) {
      lineItems.push({price: environment.HUIPIL_PRICE_KEY, quantity: huipilQuantity})
    }
    if (corteQuantity >= 1) {
      lineItems.push({price: environment.CORTE_PRICE_KEY, quantity: corteQuantity})
    }
    if (kidsQuantity >= 1) {
      lineItems.push({price: environment.KIDS_PRICE_KEY, quantity: kidsQuantity})
    }

    console.log(lineItems)

    return lineItems;
  }

}
