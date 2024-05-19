import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { Evento } from 'src/app/evento.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  eventos: Evento[] = [];
  eventosMostrados: Evento[] = [];
  provinciasDisponibles: string[] = [];
  tiposRestriccionDisponibles: string[] = [];
  tiposActividadDisponibles: string[] = [];


  currentIndex = 0;
  totalSlides = 3;
  eventosMostradosCount = 20;
  incrementoEventos = 12;
  provinciaSeleccionada: string = "Todas";
  restriccionSeleccionada: string = "Todas";
  actividadSeleccionada: string = "Todas";
  ordenSeleccionado: string = "default"; // Por defecto, sin ordenamiento
  showMenu: boolean = false;


  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  
  obtenerEventos(): void {
    this.eventosService.getEventos().subscribe(
      eventos => {
        if (eventos && eventos.length > 0) {
          this.eventos = eventos;
          this.eventosMostrados = this.eventos.slice(0, this.eventosMostradosCount);

          const provinciasSet = new Set<string>();
          const tiposRestriccionSet = new Set<string>();
          const tiposActividadSet = new Set<string>();
          this.eventos.forEach(evento => {
            provinciasSet.add(evento.provincia);
            tiposRestriccionSet.add(evento.restriccion);
            tiposActividadSet.add(evento.actividad);
          });
          this.provinciasDisponibles = Array.from(provinciasSet).sort();
          this.tiposRestriccionDisponibles = Array.from(tiposRestriccionSet).sort();
          this.tiposActividadDisponibles = Array.from(tiposActividadSet).sort();
        } else {
          console.error('Los datos recibidos no contienen eventos válidos:', eventos);
        }
      },
      error => {
        console.log('Error al cargar eventos:', error);
      }
    );
  }

  mostrarMasEventos(): void {
    this.eventosMostradosCount += this.incrementoEventos;
    this.filtrarEventos();
  }

  filtrarEventos(): void {
    let eventosFiltrados = this.eventos;
    if (this.provinciaSeleccionada !== "Todas") {
      eventosFiltrados = eventosFiltrados.filter(evento => evento.provincia === this.provinciaSeleccionada);
    }
    if (this.restriccionSeleccionada !== "Todas") {
      eventosFiltrados = eventosFiltrados.filter(evento => evento.restriccion === this.restriccionSeleccionada);
    }
    if (this.actividadSeleccionada !== "Todas") {
      eventosFiltrados = eventosFiltrados.filter(evento => evento.actividad === this.actividadSeleccionada);
    }
    this.eventosMostrados = eventosFiltrados.slice(0, this.eventosMostradosCount);
  }

  ordenarEventos(): void {
    switch (this.ordenSeleccionado) {
      case "alto":
        this.eventosMostrados.sort((a, b) => b.menor_precio - a.menor_precio);
        break;
      case "bajo":
        this.eventosMostrados.sort((a, b) => a.menor_precio - b.menor_precio);
        break;
      default:
        // Si no se selecciona ningún orden, restaura el orden original
        this.eventosMostrados = this.eventos.slice(0, this.eventosMostradosCount);
    }
  }
  
  limpiarFiltros(): void {
    this.provinciaSeleccionada = "Todas";
    this.restriccionSeleccionada = "Todas";
    this.actividadSeleccionada = "Todas";
    this.ordenSeleccionado = "default";
  
    // Aplicar los filtros y orden predeterminados
    this.filtrarEventos();
    this.ordenarEventos();
  }
  



  


  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalSlides - 1;
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const carouselItem = document.querySelector('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselItem && carouselInner) {
      const itemWidth = carouselItem.clientWidth;
      const offset = -this.currentIndex * itemWidth;
      carouselInner.setAttribute('style', `transform: translateX(${offset}px)`);
    }
  }



}
