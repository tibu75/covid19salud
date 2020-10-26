import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColchartComponent } from './colchart.component';

describe('ColchartComponent', () => {
  let component: ColchartComponent;
  let fixture: ComponentFixture<ColchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
