import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../core/services/checkout.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/models/cart.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CheckoutService,],
})
export class CheckoutComponent implements OnInit {
  public checkoutForm!: FormGroup;
  showCityDropdown = false;

  cartItems: CartItem[] = [];
  totalAmount = 0;

  cities: { label: string; ref: string }[] = [];
  warehouses: { description: string; number: string }[] = [];
  selectedCityRef: string | null = null;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calculateTotal();
    });

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCode: ['+380', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}$/)
        ]
      ],
      city: ['', Validators.required],
      warehouse: ['', Validators.required],
      paymentType: ['cash', Validators.required],
    });
  }

  removeItem(productId: string, size: string) {
    this.cartService.removeItem(productId, size);
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  get firstName() {
    return this.checkoutForm.get('firstName');
  }

  onCityChange(query: string | null | undefined): void {
    const q = (query || '').trim();

    this.checkoutForm.get('warehouse')?.setValue('');
    this.checkoutForm.get('warehouse')?.markAsTouched();
    this.warehouses = [];

    if (q.length < 2) {
      this.showCityDropdown = false;
      this.cities = [];
      this.selectedCityRef = null;
      return;
    }

    this.checkoutService.getSettlements(q).subscribe((data: { label: string; ref: string }[]) => {
      this.cities = data;
      this.showCityDropdown = data.length > 0;
    });
  }

  onCitySelect(city: { label: string; ref: string }) {
    this.checkoutForm.patchValue({ city: city.label });
    this.selectedCityRef = city.ref;
    this.getWarehouses(city.ref);
    this.showCityDropdown = false;
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  getWarehouses(cityRef: string) {
    this.checkoutService.getWarehouses(cityRef).subscribe((data: { description: string; number: string }[]) => {
      this.warehouses = data;
    });
  }

  onSubmit() {

    if (this.cartItems.length === 0) {
      this.notificationService.showError('Ваш список для покупки пустий.');
      return;
    }
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();

      setTimeout(() => {
        const firstInvalid = document.querySelector('.invalid-field') as HTMLElement | null;
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      });

      return;
    }

    const orderData = {
      Items: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.price
      })),
      DeliveryCityRef: this.selectedCityRef || '',
      DeliveryWarehouseRef: this.checkoutForm.value.warehouse,
      DeliveryAddress: this.checkoutForm.value.city,

      FullName: `${this.checkoutForm.value.firstName} ${this.checkoutForm.value.lastName} ${this.checkoutForm.value.middleName || ''}`.trim(),
      Phone: `${this.checkoutForm.value.phoneCode}${this.checkoutForm.value.phoneNumber}`,
      Email: this.checkoutForm.value.email,
      PaymentType: this.checkoutForm.value.paymentType,
    };

    this.checkoutService.submitOrder(orderData).subscribe({
      next: () => {
        this.checkoutForm.reset();
        this.router.navigate(['/']);
        this.notificationService.showSuccess('Замовлення успішно оформлено!');
      },
      error: (err) => {
        console.error('Error submitting order:', err);
        this.notificationService.showError('Сталася помилка при оформленні замовлення.');
      },
    });
  }




}
