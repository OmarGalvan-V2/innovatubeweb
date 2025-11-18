import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap } from 'rxjs';
import { Usuario, UsuarioToken } from '../../interfaces/usuario.interface';
import { environment } from '../../../enviroments/enviroments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrlUsuario : string = environment.ENDPOINT_PERSONAL; 
  private _http : HttpClient = inject(HttpClient);
  private _tokenService = inject(TokenService);

  public login(correoOUsuario: string, password: string): Observable<UsuarioToken> {
    const loginRequest = {
      correoOUsuario: correoOUsuario,
      password: password
    };

    return this._http.post<UsuarioToken>(`${this._baseUrlUsuario}/login`, loginRequest).pipe(
      tap((usuarioToken: UsuarioToken) => {
        this._tokenService.guardarToken(usuarioToken);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public registrarUsuarioService(usuario: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(`${this._baseUrlUsuario}/crearUsuario`, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    this._tokenService.cerrarSesion();
  }

  public isAuthenticated(): boolean {
    return this._tokenService.esValidoToken();
  }
}