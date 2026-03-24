import { Component, inject, signal } from '@angular/core';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { Thing } from '../../model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormField],
  templateUrl: './create.html',
  styles: ``,
})
export class Create {
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly thing = signal<Thing>({ id: '', name: '', age: 0, isAlive: false });
  readonly form = form(this.thing, (schema) => {
    required(schema.name, { message: 'Thing needs a name!' });
    min(schema.age, 0, { message: 'Thing must have age greater than zero!' });
    max(schema.age, 120, { message: 'Thing must have age less than 120!' });
  });
  save(event: Event) {
    event.preventDefault();
    this.http.post(`/api/thing`, this.thing()).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }
}
