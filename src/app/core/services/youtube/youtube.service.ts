import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { YouTubeSearchResponse } from '../../interfaces/youtube.interface';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private _apiKey = environment.YOUTUBE_API;
  private _baseUrl = environment.ENDPOINT_YOUTUBE;
  private _http : HttpClient = inject(HttpClient);

  public buscarVideosPorTextoService(query: string): Observable<YouTubeSearchResponse> {
    let params = new HttpParams()
      .set('part', 'snippet') // Queremos el snippet para obtener título, descripción, etc.
      .set('q', query) // El término de búsqueda.
      .set('type', 'video') // Especificamos que solo queremos videos.
      .set('maxResults', '10') // Limitamos los resultados a 10.
      .set('key', this._apiKey);

    return this._http.get<YouTubeSearchResponse>(`${this._baseUrl}search`, { params });
  }
}
