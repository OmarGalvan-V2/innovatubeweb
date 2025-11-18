import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { YouTubeVideo } from '../../../../core/interfaces/youtube.interface';

@Component({
  selector: 'componente-favoritos',
  imports: [CommonModule, CardModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  @Input() favoritos: YouTubeVideo[] = [];
  @Output() onQuitarFavorito = new EventEmitter<string>();
  @Output() onReproducir = new EventEmitter<YouTubeVideo>();

  public quitarFavorito(idVideo: string): void {
    this.onQuitarFavorito.emit(idVideo);
  }

  public reproducirVideo(video: YouTubeVideo): void {
    this.onReproducir.emit(video);
  }
}