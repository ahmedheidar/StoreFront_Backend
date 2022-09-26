import { Order, OrderStore } from '../orders';

const store = new OrderStore()

describe("Product Model", () => {
  it('should have an completedOrders method', () => {
    expect(store.completedOrders).toBeDefined();
  });

  it('should have a currentOrder method', () => {
    expect(store.currentOrder).toBeDefined();
  });

});