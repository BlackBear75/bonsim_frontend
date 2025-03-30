import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { }
