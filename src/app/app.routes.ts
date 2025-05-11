import { Routes } from '@angular/router';
import { AboutComponent } from './feature/about/about.component';
import {IndexComponent} from './feature/index/index.component';
import {ContactComponent} from './feature/contact/contact.component';
import {AuthComponent} from './feature/auth/auth.component';
import {ProfilePageComponent} from './feature/profile/profile-page/profile-page.component';
import {OrdersComponent} from './feature/profile/orders/orders.component';
import {PersonalDataComponent} from './feature/profile/personal-data/personal-data.component';
import {AddressesComponent} from './feature/profile/addresses/addresses.component';
import {GenderPageComponent} from './feature/gender-page/gender-page.component';
import {ProductCategoryComponent} from './feature/product-category/product-category.component';
import {ProductComponent} from './shared/components/product/product.component';
import {NotFoundComponent} from './feature/not-found/not-found.component';
import {SizeChartComponent} from './feature/size-chart/size-chart.component';
import {ShippingComponent} from './feature/shipping/shipping.component';
import {CheckoutComponent} from './feature/checkout/checkout.component';
import {AddProductComponent} from './admin/add-product/add-product.component';
import {AddCategoryComponent} from './admin/add-category/add-category.component';
import {ViewUsersComponent} from './admin/view-users/view-users.component';
import {ViewOrdersComponent} from './admin/view-orders/view-orders.component';


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
  { path: 'size-chart', component: SizeChartComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'shipping', component: ShippingComponent },

  { path: 'auth', component: AuthComponent },
  { path: 'w', component: GenderPageComponent, data: { gender: 'women' } },
  { path: 'm', component: GenderPageComponent, data: { gender: 'men' } },

  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'product', component: ProductComponent },



  { path: 'add-product', component: AddProductComponent },

  { path: 'add-category', component: AddCategoryComponent },

  { path: 'view-users', component: ViewUsersComponent },
  { path: 'view-orders', component: ViewOrdersComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
