import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfgComponent } from './viewfg.component';

describe('ViewfgComponent', () => {
  let component: ViewfgComponent;
  let fixture: ComponentFixture<ViewfgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
