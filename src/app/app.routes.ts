import { Routes } from '@angular/router';
import { AboutComponent } from './feature/about/about.component';
import {IndexComponent} from './feature/index/index.component';
import {ContactComponent} from './feature/contact/contact.component';
import {ShopComponent} from './feature/shop/shop.component';
import {ShopSingleComponent} from './feature/shop-single/shop-single.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop-single', component: ShopSingleComponent },
];
