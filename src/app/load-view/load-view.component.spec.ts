import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadViewComponent } from './load-view.component';

describe('LoadViewComponent', () => {
  let component: LoadViewComponent;
  let fixture: ComponentFixture<LoadViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadViewComponent]
    });
    fixture = TestBed.createComponent(LoadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
