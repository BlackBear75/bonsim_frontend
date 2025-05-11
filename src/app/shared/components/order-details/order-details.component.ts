import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'order-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  @Input() order: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onSave() {
    this.save.emit(this.order);
  }

  onClose() {
    this.close.emit();
  }
}
