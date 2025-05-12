import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  cartItemCount = 0;
  cartTotalPrice = 1250;
  isSearchOpen = false;
  searchText = '';
  isNavbarSticky = false;
  isCartOpen = false;
  isSidebarOpen = false;
  activeTab: 'categories' | 'info' | 'admin' = 'categories';  // Додали вкладку для адмін панелі
  activeSubmenu: 'men' | 'women' | null = null;

  isAuthenticated = false;
  userRole: string | null = null;

  private authSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      console.log(status);
      this.userRole = this.authService.getUserRole();
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  setTab(tab: 'categories' | 'info' | 'admin') {
    this.activeTab = tab;
    this.activeSubmenu = null;
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

  goToCategory(categoryName: string) {
    this.router.navigate(['/product-category', categoryName]);
  }
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
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
