import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { Wish } from './wish';

@Service()
export class WishService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/wishes';

  getWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.apiUrl);
  }
}