import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from '../product-card/product-card.component';
import {ProductService} from '../../../core/services/product.service';
import {Product} from '../../../core/models/product.model';
import {CartService} from '../../../core/services/cart.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    RouterLink,
  ],

  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  allSizes: string[] = [ '2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
  selectedSize: string = '';
  activeTab: string = 'description';
  startIndex = 0;
  visibleCount = 4;
  thumbnailHeight = 160 + 10;
  colorVariants: any[] = [];
  productId!: string;
  private sizePriceOffsets: { [size: string]: number } = {
    '2XS': -100,
    'XS': -80,
    'S': -50,
    'M': -30,
    'L': 0,
    'XL': 50,
    '2XL': 100,
    '3XL': 130,
    '4XL': 150,
  };
  currentPrice: number = 0;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')!;
      console.log('Loaded product id:', this.productId);
       this.loadProduct(this.productId);
    });
  }
  getLines(text?: string): string[] {
    return text ? text.split(';').map(line => line.trim()).filter(line => line.length > 0) : [];
  }




  getTranslateY(): string {
    return `translateY(-${this.startIndex * this.thumbnailHeight}px)`;
  }

  scrollThumbnails(direction: 'up' | 'down') {
    if (!this.product?.images) return;

    if (direction === 'up' && this.startIndex > 0) {
      this.startIndex--;
    } else if (
      direction === 'down' &&
      this.startIndex + this.visibleCount < this.product.images.length
    ) {
      this.startIndex++;
    }
  }


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  showArrows = false;
  currentIndex = 0;

  get itemsCount(): number {
    return this.product?.images?.length || 0;
  }
  scrollToIndex(index: number) {
    const container = this.carousel.nativeElement;
    const items = container.querySelectorAll('app-product-card');
    const item = items[index];

    if (item) {
      const offsetLeft = (item as HTMLElement).offsetLeft;
      container.scrollTo({ left: offsetLeft, behavior: 'smooth' });
      this.currentIndex = index;
    }
  }

  scrollRight() {
    const container = this.carousel.nativeElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft === maxScrollLeft) {
      container.scrollLeft = 0;
      this.currentIndex = 0;
    } else {
      const nextIndex = (this.currentIndex + 1) % this.itemsCount;
      this.scrollToIndex(nextIndex);
    }
  }

  scrollLeft() {
    const container = this.carousel.nativeElement;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft === 0) {
      container.scrollLeft = maxScrollLeft;
      this.currentIndex = this.itemsCount - 1;
    } else {
      const prevIndex = (this.currentIndex - 1 + this.itemsCount) % this.itemsCount;
      this.scrollToIndex(prevIndex);
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.updatePrice();
  }

  updatePrice() {
    if (this.product) {
      const basePrice = this.product.price; // ціна для L
      const offset = this.sizePriceOffsets[this.selectedSize] ?? 0;
      this.currentPrice = basePrice + offset;
    }
  }
  loadProduct(productId: string | null): void {
    if (!productId) return;

    this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.selectedImage = product.images[0];

        this.productService.getColorVariants(product.id).subscribe({
          next: (variants) => {
            this.colorVariants = variants;
          }
        });
        this.selectedSize = 'L';
        this.updatePrice();
      }
    });
  }



  setMainImage(img: string): void {
    this.selectedImage = img;
  }
  addToCart(): void {
    if (this.product && this.selectedSize) {
      this.cartService.addItem(this.product, this.selectedSize, this.currentPrice);
    }
  }

}
