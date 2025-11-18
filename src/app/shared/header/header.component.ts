import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';
import { AuthService } from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public usuario: string = '';
  public correo : string = '';
  private _tokenService = inject(TokenService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public ngOnInit(): void {
    const datosUsuario = this._tokenService.obtenerDatosDelUsuario();
    this.usuario = datosUsuario?.usuario || '';
    this.correo = datosUsuario?.correo || '';
  }

  public cerrarSesion(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}