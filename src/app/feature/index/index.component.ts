import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NotificationComponent} from '../../shared/components/notification/notification.component';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  imports: [
    RouterLink,
    NotificationComponent,
    RouterOutlet
  ],
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
