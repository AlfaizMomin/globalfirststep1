import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldBuilderComponent } from './field-builder.component';

describe('FieldBuilderComponent', () => {
  let component: FieldBuilderComponent;
  let fixture: ComponentFixture<FieldBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldBuilderComponent]
    });
    fixture = TestBed.createComponent(FieldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
