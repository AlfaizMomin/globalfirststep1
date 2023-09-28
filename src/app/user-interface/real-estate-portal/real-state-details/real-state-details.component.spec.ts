import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealStateDetailsComponent } from './real-state-details.component';

describe('RealStateDetailsComponent', () => {
  let component: RealStateDetailsComponent;
  let fixture: ComponentFixture<RealStateDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealStateDetailsComponent]
    });
    fixture = TestBed.createComponent(RealStateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
