import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineitemsTableComponent } from './order-lineitems-table.component';

describe('OrderLineitemsTableComponent', () => {
  let component: OrderLineitemsTableComponent;
  let fixture: ComponentFixture<OrderLineitemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLineitemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLineitemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
