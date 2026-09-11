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
  errorMessage = signal('');

  constructor(private wishService: WishService) { }

  ngOnInit(): void {
    this.wishService.getWishes().subscribe((wishes) => {
      this.wishes.set(wishes);
    });
  }
addWish(name: string, price: string): void {
  const cleanedName = name.trim();
  const numericPrice = Number(price);

  if (cleanedName === '') {
    this.errorMessage.set('Bitte gib einen Wunsch ein.');
    return;
  }

  if (
    price.trim() === '' ||
    !Number.isFinite(numericPrice) ||
    numericPrice < 0
  ) {
    this.errorMessage.set('Bitte gib einen gültigen Preis ein.');
    return;
  }

  this.errorMessage.set('');

  this.wishService.createWish(cleanedName, numericPrice).subscribe((newWish) => {
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
  deleteWish(id: number): void {
    this.wishService.deleteWish(id).subscribe(() => {
      this.wishes.update((wishes) =>
        wishes.filter((wish) => wish.id !== id),
      );
    });
  }
}