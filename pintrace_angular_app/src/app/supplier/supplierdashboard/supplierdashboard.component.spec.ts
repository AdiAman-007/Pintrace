import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierdashboardComponent } from './supplierdashboard.component';

describe('SupplierdashboardComponent', () => {
  let component: SupplierdashboardComponent;
  let fixture: ComponentFixture<SupplierdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
