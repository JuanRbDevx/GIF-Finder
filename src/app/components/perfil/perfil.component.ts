import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-perfil',
  imports: [
    CommonModule,

  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  user: User = {
    id: 0,
    email: '',
    password: '',
    username: '',
    name: ''
  }


  ngOnInit(): void {
    this.loadUserData();
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  closeSesion() {
    this.authService.logout()
      .then(() => {
        console.log('Sesión cerrada');
        alert('Sesión cerrada correctamente');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }


  onDeleteUser() {
    this.authService.deleteUser()
      .then(() => {
        console.log('Usuario eliminado correctamente');
        alert('Usuario eliminado correctamente, hasta luego');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
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
