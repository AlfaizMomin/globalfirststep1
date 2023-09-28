import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateFormsComponent } from './real-estate-forms.component';

describe('RealEstateFormsComponent', () => {
  let component: RealEstateFormsComponent;
  let fixture: ComponentFixture<RealEstateFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateFormsComponent]
    });
    fixture = TestBed.createComponent(RealEstateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
