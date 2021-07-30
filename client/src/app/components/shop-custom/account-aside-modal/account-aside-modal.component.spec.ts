import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAsideModalComponent } from './account-aside-modal.component';

describe('AccountAsideModalComponent', () => {
  let component: AccountAsideModalComponent;
  let fixture: ComponentFixture<AccountAsideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAsideModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
