import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewposupplierComponent } from './viewposupplier.component';

describe('ViewposupplierComponent', () => {
  let component: ViewposupplierComponent;
  let fixture: ComponentFixture<ViewposupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewposupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewposupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
