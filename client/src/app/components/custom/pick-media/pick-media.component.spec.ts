import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickMediaComponent } from './pick-media.component';

describe('PickMediaComponent', () => {
  let component: PickMediaComponent;
  let fixture: ComponentFixture<PickMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
