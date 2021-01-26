import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerfluidComponent } from './containerfluid.component';

describe('ContainerfluidComponent', () => {
  let component: ContainerfluidComponent;
  let fixture: ComponentFixture<ContainerfluidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerfluidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerfluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
