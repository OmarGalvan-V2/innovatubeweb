import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

import { Usuario } from '../../../../core/interfaces/usuario.interface';
import { AuthService } from '../../../../core/services/Auth/auth.service';
import { NotificationService } from '../../../../shared/helpers/notification.service';
import { CaptchaComponent } from '../../../../shared/captcha/captcha.component';

@Component({
  selector: 'componente-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,
    CaptchaComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  private _formulario = inject(FormBuilder);
  private _autenticadorService = inject(AuthService);
  private _notificiacionService = inject(NotificationService);

  public usuarioForm: FormGroup = this._formulario.group({
    usuario: ['', Validators.required],
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    apellidoMaterno: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    fechaNacimiento: [null, Validators.required]
  });


  public onSubmit(): void {
    if (!this.esFormularioValido()) return;

    const usuario = this.mapearUsuario();
    this.registrar(usuario);
  }


  private esFormularioValido(): boolean {
    if (this.usuarioForm.invalid) {
      this.mostrarErrorFormulario();
      return false;
    }

    if (!this.contrasenasCoinciden()) {
      this._notificiacionService.error('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }

  private contrasenasCoinciden(): boolean {
    const { password, confirmPassword } = this.usuarioForm.value;
    return password === confirmPassword;
  }

  private mostrarErrorFormulario(): void {
    const pass = this.usuarioForm.get('password');
    const confirm = this.usuarioForm.get('confirmPassword');

    if (pass?.hasError('minlength')) 
      return this._notificiacionService.error('La contraseña debe tener mínimo 8 caracteres');

    if (pass?.hasError('required')) 
      return this._notificiacionService.warn('La contraseña es requerida');

    if (confirm?.hasError('required')) 
      return this._notificiacionService.warn('Confirma tu contraseña');

    this._notificiacionService.warn('Por favor completa todos los campos');
  }


  private mapearUsuario(): Usuario {
    const { confirmPassword, fechaNacimiento, ...data } = this.usuarioForm.value;

    return {
      ...data,
      fechaNacimiento: this.formatearFecha(fechaNacimiento)
    };
  }

  private formatearFecha(fecha: Date): string { 
    if (!fecha) return ''; 
    const date : Date = new Date(fecha); 
    const dia : string = date.getDate().toString().padStart(2, '0'); 
    const mes : string = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const anio : number = date.getFullYear(); 
    return `${dia}/${mes}/${anio}`; 
  }


  private registrar(usuario: Usuario): void {
    this._autenticadorService.registrarUsuarioService(usuario).subscribe({
      next: () => this.registroExitoso(),
      error: (err) => this.errorRegistro(err)
    });
  }

  private registroExitoso(): void {
    this._notificiacionService.success('Usuario registrado correctamente');
    this.usuarioForm.reset();
  }

  private errorRegistro(error: any): void {
    const mensaje =
      error.error?.errores?.[0] ||
      error.error?.mensaje ||
      'Error al registrar usuario';

    this._notificiacionService.error(mensaje);
  }

  public generarToken(token: string): void {
    if (!this.esFormularioValido()) return;
    const usuario = this.mapearUsuario();
    usuario.recaptchaToken = token;
    this.registrar(usuario);
  }
}
