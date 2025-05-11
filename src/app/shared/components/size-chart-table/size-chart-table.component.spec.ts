import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChartTableComponent } from './size-chart-table.component';

describe('SizeChartTableComponent', () => {
  let component: SizeChartTableComponent;
  let fixture: ComponentFixture<SizeChartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeChartTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeChartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
