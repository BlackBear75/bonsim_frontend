import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): Observable<never> {
    let message = 'Щось пішло не так!';

    if (error.error && error.error.message) {
      message = error.error.message;
    } else if (error.status === 0) {
      message = 'Немає з\'єднання з сервером!';
    } else if (error.status === 404) {
      message = 'Не знайдено ресурс!';
    } else if (error.status === 500) {
      message = 'Внутрішня помилка сервера!';
    }

    this.notificationService.showError(message);
    return throwError(() => new Error(message));
  }
}
