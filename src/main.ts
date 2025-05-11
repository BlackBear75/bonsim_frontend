import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TemplateComponent } from './app/feature/template/template.component';
import { routes } from './app/app.routes';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(TemplateComponent, {
  providers: [
    provideRouter(routes),

  provideHttpClient(), // Налаштовуємо HttpClient для вашої програми

  ],
});
