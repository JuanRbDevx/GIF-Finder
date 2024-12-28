import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private urlSearch = "https://api.giphy.com/v1/gifs/search";
  private API = "tPh8GpiaNZzSss62Wz2advRIuGkdAR3s";

  constructor(
    private http: HttpClient,
  ) { }

  searchGifs(search: string, limit: number = 21, offset: number = 0, rating: string = 'g'): any {
    const url = `${this.urlSearch}?api_key=${this.API}&q=${search}&limit=${limit}&offset=${offset}&rating=${rating}&lang=es`;
    return this.http.get<any>(url);
  }
}
