import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasksComponent } from './masks/masks.component';
import { MaskCardComponent } from './masks/mask-card/mask-card.component';
import { MaskDetailComponent } from './masks/mask-detail/mask-detail.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'masks', component: MasksComponent },
 { path: 'mask/:id', component: MaskDetailComponent },
 { path: 'about', component: AboutComponent },
 { path: 'donate', component: AboutComponent },
 { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
