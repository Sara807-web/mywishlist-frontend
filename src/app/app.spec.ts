import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('MyWishlist');
  });
  it('should open the add wish form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('.add-button') as HTMLButtonElement;

    addButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('#wish-name')).toBeTruthy();
  });
  it('should open the wishlist', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listButton = compiled.querySelector('.list-button') as HTMLButtonElement;

    listButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.list-group')).toBeTruthy();
  });
  it('should format wish prices in German format', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.formatPrice(149.99)).toBe('149,99');
    expect(app.formatPrice(24)).toBe('24,00');
  });
it('should filter wishes by name', () => {
  const fixture = TestBed.createComponent(App);
  const app = fixture.componentInstance;

  app.wishes.set([
    {
      id: 1,
      name: 'Kamera',
      price: 499.99,
      bought: false,
      priority: 'high',
    },
    {
      id: 2,
      name: 'Kochbuch',
      price: 24.99,
      bought: false,
      priority: 'low',
    },
  ]);

  app.searchTerm.set('kamera');

  expect(app.filteredWishes()).toHaveLength(1);
  expect(app.filteredWishes()[0].name).toBe('Kamera');
});
});
