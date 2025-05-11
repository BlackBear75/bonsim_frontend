import { Component } from '@angular/core';
import {NotificationData, NotificationService} from '../../../core/services/notification.service';
import {CommonModule, NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [
    NgIf,
    NgClass,
    CommonModule
  ],
  standalone: true
})
export class NotificationComponent {
  visible = false;
  message = '';
  type: "success" | "error" | "info" = 'success';

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe((data: NotificationData) => {
      this.showNotification(data.type, data.message);
    });
  }


  showNotification(type: "success" | "error" | "info", message: string) {
    this.type = type;
    this.message = message;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }


  close() {
    this.visible = false;
  }
}
