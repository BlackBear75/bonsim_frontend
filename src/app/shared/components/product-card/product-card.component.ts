import { Component, Input } from '@angular/core';
import { DecimalPipe, NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  imports: [
    NgStyle,
    DecimalPipe
  ],
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private router: Router) {}

  goToProduct(id: string): void {
    console.log('Navigating to product with id:', id); // Перевірка
    this.router.navigate(['/product', id]);
  }

}
