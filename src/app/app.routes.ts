import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login.routes').then(m => m.loginRoutes)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.routes').then(m => m.dashboardRoute)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
