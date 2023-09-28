import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategoryDetailComponent } from './job-category-detail.component';

describe('JobCategoryDetailComponent', () => {
  let component: JobCategoryDetailComponent;
  let fixture: ComponentFixture<JobCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobCategoryDetailComponent]
    });
    fixture = TestBed.createComponent(JobCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
