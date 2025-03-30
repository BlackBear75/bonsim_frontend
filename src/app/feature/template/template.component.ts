import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeaderTopComponent } from '../../shared/components/header-top/header-top.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderTopComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent { }
