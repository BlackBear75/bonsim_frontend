import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ConfirmDeleteModalComponent} from '../confirm-delete-modal/confirm-delete-modal.component';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  imports: [
    ConfirmDeleteModalComponent,
    CurrencyPipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  @Output() deleteUser = new EventEmitter<any>();

  isConfirmVisible = false;

  openConfirmModal() {
    this.isConfirmVisible = true;
  }

  handleConfirm() {
    this.isConfirmVisible = false;
    this.deleteUser.emit(this.user); // відправити дані користувача
    this.close.emit(); // закрити картку
  }

  handleCancel() {
    this.isConfirmVisible = false;
  }
}
