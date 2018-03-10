export class InMemoryDataService {
  createDb() {
    const customers = [
      { id: 1, name: 'Mr. Nice' }
    ];

    const products = [];
    const orders = [];

    return { customers, products, orders };
  }
}
