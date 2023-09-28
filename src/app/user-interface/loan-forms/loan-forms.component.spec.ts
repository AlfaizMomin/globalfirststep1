import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFormsComponent } from './loan-forms.component';

describe('LoanFormsComponent', () => {
  let component: LoanFormsComponent;
  let fixture: ComponentFixture<LoanFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanFormsComponent]
    });
    fixture = TestBed.createComponent(LoanFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
