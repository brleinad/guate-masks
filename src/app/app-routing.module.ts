import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MasksComponent } from './components/masks/masks.component';
import { MaskCardComponent } from './components/masks/mask-card/mask-card.component';
import { MaskDetailComponent } from './components/masks/mask-detail/mask-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderSucessComponent } from './components/order-status/order-sucess/order-sucess.component';
import { OrderFailComponent } from './components/order-status/order-fail/order-fail.component';

const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'masks', component: MasksComponent },
 { path: 'mask/:id', component: MaskDetailComponent },
 { path: 'cart', component: CartComponent },
 { path: 'order/success', component: OrderSucessComponent },
 { path: 'order/fail', component: OrderFailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
