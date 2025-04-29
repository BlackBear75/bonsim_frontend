import { Component } from '@angular/core';
import {ProfileNavComponent} from '../profile-nav/profile-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileNavComponent,
    RouterOutlet
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
