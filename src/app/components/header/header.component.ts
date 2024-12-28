import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

import { CommonModule } from '@angular/common';
import { HeaderAuthComponent } from '../header-auth/header-auth.component';
import { HeaderGuestComponent } from '../header-guest/header-guest.component';
@Component({
  selector: 'app-header',
  imports: [HeaderAuthComponent, HeaderGuestComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.isLogged = this.authService.isLoggedIn();
  }
}
