import { Routes } from '@angular/router';
import { AboutComponent } from './feature/about/about.component';
import {IndexComponent} from './feature/index/index.component';
import {ContactComponent} from './feature/contact/contact.component';
import {ShopComponent} from './feature/shop/shop.component';
import {ShopSingleComponent} from './feature/shop-single/shop-single.component';
import {AuthComponent} from './feature/auth/auth.component';
import {ProfilePageComponent} from './feature/profile/profile-page/profile-page.component';
import {OrdersComponent} from './feature/profile/orders/orders.component';
import {PersonalDataComponent} from './feature/profile/personal-data/personal-data.component';
import {AddressesComponent} from './feature/profile/addresses/addresses.component';
import {GenderPageComponent} from './feature/gender-page/gender-page.component';
import {ProductCategoryComponent} from './feature/product-category/product-category.component';
import {ProductComponent} from './shared/components/product/product.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'profile', component: ProfilePageComponent,  children: [
      { path: '', redirectTo: 'personal-data', pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent },
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'addresses', component: AddressesComponent },
  ]},

  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop-single', component: ShopSingleComponent },

  { path: 'auth', component: AuthComponent },
  { path: 'gender/:gender', component: GenderPageComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'product', component: ProductComponent },
];
