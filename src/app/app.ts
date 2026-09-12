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

  constructor(private wishService: WishService) {}

  ngOnInit(): void {
    this.wishService.getWishes().subscribe({
      next: (wishes) => {
        this.wishes.set(wishes);
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set(
          'Die Wünsche konnten nicht geladen werden. Ist das Backend gestartet?',
        );
      },
    });
  }
  addWish(name: string, price: string, priority: string): void {
    const cleanedName = name.trim();
    const numericPrice = Number(price);

    if (cleanedName === '') {
      this.errorMessage.set('Bitte gib einen Wunsch ein.');
      return;
    }

    if (price.trim() === '' || !Number.isFinite(numericPrice) || numericPrice < 0) {
      this.errorMessage.set('Bitte gib einen gültigen Preis ein.');
      return;
    }
    if (priority !== 'high' && priority !== 'low') {
      this.errorMessage.set('Bitte wähle eine gültige Priorität aus.');
      return;
    }

    this.errorMessage.set('');

    this.wishService.createWish(cleanedName, numericPrice, priority).subscribe({
      next: (newWish) => {
        this.wishes.update((wishes) =>
          [...wishes, newWish].sort((firstWish, secondWish) => {
            if (firstWish.priority === secondWish.priority) {
              return firstWish.id - secondWish.id;
            }

            return firstWish.priority === 'high' ? -1 : 1;
          }),
        );
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set('Der Wunsch konnte nicht hinzugefügt werden.');
      },
    });
  }

  toggleBought(wish: Wish): void {
    const changedWish = {
      ...wish,
      bought: !wish.bought,
    };

    this.wishService.updateWish(changedWish).subscribe({
      next: (updatedWish) => {
        this.wishes.update((wishes) =>
          wishes.map((currentWish) =>
            currentWish.id === updatedWish.id ? updatedWish : currentWish,
          ),
        );
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set('Der Wunsch konnte nicht geändert werden.');
      },
    });
  }
  deleteWish(id: number): void {
    const shouldDelete = window.confirm('Möchtest du diesen Wunsch wirklich löschen?');

    if (!shouldDelete) {
      return;
    }

    this.wishService.deleteWish(id).subscribe({
      next: () => {
        this.wishes.update((wishes) => wishes.filter((wish) => wish.id !== id));
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set('Der Wunsch konnte nicht gelöscht werden.');
      },
    });
  }
}
