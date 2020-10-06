// Angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

// Third party modules
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ShoppingCartModule } from 'ng-shopping-cart';

// App modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// My stuff
import { HomeComponent } from './home/home.component';
import { MasksComponent } from './masks/masks.component';
import { AboutComponent } from './about/about.component';
import { MaskCardComponent } from './masks/mask-card/mask-card.component';
import { ContentfulService } from './services/contentful.service';
import { Mask } from './models/mask.model';
import { CartComponent } from './cart/cart.component';

const shoppingCartConfig = {
  itemType: Mask,
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MasksComponent,
    AboutComponent,
    MaskCardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    ShoppingCartModule.forRoot(shoppingCartConfig),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,  
    MatSidenavModule,
    MatListModule,
    MatTableModule,
  ],
  providers: [
    ContentfulService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
