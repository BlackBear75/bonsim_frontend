import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from '../product-card/product-card.component';




interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  availableSizes: string[];
  availableColors: string[];
  images: string[];
  colorVariants?: Product[];
  material?: string;
  detailsAndCut?: string;
  care?: string;
  onModel?: string;
  modelHeight?: string;
  modelSize?: string;
}


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCardComponent,
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

  getTranslateY(): string {
    return `translateY(-${this.startIndex * this.thumbnailHeight}px)`;
  }

  scrollThumbnails(direction: 'up' | 'down') {
    if (!this.product?.images) return;

    // Обмежуємо кількість скролінгу на основі visibleCount
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
    return this.product?.colorVariants?.length || 0;
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

  selectSize(size: string): void {
    this.selectedSize = size;
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct(productId);
  }

  loadProduct(productId: string | null): void {
    this.product = {
      name: 'Лонгслів чорний',
      price: 800,
      description: 'Комфортний лонгслів чорного кольору, ідеальний для будь-якої погоди.',
      imageUrl: '/assets/img/shop_05.jpg',
      category: 'лонгсліви',
      availableSizes: ['S', 'M', 'L', 'XL'],
      availableColors: ['Чорний', 'Білий'],
      images: [
        '/assets/img/shop_05.jpg',
        '/assets/img/shop_02.jpg',
        '/assets/img/shop_03.jpg',
        '/assets/img/shop_04.jpg',
        '/assets/img/shop_01.jpg',
        '/assets/img/shop_03.jpg',
      ],
      colorVariants: [
        {
          name: 'Лонгслів білий',
          price: 800,
          description: 'Комфортний лонгслів білого кольору.',
          imageUrl: '/assets/img/banner_img_01.jpg',
          category: 'лонгсліви',
          availableSizes: ['S', 'M', 'L', 'XL'],
          availableColors: ['Чорний', 'Білий'],
          images: [
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg'
          ]
        },
        {
          name: 'Лонгслів синій',
          price: 850,
          description: 'Комфортний лонгслів синього кольору.',
          imageUrl: '/assets/img/banner_img_01.jpg',
          category: 'лонгсліви',
          availableSizes: ['S', 'M', 'L', 'XL'],
          availableColors: ['Чорний', 'Синій'],
          images: [
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg'
          ]
        },

        {
          name: 'Лонгслів синій',
          price: 850,
          description: 'Комфортний лонгслів синього кольору.',
          imageUrl: '/assets/img/banner_img_01.jpg',
          category: 'лонгсліви',
          availableSizes: ['S', 'M', 'L', 'XL'],
          availableColors: ['Чорний', 'Синій'],
          images: [
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg'
          ]
        },
        {
          name: 'Лонгслів синій',
          price: 850,
          description: 'Комфортний лонгслів синього кольору.',
          imageUrl: '/assets/img/banner_img_01.jpg',
          category: 'лонгсліви',
          availableSizes: ['S', 'M', 'L', 'XL'],
          availableColors: ['Чорний', 'Синій'],
          images: [
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg'
          ]
        },
        {
          name: 'Лонгслів синій',
          price: 850,
          description: 'Комфортний лонгслів синього кольору.',
          imageUrl: '/assets/img/banner_img_01.jpg',
          category: 'лонгсліви',
          availableSizes: ['S', 'M', 'L', 'XL'],
          availableColors: ['Чорний', 'Синій'],
          images: [
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg',
            '/assets/img/banner_img_01.jpg'
          ]
        }
      ],
      material: '– стрейч кулір преміум якості\n– 95% бавовна, 5% поліестер',
      detailsAndCut: '– Посадка стандарт;\n– Обстрочена горловина, плечі;\n– Кіперна лента щоб не розтягувалася горловина;',
      care: '– прання у звичайному режимі при температурі не вище 30°C, без віджиму;\n– відбілювання заборонено;\n– сушити в підвішеному стані, без застосування штучної сушки.',
      onModel: '– зріст моделі – 180 см;\n– розмір на моделі – “L”.',
      modelHeight: '180 см',
      modelSize: 'L'

    };

    // Вибір першої картинки для основного зображення
    this.selectedImage = this.product.images[0];
  }


  setMainImage(img: string): void {
    this.selectedImage = img;
  }
  addToCart(): void {}
}
