import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { Wish } from './wish';
import { environment } from '../environments/environment';

@Service()
export class WishService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.apiUrl);
  }

  createWish(name: string, price: number, priority: 'high' | 'low'): Observable<Wish> {
    return this.http.post<Wish>(this.apiUrl, {
      name: name,
      price: price,
      priority: priority,
    });
  }
  updateWish(wish: Wish): Observable<Wish> {
    return this.http.put<Wish>(`${this.apiUrl}/${wish.id}`, wish);
  }
  deleteWish(id: number): Observable<Wish> {
    return this.http.delete<Wish>(`${this.apiUrl}/${id}`);
  }
}
