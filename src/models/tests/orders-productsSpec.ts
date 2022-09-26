import { Order_Product, Order_ProductStore } from '../order-product';

const store = new Order_ProductStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.delete).toBeDefined();
  });

});