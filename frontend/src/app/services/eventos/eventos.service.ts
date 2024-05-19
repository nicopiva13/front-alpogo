import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/evento.model'; // Asegúrate de importar la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> { // Asegúrate de que el tipo devuelto sea un array de Evento
    return this.http.get<Evento[]>('assets/eventos.json');
  }

}
