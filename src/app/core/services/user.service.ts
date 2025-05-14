import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ServerResponse} from '../models/server-response.model';
import {catchError} from 'rxjs/operators';
import {NotificationService} from './notification.service';
import {ErrorHandlerService} from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/adminuser`;

  constructor(private http: HttpClient,private notificationService: NotificationService, private errorHandler: ErrorHandlerService) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<ServerResponse<any[]>>(`${this.apiUrl}/all`).pipe(
      tap(res => {
        this.notificationService.showSuccess(res.message);
      }),
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<ServerResponse<boolean>>(`${this.apiUrl}/${userId}`).pipe(
      tap(response => {
        if (response.statusCode === 200) {
          this.notificationService.showSuccess(response.message);
        }
      }),
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
