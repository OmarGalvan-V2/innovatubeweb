import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YoutubeService } from '../../../../core/services/youtube/youtube.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../../core/services/token/token.service';
import { YouTubeVideo } from '../../../../core/interfaces/youtube.interface';


@Component({
  selector: 'componente-busqueda',
  imports: [FormsModule, CommonModule, CardModule, ButtonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  
  public videos: YouTubeVideo[] = [];
  public errorMessage: string = '';
  private _youtubeService : YoutubeService = inject(YoutubeService);
  @Input() buscarVideo: string = '';
  @Input() esFavorito!: (videoId: string) => boolean;
  @Output() onFavorito = new EventEmitter<YouTubeVideo>();
  @Output() onQuitarFavorito = new EventEmitter<string>();
  @Output() onReproducir = new EventEmitter<YouTubeVideo>();

  public buscarVideosPorTexto(): void {
    this.videos = [];
    this.errorMessage = '';
    
    if (this.buscarVideo.trim()) {
      this._youtubeService.buscarVideosPorTextoService(this.buscarVideo).subscribe({
        next: (response) => {
          this.videos = response?.items || [];
        },
        error: () => {
          this.errorMessage = 'No se pudieron cargar los videos. Inténtalo de nuevo más tarde.';
        }
      });
    }
  }

  public toggleFavorito(idVideo: string): void {
    if (this.esFavorito(idVideo)) {
      this.onQuitarFavorito.emit(idVideo);
    } else {
      const video = this.videos.find(v => v.id.videoId === idVideo);
      if (video) {
        this.onFavorito.emit(video);
      }
    }
  }

  public reproducirVideo(video: YouTubeVideo): void {
    this.onReproducir.emit(video);
  }

}
