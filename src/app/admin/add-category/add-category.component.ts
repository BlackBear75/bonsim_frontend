import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import {CategoryService, Color, Print, ProductType} from '../../core/services/category.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {MonthlyEvent} from '../../core/models/category-models';


type CategoryItem = Color | ProductType | Print | MonthlyEvent;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  imports: [
    ConfirmDeleteModalComponent,
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  selectedCategory: string = '';
  selectedItems: CategoryItem[] = [];
  newItem: string = '';
  itemToDelete: string | null = null;
  newProductType: Omit<ProductType, 'id'> = {
    productTypeName: '',
    material: '',
    fitDetails: '',
    care: '',
    modelInfo: '',
    gender: 'Unisex'
  };

  monthlyEvents: MonthlyEvent[] = [];
  newMonthlyEvent: { name: string; creationDate: string; endDate: string } = {
    name: '',
    creationDate: '',
    endDate: ''
  }



  splitBySemicolon(text: string): string[] {
    return text.split(';').map(s => s.trim()).filter(s => s.length > 0);
  }

  isDeleteModalVisible: boolean = false;

  isColor(item: CategoryItem): item is Color {
    return (item as Color).colorName !== undefined;
  }

  isProductType(item: CategoryItem): item is ProductType {
    return (item as ProductType).productTypeName !== undefined;
  }


  isPrint(item: CategoryItem): item is Print {
    return (item as Print).printName !== undefined;
  }

  isMonthlyEvent(item: CategoryItem): item is MonthlyEvent {
    return (item as MonthlyEvent).name !== undefined;
  }


  colors: Color[] = [];
  productTypes: ProductType[] = [];
  prints: Print[] = [];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getColors().subscribe(colors => {
      this.colors = colors;
      if (this.selectedCategory === 'color') {
        this.updateSelectedItems('color');
      }
    });

    this.categoryService.getProductTypes().subscribe(types => {
      this.productTypes = types;
      if (this.selectedCategory === 'type') {
        this.updateSelectedItems('type');
      }
    });

    this.categoryService.getPrints().subscribe(prints => {
      this.prints = prints;
      if (this.selectedCategory === 'print') {
        this.updateSelectedItems('print');
      }
    });
    this.categoryService.getMonthlyEvents().subscribe(events => {
      this.monthlyEvents = events;
      console.log(events);
      if (this.selectedCategory === 'monthlyEvent') {
        this.updateSelectedItems('monthlyEvent');
      }
    });
  }

  showCategory(category: string) {
    this.selectedCategory = category;
    this.updateSelectedItems(category);
  }

  updateSelectedItems(category: string) {
    if (category === 'color') {
      this.selectedItems = this.colors;
    } else if (category === 'type') {
      this.selectedItems = this.productTypes;
    } else if (category === 'print') {
      this.selectedItems = this.prints;
    } else if (category === 'monthlyEvent') {
      this.selectedItems = this.monthlyEvents;
    }
  }


  openConfirmDialog(itemType: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { itemType: itemType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewItem(itemType);
      }
    });
  }


  addNewItem(itemType: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    if (itemType.trim()) {

      if (itemType === 'color') {
        this.categoryService.addColor(this.newItem).subscribe(color => {
          this.colors.push(color);
          this.loadCategories();
          this.newItem = '';
        });
      } else if (itemType === 'type') {

        this.categoryService.addProductType(this.newProductType).subscribe(type => {
          this.productTypes.push(type);
          this.loadCategories();
          this.newProductType = {
            productTypeName: '',
            material: '',
            fitDetails: '',
            care: '',
            modelInfo: '',
            gender: "Unisex"
          };
        });

      } else if (itemType === 'print') {
        this.categoryService.addPrint(this.newItem).subscribe(print => {
          this.prints.push(print);
          this.loadCategories();
          this.newItem = '';
        });
      }
      if (itemType === 'monthlyEvent') {
        if (!this.newMonthlyEvent.name || !this.newMonthlyEvent.creationDate || !this.newMonthlyEvent.endDate) {
          alert('Всі поля мають бути заповнені!');
          return;
        }

        this.categoryService.addMonthlyEvent(this.newMonthlyEvent).subscribe(event => {
          this.monthlyEvents.push(event);
          this.loadCategories();
          this.newMonthlyEvent = { name: '', creationDate: '', endDate: '' };
        });
      }
    } else {
      console.log(itemType)
      alert('Поле не може бути порожнім');
    }
  }



  openDeleteModal(id: string) {
    this.itemToDelete = id;
    console.log(this.itemToDelete);
    this.isDeleteModalVisible = true;
  }

  onDeleteConfirmed() {
    if (this.itemToDelete) {
      if (this.selectedCategory === 'color') {
        this.categoryService.deleteColor(this.itemToDelete).subscribe(() => {
          this.loadCategories();
        });
      } else if (this.selectedCategory === 'type') {
        this.categoryService.deleteProductType(this.itemToDelete).subscribe(() => {
          this.loadCategories();
        });
      } else if (this.selectedCategory === 'print') {
        this.categoryService.deletePrint(this.itemToDelete).subscribe(() => {
          this.loadCategories();
        });
      }
      if (this.selectedCategory === 'monthlyEvent') {
        this.categoryService.deleteMonthlyEvent(this.itemToDelete).subscribe(() => {
          this.loadCategories();
        });
      }
    }

    this.isDeleteModalVisible = false;
    this.itemToDelete = null;
  }

  onDeleteCancelled() {
    this.isDeleteModalVisible = false;
    this.itemToDelete = null;
  }
}
