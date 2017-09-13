import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NnchartComponent } from './nnchart.component';

describe('NnchartComponent', () => {
  let component: NnchartComponent;
  let fixture: ComponentFixture<NnchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NnchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NnchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
