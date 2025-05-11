import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink,FormsModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router,private authService: AuthService) {}
  cartItemCount = 0;
  cartTotalPrice = 1250;
  isSearchOpen = false;
  searchText = '';
  isNavbarSticky = false;
  isCartOpen = false;
  isSidebarOpen = false;
  activeTab: 'categories' | 'info' = 'categories';
  activeSubmenu: 'men' | 'women' | null = null;



  isAuthenticated = false;
  userRole: string | null = null;

  private authSub!: Subscription;


  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      this.userRole = this.authService.getUserRole();
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
  onSearchInput() {

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.activeSubmenu = null;
  }
  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
  }

  clearSearch() {
    this.searchText = '';
  }
  setTab(tab: 'categories' | 'info') {
    this.activeTab = tab;
    this.activeSubmenu = null;
  }
  isSubmenuOpen(category: string): boolean {
    return this.activeSubmenu === category;
  }


  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  goToShop() {
    this.router.navigate(['/shop']);
    this.toggleCart();
  }


  goToCategory(categoryName: string) {
    this.router.navigate(['/product-category', categoryName]);
  }
  toggleSubmenu(category: 'men' | 'women'): void {
    if (this.activeSubmenu === category) {
      this.activeSubmenu = null;
    } else {
      this.activeSubmenu = category;
    }
  }
  closeSidebar() {
    this.isSidebarOpen = false;
    this.activeSubmenu = null;
  }

  isActiveLink(link: string): boolean {
    return window.location.pathname.includes(link);
  }

}
