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

  addWish(name: string, price: string): void {
    this.wishService.createWish(name, Number(price)).subscribe((newWish) => {
      this.wishes.update((wishes) => [...wishes, newWish]);
    });
  }

  toggleBought(wish: Wish): void {
    const changedWish = {
      ...wish,
      bought: !wish.bought,
    };

    this.wishService.updateWish(changedWish).subscribe((updatedWish) => {
      this.wishes.update((wishes) =>
        wishes.map((currentWish) =>
          currentWish.id === updatedWish.id ? updatedWish : currentWish,
        ),
      );
    });
  }
}