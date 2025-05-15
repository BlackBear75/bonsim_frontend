import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule, NgStyle} from '@angular/common';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';
import {ProductService} from '../../core/services/product.service';

@Component({
  selector: 'app-gender-page',
  templateUrl: './gender-page.component.html',
  imports: [
    NgStyle,
    CommonModule,
    ProductCardComponent,
    RouterLink
  ],
  styleUrls: ['./gender-page.component.scss']
})
export class GenderPageComponent implements OnInit {
  gender: string = '';
  imageUrl: string = '';
  categories = [
    { name: 'лонгсліви', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Футболки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Штани', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Сорочки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Куртки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Аксесуари', imageUrl: '/assets/img/shop_10.jpg' }
  ];

  popularProducts: any[] = [];
  newProducts: any[] = [];
  constructor(private route: ActivatedRoute,  private productService: ProductService) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.gender = data['gender'] || '';
      console.log(this.gender);
      this.setImageUrl();
      this.loadProducts();
    });
  }

  loadProducts() {
    console.log(this.gender)
    this.productService.getPopularProducts().subscribe(products => {
      this.popularProducts = products;
    });


    this.productService.getNewBuGenderProducts(this.gender).subscribe(products => {
      this.newProducts = products;
    });

  }


  setImageUrl() {
    if (this.gender === 'men') {
      this.imageUrl = '/assets/img/shop_10.jpg';
    } else if (this.gender === 'women') {
      this.imageUrl = '/assets/img/shop_11.jpg';
    } else {
      this.imageUrl = '/assets/img/default.jpg';
    }
  }
}
