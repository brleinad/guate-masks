import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasksComponent } from './masks/masks.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { CartViewComponent } from 'ng-shopping-cart';

const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'masks', component: MasksComponent },
 { path: 'about', component: AboutComponent },
 { path: 'donate', component: AboutComponent },
 { path: 'donate', component: AboutComponent },
 { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
