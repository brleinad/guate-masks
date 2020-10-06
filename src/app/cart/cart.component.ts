import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { Mask } from '../models/mask.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  items: Mask[];
  total = 0;
  displayedColumns = ['image', 'price'];

  constructor(private cartService: CartService<Mask>) { }

  ngAfterViewInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.cost();
    console.log(`There are item ${this.items.length} for a total of ${this.total}`);
  }

  ngOnInit(): void {
  }


}
