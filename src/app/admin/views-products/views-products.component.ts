import { Component } from '@angular/core';
import { ProductModalComponent } from '../../shared/components/product-modal/product-modal.component';
import { NgForOf } from '@angular/common';
import {Product} from '../../core/models/product.model';
import {ProductService} from '../../core/services/product.service';
import {FormsModule} from '@angular/forms';
import {Color, Print, ProductType} from '../../core/models/category-models';
import {CategoryService} from '../../core/services/category.service';

@Component({
  selector: 'app-views-products',
  templateUrl: './views-products.component.html',
  imports: [
    ProductModalComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./views-products.component.scss']
})
export class ViewsProductsComponent {

  constructor(private productService: ProductService,  private categoryService: CategoryService) {}

  products: Product[] = [];
  filteredProducts: Product[] = [];

  colors: Color[] = [];
  prints: Print[] = [];
  productTypes: ProductType[] = [];

  filter = {
    name: '',
    productType: '',
    color: '',
    print: ''
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadFilters();
  }
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
      },
      error: () => {
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  loadFilters(): void {
    this.categoryService.getColors().subscribe(c => this.colors = c);
    this.categoryService.getPrints().subscribe(p => this.prints = p);
    this.categoryService.getProductTypes().subscribe(t => this.productTypes = t);
  }
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = this.filter.name === '' || product.name.toLowerCase().includes(this.filter.name.toLowerCase());
      const matchesType = this.filter.productType === '' || product.productType === this.filter.productType;
      const matchesColor = this.filter.color === '' || product.color === this.filter.color;
      const matchesPrint = this.filter.print === '' || product.print === this.filter.print;
      return matchesName && matchesType && matchesColor && matchesPrint;
    });
  }

  resetFilters(): void {
    this.filter = {
      name: '',
      productType: '',
      color: '',
      print: ''
    };
    this.filteredProducts = [...this.products];
  }
  deleteProduct(product: Product): void {
    if (!product.id) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.filteredProducts = this.filteredProducts.filter(p => p.id !== product.id);
      },
      error: (err) => {
        console.error('Помилка при видаленні продукту:', err);
      }
    });
  }


  selectedProduct: any = null;
  showModal: boolean = false;


  openModal(product: any): void {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
