import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './componentes/login-form/login-form.component';

export const loginRoutes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    children: [
      { path: '', component: LoginFormComponent },
    ]
  }
];