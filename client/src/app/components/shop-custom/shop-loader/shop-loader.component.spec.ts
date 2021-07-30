import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLoaderComponent } from './shop-loader.component';

describe('ShopLoaderComponent', () => {
  let component: ShopLoaderComponent;
  let fixture: ComponentFixture<ShopLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
