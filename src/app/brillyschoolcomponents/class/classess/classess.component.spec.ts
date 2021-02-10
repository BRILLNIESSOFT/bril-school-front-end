import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassessComponent } from './classess.component';

describe('ClassessComponent', () => {
  let component: ClassessComponent;
  let fixture: ComponentFixture<ClassessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
