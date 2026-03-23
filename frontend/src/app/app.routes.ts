import { Routes } from '@angular/router';
import { Home } from './home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: Home },
];
