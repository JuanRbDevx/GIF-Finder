import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { User } from '../../interfaces/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-auth',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header-auth.component.html',
  styleUrl: './header-auth.component.css'
})
export class HeaderAuthComponent {

  user: User = {
    id: 0,
    email: '',
    password: '',
    username: '',
    name: ''
  }

  @Input() isLogged: boolean = false;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.loadUserData();
  }

  logout(): void {
    this.authService.logout();
    this.isLogged = false; // Actualiza el estado de isLogged
  }

  loadUserData(): void {
    const userData = this.authService.getUserData();
    console.log('Datos del usuario recuperados:', userData);  // Agregar log para depuración

    if (userData) {
      this.user.name = userData.name || '';
      this.user.username = userData.username || '';
      this.user.email = userData.email || '';
    }
  }

}
