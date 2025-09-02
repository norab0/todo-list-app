import { Injectable } from '@angular/core';
import { environment } from './environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  // ...
}
