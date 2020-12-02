import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefgComponent } from './createfg.component';

describe('CreatefgComponent', () => {
  let component: CreatefgComponent;
  let fixture: ComponentFixture<CreatefgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
