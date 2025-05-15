import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import {Color, ProductType, Print, MonthlyEvent} from '../models/category-models';
import { ServerResponse } from '../models/server-response.model';
import {ErrorHandlerService} from './error-handler.service';

export type { Color, ProductType, Print };
export type { ServerResponse };

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient, private notificationService: NotificationService,private errorHandler: ErrorHandlerService) {}

  getColors(): Observable<Color[]> {
    return this.http.get<ServerResponse<Color[]>>(`${this.baseUrl}/colors`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  addColor(name: string): Observable<Color> {
    return this.http.post<ServerResponse<Color>>(`${this.baseUrl}/colors`, { name }).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  deleteColor(id: string): Observable<boolean> {
    return this.http.delete<ServerResponse<boolean>>(`${this.baseUrl}/colors/${id}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ServerResponse<ProductType[]>>(`${this.baseUrl}/product-types`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  addProductType(productType: Omit<ProductType, 'id'>): Observable<ProductType> {
    return this.http.post<ServerResponse<ProductType>>(`${this.baseUrl}/product-types`, productType).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }


  deleteProductType(id: string): Observable<boolean> {
    return this.http.delete<ServerResponse<boolean>>(`${this.baseUrl}/product-types/${id}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getPrints(): Observable<Print[]> {
    return this.http.get<ServerResponse<Print[]>>(`${this.baseUrl}/prints`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  addPrint(name: string): Observable<Print> {
    return this.http.post<ServerResponse<Print>>(`${this.baseUrl}/prints`, { name }).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  deletePrint(id: string): Observable<boolean> {
    return this.http.delete<ServerResponse<boolean>>(`${this.baseUrl}/prints/${id}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  getMonthlyEvents(): Observable<MonthlyEvent[]> {
    return this.http.get<ServerResponse<MonthlyEvent[]>>(`${this.baseUrl}/monthly-events`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  addMonthlyEvent(event: Omit<MonthlyEvent, 'id'>): Observable<MonthlyEvent> {
    return this.http.post<ServerResponse<MonthlyEvent>>(`${this.baseUrl}/monthly-events`, event).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  deleteMonthlyEvent(id: string): Observable<boolean> {
    return this.http.delete<ServerResponse<boolean>>(`${this.baseUrl}/monthly-events/${id}`).pipe(
      map(res => res.data),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

}

