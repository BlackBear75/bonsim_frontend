import { Component } from '@angular/core';
import {SizeChartTableComponent} from '../../shared/components/size-chart-table/size-chart-table.component';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-size-chart',
  templateUrl: './size-chart.component.html',
  imports: [
    SizeChartTableComponent,
    TitleCasePipe,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./size-chart.component.scss']
})
export class SizeChartComponent {
  categories: string[] = ['Сорочки', 'Одяг', 'Штани'];

  subcategoriesMap: { [key: string]: { label: string, value: string }[] } = {
    'Сорочки': [
      { label: 'Чоловічі сорочки', value: 'shirts-men' },
      { label: 'Жіночі сорочки', value: 'shirts-women' }
    ],
    'Одяг': [
      { label: 'Худі', value: 'hoodies' },
      { label: 'Футболки', value: 'tshirts' }
    ],
    'Штани': [
      { label: 'Чоловічі штани', value: 'pants-men' },
      { label: 'Жіночі штани', value: 'pants-women' }
    ]
  };

  selectedCategory: string = 'Сорочки';
  selectedSubcategoryIndex: number = 0;
  selectedSubcategory: string = this.subcategoriesMap[this.selectedCategory][0].value;

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.selectedSubcategoryIndex = 0;
    this.selectedSubcategory = this.subcategoriesMap[category][0].value;
  }

  onSubcategoryChange(index: number) {
    this.selectedSubcategoryIndex = index;
    this.selectedSubcategory = this.subcategoriesMap[this.selectedCategory][index].value;
  }


}
