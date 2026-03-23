import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { Thing } from './model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  readonly things = httpResource<Thing[]>(() => '/api/things');
}
