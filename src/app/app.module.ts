import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { MasksComponent } from './masks/masks.component';
import { AboutComponent } from './about/about.component';
import { MaskCardComponent } from './masks/mask-card/mask-card.component';
import { ContentfulService } from './services/contentful.service';
import { CartComponent } from './cart/cart.component';
import { MaskDetailComponent } from './masks/mask-detail/mask-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MasksComponent,
    AboutComponent,
    MaskCardComponent,
    CartComponent,
    MaskDetailComponent,
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [
    ContentfulService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
