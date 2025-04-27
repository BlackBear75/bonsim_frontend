import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink,FormsModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  cartItemCount = 0;
  cartTotalPrice = 1250;
  isSearchOpen = false;
  searchText = '';
  isNavbarSticky = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const offsetTop = window.scrollY || document.documentElement.scrollTop;

    if (offsetTop > 0) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }



  isCartOpen = false;
  isSidebarOpen = false;
  activeTab: 'categories' | 'info' = 'categories';
  activeSubmenu: 'men' | 'women' | null = null;

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


  goToCategory(category: 'men' | 'women'): void {
    this.router.navigate([`/products/${category}`]);
    this.isSidebarOpen = false;
    this.activeSubmenu = null;
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
