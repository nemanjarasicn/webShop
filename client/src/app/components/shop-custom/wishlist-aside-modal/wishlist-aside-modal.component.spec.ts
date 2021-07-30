import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistAsideModalComponent } from './wishlist-aside-modal.component';

describe('WishlistAsideModalComponent', () => {
  let component: WishlistAsideModalComponent;
  let fixture: ComponentFixture<WishlistAsideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistAsideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistAsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
