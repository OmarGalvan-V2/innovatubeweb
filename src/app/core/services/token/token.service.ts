import { Injectable } from '@angular/core';
import { UsuarioToken } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private  _token = 'auth_token';
  private  _informacionUsuario = 'user_data';

  public guardarToken(usuarioToken: UsuarioToken): void {
    sessionStorage.setItem(this._token, usuarioToken.token);
    sessionStorage.setItem(this._informacionUsuario, JSON.stringify({
      correo: usuarioToken.correo,
      usuario: usuarioToken.usuario,
      idUsuario : usuarioToken.idUsuario
    }));
  }

  public obtenerToken(): string | null {
    return sessionStorage.getItem(this._token);
  }

  public obtenerDatosDelUsuario(): { correo: string; usuario: string } | null {
    const data : string | null = sessionStorage.getItem(this._informacionUsuario);
    return data ? JSON.parse(data) : null;
  }

  public esValidoToken(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  public cerrarSesion(): void {
    sessionStorage.removeItem(this._token);
    sessionStorage.removeItem(this._informacionUsuario);
  }

}