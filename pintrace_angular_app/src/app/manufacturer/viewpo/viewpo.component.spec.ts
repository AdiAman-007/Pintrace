import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpoComponent } from './viewpo.component';

describe('ViewpoComponent', () => {
  let component: ViewpoComponent;
  let fixture: ComponentFixture<ViewpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
