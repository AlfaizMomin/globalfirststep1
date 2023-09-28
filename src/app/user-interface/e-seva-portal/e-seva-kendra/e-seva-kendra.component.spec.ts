import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESevaKendraComponent } from './e-seva-kendra.component';

describe('ESevaKendraComponent', () => {
  let component: ESevaKendraComponent;
  let fixture: ComponentFixture<ESevaKendraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ESevaKendraComponent]
    });
    fixture = TestBed.createComponent(ESevaKendraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
