import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  onLogin(): void {
    this.authService.login(this.email, this.password)
      .then(() => {
        const userId = this.authService.getUserId();
        console.log('ID del usuario logueado:', userId);
        console.log('Inicio de sesión exitoso');
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err);
      });
  }
}
