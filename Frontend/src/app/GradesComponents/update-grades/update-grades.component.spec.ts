import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGradesComponent } from './update-grades.component';

describe('UpdateGradesComponent', () => {
  let component: UpdateGradesComponent;
  let fixture: ComponentFixture<UpdateGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
