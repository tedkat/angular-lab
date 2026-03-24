import { Routes } from '@angular/router';
import { Home } from './home';
import { Edit } from './pages/thing/edit';
import { Create } from './pages/thing/create';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: Home },
  { path: 'thing/create', component: Create, pathMatch: 'full' },
  { path: 'thing/:id', component: Edit, pathMatch: 'full' },
];
