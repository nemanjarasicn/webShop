import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewProductComponent } from './quick-view-product.component';

describe('QuickViewProductComponent', () => {
  let component: QuickViewProductComponent;
  let fixture: ComponentFixture<QuickViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickViewProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
