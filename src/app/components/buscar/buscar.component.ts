import { Component } from '@angular/core';
import { BuscarService } from '../../service/buscar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscar',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  searchTerm: string = ''; 
  gifs: any[] = [];  


  constructor(
    private searchService: BuscarService
  ) { }

  searchGifs(): void {
    // Verificamos si el término de búsqueda no está vacío
    if (this.searchTerm.trim()) {
      console.log('Buscando GIFs con:', this.searchTerm);
      this.searchService.searchGifs(this.searchTerm).subscribe({
        next: (response: any) => {
          this.gifs = response.data;
          console.log('GIFs encontrados:', this.gifs);
        },
        error: (error: HttpErrorResponse) => {  // Aquí especificamos el tipo `HttpErrorResponse`
          console.error('Error al buscar los GIFs:', error.message);  // Usamos el `message` para mostrar el error
        }
      });
    }
  }
}
