import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {map, Observable, tap} from 'rxjs';
import {NotificationService} from './notification.service';
import {AuthResponse} from '../models/auth-responce.model';
import {ServerResponse} from '../models/server-response.model';
import {ErrorHandlerService} from './error-handler.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient,private notificationService: NotificationService,  private errorHandler: ErrorHandlerService) {}

  addProduct(formData: FormData): Observable<any> {
    return this.http.post<ServerResponse<boolean>>(`${this.apiUrl}/add`, formData).pipe(
      tap(response => {
        if (response.statusCode === 201) {
          this.notificationService.showSuccess(response.message);
        }
      }),
      catchError(error => this.errorHandler.handleError(error))
    );
  }


  getAllProducts(): Observable<any[]> {
    return this.http.get<ServerResponse<any[]>>(`${this.apiUrl}/all`).pipe(
      tap(res => {
        this.notificationService.showSuccess(res.message);
      }),
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<ServerResponse<boolean>>(`${this.apiUrl}/product/${id}`).pipe(
      tap(response => {
        if (response.statusCode === 200) {
          this.notificationService.showSuccess(response.message);
        }
      }),
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
