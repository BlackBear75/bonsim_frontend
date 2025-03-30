import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-shop-single',
  standalone: true,
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.scss'],
  imports: [CommonModule]
})
export class ShopSingleComponent implements AfterViewInit {
  products = [
    {
      image: 'assets/img/shop_09.jpg',
      name: 'Oupidatat non',
      price: 300,
      sizes: ['M', 'L', 'XL'],
      colors: ['red', 'blue', 'black', 'light', 'green'],
      rating: 3
    },
    {
      image: 'assets/img/shop_10.jpg',
      name: 'Lorem Ipsum',
      price: 250,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'white'],
      rating: 4
    },
    {
      image: 'assets/img/shop_11.jpg',
      name: 'Lorem Ipsum',
      price: 250,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'white'],
      rating: 4
    },
    {
      image: 'assets/img/shop_08.jpg',
      name: 'Lorem Ipsum',
      price: 250,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'white'],
      rating: 4
    },
    {
      image: 'assets/img/shop_07.jpg',
      name: 'Lorem Ipsum',
      price: 250,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'white'],
      rating: 4
    },
    {
      image: 'assets/img/shop_05.jpg',
      name: 'Lorem Ipsum',
      price: 250,
      sizes: ['S', 'M', 'L'],
      colors: ['black', 'white'],
      rating: 4
    }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('Initializing Slick:', $.fn.slick);
      $('#carousel-related-product').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        dots: true,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    }, 0);
  }
}
