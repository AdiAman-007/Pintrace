import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepoComponent } from './createpo.component';

describe('CreatepoComponent', () => {
  let component: CreatepoComponent;
  let fixture: ComponentFixture<CreatepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
