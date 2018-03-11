import { Customer } from '@state/customer/customer.model';
import { Product } from '@state/product/product.model';
import { Order } from '@state/order/order.model';
import { LineItem } from '@state/line-item/line-item.model';

export class InMemoryDataService {
  createDb() {
    const customers = [
      { id: '1', firstName: 'Bob', lastName: 'Newman' } as Customer,
      { id: '2', firstName: 'Homer', lastName: 'Simpson' } as Customer,
      { id: '3', firstName: 'Tom', lastName: 'Slick' } as Customer,
      { id: '4', firstName: 'Jane', lastName: 'Doe' } as Customer
    ];

    const products = [
      { id: '1', name: 'Toothpaste', price: 3.57 } as Product,
      { id: '2', name: 'Deoderant', price: 2.50 } as Product,
      { id: '3', name: 'Hairspray', price: 1.99 } as Product,
      { id: '4', name: 'Shaving Cream', price: 4.25 } as Product
    ];
    const orders = [
      { id: '1', customerId: '1', lineItemIds: ['1', '2', '3', '4'] } as Order,
      { id: '2', customerId: '2', lineItemIds: ['5', '6', '7', '8'] } as Order,
      { id: '3', customerId: '3', lineItemIds: ['9', '10'] } as Order,
      { id: '4', customerId: '4', lineItemIds: ['11', '12', '13'] } as Order
    ];
    const lineItems = [
      { id: '1', productId: '1', quantity: 2 } as LineItem,
      { id: '2', productId: '2', quantity: 5 } as LineItem,
      { id: '3', productId: '3', quantity: 3 } as LineItem,
      { id: '4', productId: '4', quantity: 1 } as LineItem,
      { id: '5', productId: '1', quantity: 2 } as LineItem,
      { id: '6', productId: '2', quantity: 3 } as LineItem,
      { id: '7', productId: '3', quantity: 4 } as LineItem,
      { id: '8', productId: '4', quantity: 5 } as LineItem,
      { id: '9', productId: '1', quantity: 2 } as LineItem,
      { id: '10', productId: '2', quantity: 4 } as LineItem,
      { id: '11', productId: '3', quantity: 6 } as LineItem,
      { id: '12', productId: '4', quantity: 1 } as LineItem,
      { id: '13', productId: '1', quantity: 3 } as LineItem,
    ];

    return { customers, orders, products, lineItems };
  }
}
