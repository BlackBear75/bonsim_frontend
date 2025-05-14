import {Component, OnInit} from '@angular/core';
import {UserDetailsComponent} from '../../shared/components/user-details/user-details.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../core/services/user.service';
import { Client } from '../../core/models/client.model';

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
export class ViewUsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: Client[] = [];
  filteredUsers: Client[] = [];

  filter = {
    firstName: '',
    lastName: '',
    email: ''
  };

  selectedUser: Client | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (err) => {
        console.error('Помилка при завантаженні користувачів:', err);
      }
    });
  }


  selectUser(user: Client) {
    this.selectedUser = user;
  }

  handleUserDelete(user: Client) {
    if (!user.id) return;

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== user.id);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Помилка при видаленні користувача:', err);
      }
    });
  }

  applyFilter() {
    const { firstName, lastName, email } = this.filter;
    this.filteredUsers = this.users.filter(user =>
      (!firstName || user.firstName?.toLowerCase().includes(firstName.toLowerCase())) &&
      (!lastName || user.lastName?.toLowerCase().includes(lastName.toLowerCase())) &&
      (!email || user.email?.toLowerCase().includes(email.toLowerCase()))
    );
  }

  clearFilter() {
    this.filter = { firstName: '', lastName: '', email: '' };
    this.filteredUsers = [...this.users];
  }
}
