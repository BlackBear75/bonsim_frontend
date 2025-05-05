import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
