import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import {ServerResponse} from '../models/server-response.model';
import {AuthResponse} from '../models/auth-responce.model';

export type { ServerResponse };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(email: string, password: string): Observable<ServerResponse<AuthResponse>> {
    return this.http.post<ServerResponse<AuthResponse>>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token);
          console.log('Token saved:', localStorage.getItem('token'));
          this.authStatusSubject.next(true);
          this.notificationService.showSuccess(response.message || 'Успішний вхід');
          this.router.navigate(['/']);
        }
      })
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<ServerResponse<AuthResponse>> {
    const body = { email, password, firstName, lastName };
    return this.http.post<ServerResponse<AuthResponse>>(`${this.apiUrl}/register`, body).pipe(
      tap((response) => {
        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token);
          this.authStatusSubject.next(true);
          this.notificationService.showSuccess(response.message || 'Успішна реєстрація');
          this.router.navigate(['/']);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false);
    this.notificationService.showInfo('Успішний вихід з аккаунту');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decoded = this.decodeJwt(token);
    return decoded?.role || null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
