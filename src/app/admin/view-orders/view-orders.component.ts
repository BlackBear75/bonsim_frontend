import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {OrderDetailsComponent} from '../../shared/components/order-details/order-details.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'view-orders',
  templateUrl: './view-orders.component.html',
  imports: [
    DatePipe,
    CurrencyPipe,
    OrderDetailsComponent,
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent {
  selectedOrder: any = null;
  searchTerm: string = '';
  selectedStatus: string = '';


  orders = [
    {
      customer: {
        firstName: 'Ірина',
        lastName: 'Шевченко',
        email: 'iryna@example.com',
        phone: '+380631234567'
      },
      shippingAddress: 'м. Київ, вул. Хрещатик, 12',
      paymentMethod: 'online',
      date: '2024-05-01',
      total: 1230,
      status: 'Завершено',
      paymentStatus: 'Оплачено',
      deliveryStatus: 'Доставлено',
      ttn: '20400001111100',
      items: [
        { product: 'Футболка', quantity: 2, price: 500 },
        { product: 'Шапка', quantity: 1, price: 230 }
      ]
    },
    {
      customer: {
        firstName: 'Олег',
        lastName: 'Мельник',
        email: 'oleh@example.com',
        phone: '+380501112233'
      },
      shippingAddress: 'м. Львів, вул. Городоцька, 101',
      paymentMethod: 'cod',
      date: '2024-04-29',
      total: 890,
      status: 'Очікує підтвердження',
      paymentStatus: 'Післясплата',
      deliveryStatus: 'Очікується',
      ttn: '',
      items: [
        { product: 'Світшот', quantity: 1, price: 890 }
      ]
    }
  ];
  filteredOrders() {
    return this.orders.filter(order => {
      const fullName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();
      const matchesName = fullName.includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? order.status === this.selectedStatus : true;
      return matchesName && matchesStatus;
    });
  }
  selectOrder(order: any) {
    this.selectedOrder = order;
  }
  onOrderSave(updatedOrder: any) {
    console.log('Збережено замовлення:', updatedOrder);
    this.selectedOrder = null;
  }

}
