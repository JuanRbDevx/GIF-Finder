import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-guest',
  imports: [RouterLink],
  templateUrl: './header-guest.component.html',
  styleUrl: './header-guest.component.css'
})
export class HeaderGuestComponent {

  @Input() isLogged: boolean = false;

  email: string = ''; // Para capturar el email
  password: string = ''; // Para capturar el password

  constructor(private authService: AuthService) { }

  login(): void {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.isLogged = true; // Actualiza el estado de isLogged
        console.log('Inicio de sesión exitoso');
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err);
      });
  }
}
