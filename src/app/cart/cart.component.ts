import { Component, OnInit } from '@angular/core';
import { Mask } from '../models/mask.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: Mask[] = [];
  displayedColumns = ['image', 'price'];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = [];
    this.items = this.cartService.getItems();
    console.log(this.items);
  }

}
