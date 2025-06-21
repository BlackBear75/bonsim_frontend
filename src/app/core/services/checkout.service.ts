import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, map, tap} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private npApiUrl = environment.npApiUrl;
  private npApiKey = environment.npApiKey;
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSettlements(query: string): Observable<{ label: string; ref: string }[]> {
    return this.http
      .post<any>(`${this.backendUrl}/nova-poshta/search-settlements-general`, {
        cityName: query,
      })
      .pipe(
        tap(res => console.log('Nova Poshta search-settlements response:', res)),
        map(
          res =>
            res.data?.[0]?.Addresses?.map((a: any) => ({
              label: a.Present,
              ref: a.DeliveryCity,
            })) || []
        )
      );
  }

  getWarehouses(cityRef: string): Observable<{ description: string, number: string }[]> {
    return this.http.post<any>(
      `${this.backendUrl}/nova-poshta/get-warehouses`,
      JSON.stringify(cityRef),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    ).pipe(
      map(res =>
        res.data?.map((w: any) => ({
          description: w.Description,
          number: w.Number,
        })) || []
      )
    );
  }


  submitOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/order/create-order`, orderData);
  }



}
