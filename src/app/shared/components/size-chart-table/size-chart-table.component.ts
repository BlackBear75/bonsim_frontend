import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-size-chart-table',
  templateUrl: './size-chart-table.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
  ],
  styleUrls: ['./size-chart-table.component.css']
})
export class SizeChartTableComponent implements OnChanges {
  @Input() category: string = '';

  tableData: any[] = [];
  displayedColumns: string[] = ['size', 'chest', 'length', 'sleeve'];
  imageUrl: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.loadData();
    }
  }

  loadData() {
    switch (this.category) {
      case 'shirts-men':
        this.imageUrl = 'assets/size-charts/shirts-men.png';
        this.tableData = [
          { size: 'XXS', chest: 48, length: 61, sleeve: 45 },
          { size: 'XS', chest: 50, length: 62, sleeve: 46 },
          { size: 'S', chest: 52, length: 63, sleeve: 47 },
          { size: 'M', chest: 54, length: 64, sleeve: 48 },
          { size: 'L', chest: 56, length: 65, sleeve: 49 },
          { size: 'XL', chest: 58, length: 66, sleeve: 50 },
          { size: 'XXL', chest: 60, length: 67, sleeve: 51 },
          { size: '3XL', chest: 62, length: 68, sleeve: 52 },
          { size: '4XL', chest: 64, length: 69, sleeve: 53 },
        ];
        break;

      case 'hoodies':
        this.imageUrl = 'assets/size-charts/hoodies.png';
        this.tableData = [
          { size: 'S', chest: 52, length: 64, sleeve: 58 },
          { size: 'M', chest: 54, length: 66, sleeve: 60 },
          { size: 'L', chest: 56, length: 68, sleeve: 62 },
          { size: 'XL', chest: 58, length: 70, sleeve: 64 },
          { size: 'XXL', chest: 60, length: 72, sleeve: 66 },
        ];
        break;

      case 'tshirts':
        this.imageUrl = 'assets/size-charts/tshirts.png';
        this.tableData = [
          { size: 'S', chest: 48, length: 66, sleeve: 18 },
          { size: 'M', chest: 50, length: 68, sleeve: 19 },
          { size: 'L', chest: 52, length: 70, sleeve: 20 },
          { size: 'XL', chest: 54, length: 72, sleeve: 21 },
          { size: 'XXL', chest: 56, length: 74, sleeve: 22 },
        ];
        break;

      case 'pants-men':
        this.imageUrl = 'assets/size-charts/pants-men.png';
        this.tableData = [
          { size: 'S', waist: 76, length: 98, hip: 96 },
          { size: 'M', waist: 80, length: 100, hip: 100 },
          { size: 'L', waist: 84, length: 102, hip: 104 },
          { size: 'XL', waist: 88, length: 104, hip: 108 },
          { size: 'XXL', waist: 92, length: 106, hip: 112 },
        ];
        this.displayedColumns = ['size', 'waist', 'length', 'hip'];
        break;

      case 'pants-women':
        this.imageUrl = 'assets/size-charts/pants-women.png';
        this.tableData = [
          { size: 'XS', waist: 62, length: 94, hip: 88 },
          { size: 'S', waist: 66, length: 96, hip: 92 },
          { size: 'M', waist: 70, length: 98, hip: 96 },
          { size: 'L', waist: 74, length: 100, hip: 100 },
          { size: 'XL', waist: 78, length: 102, hip: 104 },
        ];
        this.displayedColumns = ['size', 'waist', 'length', 'hip'];
        break;

      default:
        this.imageUrl = '';
        this.tableData = [];
        this.displayedColumns = ['size', 'chest', 'length', 'sleeve'];
        break;
    }
  }

}
