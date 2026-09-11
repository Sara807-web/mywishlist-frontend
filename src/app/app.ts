import { Component, signal } from '@angular/core';
import { WishService } from './wish.service';
import { Wish } from './wish';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  wishes = signal<Wish[]>([]);

  constructor(private wishService: WishService) {}

  ngOnInit(): void {
    this.wishService.getWishes().subscribe((wishes) => {
      this.wishes.set(wishes);
    });
  }
}