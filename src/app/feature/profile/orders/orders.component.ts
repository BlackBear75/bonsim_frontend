import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  imports: [
    NgForOf,
    DatePipe
  ],
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders = [
    {
      orderNumber: '001',
      ttn: '1234567890',
      items: [
        { name: 'Футболка', quantity: 2 },
        { name: 'Худі', quantity: 1 },
      ],
      total: 2500,
      status: 'Очікує відправки',
      createdAt: new Date('2025-04-28T15:45:00'),
      receiptUrl: '/assets/receipts/ORD-001.pdf'
    },
    {
      orderNumber: '002',
      ttn: '0987654321',
      items: [
        { name: 'Штани', quantity: 1 }
      ],
      total: 1200,
      status: 'Доставлено',
      createdAt: new Date('2025-04-28T15:45:00'),
      receiptUrl: '/assets/receipts/ORD-002.pdf'
    }
  ];
}
