import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomerComponent } from './order-customer.component';

describe('OrderCustomerComponent', () => {
  let component: OrderCustomerComponent;
  let fixture: ComponentFixture<OrderCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
