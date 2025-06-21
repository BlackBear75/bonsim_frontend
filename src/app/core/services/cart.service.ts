import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Product } from '../models/product.model';
import {CartItem} from '../models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.itemsSubject.asObservable();

  public readonly items$: Observable<CartItem[]> = this.itemsSubject.asObservable();
  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  addItem(product: Product, size: string, price: number) {
    const currentItems = this.getItems();
    const existingItem = currentItems.find(
      item => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, size, quantity: 1, price });
    }

    this.itemsSubject.next([...currentItems]);
  }

  updateQuantity(productId: string, size: string, quantity: number) {
    const currentItems = this.getItems().map(item =>
      item.product.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    );
    this.itemsSubject.next(currentItems);
  }

  removeItem(productId: string, size: string) {
    const currentItems = this.getItems().filter(
      item => !(item.product.id === productId && item.size === size)
    );
    this.itemsSubject.next(currentItems);
  }

  openCart() {
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    this.isCartOpenSubject.next(false);
  }

  toggleCart() {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
  }
}
