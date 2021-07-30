import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFullMediaComponent } from './show-full-media.component';

describe('ShowFullMediaComponent', () => {
  let component: ShowFullMediaComponent;
  let fixture: ComponentFixture<ShowFullMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFullMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFullMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
