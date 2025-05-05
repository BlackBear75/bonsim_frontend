import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
interface Product {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}


@Component({
  selector: 'app-product-category',
  standalone: true,
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  imports: [
    ProductCardComponent,
    FormsModule,
    CommonModule
  ]
})

export class ProductCategoryComponent implements OnInit {
  category: string | null = '';

  isDropdownOpen = false;  // Стан дропдауну для відслідковування відкриття/закриття




  products: Product[] = [
    { name: 'Лонгслів чорний', price: 800, imageUrl: '/assets/img/banner_img_01.jpg', category: 'лонгсліви' },
    { name: 'Лонгслів білий', price: 850, imageUrl: '/assets/img/banner_img_01.jpg', category: 'лонгсліви' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },

    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
  ];

  showOptions = [9, 12, 18, 24];  // Кількість товарів для показу
  perPage = 12; // За замовчуванням показуємо 12 товарів
  paginatedProducts: Product[] = [];
  sortOption = 'latest';
  start = 0;
  end = 0;
  total = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.loadProducts();
    });
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // Закриваємо дропдаун, якщо користувач натискає за межами
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const dropdown = document.querySelector('.select-wrapper');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }

  loadProducts() {
    const filtered = this.category
      ? this.products.filter(p => p.category === this.category)
      : this.products;

    this.total = filtered.length;
    this.start = 0;
    this.end = Math.min(this.perPage, this.total);
    this.paginatedProducts = filtered.slice(this.start, this.end);
  }

  changePerPage(option: number) {
    this.perPage = option;
    this.loadProducts();  // Оновлюємо продукти після зміни кількості
  }

  sortProducts() {
    if (this.sortOption === 'price-asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      this.products.sort((a, b) => b.price - a.price);
    }
    this.loadProducts();
  }
}

