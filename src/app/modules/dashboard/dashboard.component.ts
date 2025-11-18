import { Component, ViewChild, OnInit } from '@angular/core';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { YouTubeVideo } from '../../core/interfaces/youtube.interface';
import { ReproductorComponent } from './componentes/reproductor/reproductor.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  imports: [BusquedaComponent, CommonModule, ButtonModule, InputTextModule, FormsModule, FavoritosComponent, ReproductorComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    public anioActual : number = new Date().getFullYear();
    public buscarVideo: string = '';
    public seleccionBoton : Boolean = true;
    public favoritos: YouTubeVideo[] = [];
    public videoSeleccionado: YouTubeVideo | null = null;
    public mostrarReproductor: boolean = false;
    @ViewChild(BusquedaComponent) _componenteBusqueda!: BusquedaComponent;

    ngOnInit(): void {
      this.cargarFavoritos();
    }

    public agregarFavorito(video: YouTubeVideo): void {
      if (!this.favoritos.find(fav => fav.id.videoId === video.id.videoId)) {
        this.favoritos.push(video);
        this.guardarFavoritos();
      }
    }

    private cargarFavoritos(): void {
      const favoritosGuardados = sessionStorage.getItem('favoritos');
      if (favoritosGuardados) {
        this.favoritos = JSON.parse(favoritosGuardados);
      }
    }

    private guardarFavoritos(): void {
      sessionStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }

    public esFavorito(videoId: string): boolean {
      return this.favoritos.some(fav => fav.id.videoId === videoId);
    }

    public quitarFavorito(videoId: string): void {
      this.favoritos = this.favoritos.filter(fav => fav.id.videoId !== videoId);
      this.guardarFavoritos();
    }

  public busqueda(): void {
    this.seleccionBoton = true;
  }

  public botonfavorito(): void {
    this.seleccionBoton = false;
  }

  public buscarVideosPorTexto(): void {
    this.seleccionBoton = true;
    if (this._componenteBusqueda) {
      this._componenteBusqueda.buscarVideosPorTexto();
    }
  }

  public reproducirVideo(video: YouTubeVideo): void {
    this.videoSeleccionado = video;
    this.mostrarReproductor = true;
  }

  public cerrarReproductor(): void {
    this.mostrarReproductor = false;
    this.videoSeleccionado = null;
  }

}