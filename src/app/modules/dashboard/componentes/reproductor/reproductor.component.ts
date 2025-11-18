import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YouTubeVideo } from '../../../../core/interfaces/youtube.interface';

@Component({
  selector: 'componente-reproductor',
  imports: [CommonModule],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {
  @Input() video: YouTubeVideo | null = null;
  @Output() onCerrar = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  get videoUrl(): SafeResourceUrl {
    if (!this.video) return '';
    const url = `https://www.youtube.com/embed/${this.video.id.videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public cerrar(): void {
    this.onCerrar.emit();
  }
}