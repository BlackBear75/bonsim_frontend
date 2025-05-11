import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationData {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationData>();
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    console.log('Sending success notification:', message);
    this.notificationSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    console.log('Sending error notification:', message);
    this.notificationSubject.next({ type: 'error', message });
  }
  showInfo(message: string) {
    this.notificationSubject.next({ type: 'info', message });
  }
}
