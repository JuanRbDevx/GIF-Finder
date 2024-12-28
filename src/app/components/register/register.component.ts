import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = {
    id: 0,
    email: '',
    password: '',
    username: '',
    name: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    this.authService.register(this.user.email, this.user.password, this.user.name, this.user.username)
      .then(() => {
        const userId = this.authService.getUserId();
        console.log('ID del usuario logueado:', userId);
        console.log('Inicio de sesión exitoso');
        alert('Cuenta creada, Bienvenido!');
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err);
      });
  }

}
