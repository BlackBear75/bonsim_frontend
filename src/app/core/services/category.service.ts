import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import {NotificationService} from './notification.service';
import { Color, ProductType, Print } from '../models/CategoryModels';

export type { Color, ProductType, Print };
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  // Colors
  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.baseUrl}/colors`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addColor(name: string): Observable<Color> {
    return this.http.post<Color>(`${this.baseUrl}/colors`, { name }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteColor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/colors/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Product types
  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.baseUrl}/product-types`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addProductType(name: string): Observable<ProductType> {
    return this.http.post<ProductType>(`${this.baseUrl}/product-types`, { name }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteProductType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product-types/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Prints
  getPrints(): Observable<Print[]> {
    return this.http.get<Print[]>(`${this.baseUrl}/prints`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addPrint(name: string): Observable<Print> {
    return this.http.post<Print>(`${this.baseUrl}/prints`, { name }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deletePrint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/prints/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
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
