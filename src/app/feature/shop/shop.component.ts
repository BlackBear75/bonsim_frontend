import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass} from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  // Стани для кожної категорії
  isCollapsed: { [key: string]: boolean } = {
    gender: false,
    sale: false,
    product: false
  };

  // Метод для зміни стану дропдауну
  toggleCollapse(category: string): void {
    this.isCollapsed[category] = !this.isCollapsed[category];
  }
}
