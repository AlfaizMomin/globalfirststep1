import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESevaFormsComponent } from './e-seva-forms.component';

describe('ESevaFormsComponent', () => {
  let component: ESevaFormsComponent;
  let fixture: ComponentFixture<ESevaFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ESevaFormsComponent]
    });
    fixture = TestBed.createComponent(ESevaFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
