import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../../core/services/product.service';
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

  products: Product[] = [];

  showOptions = [9, 12, 18, 24];
  perPage = 12;
  paginatedProducts: Product[] = [];
  sortOption = 'latest';
  start = 0;
  end = 0;
  total = 0;
  currentGender: string | null = null;
  currentProductType: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router,private productService: ProductService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentGender = params.get('gender');
      this.currentProductType = params.get('productType');
      console.log(this.currentGender, this.currentProductType);
      this.loadProducts(this.currentGender, this.currentProductType);
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

  loadProducts(gender: string | null, productType: string | null): void {
    this.productService.getProductsByCategory(gender || undefined, productType || undefined).subscribe({
      next: (products) => {
        if (!products || products.length === 0) {
          console.log('No products found');
          this.router.navigate(['/404']);
          return;
        }
        console.log(products);
        this.products = products;
        this.total = products.length;
        this.start = 0;
        this.end = Math.min(this.perPage, this.total);
        this.paginatedProducts = this.products.slice(this.start, this.end);
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }



  changePerPage(option: number) {
    this.perPage = option;
    this.loadProducts(this.currentGender, this.currentProductType);
  }

  sortProducts() {
    if (this.sortOption === 'price-asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      this.products.sort((a, b) => b.price - a.price);
    } else {
      // Якщо наприклад 'latest', можна пропустити сортування або сортувати за датою
    }

    // Після сортування оновити пагінацію:
    this.total = this.products.length;
    this.start = 0;
    this.end = Math.min(this.perPage, this.total);
    this.paginatedProducts = this.products.slice(this.start, this.end);
  }

}

