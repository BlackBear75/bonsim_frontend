import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import {ProductType} from '../../../core/models/category-models';
import {CategoryService} from '../../../core/services/category.service';
import {CartSidebarComponent} from '../cart-sidebar/cart-sidebar.component';
import {Product} from '../../../core/models/product.model';
import {CartService} from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, FormsModule, CartSidebarComponent],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartItemCount = 0;
  cartTotalPrice = 0;
  isSearchOpen = false;
  searchText = '';
  isNavbarSticky = false;
  isCartOpen = false;
  isSidebarOpen = false;
  activeTab: 'categories' | 'info' | 'admin' = 'categories';
  activeSubmenu: 'men' | 'women' | null = null;
  productTypes: ProductType[] = [];
  isAuthenticated = false;
  userRole: string | null = null;
  cartItems: Product[] = [];
  private authSub!: Subscription;
  private cartSub!: Subscription;
  constructor(private router: Router, private authService: AuthService,private categoryService: CategoryService,private  cartService: CartService,){}

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      this.userRole = this.authService.getUserRole();
      this.categoryService.getProductTypes().subscribe(types => {
        this.productTypes = types;
        console.log(this.productTypes);
      });

      this.cartSub = this.cartService.cartItems$.subscribe(items => {
        this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartTotalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      });
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

  setTab(tab: 'categories' | 'info' | 'admin') {
    this.activeTab = tab;
    this.activeSubmenu = null;
  }
  hasGender(gender: string): boolean {
    return this.productTypes.some(t => t.gender === gender);
  }
  get womenProductTypes() {
    return this.productTypes.filter(type => type.gender === 'Women' || type.gender === 'Unisex');
  }

  get menProductTypes() {
    return this.productTypes.filter(type => type.gender === 'Men' || type.gender === 'Unisex');
  }

  isSubmenuOpen(category: string): boolean {
    return this.activeSubmenu === category;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.activeSubmenu = null;
  }
  onSearchInput() {

  }
  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  clearSearch() {
    this.searchText = '';
  }

  goToShop() {
    this.router.navigate(['/shop']);
    this.toggleCart();
  }

  goToCategory(gender: string, productType: string) {
    this.router.navigate(['/product-category', gender, productType]);
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
  toggleSubmenu(category: 'men' | 'women'): void {
    this.activeSubmenu = this.activeSubmenu === category ? null : category;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.activeSubmenu = null;
  }

  isActiveLink(link: string): boolean {
    return window.location.pathname.includes(link);
  }
}
