import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MasksComponent } from './masks/masks.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
 { path: '', component: HomeComponent },
 { path: 'masks', component: MasksComponent },
 { path: 'about', component: AboutComponent },
 { path: 'donate', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
