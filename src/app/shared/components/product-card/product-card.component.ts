import { Component, Input } from '@angular/core';
import {CurrencyPipe, NgStyle} from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  imports: [
    NgStyle,
    CurrencyPipe
  ],
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any;
}
