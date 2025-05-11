import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  isDropdownOpen = false;




  products: Product[] = [
    { name: 'Лонгслів чорний', price: 800, imageUrl: '/assets/img/banner_img_01.jpg', category: 'лонгсліви' },
    { name: 'Лонгслів білий', price: 850, imageUrl: '/assets/img/banner_img_01.jpg', category: 'лонгсліви' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },

    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'жіночий одяг' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'чоловічий одяг' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'monthly-event' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
    { name: 'Футболка біла', price: 600, imageUrl: '/assets/img/banner_img_01.jpg', category: 'футболки' },
  ];

  showOptions = [9, 12, 18, 24];
  perPage = 12;
  paginatedProducts: Product[] = [];
  sortOption = 'latest';
  start = 0;
  end = 0;
  total = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.loadProducts();
    });
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
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

    if (this.category && filtered.length === 0) {
      this.router.navigate(['/404']);
      return;
    }

    this.total = filtered.length;
    this.start = 0;
    this.end = Math.min(this.perPage, this.total);
    this.paginatedProducts = filtered.slice(this.start, this.end);
  }


  changePerPage(option: number) {
    this.perPage = option;
    this.loadProducts();
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

