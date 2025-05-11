import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CheckoutService} from '../../core/services/checkout.service';
import {CommonModule} from '@angular/common';  // Імпортуємо HttpClientModule


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule ,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  providers: [CheckoutService],
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  cartItems = [
    { name: 'Сукня чорна', quantity: 1, price: 1200 },
    { name: 'Сорочка біла', quantity: 2, price: 800 },
  ];
  totalAmount = 0;

  cities: { label: string; ref: string }[] = [];
  warehouses: { description: string; number: string }[] = [];

  selectedCityRef: string | null = null;

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+]{10,15}$/)]],
      city: ['', Validators.required],
      warehouse: ['', Validators.required],
      paymentType: ['cash', Validators.required],
    });

    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // 🔍 Пошук міста
  onCityChange(query: string | null | undefined) {
    const q = (query || '').trim();
    if (q.length < 3) return;

    this.checkoutService.getSettlements(q).subscribe((data) => {
      this.cities = data;
      if (data.length > 0) {
        this.selectedCityRef = data[0].ref;
        this.getWarehouses(data[0].ref);
      }
    });
  }

  // 📦 Отримати відділення
  getWarehouses(cityRef: string) {
    this.checkoutService.getWarehouses(cityRef).subscribe((data) => {
      this.warehouses = data;
    });
  }

  // 📤 Надіслати замовлення
  onSubmit() {
    if (this.checkoutForm.valid) {
      const orderData = {
        ...this.checkoutForm.value,
        cart: this.cartItems,
        total: this.totalAmount,
      };

      this.checkoutService.submitOrder(orderData).subscribe({
        next: () => {
          alert('Замовлення успішно надіслано!');
          this.checkoutForm.reset();
        },
        error: () => alert('Сталася помилка при оформленні замовлення.'),
      });
    }
  }
}
