import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TemplateComponent } from './app/feature/template/template.component';
import { routes } from './app/app.routes';

bootstrapApplication(TemplateComponent, {
  providers: [
    provideRouter(routes),
  ],
});
