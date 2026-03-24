import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Thing } from './model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  readonly router = inject(Router);
  readonly things = httpResource<Thing[]>(() => '/api/things');
  add() {
    this.router.navigate(['/thing/create']);
  }
}
