import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getProductsByGender(gender: string): Observable<any[]> {
    console.log(gender);
    return this.http.get<ServerResponse<any[]>>(`${this.apiUrl}/by-gender/${gender}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getProductsByCategory(gender?: string, productType?: string): Observable<any> {
    let params = new HttpParams();
    if (gender) params = params.set('gender', gender);
    if (productType) params = params.set('productType', productType);

    return this.http.get<ServerResponse<any>>(`${this.apiUrl}/get-by-category`, { params }).pipe(
      map(response => {
        if (response.statusCode === 202) {
          return response.data;
        } else {
          this.notificationService.showError(response.message || 'Помилка завантаження продуктів');
          return [];
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
  getPopularProducts(): Observable<any[]> {
    return this.http.get<ServerResponse<any[]>>(`${this.apiUrl}/popular`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getNewBuGenderProducts(gender:string): Observable<any[]> {
    return this.http.get<ServerResponse<any[]>>(`${this.apiUrl}/new-by-gender/${gender}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }


  getColorVariants(id: string): Observable<any> {
    return this.http.get<ServerResponse<any>>(`${this.apiUrl}/color-variants/${id}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }


  getProductById(id: string): Observable<any> {
    return this.http.get<ServerResponse<any>>(`${this.apiUrl}/${id}`).pipe(
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
