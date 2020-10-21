import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Mask } from '../models/mask.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  stripe: Stripe;

  constructor(
    private http: HttpClient
  ) { 
  }

  createCheckoutSession(masks: Mask[]): Observable<{sessionId: string}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    let lineItems = this.masks2lineItems(masks);
    const body = {
      lineItems: lineItems,
      maskIds: this.masks2ids(masks),
    }
    return this.http.post<{sessionId: string}>(environment.API_URL + '/create-checkout-session', body, httpOptions)
    .pipe(
      catchError((error) => {
        console.error(error);
        return throwError('checkout session was not created')})
    )
  }

  async redirect2Checkout(sessionId: string) {
    this.stripe = await loadStripe(environment.STRIPE_KEY);
    const { error } = await this.stripe.redirectToCheckout({
      sessionId: sessionId,
    })
    if (error) {
      console.error(error);
    }
  }

  onCheckout(masks: Mask[]): void {
    this.createCheckoutSession(masks).subscribe(
      resp => {
        console.log(resp);
        this.redirect2Checkout(resp.sessionId);
      }
    )
  }

  masks2skus(masks: Mask[]): {sku: string, quantity: number}[] {
    return masks.map(mask => { return { sku: mask.id.toString(), quantity: 1} });
  }

  masks2ids(masks: Mask[]): any {
    let ids = {};
    let i = 0;
    const idsArray = masks.map(mask => mask.id);
    idsArray.forEach((id) => {
      ids[i++] = id}
      );
    return ids;
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
