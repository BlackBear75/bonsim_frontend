import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CurrencyPipe } from '@angular/common'; // Імпортуємо CurrencyPipe

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CurrencyPipe, // Додаємо CurrencyPipe в providers
  ]
};
