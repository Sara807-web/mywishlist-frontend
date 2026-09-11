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

  createWish(name: string, price: number): Observable<Wish> {
    return this.http.post<Wish>(this.apiUrl, {
      name: name,
      price: price,
    });
  }
  updateWish(wish: Wish): Observable<Wish> {
    return this.http.put<Wish>(`${this.apiUrl}/${wish.id}`, wish);
  }
  deleteWish(id: number): Observable<Wish> {
    return this.http.delete<Wish>(`${this.apiUrl}/${id}`);
  }
}