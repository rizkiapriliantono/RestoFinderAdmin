import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'login', title: 'Login', loadComponent: () => import('./modules/login-admin/login-admin.component').then(m => m.LoginAdminComponent) },
  { path: 'signup', title: 'signup', loadComponent: () => import('./modules/signup-admin/signup-admin.component').then(m => m.SignupAdminComponent) },
  { path: 'dashboard', title: 'Dashboard', loadComponent: () => import('./modules/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent), canActivate: [AuthGuard] },
];
