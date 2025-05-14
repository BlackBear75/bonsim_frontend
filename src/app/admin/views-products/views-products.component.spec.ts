import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsProductsComponent } from './views-products.component';

describe('ViewsProductsComponent', () => {
  let component: ViewsProductsComponent;
  let fixture: ComponentFixture<ViewsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
