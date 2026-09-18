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

});
