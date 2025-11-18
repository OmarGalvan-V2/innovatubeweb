import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth/auth.service';
import { NotificationService } from '../../../../shared/helpers/notification.service';
@Component({
  selector: 'componente-login-form',
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  public correoOUsuario : string = '';
  public password : string = '';
  private _authService : AuthService = inject(AuthService);
  private _notificacionService : NotificationService = inject(NotificationService);
  private _router = inject(Router);

  public validarDatos(): void{
    this._authService.login(this.correoOUsuario, this.password).subscribe({
      next: () => this.autenticacionExitosa(),
      error: (error) => this.errorAutenticacion(error)
    });
  }

  public autenticacionExitosa(): void {
    this._notificacionService.success('Haz inicado sesion correctamente');
    this._router.navigate(['/dashboard']);
  }

    private errorAutenticacion(error: any): void {
    const mensaje =
      error.error?.errores?.[0] ||
      error.error?.mensaje ||
      'Error al inicar sesion';

    this._notificacionService.error(mensaje);
  }
}
