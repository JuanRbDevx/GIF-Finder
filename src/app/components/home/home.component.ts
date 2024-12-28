import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TendenciaService } from '../../service/tendencia.service';
import { HeaderComponent } from "../header/header.component";
import { BuscarComponent } from "../buscar/buscar.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BuscarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  gifs: any[] = [];

  constructor(
    private tendenciaService: TendenciaService
  ) { }

  ngOnInit() {
    this.getTendencia();
  }

  private getTendencia() {
    this.tendenciaService.getTendencia().subscribe((response) => {
      this.gifs = response.data;
    });
  }
}
