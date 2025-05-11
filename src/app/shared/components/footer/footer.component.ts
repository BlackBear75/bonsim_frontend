import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
