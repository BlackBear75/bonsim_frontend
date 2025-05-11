import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {NotificationComponent} from '../../shared/components/notification/notification.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    NotificationComponent,
  ],
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent { }
