import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContentfulService } from './services/contentful.service';

import { HomeComponent } from './components/home/home.component';
import { MasksComponent } from './components/masks/masks.component';
import { MaskCardComponent } from './components/masks/mask-card/mask-card.component';
import { CartComponent } from './components/cart/cart.component';
import { MaskDetailComponent } from './components/masks/mask-detail/mask-detail.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { OrderSucessComponent } from './components/order-status/order-sucess/order-sucess.component';
import { OrderFailComponent } from './components/order-status/order-fail/order-fail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MasksComponent,
    MaskCardComponent,
    CartComponent,
    MaskDetailComponent,
    OrderStatusComponent,
    OrderSucessComponent,
    OrderFailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ScullyLibModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,  
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  providers: [
    ContentfulService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
