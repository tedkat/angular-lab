import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Thing } from '../../model';
import { form, max, min, required, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [FormField],
  templateUrl: './edit.html',
  styles: ``,
})
export class Edit {
  readonly id = input.required<string>();
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly thingResource = httpResource<Thing>(() => `/api/thing/${this.id()}`);
  protected readonly thing = linkedSignal(() =>
    this.thingResource.hasValue()
      ? this.thingResource.value()
      : <Thing>{ id: '', name: '', age: 0, isAlive: false },
  );
  readonly form = form(this.thing, (schema) => {
    required(schema.name, { message: 'Thing needs a name!' });
    min(schema.age, 0, { message: 'Thing must have age greater than zero!' });
    max(schema.age, 120, { message: 'Thing must have age less than 120!' });
  });

  save(event: Event) {
    event.preventDefault();
    this.http.put(`/api/thing/${this.id()}`, this.thing()).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }

  delete(event: Event) {
    event.preventDefault();
    this.http.delete(`/api/thing/${this.id()}`).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error(err),
    });
  }
}
