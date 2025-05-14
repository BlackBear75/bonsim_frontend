import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    ConfirmDeleteModalComponent
  ]
})
export class ProductModalComponent {
  @Input() isVisible: boolean = false;
  @Input() product: any;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<any> = new EventEmitter();

  isConfirmVisible: boolean = false;
  largeImage: string = '';
  closeModal(): void {
    this.close.emit();
  }
  openLargeImage(image: string): void {
    this.largeImage = image;
  }

  closeLargeImage(): void {
    this.largeImage = '';
  }
  openConfirmModal(): void {
    this.isConfirmVisible = true;
  }

  handleConfirm(): void {
    this.isConfirmVisible = false;
    this.deleteProduct.emit(this.product);
    this.closeModal();
  }

  handleCancel(): void {
    this.isConfirmVisible = false;
  }
}
