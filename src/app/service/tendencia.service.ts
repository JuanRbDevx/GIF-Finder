import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TendenciaService {

  private API_KEY = "tPh8GpiaNZzSss62Wz2advRIuGkdAR3s"
  private url = "https://api.giphy.com/v1/gifs"

  
  constructor(
    private http: HttpClient,
  ) { }


  getTendencia(limit: number = 21, offset: number = 0, rating: string = 'g'): Observable<any> {
    const url = `${this.url}/trending?api_key=${this.API_KEY}&limit=${limit}&offset=${offset}&rating=${rating}&bundle=messaging_non_clips`;
    return this.http.get<any>(url);
  }

}
