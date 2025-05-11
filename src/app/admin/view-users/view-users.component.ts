import { Component } from '@angular/core';
import {UserDetailsComponent} from '../../shared/components/user-details/user-details.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'view-users',
  templateUrl: './view-users.component.html',
  imports: [
    UserDetailsComponent,
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent {
  users = [
    {
      firstName: 'Олександр',
      lastName: 'Петренко',
      phone: '+380501112233',
      email: 'oleksandr@example.com',
      totalSpent: 1500,
      orders: [{ date: '2024-05-01', amount: 750 }]
    },
    {
      firstName: 'Марія',
      lastName: 'Ковальчук',
      phone: '+380631234567',
      email: 'maria@example.com',
      totalSpent: 2800,
      orders: [{ date: '2024-04-25', amount: 1400 }]
    }
    // додай ще користувачів
  ];

  filteredUsers = [...this.users];

  filter = {
    firstName: '',
    lastName: '',
    email: ''
  };

  selectedUser: any = null;

  selectUser(user: any) {
    this.selectedUser = user;
  }

  handleUserDelete(user: any) {
    this.users = this.users.filter(u => u !== user);
    this.applyFilter(); // оновити відфільтрований список
  }

  applyFilter() {
    const { firstName, lastName, email } = this.filter;

    this.filteredUsers = this.users.filter(user =>
      (!firstName || user.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
      (!lastName || user.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
      (!email || user.email.toLowerCase().includes(email.toLowerCase()))
    );
  }

  clearFilter() {
    this.filter = { firstName: '', lastName: '', email: '' };
    this.filteredUsers = [...this.users];
  }
}
