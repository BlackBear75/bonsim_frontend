import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ConfirmDeleteModalComponent
  ],
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  selectedCategory: string = '';
  selectedItems: string[] = [];
  newItem: string = '';
  itemToDelete: number | null = null;  // Для зберігання індексу елемента, який буде видалено
  isDeleteModalVisible: boolean = false;  // Для контролю видимості модального вікна

  // Списки для кожної категорії
  colors: string[] = ['Червоний', 'Синій', 'Зелений'];
  types: string[] = ['Футболка чоловіча', 'Футболка оверсайз унісекс'];
  prints: string[] = ['Атаки Титанів', 'Логотип компанії'];

  constructor(private dialog: MatDialog) {}

  // Вибір категорії
  showCategory(category: string) {
    this.selectedCategory = category;
    this.updateSelectedItems(category);
  }

  // Оновлення елементів для вибраної категорії
  updateSelectedItems(category: string) {
    if (category === 'color') {
      this.selectedItems = this.colors;
    } else if (category === 'type') {
      this.selectedItems = this.types;
    } else if (category === 'print') {
      this.selectedItems = this.prints;
    }
  }

  // Додавання нового елемента
  openConfirmDialog(itemType: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewItem(itemType);
      }
    });
  }

  // Функція для додавання нового елементу в категорію
  addNewItem(itemType: string) {
    if (this.newItem.trim()) {
      if (itemType === 'color') {
        this.colors.push(this.newItem);
      } else if (itemType === 'type') {
        this.types.push(this.newItem);
      } else if (itemType === 'print') {
        this.prints.push(this.newItem);
      }
      this.newItem = '';  // Очищуємо поле після додавання
    }
  }

  // Відкриття модального вікна для підтвердження видалення
  openDeleteModal(index: number) {
    this.itemToDelete = index;
    this.isDeleteModalVisible = true; // Відкриваємо модальне вікно
  }

  // Підтвердження видалення
  onDeleteConfirmed() {
    if (this.itemToDelete !== null) {
      if (this.selectedCategory === 'color') {
        this.colors.splice(this.itemToDelete, 1);
      } else if (this.selectedCategory === 'type') {
        this.types.splice(this.itemToDelete, 1);
      } else if (this.selectedCategory === 'print') {
        this.prints.splice(this.itemToDelete, 1);
      }
    }
    this.isDeleteModalVisible = false;  // Закриваємо модальне вікно
    this.itemToDelete = null;  // Очищаємо індекс елемента, який був видалений
  }

  // Скасування видалення
  onDeleteCancelled() {
    this.isDeleteModalVisible = false;  // Закриваємо модальне вікно
    this.itemToDelete = null;  // Очищаємо індекс
  }
}
