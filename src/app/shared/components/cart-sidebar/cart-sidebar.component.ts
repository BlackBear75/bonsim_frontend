import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service'; // правильний шлях
import { CartItem } from '../../../core/models/cart.model';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit {
  isOpen = false;
  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.cartService.isCartOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
  onQuantityInputChange(productId: string, size: string, value: string | number) {
    const quantity = Number(value);
    if (quantity >= 1) {
      this.updateQuantity(productId, size, quantity);
    }
  }

  removeItem(productId: string, size: string) {
    this.cartService.removeItem(productId, size);
  }
  goToCheckout(): void {
    this.router.navigate(['/checkout']);
    this.toggleCart();
  }


  updateQuantity(productId: string, size: string, quantity: number) {
    if (quantity < 1) return; // мінімум 1
    this.cartService.updateQuantity(productId, size, quantity);
  }

  goToShop(): void {
    this.router.navigate(['/']);
    this.toggleCart();
  }
}
