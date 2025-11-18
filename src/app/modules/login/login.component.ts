import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './componentes/register-form/register-form.component';
import { LoginFormComponent } from "./componentes/login-form/login-form.component";
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'componente-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CommonModule, RegisterFormComponent, LoginFormComponent, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public seleccionButton: boolean = true;
  public anioActual : number = new Date().getFullYear();

  public botonIniciarSesion(): void {
    this.seleccionButton = true;
  }

  public botonRegistrar(): void {
    this.seleccionButton = false;
  }

}
