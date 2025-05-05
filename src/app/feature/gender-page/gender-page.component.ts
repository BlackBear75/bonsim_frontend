import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule, NgStyle} from '@angular/common';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-gender-page',
  templateUrl: './gender-page.component.html',
  imports: [
    NgStyle,
    CommonModule,
    ProductCardComponent
  ],
  styleUrls: ['./gender-page.component.scss']
})
export class GenderPageComponent implements OnInit {
  gender: string = '';
  imageUrl: string = '';
  categories = [
    { name: 'Худі', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Футболки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Штани', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Сорочки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Куртки', imageUrl: '/assets/img/shop_10.jpg' },
    { name: 'Аксесуари', imageUrl: '/assets/img/shop_10.jpg' }
  ];
  popularProducts = [
    { name: 'Худі', price: 1200, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Футболка', price: 800, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Штани', price: 1500, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Куртка', price: 2500, imageUrl: '/assets/img/banner_img_01.jpg' }
  ];
  newProducts = [
    { name: 'Худі', price: 1200, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Футболка', price: 800, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Штани', price: 1500, imageUrl: '/assets/img/banner_img_01.jpg' },
    { name: 'Куртка', price: 2500, imageUrl: '/assets/img/banner_img_01.jpg' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gender = params.get('gender') || '';
      this.setImageUrl();
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
