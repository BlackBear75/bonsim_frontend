import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private npApiUrl = environment.npApiUrl;
  private npApiKey = environment.npApiKey;
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getSettlements(query: string): Observable<{ label: string, ref: string }[]> {
    const body = {
      apiKey: this.npApiKey,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: query,
        Limit: 10,
      },
    };

    return this.http.post<any>(this.npApiUrl, body).pipe(
      map(res =>
        res.data?.[0]?.Addresses?.map((a: any) => ({
          label: a.Present,
          ref: a.Ref,
        })) || []
      )
    );
  }

  getWarehouses(cityRef: string): Observable<{ description: string, number: string }[]> {
    const body = {
      apiKey: this.npApiKey,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: cityRef,
      },
    };

    return this.http.post<any>(this.npApiUrl, body).pipe(
      map(res =>
        res.data?.map((w: any) => ({
          description: w.Description,
          number: w.Number,
        })) || []
      )
    );
  }

  /**
   * 📤 Надіслати замовлення на бекенд
   */
  submitOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, orderData);
  }
}
